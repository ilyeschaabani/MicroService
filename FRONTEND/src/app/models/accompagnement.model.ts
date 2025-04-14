export interface Accompagnement {
    idAccompagnement?: number;
    etudiant: string;
    encadrant: string;
    sujet: string;
    avancement: number;
    sujetValide?: string; // Ajouter cette ligne
  }
  