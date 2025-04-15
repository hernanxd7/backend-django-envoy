import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deletePaper, loadPapers } from '../../actions/papers.actions';
import { Paper } from '../../models/Paper';
import { selectError, selectLoading, selectPapers } from '../../selectors/papers.selectors';

@Component({
  selector: 'app-paper-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paper-list.component.html',
  styleUrls: ['./paper-list.component.css']
})
export class PaperListComponent implements OnInit {
  papers$: Observable<Paper[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.papers$ = this.store.select(selectPapers);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPapers());
  }

  editPaper(id: number): void {
    this.router.navigate([`/papers/edit/${id}`]);
  }

  deletePaper(id: number): void {
    if (confirm('¿Estás seguro de eliminar este paper?')) {
      this.store.dispatch(deletePaper({ paperId:id }));
    }
  }
}