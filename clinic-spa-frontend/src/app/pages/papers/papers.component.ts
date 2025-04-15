import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createPaper, deletePaper, loadPapers, updatePaper } from '../../actions/papers.actions';
import { Paper } from '../../models/Paper';
import { selectLoading, selectPapers } from '../../selectors/papers.selectors';
import { PaperFormComponent } from '../paper-form/paper-form.component';
import { PaperListComponent } from '../papers-list/paper-list.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, PaperListComponent, PaperFormComponent],
  selector: 'app-papers',
  templateUrl: './papers.component.html'
})
export class PapersComponent implements OnInit {
  papers$: Observable<Paper[]>;
  loading$: Observable<boolean>;
  selectedPaper: Paper | null = null;

  constructor(private store: Store) {
    // Aseguramos que siempre devuelva un array, incluso si es vacío
    this.papers$ = this.store.select(selectPapers).pipe(
      map(papers => papers ?? [])  // Cambiado de || a ??
    );
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPapers());
  }

  onSave(paper: Paper): void {
    if (paper.id) {
      this.store.dispatch(updatePaper({ paper }));
    } else {
      this.store.dispatch(createPaper({ paper }));
    }
    this.selectedPaper = null;
  }

  onDeletePaper(id: number): void {
    this.store.dispatch(deletePaper({ paperId: id }));
  }
}