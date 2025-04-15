import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comic } from '../../../../store/models/comic.model';
import { cargarComics, eliminarComic, actualizarComic } from '../../../../store/actions/comics.actions';
import { seleccionarComics, seleccionarCargando, seleccionarError, seleccionarComicsCargados } from '../../../../store/selectors/comics.selectors';
import { take, filter } from 'rxjs/operators'; // Manejo del store "Necesario"

@Component({
  selector: 'app-comics-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.css'],
  providers: []
})
export class ComicsListComponent implements OnInit {
  comics$: Observable<Comic[]>;
  cargando$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.comics$ = this.store.select(seleccionarComics);
    this.cargando$ = this.store.select(seleccionarCargando);
    this.error$ = this.store.select(seleccionarError);
  }
  
  ngOnInit(): void {
    this.cargarComics();
  }
  
  
    private cargarComics(): void {
      this.store.select(seleccionarComicsCargados).pipe(
        take(1),
        filter(cargados => !cargados)
      ).subscribe(() => {
        this.store.dispatch(cargarComics());
      });
    }
    
      editarComic(id: number): void {
        // No necesitamos verificar el store aquí ya que el formulario
        // se encargará de cargar los datos cuando se acceda a la ruta
        this.router.navigate([`/main/comics/editar/${id}`]);
      }
    
      eliminarComic(id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar este comic?')) {
          // Eliminación directa sin verificar el store
          // El effect manejará la llamada API y el reducer actualizará el estado
          this.store.dispatch(eliminarComic({ id }));
        }
      }
    
      // Si necesitas recargar los datos manualmente
      recargarComics(): void {
        // Forzar recarga ignorando el estado cargados
        this.store.dispatch(cargarComics());
      }
      

}