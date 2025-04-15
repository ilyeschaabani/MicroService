import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  apiKey = 'B529xnTiy0gSiIChvI0dgSjy3bLFKmQ4udpnUzKs'; // Votre clé API
  apiUrl = 'https://quizapi.io/api/v1/questions';

  // Variables pour le quiz
  public quizQuestions: any[] = []; // Liste des questions
  public selectedCategory: string = 'Linux'; // Sujet par défaut
  public selectedDifficulty: string = 'Easy'; // Difficulté par défaut
  public selectedAnswers: string[] = []; // Réponses sélectionnées
  public showResult: boolean = false; // Afficher les résultats
  public score: number = 0; // Score du quiz

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadQuiz(); // Charger un quiz par défaut au démarrage
  }

  // Charger le quiz en fonction des sélections
  loadQuiz(): void {
    const params = {
      limit: '5', // Nombre de questions
      category: this.selectedCategory, // Sujet sélectionné
      difficulty: this.selectedDifficulty, // Difficulté sélectionnée
    };

    this.http
      .get<any[]>(this.apiUrl, {
        headers: { 'X-Api-Key': this.apiKey },
        params,
      })
      .subscribe(
        (data) => {
          this.quizQuestions = data;
          this.selectedAnswers = new Array(data.length).fill(null); // Initialiser les réponses
          this.showResult = false; // Masquer les résultats précédents
        },
        (error) => {
          console.error('Erreur lors du chargement du quiz :', error);
        }
      );
  }

  // Obtenir les options de réponse pour une question
  getAnswerOptions(answers: any): string[] {
    return Object.values(answers).filter((answer) => answer !== null) as string[];
  }

  // Soumettre le quiz et calculer le score
  submitQuiz(): void {
    this.score = 0;
    this.quizQuestions.forEach((question, index) => {
      if (this.selectedAnswers[index] === question.correct_answer) {
        this.score++;
      }
    });
    this.showResult = true; // Afficher les résultats
  }
}