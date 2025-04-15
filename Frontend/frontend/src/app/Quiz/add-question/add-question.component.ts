import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../services copy/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  idEvaluation: string | undefined;
  qTitle: string | undefined;
  question = {
    quiz: {
      idEvaluation: ''
    },
    contenu: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    content: '', // Add the missing content property
    texte: '',
    type: '',
    reponses: [],
    options: [],
    _id: '' // Add a default value for _id
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.idEvaluation = this._route.snapshot.params['idEvaluation'];
    this.qTitle = this._route.snapshot.params['titre'];
    this.question.quiz.idEvaluation = this.idEvaluation || '';
  }

  formSubmit() {
    // Validation
    if (!this.question.contenu.trim() || !this.question.option1.trim() || 
        !this.question.option2.trim() || !this.question.answer.trim()) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    this._question.addQuestion(this.question).subscribe({
      next: (data: any) => {
        Swal.fire('Succès', 'Question ajoutée avec succès', 'success')
          .then(() => {
            this.navigateToEvaluationList();
          });
      },
      error: (error) => {
        Swal.fire('Erreur', "Échec de l'ajout de la question", 'error');
      }
    });
  }

  navigateToEvaluationList() {
    this._router.navigate(['/view-questions']);
  }
}