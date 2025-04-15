
export interface Question {
type: any;
  quesId?: string;        // Correspond à @Id dans Java
  texte?: string;         // Champ texte optionnel
  contenu: string;        // Champ principal (annoté @Field("content") en Java)
  image?: string;         // Optionnel
  option1: string;        // Requis
  option2: string;        // Requis
  option3: string;        // Requis
  option4: string;        // Requis
  answer: string;         // Réponse correcte
  bonneReponse?: string;  // ID de la réponse correcte (optionnel)
  idEvaluation?: string;  // Optionnel

  
}