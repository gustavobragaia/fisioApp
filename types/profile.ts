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
  gender: string;
  age: string;
  branch_of_empresa: string;
}
