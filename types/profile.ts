export interface DiagnosticItem {
  id: string;
  date: string;
  title: string;
  painLevel?: number;
  status: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  cpf: string;
  empresa: string;
  work_sector: string;
}
