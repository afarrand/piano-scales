import { Component, computed, input } from '@angular/core';
import { HighlightedNote } from '../../core/music-theory.model';
import { NOTE_NAMES } from '../../core/music-theory';

/** Fingering shown on a highlighted key: right hand above, left hand below. */
interface KeyFingers {
  rightFinger: number;
  leftFinger: number;
}

/** A white key ready to render, with optional highlighted fingering. */
interface WhiteKeyView {
  note: string;
  octave: number;
  fingers: KeyFingers | null;
  widthPercent: number;
}

/** A black key ready to render, positioned as a percentage over the white keys. */
interface BlackKeyView {
  note: string;
  octave: number;
  fingers: KeyFingers | null;
  leftPercent: number;
  widthPercent: number;
}

const WHITE_NOTE_PATTERN = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
/** Black keys in an octave, each attached to the index of the white key before it. */
const BLACK_NOTE_PATTERN = [
  { note: 'C#', afterWhiteIndex: 0 },
  { note: 'D#', afterWhiteIndex: 1 },
  { note: 'F#', afterWhiteIndex: 3 },
  { note: 'G#', afterWhiteIndex: 4 },
  { note: 'A#', afterWhiteIndex: 5 },
];

@Component({
  imports: [],
  selector: 'app-piano-diagram',
  styleUrl: './piano-diagram.scss',
  templateUrl: './piano-diagram.html',
})
export class PianoDiagram {
  /** Notes to highlight on the keyboard, each with fingering for both hands. */
  readonly notes = input<HighlightedNote[]>([]);
  /** Small caption shown above the diagram, e.g. "Root position". */
  readonly label = input<string>('');

  private readonly range = computed(() => {
    const absolute = this.notes().map((n) => n.octave * 12 + NOTE_NAMES.indexOf(n.note as any));
    const minAbs = absolute.length ? Math.min(...absolute) : 4 * 12;
    const maxAbs = absolute.length ? Math.max(...absolute) : 4 * 12 + 7;
    const minOctave = Math.floor(minAbs / 12);
    // Always render at least 2 full octaves so every diagram has the same size.
    const maxOctave = Math.max(Math.floor(maxAbs / 12), minOctave + 1);
    return { minOctave, maxOctave };
  });

  private readonly highlightMap = computed(() => {
    const map = new Map<string, KeyFingers>();
    for (const n of this.notes()) {
      map.set(`${n.note}${n.octave}`, { rightFinger: n.rightFinger, leftFinger: n.leftFinger });
    }
    return map;
  });

  readonly whiteKeys = computed<WhiteKeyView[]>(() => {
    const { minOctave, maxOctave } = this.range();
    const highlights = this.highlightMap();
    const keys: WhiteKeyView[] = [];

    for (let octave = minOctave; octave <= maxOctave; octave++) {
      for (const note of WHITE_NOTE_PATTERN) {
        keys.push({ note, octave, fingers: highlights.get(`${note}${octave}`) ?? null, widthPercent: 0 });
      }
    }
    // Trailing C so the top octave reads as a complete keyboard shape.
    keys.push({
      note: 'C',
      octave: maxOctave + 1,
      fingers: highlights.get(`C${maxOctave + 1}`) ?? null,
      widthPercent: 0,
    });

    const widthPercent = 100 / keys.length;
    return keys.map((k) => ({ ...k, widthPercent }));
  });

  readonly blackKeys = computed<BlackKeyView[]>(() => {
    const { minOctave, maxOctave } = this.range();
    const highlights = this.highlightMap();
    const whiteCount = this.whiteKeys().length;
    const whiteWidthPercent = 100 / whiteCount;
    const blackWidthPercent = whiteWidthPercent * 0.6;
    const keys: BlackKeyView[] = [];

    for (let octave = minOctave; octave <= maxOctave; octave++) {
      for (const black of BLACK_NOTE_PATTERN) {
        const globalWhiteIndexBefore = (octave - minOctave) * 7 + black.afterWhiteIndex;
        keys.push({
          note: black.note,
          octave,
          fingers: highlights.get(`${black.note}${octave}`) ?? null,
          leftPercent: (globalWhiteIndexBefore + 1) * whiteWidthPercent - blackWidthPercent / 2,
          widthPercent: blackWidthPercent,
        });
      }
    }
    return keys;
  });
}
