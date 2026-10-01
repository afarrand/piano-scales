import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NotePage } from './components/note-page/note-page';
import { ProgressionsList } from './components/progressions-list/progressions-list';
import { ProgressionDetail } from './components/progression-detail/progression-detail';

export const routes: Routes = [
  { path: '', component: Home, title: 'Piano Chords' },
  { path: 'note/:note', component: NotePage, title: 'Piano Chords' },
  { path: 'progressions', pathMatch: 'full', redirectTo: 'progressions/C' },
  { path: 'progressions/:note', component: ProgressionsList, title: 'Popular Progressions' },
  { path: 'progressions/:note/:id', component: ProgressionDetail, title: 'Popular Progressions' },
  { path: '**', redirectTo: '' },
];

