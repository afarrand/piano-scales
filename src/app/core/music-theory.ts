import { ChordInfo, ChordVoicing, HighlightedNote } from './music-theory.model';

/** The 12 pitch classes, using sharps only to keep note lookups simple. */
export const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

/** Semitone offsets of each major scale degree from the tonic. */
const MAJOR_SCALE_STEPS = [0, 2, 4, 5, 7, 9, 11];

/** Quality of the diatonic triad built on each major scale degree (I..vii°). */
const DEGREE_QUALITIES: ChordInfo['quality'][] = [
  'major',
  'minor',
  'minor',
  'major',
  'major',
  'minor',
  'diminished',
];

const ROMAN_NUMERALS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

/** Semitone intervals (from the chord root) that make up a triad of each quality. */
const TRIAD_INTERVALS: Record<ChordInfo['quality'], [number, number, number]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
};

const CHORD_SUFFIX: Record<ChordInfo['quality'], string> = {
  major: '',
  minor: 'm',
  diminished: 'dim',
};

const VOICING_LABELS = ['Root position', '1st inversion', '2nd inversion'];

/** Octave used as the reference point for the right-hand voicing of a chord. */
const BASE_OCTAVE = 4;

/**
 * Splits an absolute semitone offset (measured from C in BASE_OCTAVE) into
 * a pitch class name and an octave number.
 */
function toNoteAndOctave(offsetFromBaseC: number): { note: string; octave: number } {
  const octave = BASE_OCTAVE + Math.floor(offsetFromBaseC / 12);
  const note = NOTE_NAMES[((offsetFromBaseC % 12) + 12) % 12];
  return { note, octave };
}

/**
 * Right/left hand finger numbers for a triad voicing, based on the standard
 * teaching rule: a voicing spanning a 5th or less uses 1-3-5 (thumb-middle-
 * pinky), while a voicing spanning a 6th uses 1-2-5.
 */
function fingersForSpan(span: number): { rightHand: number[]; leftHand: number[] } {
  return span <= 7
    ? { rightHand: [1, 3, 5], leftHand: [5, 3, 1] }
    : { rightHand: [1, 2, 5], leftHand: [5, 4, 1] };
}

/**
 * Builds one voicing (root position or an inversion) of a triad.
 *
 * @param chordRootOffset semitone offset of the chord root from C in BASE_OCTAVE.
 * @param intervals the triad's semitone intervals from its root.
 * @param inversion 0 = root position, 1 = first inversion, 2 = second inversion.
 */
function buildVoicing(
  chordRootOffset: number,
  intervals: [number, number, number],
  inversion: 0 | 1 | 2,
): ChordVoicing {
  const rootPositionOffsets = intervals.map((i) => chordRootOffset + i);

  // Move `inversion` notes from the bottom of the stack to the top, up an octave.
  const offsets = [
    ...rootPositionOffsets.slice(inversion),
    ...rootPositionOffsets.slice(0, inversion).map((o) => o + 12),
  ];

  const span = offsets[offsets.length - 1] - offsets[0];
  const { rightHand, leftHand } = fingersForSpan(span);

  // Both hands play the same three keys here; only the suggested finger
  // differs, so we highlight one set of keys with both finger numbers.
  const notes: HighlightedNote[] = offsets.map((offset, i) => ({
    ...toNoteAndOctave(offset),
    rightFinger: rightHand[i],
    leftFinger: leftHand[i],
  }));

  return {
    label: VOICING_LABELS[inversion],
    notes,
  };
}

/** Builds the seven diatonic triads (I - vii°) for the major key of `rootNote`. */
export function getDiatonicChords(rootNote: string): ChordInfo[] {
  const rootIndex = NOTE_NAMES.indexOf(rootNote as NoteName);
  if (rootIndex === -1) {
    throw new Error(`Unknown note: ${rootNote}`);
  }

  return MAJOR_SCALE_STEPS.map((step, degree) => {
    const chordRootOffset = rootIndex + step;
    const quality = DEGREE_QUALITIES[degree];
    const intervals = TRIAD_INTERVALS[quality];
    const chordRootName = NOTE_NAMES[(chordRootOffset % 12) + (chordRootOffset % 12 < 0 ? 12 : 0)];

    const voicings = [0, 1, 2].map((inversion) =>
      buildVoicing(chordRootOffset, intervals, inversion as 0 | 1 | 2),
    );

    return {
      degree: degree + 1,
      roman: ROMAN_NUMERALS[degree],
      quality,
      name: `${chordRootName}${CHORD_SUFFIX[quality]}`,
      primary: voicings[0],
      alternatives: voicings.slice(1),
    };
  });
}

/** Absolute semitone position of a note, for comparing physical key distance. */
function semitoneOf(note: string, octave: number): number {
  return octave * 12 + NOTE_NAMES.indexOf(note as NoteName);
}

/**
 * Physical finger-travel cost between two triad voicings: the sum of the
 * semitone distances between each voicing's bottom/middle/top notes.
 */
function movementCost(a: ChordVoicing, b: ChordVoicing): number {
  return a.notes.reduce(
    (total, note, i) => total + Math.abs(semitoneOf(note.note, note.octave) - semitoneOf(b.notes[i].note, b.notes[i].octave)),
    0,
  );
}

/** One chord in a progression, paired with the voicing chosen to minimize hand movement. */
export interface ProgressionStep {
  chord: ChordInfo;
  voicing: ChordVoicing;
}

/**
 * Picks a voicing (root position or an inversion) for each chord in a
 * progression so that the total finger movement from one chord to the next
 * is as small as possible, using dynamic programming over all voicing
 * combinations. Repeated chords (e.g. in a 12-bar blues) naturally resolve
 * to zero movement.
 */
export function chooseLowMovementVoicings(chords: ChordInfo[]): ProgressionStep[] {
  if (chords.length === 0) {
    return [];
  }

  const voicingsPerChord = chords.map((c) => [c.primary, ...c.alternatives]);
  const n = voicingsPerChord.length;
  const voicingCount = voicingsPerChord[0].length;

  // dp[i][v] = lowest total movement to reach voicing `v` of chord `i`.
  const dp: number[][] = Array.from({ length: n }, () => new Array(voicingCount).fill(0));
  const backPointer: number[][] = Array.from({ length: n }, () => new Array(voicingCount).fill(0));

  // Tiny bias towards root position so ties (e.g. the first chord) favor the
  // primary, most familiar fingering.
  for (let v = 0; v < voicingCount; v++) {
    dp[0][v] = v * 1e-6;
  }

  for (let i = 1; i < n; i++) {
    for (let v = 0; v < voicingCount; v++) {
      let best = Infinity;
      let bestPrev = 0;
      for (let pv = 0; pv < voicingCount; pv++) {
        const cost = dp[i - 1][pv] + movementCost(voicingsPerChord[i - 1][pv], voicingsPerChord[i][v]);
        if (cost < best) {
          best = cost;
          bestPrev = pv;
        }
      }
      dp[i][v] = best + v * 1e-6;
      backPointer[i][v] = bestPrev;
    }
  }

  let bestFinal = 0;
  for (let v = 1; v < voicingCount; v++) {
    if (dp[n - 1][v] < dp[n - 1][bestFinal]) {
      bestFinal = v;
    }
  }

  const chosenIndices = new Array<number>(n);
  chosenIndices[n - 1] = bestFinal;
  for (let i = n - 1; i > 0; i--) {
    chosenIndices[i - 1] = backPointer[i][chosenIndices[i]];
  }

  return chords.map((chord, i) => ({
    chord,
    voicing: voicingsPerChord[i][chosenIndices[i]],
  }));
}

