import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NOTE_NAMES } from '../../core/music-theory';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  readonly notes = NOTE_NAMES;
}
