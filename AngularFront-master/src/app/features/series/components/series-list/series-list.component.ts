import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Serie } from '../../../../store/models/serie.model';
import { cargarSeries, eliminarSerie } from '../../../../store/actions/series.actions';
import { seleccionarSeries, seleccionarCargando, seleccionarError, seleccionarSeriesCargados } from '../../../../store/selectors/series.selectors';
import { take, filter } from 'rxjs/operators'; // Manejo del store "Necesario"

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
  series$: Observable<Serie[]>;
  cargando$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.series$ = this.store.select(seleccionarSeries);
    this.cargando$ = this.store.select(seleccionarCargando);
    this.error$ = this.store.select(seleccionarError);
  }

  //Manejo normal del store
  /*
  ngOnInit(): void {
    this.store.dispatch(cargarVideojuegos());
  }
  */
    ngOnInit(): void {
      this.cargarSeries();
    }
    
    
    private cargarSeries(): void {
      this.store.select(seleccionarSeriesCargados).pipe(
        take(1),
        filter(cargados => !cargados)
      ).subscribe(() => {
        this.store.dispatch(cargarSeries());
      });
    }
    
      editarSerie(id: number): void {
        // No necesitamos verificar el store aquí ya que el formulario
        // se encargará de cargar los datos cuando se acceda a la ruta
        this.router.navigate([`/main/series/editar/${id}`]);
      }
    
      eliminarSerie(id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar este serie?')) {
          // Eliminación directa sin verificar el store
          // El effect manejará la llamada API y el reducer actualizará el estado
          this.store.dispatch(eliminarSerie({ id }));
        }
      }
    
      // Si necesitas recargar los datos manualmente
      recargarSeries(): void {
        // Forzar recarga ignorando el estado cargados
        this.store.dispatch(cargarSeries());
      }
        
  
  }