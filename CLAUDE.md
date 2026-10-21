# CLAUDE.md

Instructions pour Claude Code quand il travaille sur ce dépôt.

## Le projet

Outil personnel de FC, marchand de biens à Rennes, Bruz et Cesson-Sévigné. C'est une « entreprise virtuelle » :
un agent **orchestrateur** (le directeur) reçoit une demande et la délègue à des agents spécialisés.
Le métier, les critères de recherche et les règles sont décrits dans `CONTEXTE.md` : c'est la référence,
à lire avant toute modification d'un agent.

## Commandes

```bash
npm install
npm start -- "ta demande"   # lance l'orchestrateur (nécessite ANTHROPIC_API_KEY dans .env)
npm run typecheck           # à lancer avant chaque commit
```

## Structure

- `CONTEXTE.md` : contexte de l'entreprise, injecté dans le prompt système de **tous** les agents.
- `src/lancerAgent.ts` : fait tourner un agent (tool runner du SDK Anthropic, modèle `claude-opus-5-5`).
- `src/orchestrateur.ts` : le directeur ; chaque agent de la liste `equipe` devient un outil de délégation.
- `src/agents/` : un fichier par agent, qui exporte une `DefinitionAgent`.

## Les agents

| Fichier | Outil | Rôle |
|---|---|---|
| `prospection.ts` | `prospection_biens` | Marketing / commercial : interroge les sites d'annonces et remonte les biens qui respectent les critères |
| `rechercheMarketing.ts` | `recherche_marketing` | Veille du marché (prix au m², tendances, quartiers) |
| `postsReseauxSociaux.ts` | `creation_posts_reseaux_sociaux` | Posts de revente et de visibilité auprès des vendeurs |
| `analyseDonnees.ts` | `analyse_donnees` | Bilan d'opération, comparaison au marché, scénarios |
| `presentations.ts` | `creer_presentation` | Fiches opportunité, dossiers banque / investisseurs |

### Agent de prospection

Sites interrogés (liste `SITES_ANNONCES` dans `src/agents/prospection.ts`) :

| Site | Intérêt |
|---|---|
| leboncoin.fr | Très nombreuses annonces de particuliers, souvent les premières en ligne |
| seloger.com | Principal portail des annonces d'agences |
| jinka.fr | Agrégateur : regroupe les annonces de nombreux sites et propose des alertes |
| pap.fr | Particulier à particulier : pas d'agence, marge de négociation |
| bienici.com | Portail d'agences avec bonne cartographie |
| ouestfrance-immo.com | Portail régional, fort en Bretagne |
| logic-immo.com | Portail d'agences complémentaire |
| immobilier.notaires.fr | Ventes de notaires, dont successions et ventes aux enchères |

L'agent passe par les outils `web_search` et `web_fetch` de l'API Anthropic, limités à ces domaines. Il
n'a accès qu'aux pages publiques que ces outils parviennent à lire. Certains sites (Leboncoin, SeLoger)
protègent leurs pages contre la lecture automatique : les résultats peuvent être partiels.

## Règles pour faire évoluer le code

- Code, commentaires, prompts et messages en **français**, dans le style des fichiers existants.
- Nouvel agent : créer `src/agents/<nom>.ts` sur le modèle des autres, puis l'ajouter à `equipe`
  dans `src/orchestrateur.ts` et au tableau ci-dessus.
- Les critères de recherche se modifient dans `CONTEXTE.md`, jamais en dur dans un agent.
- Respecter les conditions d'utilisation des sites : pas de contournement des protections anti-robots,
  pas de connexion à un compte, pas de collecte massive. Pour un suivi en continu, préférer les alertes
  e-mail des sites ou un accès officiel (API, flux partenaire).
- Ne jamais committer `.env` ni une clé API.
