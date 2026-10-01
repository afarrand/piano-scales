import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NOTE_NAMES } from '../../core/music-theory';
import { PROGRESSIONS } from '../../core/progressions';

@Component({
  imports: [RouterLink],
  selector: 'app-progressions-list',
  styleUrl: './progressions-list.scss',
  templateUrl: './progressions-list.html',
})
export class ProgressionsList {
  /** Bound from the `:note` route param (see withComponentInputBinding). */
  readonly note = input<string>('C');

  readonly notes = NOTE_NAMES;
  readonly progressions = PROGRESSIONS;

  private readonly noteIndex = computed(() => NOTE_NAMES.indexOf(this.note() as any));
  readonly previousNote = computed(
    () => NOTE_NAMES[(this.noteIndex() + NOTE_NAMES.length - 1) % NOTE_NAMES.length],
  );
  readonly nextNote = computed(() => NOTE_NAMES[(this.noteIndex() + 1) % NOTE_NAMES.length]);
}
