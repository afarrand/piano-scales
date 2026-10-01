import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getDiatonicChords, chooseLowMovementVoicings } from '../../core/music-theory';
import { PROGRESSIONS } from '../../core/progressions';
import { PianoDiagram } from '../piano-diagram/piano-diagram';

@Component({
  imports: [RouterLink, PianoDiagram],
  selector: 'app-progression-detail',
  styleUrl: './progression-detail.scss',
  templateUrl: './progression-detail.html',
})
export class ProgressionDetail {
  /** Bound from the `:note` and `:id` route params (see withComponentInputBinding). */
  readonly note = input<string>('C');
  readonly id = input<string>('');

  readonly progression = computed(() => PROGRESSIONS.find((p) => p.id === this.id()));

  readonly steps = computed(() => {
    const progression = this.progression();
    if (!progression) {
      return [];
    }
    const chords = getDiatonicChords(this.note());
    const progressionChords = progression.degrees.map((degree) => chords[degree - 1]);
    return chooseLowMovementVoicings(progressionChords);
  });
}
