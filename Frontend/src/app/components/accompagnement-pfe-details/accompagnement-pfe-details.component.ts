import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccompagnementPFE } from 'src/app/services/accompagnement.service';

@Component({
  selector: 'app-accompagnement-pfe-details',
  templateUrl: './accompagnement-pfe-details.component.html',
  styleUrls: ['./accompagnement-pfe-details.component.css']
})
export class AccompagnementPfeDetailsComponent implements OnInit {
  selectedAccompagnement!: AccompagnementPFE;

  constructor(private router: Router) {
    // Récupérer les données de l'état de la navigation
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['data']) {
      this.selectedAccompagnement = navigation?.extras?.state?.['data'];
    } else {
      this.router.navigate(['/accompagnements']);
    }
  }

  ngOnInit(): void {
    // Si aucune donnée n'est disponible, rediriger vers la page d'accueil
    if (!this.selectedAccompagnement) {
      this.router.navigate(['/accompagnements']);
    }
  }

  goBack(): void {
    this.router.navigate(['/accompagnements']);
  }
}
