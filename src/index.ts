import "dotenv/config";
import { lancerAgent } from "./lancerAgent.js";
import { orchestrateur } from "./orchestrateur.js";

// Point d'entrée : la demande est passée en argument, ex. npm start -- "Prépare le lancement de notre appli"
const demande = process.argv.slice(2).join(" ");
if (!demande) {
  console.log('Usage : npm start -- "ta demande à l\'entreprise"');
  process.exit(1);
}

const reponse = await lancerAgent(orchestrateur, demande);
console.log(`\n=== Réponse du directeur ===\n\n${reponse}`);
