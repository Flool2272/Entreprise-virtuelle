import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { lancerAgent, type DefinitionAgent } from "./lancerAgent.js";
import { rechercheMarketing } from "./agents/rechercheMarketing.js";
import { postsReseauxSociaux } from "./agents/postsReseauxSociaux.js";
import { analyseDonnees } from "./agents/analyseDonnees.js";
import { presentations } from "./agents/presentations.js";
import { prospection } from "./agents/prospection.js";

// Pour recruter un nouvel agent : crée son fichier dans src/agents/ et ajoute-le ici.
const equipe: DefinitionAgent[] = [
  prospection,
  rechercheMarketing,
  postsReseauxSociaux,
  analyseDonnees,
  presentations,
];

// Chaque agent devient un outil de l'orchestrateur : appeler l'outil = déléguer la tâche à l'agent.
const outilsDelegation = equipe.map((agent) =>
  betaZodTool({
    name: agent.outil,
    description: agent.description,
    inputSchema: z.object({
      consigne: z.string().describe("La tâche à confier à l'agent, avec tout le contexte dont il a besoin."),
    }),
    run: async ({ consigne }) => {
      console.log(`\n→ ${agent.outil} : ${consigne}`);
      const resultat = await lancerAgent(agent, consigne);
      console.log(`← ${agent.outil} a terminé.`);
      return resultat;
    },
  }),
);

export const orchestrateur: DefinitionAgent = {
  outil: "orchestrateur",
  description: "Le directeur de l'entreprise virtuelle.",
  instructions: `Tu es le directeur d'une entreprise virtuelle. Tu ne fais pas le travail toi-même :
tu découpes la demande en tâches et tu les confies aux membres de ton équipe via tes outils.
Donne à chaque agent une consigne complète (il ne voit pas la demande d'origine).
Tu peux enchaîner les agents, par exemple utiliser une recherche pour nourrir une présentation.
Quand tout est fait, rends une réponse finale qui rassemble le travail de l'équipe.`,
  outils: outilsDelegation,
  effort: "high",
};
