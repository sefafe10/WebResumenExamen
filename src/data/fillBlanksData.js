// Fill‑in‑the‑blank data for the study app
// Each entry includes the topic id (1‑4 or "all"), a sentence with a blank, a set of options, and the correct answer.
export const fillBlanksData = [
  // Tema 1 – Introducción y Piel
  {
    topic: 1,
    sentence: "La epidermis está compuesta principalmente por células llamadas ________.",
    options: ["queratinocitos", "fibroblastos", "colágenos", "melanocitos"],
    answer: "queratinocitos"
  },
  {
    topic: 1,
    sentence: "El tejido que protege la piel del daño mecánico se llama ________.",
    options: ["dermis", "hipodermis", "epidermis", "corteza"],
    answer: "dermis"
  },
  // Tema 2 – Obtención y Curtición
  {
    topic: 2,
    sentence: "En la curtición vegetativa se utiliza tanino extraído de la ________.",
    options: ["corteza de roble", "hojas de eucalipto", "raíz de ginseng", "frutos de manzana"],
    answer: "corteza de roble"
  },
  {
    topic: 2,
    sentence: "El proceso de descortezado deja la piel con una superficie ________.",
    options: ["lisa", "áspera", "porosa", "glanzosa"],
    answer: "lisa"
  },
  // Tema 3 – Secciones y Tipos
  {
    topic: 3,
    sentence: "El tipo de piel llamado ""napa"" se caracteriza por su gran suavidad y fineza.",
    options: ["cuerda", "suerte", "napa", "tela"],
    answer: "napa"
  },
  {
    topic: 3,
    sentence: "La zona del cuero que tiene mayor resistencia a la tracción se llama ________.",
    options: ["corteza", "fibra", "grano", "costura"],
    answer: "grano"
  },
  // Tema 4 – Confección y Acabados
  {
    topic: 4,
    sentence: "La aguja de punta ""perla"" es ideal para coser piezas finas de piel.",
    options: ["diamante", "perla", "cuadrada", "puntilla"],
    answer: "perla"
  },
  {
    topic: 4,
    sentence: "Durante el proceso de moldeo se utilizan troqueles con una temperatura de aproximadamente ________°C.",
    options: ["80", "110", "150", "200"],
    answer: "110"
  },
  // Mezcla de todos los temas
  {
    topic: "all",
    sentence: "En la fase final de la confección, la pieza se somete a un proceso de ________ para eliminar impurezas.",
    options: ["lavado", "pulido", "templado", "curtido"],
    answer: "pulido"
  },
  {
    topic: "all",
    sentence: "El acabado conocido como ""grabado"" permite crear patrones en relieve sobre la piel.",
    options: ["encorte", "grabado", "punteado", "texturizado"],
    answer: "grabado"
  }
];
