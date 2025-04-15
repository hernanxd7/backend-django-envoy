import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, exhaustMap, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import * as PapersActions from "../actions/papers.actions";
import { Paper } from "../models/Paper";
import { PapersService } from './../services/papers.service';
import { ResearchPapersService } from './../services/research-papers.service';

@Injectable()
export class PapersEffects {
  private actions$: Actions = inject(Actions);
  private researchPapersService: ResearchPapersService = inject(
    ResearchPapersService
  );

  private papersService: PapersService = inject(
    PapersService
  );

  loadPapers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PapersActions.loadPapers),
      exhaustMap(() => this.papersService.getPapers().pipe(
        map((papers: Paper[]) => PapersActions.loadPapersSuccess({ papers })),
        catchError((error) => of(PapersActions.loadPapersFailure({ error })))
      ))
    )
  );

  createPaper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PapersActions.createPaper),
      exhaustMap((action) => this.papersService.createPaper(action.paper).pipe(
        map((paper: Paper) => PapersActions.createPaperSuccess({ paper })),
        catchError((error) => of(PapersActions.createPaperFailure({ error })))
      ))
    )
  );

  updatePaper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PapersActions.updatePaper),
      exhaustMap((action) => this.papersService.updatePaper(action.paper).pipe(
        map((paper: Paper) => PapersActions.updatePaperSuccess({ paper })),
        catchError((error) => of(PapersActions.updatePaperFailure({ error })))
      ))
    )
  );
  
  deletePaper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PapersActions.deletePaper),
      concatMap((action) => this.papersService.deletePaper(action.paperId).pipe(
        map(() => PapersActions.deletePaperSuccess({ paperId: action.paperId })),
        catchError((error) => of(PapersActions.deletePaperFailure({ error })))
      ))
    )
  );
}
