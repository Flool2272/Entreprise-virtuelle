import { readFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export const MODELE = "claude-opus-5-5";

// Le contexte de l'entreprise (CONTEXTE.md) est donné à chaque agent, avant ses propres instructions.
const CONTEXTE = readFileSync(new URL("../CONTEXTE.md", import.meta.url), "utf8");

type Outil = Parameters<typeof client.beta.messages.toolRunner>[0]["tools"][number];

export interface DefinitionAgent {
  /** Nom de l'outil que l'orchestrateur appelle pour déléguer à cet agent. */
  outil: string;
  /** Ce que l'orchestrateur lit pour décider quand faire appel à cet agent. */
  description: string;
  /** Le prompt système : le rôle et la façon de travailler de l'agent. */
  instructions: string;
  /** Outils dont l'agent dispose (recherche web, outils maison…). */
  outils?: Outil[];
  effort?: "low" | "medium" | "high" | "xhigh" | "max";
}

/**
 * Fait tourner un agent jusqu'à ce qu'il ait fini sa tâche, et renvoie sa réponse finale.
 * Le tool runner du SDK gère la boucle : appel du modèle → exécution des outils → on recommence.
 */
export async function lancerAgent(agent: DefinitionAgent, tache: string): Promise<string> {
  const runner = client.beta.messages.toolRunner({
    model: MODELE,
    max_tokens: 16000,
    system: `${CONTEXTE}\n\n---\n\n${agent.instructions}`,
    tools: agent.outils ?? [],
    output_config: { effort: agent.effort ?? "medium" },
    // Si le modèle refuse une demande, l'API la relance automatiquement sur un modèle de secours.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    messages: [{ role: "user", content: tache }],
  });

  for await (const message of runner) {
    // Les outils côté serveur (ex. recherche web) peuvent mettre le tour en pause : on le relance.
    if (message.stop_reason === "pause_turn") {
      runner.pushMessages({ role: "assistant", content: message.content });
    }
  }

  const final = await runner.done();
  if (final.stop_reason === "refusal") {
    return `[${agent.outil}] a refusé la tâche.`;
  }
  return final.content
    .filter((bloc) => bloc.type === "text")
    .map((bloc) => bloc.text)
    .join("\n");
}
