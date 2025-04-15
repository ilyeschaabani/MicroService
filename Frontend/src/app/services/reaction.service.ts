import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reaction } from '../Models/reaction.model';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private http: HttpClient) { }
  private url="http://localhost:8082/api/reactions";
  addReaction(reaction: any) {
    return this.http.post<Reaction>(`${this.url}/add`, reaction);
  }
}
