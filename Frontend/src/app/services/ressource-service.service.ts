import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ressource } from '../Models/ressource.model';


@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private apiUrl = 'http://localhost:8082/api/ressources';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.apiUrl);
  }

  getById(id: string): Observable<Ressource> {
    return this.http.get<Ressource>(`${this.apiUrl}/${id}`);
  }

  create(res: Ressource): Observable<Ressource> {
    return this.http.post<Ressource>(this.apiUrl, res);
  }

  update(id: string, res: Ressource): Observable<Ressource> {
    return this.http.put<Ressource>(`${this.apiUrl}/${id}`, res);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getResume(fileName: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resume/${fileName}`);
  }

  searchRessources(searchTerm: string, type: string | null, category: string | null): Observable<Ressource[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    if (type) {
      params = params.set('type', type);
    }
    if (category) {
      params = params.set('category', category);
    }
    
    // Utilise 'this.apiUrl' au lieu de 'this.baseUrl'
    return this.http.get<Ressource[]>(`${this.apiUrl}/search`, { params });
  }
 
  search(keyword?: string, type?: string): Observable<Ressource[]> {
    let params = new HttpParams();
    if (keyword) params = params.append('keyword', keyword);
    if (type) params = params.append('type', type);
    
    return this.http.get<Ressource[]>(`${this.apiUrl}/search`, { params });
  }

  sortRessources(sortBy: string = 'titre', direction: string = 'asc'): Observable<Ressource[]> {
    const params = new HttpParams()
      .set('sortBy', sortBy)
      .set('direction', direction);
    
    return this.http.get<Ressource[]>(`${this.apiUrl}/sort`, { params });
  }

}
