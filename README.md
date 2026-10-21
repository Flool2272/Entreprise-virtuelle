# Entreprise virtuelle

Projet d'entraînement à la création d'agents IA : une entreprise fictive dirigée par un
agent **orchestrateur** (le directeur) qui délègue le travail à 4 agents spécialisés.

```
                 Recherche marketing        Création posts réseaux sociaux
                              \                  /
                               ── Orchestrateur ──
                              /                  \
                 Analyse des données         Création de présentations
```

## Démarrer

```bash
npm install
cp .env.example .env   # puis renseigner ANTHROPIC_API_KEY
npm start -- "Prépare le lancement de notre nouvelle gourde réutilisable : étude du marché, 3 posts LinkedIn et une présentation"
```

## Comment ça marche

- `src/lancerAgent.ts`: fait tourner n'importe quel agent (boucle appel du modèle → outils → réponse).
- `src/orchestrateur.ts`: le directeur. Chaque agent de l'équipe devient un **outil** :
  appeler l'outil revient à déléguer une tâche à cet agent.
- `src/agents/`: un fichier par agent (nom de l'outil, description, instructions, outils propres).
  - `rechercheMarketing.ts` : utilise la recherche web
  - `postsReseauxSociaux.ts`
  - `analyseDonnees.ts`
  - `presentations.ts`

## Recruter un nouvel agent

1. Crée `src/agents/monAgent.ts` sur le modèle des autres.
2. Ajoute-le dans la liste `equipe` de `src/orchestrateur.ts`.
