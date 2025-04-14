import { Component, OnInit } from '@angular/core';
import { AccompagnementService, AccompagnementPFE } from 'src/app/services/accompagnement.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accompagnement-encadrant',
  templateUrl: './accompagnement-encadrant.component.html',
  styleUrls: ['./accompagnement-encadrant.component.css']
})
export class AccompagnementEncadrantComponent implements OnInit {
  allAccompagnements: AccompagnementPFE[] = [];
  accompagnements: AccompagnementPFE[] = [];
  searchName: string = '';
  threshold: number = 0;
  totalCount: number = 0;
  specialites: string[] = [];
  niveaux: string[] = [];
  selectedSpecialite: string = '';
  selectedNiveau: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedAccompagnement: AccompagnementPFE | null = null;
  newAccompagnement: AccompagnementPFE = {
    etudiant: '',
    sujet: '',
    specialite: '',
    competences: '',
    niveau: ''
  };
  editAccompagnement: AccompagnementPFE = {
    etudiant: '',
    sujet: '',
    specialite: '',
    competences: '',
    niveau: ''
  };
  files: { id: number, name: string }[] = [];  // List of files for download
  selectedFile: File | null = null;
  accompagnement: any;

  constructor(private accompagnementService: AccompagnementService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadAccompagnements();
    this.loadTotalCount();
    this.loadMetadata(); // Important
    this.route.paramMap.subscribe(params => {
      const data = history.state.data; // Récupère les données passées lors de la navigation
      this.accompagnement = data;
    });
  }

  loadTotalCount(): void {
    this.accompagnementService.countAccompagnements().subscribe({
      next: (count) => this.totalCount = count,
      error: (err) => console.error('Erreur de chargement du total', err)
    });
  }

  loadMetadata(): void {
    this.accompagnementService.getDistinctValues().subscribe({
      next: (data) => {
        this.specialites = data.specialites;
        this.niveaux = data.niveaux;
      },
      error: (err) => console.error('Erreur lors du chargement des métadonnées', err)
    });
  }

  loadAccompagnements(): void {
    this.accompagnementService.getAllAccompagnements().subscribe({
      next: (data) => {
        this.allAccompagnements = data;
        this.applyFilters();
      },
      error: (err) => console.error(err)
    });
  }

  applyFilters(): void {
    let filtered = [...this.allAccompagnements];

    if (this.searchName) {
      filtered = filtered.filter((a) =>
        a.etudiant.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }

    if (this.selectedSpecialite) {
      filtered = filtered.filter((a) => a.specialite === this.selectedSpecialite);
    }

    if (this.selectedNiveau) {
      filtered = filtered.filter((a) => a.niveau === this.selectedNiveau);
    }

    this.accompagnements = filtered;
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.accompagnements.sort((a, b) => {
      const valueA = (a as any)[field]?.toString() || '';
      const valueB = (b as any)[field]?.toString() || '';
      return this.sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }

  searchByName(): void {
    this.applyFilters();
  }

  filterByAvancement(): void {
    if (this.threshold >= 0) {
      this.accompagnementService.getByAvancementGreater(this.threshold).subscribe({
        next: (data) => this.accompagnements = data,
        error: (err) => console.error('Erreur de filtrage', err)
      });
    }
  }

  resetFilters(): void {
    this.searchName = '';
    this.selectedSpecialite = '';
    this.selectedNiveau = '';
    this.threshold = 0;
    this.applyFilters();
  }

  openEdit(accompagnement: AccompagnementPFE): void {
    this.editAccompagnement = { ...accompagnement };
    const editOffcanvas = new bootstrap.Offcanvas('#offcanvasEditAccompagnement');
    editOffcanvas.show();
  }

  onEditSubmit(): void {
    this.accompagnementService.updateAccompagnement(this.editAccompagnement).subscribe({
      next: () => {
        this.loadAccompagnements();
        this.loadTotalCount();
        alert('Mis à jour avec succès !');
      },
      error: (err) => console.error('Erreur de mise à jour', err)
    });
  }

  onSubmit(): void {
    if (!this.newAccompagnement.etudiant || !this.newAccompagnement.sujet) return;

    this.accompagnementService.createAccompagnement(this.newAccompagnement).subscribe({
      next: () => this.loadAccompagnements(),
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }

  // Ouvrir les détails du produit
  openDetails(accompagnement: AccompagnementPFE): void {
    this.selectedAccompagnement = accompagnement; // Sauvegarde du produit sélectionné
    // Utilisation de Router pour naviguer vers la page des détails du produit
    this.router.navigate(['/accompagnement-details'], { state: { data: accompagnement } });
  }
  
  confirmDelete(id: number): void {
    this.selectedAccompagnement = this.accompagnements.find(acomp => acomp.idAccompagnement === id) || null;
    if (this.selectedAccompagnement) {
      const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
      modal.show();
    }
  }

  supprimerAccompagnement(): void {
    if (this.selectedAccompagnement) {
      this.accompagnementService.deleteAccompagnement(this.selectedAccompagnement.idAccompagnement!).subscribe({
        next: () => {
          alert('Accompagnement supprimé avec succès');
          this.loadAccompagnements();
        },
        error: (err) => console.error('Erreur de suppression', err)
      });
    }
  }

  
  exportCSV(): void {
    this.accompagnementService.exportCSV().subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = 'accompagnements.csv';
        link.click();
      },
      error: (err) => {
        console.error('Erreur lors de l\'export CSV', err);
        alert('Erreur lors de l\'exportation');
      }
    });
  }
  
}
