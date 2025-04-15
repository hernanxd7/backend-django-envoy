import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { createPaper, updatePaper } from '../../actions/papers.actions';
import { Paper } from '../../models/Paper';
import { PapersService } from '../../services/papers.service';

@Component({
  selector: 'app-paper-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './paper-form.component.html',
  styleUrls: ['./paper-form.component.css']
})
export class PaperFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private papersService = inject(PapersService);
  router = inject(Router);

  form: FormGroup;
  isEdit = false;
  paperId: number | null = null;

  constructor() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      abstract: ['', Validators.required],
      authors: ['', Validators.required],
      publication_date: ['', Validators.required],
      keywords: [''],
      doi: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.paperId = +id;
      this.papersService.getPaperById(this.paperId)
        .pipe(take(1))
        .subscribe(paper => {
          this.form.patchValue(paper);
        });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      if (this.isEdit && this.paperId) {
        const paper: Paper = {
          id: this.paperId,
          ...formValue
        };
        this.store.dispatch(updatePaper({ paper }));
      } else {
        const paper: Omit<Paper, 'id'> = formValue;
        this.store.dispatch(createPaper({ paper: formValue }));
      }
      this.router.navigate(['/papers']);
    }
  }
}