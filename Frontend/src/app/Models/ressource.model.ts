
export interface Ressource {
  idRessource?: string;
  titre: string;
  description: string;
  type: TypeRessource;
  date: Date;
  category: CategoryRessource;
  fileName?:string
}

export enum TypeRessource {
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  OUTIL = 'OUTIL'
}

export enum CategoryRessource {
  DATABASE = 'DATABASE',
  PROGRAMMING = 'PROGRAMMING',
  DESIGN = 'DESIGN',
  NETWORKING = 'NETWORKING',
  SECURITY = 'SECURITY',
  OTHER = 'OTHER'
}
