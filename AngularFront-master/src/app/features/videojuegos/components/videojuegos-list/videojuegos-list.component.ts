import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators'; // Manejo del store "Necesario"
import { Videojuego } from '../../../../store/models/videojuego.model';
import { cargarVideojuegos, eliminarVideojuego, actualizarVideojuego } from '../../../../store/actions/videojuegos.actions';
import { seleccionarVideojuegos, seleccionarCargando, seleccionarError, seleccionarVideojuegosCargados } from '../../../../store/selectors/videojuegos.selectors';

@Component({
  selector: 'app-videojuegos-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Importa CommonModule aquí
  templateUrl: './videojuegos-list.component.html',
  styleUrls: ['./videojuegos-list.component.css'],
  providers: []
})
export class VideojuegosListComponent implements OnInit {
  videojuegos$: Observable<Videojuego[]>;
  cargando$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.videojuegos$ = this.store.select(seleccionarVideojuegos);
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
    this.cargarVideojuegos();
  }
  
  private cargarVideojuegos(): void {
    this.store.select(seleccionarVideojuegosCargados).pipe(
      take(1),
      filter(cargados => !cargados)
    ).subscribe(() => {
      this.store.dispatch(cargarVideojuegos());
    });
  }

  editarVideojuego(id: number): void {
    // No necesitamos verificar el store aquí ya que el formulario
    // se encargará de cargar los datos cuando se acceda a la ruta
    this.router.navigate([`/main/videojuegos/editar/${id}`]);
  }

  eliminarVideojuego(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este videojuego?')) {
      // Eliminación directa sin verificar el store
      // El effect manejará la llamada API y el reducer actualizará el estado
      this.store.dispatch(eliminarVideojuego({ id }));
    }
  }

  // Si necesitas recargar los datos manualmente
  recargarVideojuegos(): void {
    // Forzar recarga ignorando el estado cargados
    this.store.dispatch(cargarVideojuegos());
  }
  

}