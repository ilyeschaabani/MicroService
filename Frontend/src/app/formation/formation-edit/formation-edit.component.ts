import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formation-edit',
  templateUrl: './formation-edit.component.html',
  styleUrls: ['./formation-edit.component.css']
})
export class FormationEditComponent implements OnInit {
  formationForm!: FormGroup;
  formationId!: string;

  constructor(
    private fb: FormBuilder,
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formationId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.formationId) {
      console.error("❌ ID de formation invalide !");
      return;
    }

    // ✅ Initialize the form first
    this.formationForm = this.fb.group({
      titreFormation: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });

    // ✅ Fetch the formation data and fill the form
    this.formationService.getFormationById(this.formationId).subscribe({
      next: (formation) => {
        console.log("📥 Formation received:", formation);
        this.formationForm.patchValue(formation);  // ✅ Use patchValue instead of reassigning the form
      },
      error: (err) => {
        console.error("❌ Erreur lors de la récupération de la formation:", err);
      }
    });
  }

  updateFormation(): void {
    if (this.formationForm.valid) {
      this.formationService.updateFormation(this.formationId, this.formationForm.value).subscribe({
        next: () => {
          console.log("✅ Formation mise à jour avec succès !");
          this.router.navigate(['/formations'], { queryParams: { success: "Formation mise à jour avec succès!" } });
        },
        error: (err) => {
          console.error("❌ Erreur lors de la mise à jour de la formation:", err);
        }
      });
    }
  }
}
