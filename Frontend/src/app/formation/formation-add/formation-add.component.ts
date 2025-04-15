import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationService } from 'src/app/services/formation.service';
import { Router } from '@angular/router';
import { CategoryResource } from '../../Models/formation.model';

@Component({
  selector: 'app-formation-add',
  templateUrl: './formation-add.component.html',
  styleUrls: ['./formation-add.component.css']
})
export class FormationAddComponent {
  formationForm: FormGroup;
  categories = Object.values(CategoryResource);

  constructor(
    private fb: FormBuilder,
    private formationService: FormationService,
    private router: Router
  ) {
    this.formationForm = this.fb.group({
      titreFormation: ['', Validators.required],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      categorie: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  onSubmit(): void {
    if (this.formationForm.invalid) {
      return;
    }

    this.formationService.addFormation(this.formationForm.value).subscribe({
      next: () => {
        this.router.navigate(['/formations'], { queryParams: { success: 'Formation added successfully!' } });
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
