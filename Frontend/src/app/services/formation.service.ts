import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private baseUrl = 'http://localhost:8082/api/formations';

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getFormationById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }

  addFormation(formation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, formation);
  }

  updateFormation(id: string, formation: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, formation);
  }

  deleteFormation(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
