export type Role = 'ETUDIANT'| 'CONSULTANT'| 'ENCADRANT'| 'ADMIN';  // Enum des rôles

export interface User {
  idUser: string;
  nom: string;
  prenom: string;
  adresse: string;
  email: string;
  telephone: string;
  password: string;
  roles: Role[];  // Liste de rôles
}

export interface SignUpRequest {
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    telephone: string;
    password: string;
    role: Role[]; 
}


export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}