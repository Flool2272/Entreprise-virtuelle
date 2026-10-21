# Entreprise virtuelle

Projet d'entraînement à la création d'agents IA : une entreprise fictive dont chaque
employé (PDG, RH, commercial, comptable…) est un agent.

## Démarrer

```bash
npm install
cp .env.example .env   # puis renseigner ANTHROPIC_API_KEY
npm start
```

## Structure

- `src/index.ts` — point d'entrée
- `src/agents/` — un fichier par agent / rôle
- `src/outils/` — outils (tools) que les agents peuvent appeler
