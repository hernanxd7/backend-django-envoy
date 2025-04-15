import {Component, OnInit} from '@angular/core';
import {OperationsService} from '../../services/operations.service';
import {MatList, MatListItem} from '@angular/material/list';
import {CommonModule, AsyncPipe, DatePipe, NgFor, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import { Comment } from '../../models/comment.model';
import * as CommentsActions from '../../actions/comments.actions';
import { Store } from '@ngrx/store';
import {
  selectAllComments,
  selectCommentsLoading,
  selectCommentsError, selectCommentsLoaded
} from '../../selectors/comments.selectors';

import {filter, Observable, take} from 'rxjs';
import {RouterLink} from '@angular/router';
import {MatLine} from '@angular/material/core';


@Component({
  selector: 'app-home',
  imports: [
    MatList,
    MatListItem,
    CommonModule,
    MatIcon,
    MatDivider,
    NgIf, NgFor, AsyncPipe, RouterLink, MatButton, MatLine, MatIconButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  commentList: any[] = [];
  comments$: Observable<Comment[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  loaded$: Observable<boolean>; // Track if data has been loaded

  constructor(
    private operationsService: OperationsService,
    private store: Store
  ) {
    this.comments$ = this.store.select(selectAllComments);
    this.loading$ = this.store.select(selectCommentsLoading);
    this.error$ = this.store.select(selectCommentsError);
    this.loaded$ = this.store.select(selectCommentsLoaded); // New selector
  }
  ngOnInit() {
    this.loadComments()
  }

  loadComments(): void{
    /*try{
      this.operationsService.getComments()
        .subscribe({
            next: (data: any[]) => {
              this.commentList = data;
              console.log("Datos", this.commentList);
            },
            error: async (error: any) => {
              // Handle login errors
              console.error(error);
              alert('Error al iniciar sesión, por favor intente de nuevo.');
            }
          }
        );
    }catch (error) {
      console.log(error);
    }*/
    // Only dispatch loadComments if data hasn't been loaded yet
    this.loaded$.pipe(
      take(1),
      filter(loaded => !loaded)
    ).subscribe(() => {
      this.store.dispatch(CommentsActions.loadComments());
    });
   //this.store.dispatch(CommentsActions.loadComments());

  }

  deleteItem(item: any) {

  }

  editItem(item: any) {

  }

  viewItem(item: any) {

  }

  goToCounter() {

  }
}
