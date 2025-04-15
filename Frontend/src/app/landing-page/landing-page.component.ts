import { Component,OnInit  } from '@angular/core';
import { Formation, CategoryResource } from '../Models/formation.model'
import { FormationService } from '../services/formation.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  formations: Formation[] = [];
  categories = Object.values(CategoryResource);
  userId: number = 1;

  constructor(private formationService: FormationService,
    
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formationService.getAllFormations().subscribe(data => {
      this.formations = data;
    });
  }
 
  goToCart(): void {
    this.router.navigate(['/panier']);
  }

  filteredFormations(cat: string): Formation[] {
    return this.formations.filter(f => f.categorie === cat);
  }
  buyFormation(formation: Formation): void {
    // You can later integrate payment gateway or modal
    console.log('Buying formation:', formation.titreFormation);
    alert(`Formation "${formation.titreFormation}" added to cart!`);
  }

 
 
 
}

