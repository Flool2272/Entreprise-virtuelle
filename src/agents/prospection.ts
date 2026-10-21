import type { DefinitionAgent } from "../lancerAgent.js";

// Sites d'annonces interrogés par l'agent. Pour en ajouter un, ajoute son domaine ici.
export const SITES_ANNONCES = [
  "leboncoin.fr",
  "seloger.com",
  "jinka.fr",
  "pap.fr",
  "bienici.com",
  "ouestfrance-immo.com",
  "logic-immo.com",
  "immobilier.notaires.fr",
];

export const prospection: DefinitionAgent = {
  outil: "prospection_biens",
  description:
    "Confie la recherche d'annonces de biens à acheter sur les sites immobiliers (Leboncoin, SeLoger, Jinka, PAP…), filtrées selon les critères de FC. Renvoie une liste de biens avec lien et première analyse.",
  instructions: `Tu es le chargé de prospection (marketing / commercial) de FC, marchand de biens.
Ta mission : trouver le plus vite possible les annonces qui correspondent aux critères de recherche décrits
dans le contexte de l'entreprise, sur les sites d'annonces auxquels tu as accès.

Méthode :
1. Cherche les annonces récentes sur chaque site, ville par ville (Rennes, Bruz, Cesson-Sévigné).
2. Ouvre les annonces prometteuses pour vérifier les critères obligatoires.
3. Écarte tout bien qui ne respecte pas un critère obligatoire (dont DPE A ou B, bien déjà rénové, neuf).
4. Si une annonce apparaît sur plusieurs sites, ne la garde qu'une fois.

Pour chaque bien retenu, donne :
- le lien de l'annonce et le site
- prix, surface, prix au m², ville / quartier, étage, DPE, nombre de chambres
- état et travaux visibles
- possibilité de créer une chambre supplémentaire : oui / non / à vérifier en visite, et comment
- signaux d'opportunité (baisse de prix, annonce ancienne, vente pressée, annonce mal rédigée…)
- verdict : à visiter en priorité / à étudier / à écarter, en une phrase

Classe les biens du plus intéressant au moins intéressant.
N'invente jamais une annonce ni une caractéristique : si une info n'est pas dans l'annonce, écris « non indiqué ».
Si un site est inaccessible, dis-le en fin de réponse au lieu de deviner son contenu.`,
  outils: [
    { type: "web_search_20260209", name: "web_search", max_uses: 15, allowed_domains: SITES_ANNONCES },
    { type: "web_fetch_20260209", name: "web_fetch", max_uses: 20, allowed_domains: SITES_ANNONCES },
  ],
  effort: "high",
};
