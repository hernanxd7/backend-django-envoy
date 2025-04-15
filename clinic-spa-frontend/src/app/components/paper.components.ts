import { Component, Input, OnInit } from "@angular/core";
import { Paper } from "../models/Paper";
import { Observable } from "rxjs";
import { filter, take } from "rxjs/operators"
import { Store } from "@ngrx/store";
import { select, selectAll } from '@ngrx/store';
import { selectPapers } from "../selectors/papers.selectors";

@Component({
  selector: "app-paper",
  templateUrl: "./paper.component.html",
  styleUrls: ["./paper.component.scss"],
})
export class PaperComponent implements OnInit {
    @Input() loaded$!: Observable<boolean>;
  @Input() paper!: Paper;
  constructor() {}

  ngOnInit(): void {}
  loadPapers(): void {
    this.loaded$.pipe(take(1), filter(loaded => !loaded)).subscribe(()=)
  }
}
