// src/types.ts

export interface Cours {
    id: string;
    title: string;
    description: string;
    image: string;
    slug: string;
    link: string;
    content: JSON;
    icon: string;
  }

  export interface Concept {
    id: string;          // L'identifiant du concept
    title: string;       // Le titre du concept
    description: string; // La description du concept
    image: string;       // L'URL de l'image associée au concept
}

export interface Diplome {
    id: number;
    title: string;
    description: string;
    image: string;
}

export interface Ecole {
    id: number;
    name: string;
    description: string;
    diplome_id: number;
    image: string;
    parcours:string[];
    ville:string;
    lieu:string;
    link:string;
    type:string;
    diplome_requis: number;
    prix: number;

}

export interface Question {
    id: number;
    quiz_id: number;
    question: string;
    options: string[];
    answer: string;
    image: string;
  }
  
  export interface Quiz {
    id: number;
    title: string;
    description: string;
    image: string;
    questions: Question[];
  }
  