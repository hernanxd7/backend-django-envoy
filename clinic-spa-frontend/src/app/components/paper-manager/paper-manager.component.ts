import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {ResearchPapersService} from '../../services/research-papers.service';
import {Paper} from '../../models/Paper';
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-paper-manager',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    NgIf,
    MatError,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
  ],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ],
  templateUrl: './paper-manager.component.html',
  styleUrl: './paper-manager.component.scss'
})
export class PaperManagerComponent implements OnInit {
  paperForm: FormGroup;
  dialogMode: 'edit' | 'view';

  constructor(
    private fb: FormBuilder,
    private researchPapersService: ResearchPapersService,
    public dialogRef: MatDialogRef<PaperManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { paper: Paper, mode: 'edit' | 'view' }
  ) {
    this.dialogMode = data.mode;

    this.paperForm = this.fb.group({
      title: ['', Validators.required],
      authors: ['', Validators.required],
      abstract: [''],
      publication_date: [null]
    });
  }

  ngOnInit(): void {
    // Populate the form with paper data
    this.paperForm.patchValue({
      title: this.data.paper.title,
      authors: this.data.paper.authors,
      abstract: this.data.paper.abstract || '',
      publication_date: this.data.paper.publication_date || null
    });
  }
  savePaper(): void {
    if (this.paperForm.valid) {
      // Combine the form value with the original paper's ID
      const updatedPaper = {
        ...this.data.paper,
        ...this.paperForm.value
      };

      // Call the service to update the paper
      this.researchPapersService.patchResearchPapers(updatedPaper).subscribe({
        next: (response) => {
          this.dialogRef.close(updatedPaper);
        },
        error: (error) => {
          console.error('Error updating paper:', error);
          // You might want to show an error message to the user
        }
      });
    }
  }
}
