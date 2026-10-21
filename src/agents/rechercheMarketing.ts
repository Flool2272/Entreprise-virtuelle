import type { DefinitionAgent } from "../lancerAgent.js";

export const rechercheMarketing: DefinitionAgent = {
  outil: "recherche_marketing",
  description:
    "Confie une recherche marketing : marché, concurrents, cibles, tendances. Renvoie une synthèse sourcée.",
  instructions: `Tu es le responsable de la recherche marketing de l'entreprise.
Tu cherches sur le web des informations récentes et fiables sur le marché, les concurrents et les clients.
Rends une synthèse courte et structurée (points clés, chiffres, opportunités) en citant tes sources.`,
  outils: [{ type: "web_search_20260209", name: "web_search", max_uses: 5 }],
};
