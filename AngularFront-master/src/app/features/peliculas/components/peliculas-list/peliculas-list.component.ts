import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Pelicula } from '../../../../store/models/pelicula.model';
import { cargarPeliculas, eliminarPelicula, actualizarPelicula } from '../../../../store/actions/peliculas.actions';
import { seleccionarPeliculas, seleccionarCargandoPeliculas, seleccionarErrorPeliculas, seleccionarPeliculasCargadas  } from '../../../../store/selectors/peliculas.selectors'; // Añadir el seleccionarPeliculasCargadas para el Store
import { take, filter } from 'rxjs/operators'; // Manejo del store "Necesario"

@Component({
  selector: 'app-peliculas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './peliculas-list.component.html',
  styleUrls: ['./peliculas-list.components.css'],
  providers: []
})
export class PeliculasListComponent implements OnInit {
  peliculas$: Observable<Pelicula[]>;
  cargando$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.peliculas$ = this.store.select(seleccionarPeliculas);
    this.cargando$ = this.store.select(seleccionarCargandoPeliculas);
    this.error$ = this.store.select(seleccionarErrorPeliculas);
  }

  // Manejo normal del store
  /* 
    ngOnInit(): void {
      this.store.dispatch(cargarPeliculas());
    }
  */
  
  ngOnInit(): void {
    this.cargarPeliculas();
  }
    
    
  private cargarPeliculas(): void {
    this.store.select(seleccionarPeliculasCargadas).pipe(
      take(1),
      filter(cargados => !cargados)
    ).subscribe(() => {
      this.store.dispatch(cargarPeliculas());
    });
  }
  
    editarPelicula(id: number): void {
      // No necesitamos verificar el store aquí ya que el formulario
      // se encargará de cargar los datos cuando se acceda a la ruta
      this.router.navigate([`/main/peliculas/editar/${id}`]);
    }
  
    eliminarPelicula(id: number): void {
      if (confirm('¿Estás seguro de que deseas eliminar este pelicula?')) {
        // Eliminación directa sin verificar el store
        // El effect manejará la llamada API y el reducer actualizará el estado
        this.store.dispatch(eliminarPelicula({ id }));
      }
    }
  
    // Si necesitas recargar los datos manualmente
    recargarPeliculas(): void {
      // Forzar recarga ignorando el estado cargados
      this.store.dispatch(cargarPeliculas());
    }
}