import { MentalPainFormState } from "@/types/triagem";

export const QUESTIONS_CONFIG = [
  {
    key: "comoEstaSentindo" as keyof MentalPainFormState,
    question: "Como você está se sentindo hoje?",
    options: [
      {
        label: "Ansioso(a)",
        value: "ansioso",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/3081/3081383.png" },
      },
      {
        label: "Estressado(a)",
        value: "estressado",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2151/2151795.png" },
      },
      {
        label: "Com dificuldade para dormir",
        value: "dificuldadeDormir",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png" },
      },
      {
        label: "Triste ou desanimado(a)",
        value: "triste",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2877/2877300.png" },
      },
      {
        label: "Irritado(a)",
        value: "irritado",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2877/2877300.png" },
      },
      {
        label: "Quero manter meu bem-estar",
        value: "manterBemEstar",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/4320/4320337.png" },
      },
    ],
  },
  {
    key: "frequenciaSentimento" as keyof MentalPainFormState,
    question: "Com que frequência você sente isso?",
    options: [
      {
        label: "Todos os dias",
        value: "todosDias",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2693/2693507.png" },
      },
      {
        label: "3 a 5 vezes por semana",
        value: "3a5Semana",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2693/2693642.png" },
      },
      {
        label: "1 a 2 vezes por semana",
        value: "1a2Semana",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2693/2693646.png" },
      },
      {
        label: "Raramente",
        value: "raramente",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2693/2693636.png" },
      },
    ],
  },
  {
    key: "dificuldadeFrequente" as keyof MentalPainFormState,
    question: "Qual destas dificuldades você enfrenta com mais frequência?",
    options: [
      {
        label: "Pensamentos acelerados",
        value: "pensamentosAcelerados",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2645/2645233.png" },
      },
      {
        label: "Preocupações excessivas",
        value: "preocupacoesExcessivas",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/471/471664.png" },
      },
      {
        label: "Dificuldade para relaxar",
        value: "dificuldadeRelaxar",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2548/2548531.png" },
      },
      {
        label: "Insônia ou sono leve",
        value: "insonia",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png" },
      },
      {
        label: "Oscilações de humor",
        value: "oscilacoesHumor",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2877/2877300.png" },
      },
      {
        label: "Sensação de esgotamento emocional",
        value: "esgotamentoEmocional",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/3997/3997872.png" },
      },
    ],
  },
  {
    key: "impactoRotina" as keyof MentalPainFormState,
    question: "Como isso impacta sua rotina diária?",
    options: [
      {
        label: "Dificulta minha concentração",
        value: "dificultaConcentracao",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2645/2645233.png" },
      },
      {
        label: "Me sinto sem energia para trabalhar",
        value: "semEnergia",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/3281/3281289.png" },
      },
      {
        label: "Afeta meus relacionamentos",
        value: "afetaRelacionamentos",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/4543/4543344.png" },
      },
      {
        label: "Prejudica meu sono",
        value: "prejudicaSono",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png" },
      },
      {
        label: "Afeta minha saúde física",
        value: "afetaSaudeFisica",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2936/2936886.png" },
      },
      {
        label: "Não impacta, mas quero melhorar",
        value: "naoImpacta",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/1682/1682443.png" },
      },
    ],
  },
  {
    key: "buscouAjuda" as keyof MentalPainFormState,
    question: "Você já buscou ajuda anteriormente?",
    options: [
      {
        label: "Sim, faço terapia regularmente",
        value: "terapiaRegular",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/4320/4320337.png" },
      },
      {
        label: "Sim, já fiz terapia ou tomei medicação",
        value: "terapiaOuMedicacao",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/3209/3209074.png" },
      },
      {
        label: "Não, nunca busquei ajuda",
        value: "nuncaBuscouAjuda",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/471/471664.png" },
      },
    ],
  },
  {
    key: "objetivoAlivio" as keyof MentalPainFormState,
    question: "O que você gostaria de alcançar com o Alívio.com?",
    options: [
      {
        label: "Reduzir ansiedade ou estresse",
        value: "reduzirAnsiedade",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/3081/3081383.png" },
      },
      {
        label: "Dormir melhor",
        value: "dormirMelhor",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png" },
      },
      {
        label: "Controlar meus pensamentos",
        value: "controlarPensamentos",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/2645/2645233.png" },
      },
      {
        label: "Melhorar meu bem-estar emocional",
        value: "melhorarBemEstar",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/4320/4320337.png" },
      },
      {
        label: "Criar uma rotina mental saudável",
        value: "criarRotina",
        imageSource: { uri: "https://cdn-icons-png.flaticon.com/128/4543/4543344.png" },
      },
    ],
  },
];
