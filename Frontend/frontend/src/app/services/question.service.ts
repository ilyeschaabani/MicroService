import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  private apiUrl = 'http://localhost:8095/questions'; // URL de votre backend

  constructor(private http: HttpClient) { }

  // Créer une nouvelle question
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/addquestion`, question);
  }

  // Lister toutes les questions
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/listquestion`);
  }

  // Mettre à jour une question
  updateQuestion(quesId: string, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${quesId}`, question);
  }

  // Obtenir les questions d'une évaluation
  getQuestionsByEvaluation(idEvaluation: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/by-evaluation/${idEvaluation}`).pipe(
      catchError(error => {
        if (error.status === 204) {
          return of([]); // Retourne tableau vide si pas de questions
        }
        throw error;
      })
    );
  }
  // Obtenir une question par son ID
  getQuestionById(quesId: string): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${quesId}`);
  }

  // Supprimer une question
  deleteQuestion(quesId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${quesId}`);
  }
}