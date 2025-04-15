import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Router} from '@angular/router';
import { ResearchPapersService } from '../../services/research-papers.service';

@Component({
  selector: 'app-create-paper',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './create-paper.component.html',
  styleUrl: './create-paper.component.scss'
})
export class CreatePaperComponent {
  paperForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private researchPapersService: ResearchPapersService
  ) {
    this.paperForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      abstract: ['', [Validators.required, Validators.minLength(6)]],
      doi: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log("Jejejjejee");
    this.paperForm.value.authors = "Jejejejejeje";
    this.paperForm.value.publication_date = "2022-04-25";
    this.paperForm.value.journal = "Jejejejejeje";
    if (this.paperForm.valid) {
      this.researchPapersService.postResearchPapers(this.paperForm.value).subscribe({
        next: async (response) => {
          console.log('Paper created successfully: ', response);
          // this.router.navigate(['/papers']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid email or password';
        }
      });
    }
  }
}
