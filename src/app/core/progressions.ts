/** A well-known chord progression, described by scale degrees (1-7, matching ChordInfo.degree). */
export interface Progression {
  id: string;
  name: string;
  romanLabel: string;
  description: string;
  degrees: number[];
}

export const PROGRESSIONS: Progression[] = [
  {
    id: 'i-iv-v',
    name: 'Three-Chord Rock, Blues & Country',
    romanLabel: 'I - IV - V',
    description: 'The classic three-chord trick behind countless rock, blues and country songs.',
    degrees: [1, 4, 5],
  },
  {
    id: 'i-v-vi-iv',
    name: 'Pop Progression ("Axis of Awesome")',
    romanLabel: 'I - V - vi - IV',
    description: 'The ubiquitous modern pop loop used in hundreds of hit songs.',
    degrees: [1, 5, 6, 4],
  },
  {
    id: 'i-vi-iv-v',
    name: '50s Progression (Doo-Wop)',
    romanLabel: 'I - vi - IV - V',
    description: 'The sweet, nostalgic doo-wop progression from 1950s pop.',
    degrees: [1, 6, 4, 5],
  },
  {
    id: 'ii-v-i',
    name: 'Jazz Turnaround',
    romanLabel: 'ii - V - I',
    description: 'The essential cadence found in nearly every jazz standard.',
    degrees: [2, 5, 1],
  },
  {
    id: 'vi-iv-i-v',
    name: 'Sensitive Pop / Emotional Ballad',
    romanLabel: 'vi - IV - I - V',
    description: 'A minor-led rotation of the pop progression, common in emotional ballads.',
    degrees: [6, 4, 1, 5],
  },
  {
    id: 'i-vi-ii-v',
    name: 'Jazz / Pop Turnaround',
    romanLabel: 'I - vi - ii - V',
    description: 'A smooth turnaround that cycles back to the tonic, common in jazz and pop standards.',
    degrees: [1, 6, 2, 5],
  },
  {
    id: 'i-iv-vi-v',
    name: 'Anthemic Pop Loop',
    romanLabel: 'I - IV - vi - V',
    description: 'A soaring, anthemic variation on the pop progression.',
    degrees: [1, 4, 6, 5],
  },
  {
    id: 'i-v-iv',
    name: 'Rock / Country Shuffle',
    romanLabel: 'I - V - IV',
    description: 'A simple, driving three-chord shuffle common in rock and country.',
    degrees: [1, 5, 4],
  },
  {
    id: 'vi-ii-v-i',
    name: 'Circle Progression',
    romanLabel: 'vi - ii - V - I',
    description: 'Chords moving around the circle of fifths back to the tonic.',
    degrees: [6, 2, 5, 1],
  },
  {
    id: '12-bar-blues',
    name: '12-Bar Blues',
    romanLabel: 'I - I - I - I - IV - IV - I - I - V - IV - I - I',
    description: 'The classic 12-bar blues form, one chord per bar.',
    degrees: [1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 1],
  },
];
