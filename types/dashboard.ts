export interface TriagemItem {
  id: string;
  date: string;
  type: string;
  location: string;
  progress: { completed: number; total: number };
  status: string;
  painLevel?: "Alta" | "Média" | "Baixa";
}

export type UserStats = {
  exercisesDone: number;
  triagemCount: number;
  consecutiveDays: number;
  lastTriagem?: string;
  name: string;
  id: string;
};
