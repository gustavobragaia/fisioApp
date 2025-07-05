import { PhysicalPainFormState } from "@/types/triagem";

export const PHYSICAL_PAIN_QUESTIONS_CONFIG = [
  {
    key: "dorComMaisFreq" as keyof PhysicalPainFormState,
    question: "Onde você sente dor com mais frequência?",
    options: [
      {
        label: "Pescoço",
        value: "pescoco",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3081/3081383.png",
        },
      },
      {
        label: "Ombros",
        value: "ombros",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2151/2151795.png",
        },
      },
      {
        label: "Coluna torácica",
        value: "colunaToracica",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2966/2966327.png",
        },
      },
      {
        label: "Lombar",
        value: "lombar",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/4856/4856522.png",
        },
      },
      {
        label: "Quadril",
        value: "quadril",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/6267/6267463.png",
        },
      },
      {
        label: "Joelhos",
        value: "joelhos",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2151/2151783.png",
        },
      },
      {
        label: "Tornozelos / Pés",
        value: "tornozelos",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2151/2151799.png",
        },
      },
      {
        label: "Cotovelos",
        value: "cotovelos",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2151/2151791.png",
        },
      },
      {
        label: "Punhos / Mãos",
        value: "punhos",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2151/2151797.png",
        },
      },
    ],
  },
  {
    key: "dorApareceEmQualSituacao" as keyof PhysicalPainFormState,
    question: "A dor aparece mais em qual situação?",
    options: [
      {
        label: "Quando fico sentado(a)",
        value: "quandoSentado",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2961/2961957.png",
        },
      },
      {
        label: "Ao caminhar",
        value: "aoCaminhar",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2548/2548437.png",
        },
      },
      {
        label: "Ao subir escadas",
        value: "aoSubirEscadas",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/6543/6543766.png",
        },
      },
      {
        label: "Ao carregar peso",
        value: "aoCarregarPeso",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2936/2936886.png",
        },
      },
      {
        label: "Durante o trabalho",
        value: "duranteTrabalho",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3281/3281289.png",
        },
      },
      {
        label: "Durante o sono",
        value: "duranteSono",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png",
        },
      },
      {
        label: "Após exercício físico",
        value: "aposExercicioFisico",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2548/2548531.png",
        },
      },
      {
        label: "Dor constante",
        value: "dorConstante",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3997/3997872.png",
        },
      },
    ],
  },
  {
    key: "tipoDeDor" as keyof PhysicalPainFormState,
    question: "Qual é o tipo da sua dor?",
    options: [
      {
        label: "Dor aguda, pontada forte",
        value: "dorAguda",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/5976/5976060.png",
        },
      },
      {
        label: "Dor latejante",
        value: "dorLatejante",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3209/3209074.png",
        },
      },
      {
        label: "Dor contínua e incômoda",
        value: "dorContinua",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3997/3997872.png",
        },
      },
      {
        label: "Dor queimação/formigamento",
        value: "dorQueimacao",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/785/785116.png",
        },
      },
      {
        label: "Dor que irradia",
        value: "dorIrradia",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/1682/1682443.png",
        },
      },
      {
        label: "Dor que piora com movimento",
        value: "dorPioraComMovimento",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2936/2936886.png",
        },
      },
      {
        label: "Não sei descrever",
        value: "naoSeiDescrever",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/471/471664.png",
        },
      },
    ],
  },
  {
    key: "quandoDorComecou" as keyof PhysicalPainFormState,
    question: "Quando essa dor começou?",
    options: [
      {
        label: "Hoje",
        value: "hoje",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2693/2693507.png",
        },
      },
      {
        label: "Há alguns dias",
        value: "algunsDias",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2693/2693642.png",
        },
      },
      {
        label: "Há semanas",
        value: "semanas",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2693/2693646.png",
        },
      },
      {
        label: "Há meses",
        value: "meses",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2693/2693636.png",
        },
      },
      {
        label: "Mais de 6 meses",
        value: "maisDe6Meses",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2693/2693637.png",
        },
      },
    ],
  },
  {
    key: "nivelDeDor" as keyof PhysicalPainFormState,
    question: "Como você classificaria sua dor hoje? (0 a 10)",
    options: [
      {
        label: "0-2",
        value: "nivel0a2",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/9841/9841608.png",
        },
      },
      {
        label: "3-5",
        value: "nivel3a5",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/9841/9841611.png",
        },
      },
      {
        label: "6-8",
        value: "nivel6a8",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/9841/9841614.png",
        },
      },
      {
        label: "9-10",
        value: "nivel9a10",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/9841/9841616.png",
        },
      },
    ],
  },
  {
    key: "comoAfetaMinhaVida" as keyof PhysicalPainFormState,
    question: "Como essa dor afeta sua vida?",
    options: [
      {
        label: "Dificulta trabalhar",
        value: "dificultaTrabalhar",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3281/3281289.png",
        },
      },
      {
        label: "Dificulta dormir bem",
        value: "dificultaDormirBem",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png",
        },
      },
      {
        label: "Me impede de me exercitar",
        value: "meImpedeDeMeExercitar",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2548/2548531.png",
        },
      },
      {
        label: "Me deixa irritado(a)",
        value: "meDeixaIrritado",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2877/2877300.png",
        },
      },
      {
        label: "Me afasta da rotina",
        value: "meAfastaDaRotina",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/4543/4543344.png",
        },
      },
      {
        label: "Me preocupa com algo mais sério",
        value: "mePreocupaComAlgoMaisSeri",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3997/3997872.png",
        },
      },
      {
        label: "Não afeta tanto, só quero prevenir",
        value: "naoAfetaTanto",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/1682/1682443.png",
        },
      },
    ],
  },
  {
    key: "oQueGostariaDeAlcançarComAlivio" as keyof PhysicalPainFormState,
    question: "O que você gostaria de alcançar com o Alívio.com?",
    options: [
      {
        label: "Aliviar a dor",
        value: "aliviarDor",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/4320/4320337.png",
        },
      },
      {
        label: "Melhorar minha postura",
        value: "melhorarPostura",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2966/2966327.png",
        },
      },
      {
        label: "Voltar a me exercitar",
        value: "voltarExercitar",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2548/2548531.png",
        },
      },
      {
        label: "Dormir melhor",
        value: "dormirMelhor",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png",
        },
      },
      {
        label: "Voltar à rotina normal",
        value: "voltarRotina",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/4543/4543344.png",
        },
      },
      {
        label: "Prevenir problemas futuros",
        value: "prevenirProblemas",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2942/2942499.png",
        },
      },
      {
        label: "Entender melhor minha dor",
        value: "entenderDor",
        imageSource: {
          uri: "https://cdn-icons-png.flaticon.com/128/2645/2645233.png",
        },
      },
    ],
  },
];
