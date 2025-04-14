import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AccompagnementPFE {
  idAccompagnement?: number;
  etudiant: string;
  encadrant?: string;
  sujet: string;
  avancement?: number;
  specialite: string;
  competences: string;
  niveau: string;
  notificationEnvoyee?: boolean;
  sujetValide?: string; // Ajouter cette ligne

}

@Injectable({
  providedIn: 'root'
})
export class AccompagnementService {
  private apiUrl = 'http://localhost:9093/api/accompagnement';

  constructor(private http: HttpClient) {}

  // Create a new Accompagnement
  createAccompagnement(data: AccompagnementPFE): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Get all Accompagnements
  getAllAccompagnements(): Observable<AccompagnementPFE[]> {
    return this.http.get<AccompagnementPFE[]>(`${this.apiUrl}/all`);
  }

  // Get Accompagnement by ID
  getAccompagnementById(id: number): Observable<AccompagnementPFE> {
    return this.http.get<AccompagnementPFE>(`${this.apiUrl}/${id}`);
  }

  updateAccompagnement(accompagnement: AccompagnementPFE) {
    return this.http.put(`${this.apiUrl}/${accompagnement.idAccompagnement}`, accompagnement);
  }
  

  // Delete an Accompagnement by ID
  deleteAccompagnement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Search Accompagnements by student name
  getByEtudiant(name: string): Observable<AccompagnementPFE[]> {
    return this.http.get<AccompagnementPFE[]>(`${this.apiUrl}/etudiant/${name}`);
  }

  // Filter Accompagnements by advancement greater than a threshold
  getByAvancementGreater(value: number): Observable<AccompagnementPFE[]> {
    return this.http.get<AccompagnementPFE[]>(`${this.apiUrl}/avancement/superieur/${value}`);
  }

  // Count total Accompagnements
  countAccompagnements(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  // Export Accompagnements to CSV
  exportCSV(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/csv`, {
      responseType: 'blob'
    });
  }
  
  getDistinctValues(): Observable<{ specialites: string[], niveaux: string[] }> {
    return this.http.get<{ specialites: string[], niveaux: string[] }>(`${this.apiUrl}/metadata`);
  }
}
 