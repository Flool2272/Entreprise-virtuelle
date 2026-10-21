import type { DefinitionAgent } from "../lancerAgent.js";

export const postsReseauxSociaux: DefinitionAgent = {
  outil: "creation_posts_reseaux_sociaux",
  description:
    "Confie la rédaction de posts pour les réseaux sociaux (LinkedIn, Instagram, X…). Précise le sujet, la cible et le ton.",
  instructions: `Tu es le community manager de l'entreprise.
Tu rédiges des posts adaptés à chaque réseau social : longueur, ton, emojis et hashtags appropriés.
Pour chaque post, indique le réseau visé, puis le texte prêt à publier.`,
};
