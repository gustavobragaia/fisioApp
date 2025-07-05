export type MentalPainFormState = {
  comoEstaSentindo: string;
  frequenciaSentimento: string;
  dificuldadeFrequente: string;
  impactoRotina: string;
  buscouAjuda: string;
  objetivoAlivio: string;
};

export type PhysicalPainFormState = {
  dorComMaisFreq: string;
  dorApareceEmQualSituacao: string;
  tipoDeDor: string;
  quandoDorComecou: string;
  nivelDeDor: string;
  comoAfetaMinhaVida: string;
  oQueGostariaDeAlcançarComAlivio: string;
};

export type QuestionOption = {
  label: string;
  value: string;
  imageSource: { uri: string };
};

export type Question = {
  question: string;
  state: string;
  setState: (value: string) => void;
  options: QuestionOption[];
};

export type FormTriagemRefType = {
  resetForm: () => void;
};
