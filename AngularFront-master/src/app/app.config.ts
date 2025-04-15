import { ApplicationConfig, isDevMode, importProvidersFrom  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { peliculasReducer } from './store/reducers/peliculas.reducers';
import { PeliculasEffects } from './store/effects/peliculas.effects';
import { videojuegosReducer } from './store/reducers/videojuegos.reducer';
import { VideojuegosEffects } from './store/effects/videojuegos.effects';
import { seriesReducer } from './store/reducers/series.reducers';
import { SeriesEffects } from './store/effects/series.effects';
import { comicsReducer } from './store/reducers/comics.reducers';
import { ComicsEffects } from './store/effects/comics.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore({ 
      videojuegos: videojuegosReducer,
      peliculas: peliculasReducer,
      series: seriesReducer,
      comics: comicsReducer // Añade el reducer de películas aquí
    }),
    provideEffects([VideojuegosEffects, PeliculasEffects, SeriesEffects, ComicsEffects]), // Añade los effects de películas
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(RouterModule.forRoot([]))
  ]
};