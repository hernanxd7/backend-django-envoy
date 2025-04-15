import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { cargasReducer } from './reducers/cargas.reducers';
import { papersReducer } from './reducers/papers.reducers';
import { conductoresReducer } from './reducers/conductores.reducers';

import { CargasEffects } from './effects/cargas.effects';
import { PapersEffects } from './effects/papers.effects';
import { ConductoresEffects } from './effects/conductores.effects';

import { CargasService } from './services/cargas.service';
import { PapersService } from './services/papers.service';
// import { ConductoresService } from './services/conductores.service'; // si lo necesitas

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore({
      cargas: cargasReducer,
      papers: papersReducer,
      conductores: conductoresReducer
    }),
    provideEffects([
      CargasEffects,
      PapersEffects,
      ConductoresEffects
    ]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true
    }),
    CargasService,
    PapersService
  ]
};
