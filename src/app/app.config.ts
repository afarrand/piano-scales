import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Hash-based routing avoids needing server-side rewrites, which static
    // hosts like GitHub Pages don't support for deep links / refreshes.
    provideRouter(routes, withComponentInputBinding(), withHashLocation())
  ]
};

