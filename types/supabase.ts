export type User = {
  id: string;
  email: string;
  name: string;
  cpf?: string;
  empresa?: string;
  created_at: string;
};

export type Triagem = {
  id: string;
  user_id: string;
  type: 'pain' | 'mental';
  created_at: string;
  status: 'in_progress' | 'completed';
  location?: string;
  progress?: {
    completed: number;
    total: number;
  };
};

export type PainSymptoms = {
  id: string;
  triagem_id: string;
  dor_com_mais_freq: string;
  dor_aparece_em_qual_situacao: string;
  tipo_de_dor: string;
  quando_dor_comecou: string;
  nivel_de_dor: string;
  como_afeta_minha_vida: string;
  o_que_gostaria_de_alcancar_com_alivio: string;
  created_at: string;
};

export type MentalHealthSymptoms = {
  id: string;
  triagem_id: string;
  como_esta_sentindo: string;
  frequencia_sentimento: string;
  dificuldade_frequente: string;
  impacto_rotina: string;
  buscou_ajuda: string;
  objetivo_alivio: string;
  created_at: string;
};

export type Exercise = {
  id: string;
  name: string;
  video_url?: string;
  steps?: string[];
  duration?: number;
  group_id: string;
  created_at: string;
};

export type UserExercise = {
  id: string;
  user_id: string;
  exercise_id: string;
  triagem_id?: string;
  completed: boolean;
  feedback?: string;
  completed_at?: string;
  created_at: string;
};
