/** A single highlighted note shown on a piano diagram, with fingering for both hands. */
export interface HighlightedNote {
  /** Pitch class without octave, e.g. 'C', 'C#'. */
  note: string;
  /** Octave number (scientific pitch notation, middle C = C4). */
  octave: number;
  /** Suggested right-hand finger number (1 = thumb .. 5 = pinky). */
  rightFinger: number;
  /** Suggested left-hand finger number (1 = thumb .. 5 = pinky). */
  leftFinger: number;
}

/** A single way of playing a chord (root position or an inversion). */
export interface ChordVoicing {
  label: string;
  notes: HighlightedNote[];
}

/** A diatonic chord built on one degree of a major scale. */
export interface ChordInfo {
  degree: number;
  roman: string;
  quality: 'major' | 'minor' | 'diminished';
  name: string;
  /** Primary (root position) voicing, shown first. */
  primary: ChordVoicing;
  /** Alternative fingerings (inversions). */
  alternatives: ChordVoicing[];
}

