import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getDiatonicChords, NOTE_NAMES } from '../../core/music-theory';
import { PianoDiagram } from '../piano-diagram/piano-diagram';

@Component({
  imports: [RouterLink, PianoDiagram],
  selector: 'app-note-page',
  styleUrl: './note-page.scss',
  templateUrl: './note-page.html',
})
export class NotePage {
  /** Bound from the `:note` route param (see withComponentInputBinding). */
  readonly note = input<string>('C');

  readonly chords = computed(() => getDiatonicChords(this.note()));

  private readonly noteIndex = computed(() => NOTE_NAMES.indexOf(this.note() as any));
  readonly previousNote = computed(
    () => NOTE_NAMES[(this.noteIndex() + NOTE_NAMES.length - 1) % NOTE_NAMES.length],
  );
  readonly nextNote = computed(() => NOTE_NAMES[(this.noteIndex() + 1) % NOTE_NAMES.length]);

  print(): void {
    window.print();
  }
}
