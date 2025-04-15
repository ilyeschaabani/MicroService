export interface Formation {
    idFormation: string;
    image: string;
    titreFormation: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    categorie: CategoryResource; // Define this enum if needed
    rating: number;
    prix: number;
  }
  
  // Optional: If using CategoryResource as enum
  export enum CategoryResource {
    PROGRAMMING = 'PROGRAMMING',
    DATABASE = 'DATABASE',
    DESIGN = 'DESIGN',
    NETWORKING = 'NETWORKING',
    SECURITY = 'SECURITY',
    OTHER ='OTHER'


  }