import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccompagnementService, AccompagnementPFE } from 'src/app/services/accompagnement.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-accompagnement-list',
  templateUrl: './accompagnement-list.component.html',
  styleUrls: ['./accompagnement-list.component.css']
})
export class AccompagnementListComponent {
  accompagnement: AccompagnementPFE = {
    etudiant: '',
    sujet: '',
    specialite: '',
    competences: '',
    niveau: ''
  };

  responseMessage: string = '';
  assignedEncadrant: string = '';

  constructor(
    private accompagnementService: AccompagnementService,
    private router: Router
  ) {}

  submitForm() {
    this.accompagnementService.createAccompagnement(this.accompagnement).subscribe({
      next: (response) => {
        this.responseMessage = response.message;
        this.assignedEncadrant = response.data.encadrant;

        // Affichage de la modal après réception du résultat
        const modalElement = document.getElementById('responseModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (err) => {
        this.responseMessage = 'Erreur lors de la soumission.';
        console.error(err);

        // Affichage de l’erreur dans la même modal
        const modalElement = document.getElementById('responseModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      }
    });
  }

  // Méthode appelée lors du clic sur le bouton "Fermer" de la modal
  closeModalAndRedirect() {
    const modalElement = document.getElementById('responseModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }

    // Redirection vers la page de liste des accompagnements
    this.router.navigate(['/accompagnements']);
  }
}
