import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {
  formations: any[] = [];
  successMessage: string | null = null;

  constructor(
    private formationService: FormationService,
    private router: Router,  
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['success']) {
        this.successMessage = params['success'];
        setTimeout(() => (this.successMessage = null), 3000);
      }
    });

    this.loadFormations();
  }

  loadFormations(): void {
    this.formationService.getAllFormations().subscribe({
      next: (data) => {
        console.log("📥 Formations received from API:", data);
        this.formations = data;
      },
      error: (err) => {
        console.error("❌ Erreur lors du chargement des formations", err);
      }
    });
  }

  deleteFormation(id: string | undefined): void {  
    console.log("🗑️ Tentative de suppression de la formation avec ID:", id);
    if (!id) {
      console.error("ID de formation invalide !");
      return;
    }
  
    if (confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      this.formationService.deleteFormation(id).subscribe({
        next: () => {
          this.loadFormations(); // Recharge la liste après suppression
          this.router.navigate([], { 
            queryParams: { success: "Formation supprimée avec succès!" },
            queryParamsHandling: "merge"
          });
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }
  editFormation(id: number): void {
    this.router.navigate(['/formations/edit', id]);
  }
  addFormation(): void {
    this.router.navigate(['/formations/add']);
  }
}
