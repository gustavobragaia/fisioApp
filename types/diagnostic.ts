export interface DiagnosticParams {
  type?: 'mental' | 'pain';
  triagemId?: string;
  apiResponse?: string;
}

export interface Exercise {
  nome: string;
  descricao: string;
  tipo: string;
  imageUrl?: string;
  exerciseCount?: number;
}

export interface ApiResponseData {
  output: {
    "Frase Motivacional": string;
    Diagnostico: string;
    Exercicios: Exercise[];
  };
}

export interface DetailedExercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  steps: string[];
  duration: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
}

export interface User {
  id: string;
  name: string;
  email: string;
}
