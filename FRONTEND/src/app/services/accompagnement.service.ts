import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accompagnement } from '../models/accompagnement.model';

@Injectable({
  providedIn: 'root'
})
export class AccompagnementService {
  private apiUrl = 'http://localhost:8082/api/accompagnement';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Accompagnement[]> {
    return this.http.get<Accompagnement[]>(`${this.apiUrl}/all`);
  }

  create(accompagnement: Accompagnement): Observable<Accompagnement> {
    return this.http.post<Accompagnement>(this.apiUrl, accompagnement);
  }

  update(id: number, accompagnement: Accompagnement): Observable<Accompagnement> {
    return this.http.put<Accompagnement>(`${this.apiUrl}/${id}`, accompagnement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchByEtudiant(name: string): Observable<Accompagnement[]> {
    return this.http.get<Accompagnement[]>(`${this.apiUrl}/etudiant/${name}`);
  }

  searchByAvancement(value: number): Observable<Accompagnement[]> {
    return this.http.get<Accompagnement[]>(`${this.apiUrl}/avancement/superieur/${value}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
