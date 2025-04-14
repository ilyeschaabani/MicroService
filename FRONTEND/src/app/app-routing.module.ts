import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AccompagnementListComponent } from './components/accompagnement-list/accompagnement-list.component';
import { AccompagnementTableComponent } from './components/accompagnement-table/accompagnement-table.component';
import { AccompagnementPfeDetailsComponent } from './components/accompagnement-pfe-details/accompagnement-pfe-details.component';
const routes: Routes = [
  {path: '', component:HomeComponent}, // Route pour les détails du projet
  {path: 'navbar', component: NavbarComponent},
  {path: 'footer', component: FooterComponent},
  { path: 'accompagnement', component: AccompagnementListComponent },
  { path: 'accompagnements', component: AccompagnementTableComponent },
  { path: 'accompagnement-details', component: AccompagnementPfeDetailsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
