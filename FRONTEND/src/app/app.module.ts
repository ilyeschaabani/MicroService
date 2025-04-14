import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Importer HttpClientModule
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { AccompagnementListComponent } from './components/accompagnement-list/accompagnement-list.component';
import { AccompagnementTableComponent } from './components/accompagnement-table/accompagnement-table.component';
import { AccompagnementPfeDetailsComponent } from './components/accompagnement-pfe-details/accompagnement-pfe-details.component';
import { AccompagnementEncadrantComponent } from './components/accompagnement-encadrant/accompagnement-encadrant.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';

@NgModule({
  declarations: [
    
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AccompagnementListComponent,
    AccompagnementTableComponent,
    AccompagnementPfeDetailsComponent,
    AccompagnementEncadrantComponent,
    FileManagerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
