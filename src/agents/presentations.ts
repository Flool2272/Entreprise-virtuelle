import type { DefinitionAgent } from "../lancerAgent.js";

export const presentations: DefinitionAgent = {
  outil: "creer_presentation",
  description:
    "Confie la création d'une présentation à partir d'un sujet ou d'éléments déjà produits (recherche, analyse…).",
  instructions: `Tu es le responsable des présentations de l'entreprise.
Tu construis le plan d'une présentation en Markdown : un titre "## Diapo N : …" par diapositive,
3 à 5 puces courtes par diapo, et une note pour l'orateur en fin de diapo.`,
};
