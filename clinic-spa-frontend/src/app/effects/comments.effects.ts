import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {exhaustMap, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { OperationsService } from '../services/operations.service';
import * as CommentsActions from '../actions/comments.actions';
import { Comment } from '../models/comment.model';


@Injectable()
export class CommentsEffects {
  private actions$ = inject(Actions);
  private operationsService = inject(OperationsService);

  /*
  constructor(
    private actions$: Actions,
    private operationsService: OperationsService
  ) {}
  */
  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.loadComments),
      tap(() => console.log('Effect triggered: loadComments')), // Add this
      exhaustMap(() =>
        this.operationsService.getComments().pipe(
          tap(comments => console.log('API response:', comments)), // Add this
          map((comments: Comment[]) =>
            CommentsActions.loadCommentsSuccess({ comments: comments })),
          tap(() => console.log('Success action dispatched')), // Add this
          catchError(error =>
            of(CommentsActions.loadCommentsFailure({
              error: error.message || 'Failed to load comments'
            }))
          )
        )
      )
    )
  );
}
