import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../Models/comment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8082/api/comments';  // Replace with your API URL

  constructor(private http: HttpClient) {}
  getCommentByTopic(topicId:string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/byTopicId/${topicId}`);
  }
  createComment(data:any):any{
    return this.http.post(`${this.apiUrl}`,data);

  }
}
