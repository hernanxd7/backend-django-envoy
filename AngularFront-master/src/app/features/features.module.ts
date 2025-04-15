import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { videojuegosReducer } from '../store/reducers/videojuegos.reducer';
import { VideojuegosEffects } from '../store/effects/videojuegos.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ videojuegos: videojuegosReducer }),
    EffectsModule.forRoot([VideojuegosEffects])
  ]
})
export class AppModule {}