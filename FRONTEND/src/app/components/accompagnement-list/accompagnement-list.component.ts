import { Component, OnInit } from '@angular/core';
import { Accompagnement } from 'src/app/models/accompagnement.model';
import { AccompagnementService } from 'src/app/services/accompagnement.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-accompagnement-list',
  templateUrl: './accompagnement-list.component.html',
  styleUrls: ['./accompagnement-list.component.css']
})
export class AccompagnementListComponent implements OnInit {
  accompagnements: Accompagnement[] = [];
  newAccompagnement: Accompagnement = {
    etudiant: '',
    encadrant: '',
    sujet: '',
    avancement: 0
  };
  idToUpdate: number | null = null;

  constructor(private service: AccompagnementService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.accompagnements = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des accompagnements', err);
      }
    });
  }
  confirmDeleteId: number | null = null;

  confirmDelete(idAccompagnement: number): void {
    this.confirmDeleteId = idAccompagnement;
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
    modal.show();
  }
  
  supprimerAccompagnement(): void {
    if (this.confirmDeleteId !== null) {
      this.service.delete(this.confirmDeleteId).subscribe({
        next: () => {
          this.loadAll(); // recharge la liste
          this.confirmDeleteId = null;
          const modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')!);
          modal?.hide();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }
  
  afficherDetails(idAccompagnement: number): void {
    // Tu peux adapter ça pour ouvrir un modal ou rediriger vers un détail
    console.log('Afficher détails pour l\'ID:', idAccompagnement);
  }
  
  modifierAccompagnement(accompagnement: Accompagnement): void {
    this.newAccompagnement = { ...accompagnement }; // pré-remplit le formulaire
    this.idToUpdate = accompagnement.idAccompagnement!;
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasAddAccompagnement')!);
    offcanvas.show();
  }
  
  onSubmit(): void {
    if (this.idToUpdate === null) {
      // Ajout
      this.service.create(this.newAccompagnement).subscribe({
        next: () => {
          this.loadAll();
          this.resetForm();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout :', err);
        }
      });
    } else {
      // Mise à jour
      this.service.update(this.idToUpdate, this.newAccompagnement).subscribe({
        next: () => {
          this.loadAll();
          this.resetForm();
          this.idToUpdate = null;
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
        }
      });
    }
  
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasAddAccompagnement')!);
    offcanvas?.hide();
  }
  
  resetForm(): void {
    this.newAccompagnement = {
      etudiant: '',
      encadrant: '',
      sujet: '',
      avancement: 0
    };
  }
  
}
