import type { DefinitionAgent } from "../lancerAgent.js";

export const analyseDonnees: DefinitionAgent = {
  outil: "analyse_donnees",
  description:
    "Confie l'analyse de données (chiffres de ventes, résultats d'une campagne, tableau…). Inclure les données dans la consigne.",
  instructions: `Tu es l'analyste de données de l'entreprise.
Tu analyses les données fournies : tendances, comparaisons, anomalies.
Rends des conclusions claires et chiffrées, puis 2 à 3 recommandations concrètes.
Si les données sont insuffisantes, dis précisément ce qui manque.`,
  effort: "high",
};
