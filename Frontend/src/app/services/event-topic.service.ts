import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventTopic} from '../../app/Models/eventTopic.model';
 
@Injectable({
  providedIn: 'root',
})
export class EventTopicService {
  private apiUrl = 'http://localhost:8082/api/events-topics';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EventTopic[]> {
    return this.http.get<EventTopic[]>(this.apiUrl);
  }

  getById(id: string): Observable<EventTopic> {
    return this.http.get<EventTopic>(`${this.apiUrl}/${id}`);
  }

  create(eventTopic: any): Observable<EventTopic> {
    return this.http.post<EventTopic>(this.apiUrl, eventTopic);
  }

  update(id: string, eventTopic: EventTopic): Observable<EventTopic> {
    return this.http.put<EventTopic>(`${this.apiUrl}/${id}`, eventTopic);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
