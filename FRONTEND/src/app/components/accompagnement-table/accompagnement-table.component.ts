import { Component, OnInit } from '@angular/core';
import { AccompagnementService, AccompagnementPFE } from 'src/app/services/accompagnement.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-accompagnement-table',
  templateUrl: './accompagnement-table.component.html',
  styleUrls: ['./accompagnement-table.component.css']
})
export class AccompagnementTableComponent implements OnInit {

    accompagnements: AccompagnementPFE[] = [];
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
    
    constructor(private accompagnementService: AccompagnementService, private router: Router) {}
  
    ngOnInit(): void {
      this.loadAccompagnements();
    }
  
    loadAccompagnements(): void {
      this.accompagnementService.getAllAccompagnements().subscribe({
        next: (data) => {
          this.accompagnements = data;
          console.log("Accompagnements chargés :", this.accompagnements);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des accompagnements', err);
        }
      });
    }

    openEdit(accompagnement: AccompagnementPFE): void {
      this.editAccompagnement = { ...accompagnement }; // Cloner les données à modifier
      const editOffcanvas = new bootstrap.Offcanvas('#offcanvasEditAccompagnement');
      editOffcanvas.show();
    }
    
    onEditSubmit(): void {
      this.accompagnementService.updateAccompagnement(this.editAccompagnement).subscribe({
        next: () => {
          this.loadAccompagnements();
          alert("Accompagnement mis à jour avec succès !");
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour", err);
          alert("Erreur lors de la modification");
        }
      });
    }
    
  
    onSubmit(): void {
      if (!this.newAccompagnement.etudiant || !this.newAccompagnement.sujet) return;
  
      this.accompagnementService.createAccompagnement(this.newAccompagnement).subscribe({
        next: () => {
          this.loadAccompagnements();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'accompagnement', err);
        }
      });
    }
  
 
    openDetails(accompagnement: AccompagnementPFE): void {
      this.selectedAccompagnement = accompagnement;
      // Vérification et envoi des données via la navigation
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
            console.log('Accompagnement supprimé');
            alert('Accompagnement supprimé avec succès');
            this.loadAccompagnements();
          },
          error: (err) => {
            console.error('Erreur lors de la suppression de l\'accompagnement', err);
            alert('Erreur lors de la suppression de l\'accompagnement');
          }
        });
      }
    }
  }