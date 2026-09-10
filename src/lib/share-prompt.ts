import { questions } from "./quiz-data";
import type { Answers, Synthesis } from "./synthesis";

function formatAnswer(answers: Answers, questionId: string): string {
  const question = questions.find((item) => item.id === questionId);
  const answer = answers[questionId];
  if (!question || answer === undefined) return "—";

  if (question.kind === "scale") {
    const value = typeof answer === "number" ? answer : 50;
    return `${question.leftLabel} ← ${value} → ${question.rightLabel}`;
  }

  const selected = Array.isArray(answer) ? answer : [];
  const labels = selected
    .map((id) => question.options.find((option) => option.id === id)?.label)
    .filter((label): label is string => Boolean(label));
  return labels.length > 0 ? labels.join(", ") : "—";
}

export function buildSharePrompt(answers: Answers, synthesis: Synthesis): string {
  const responseLines = questions.map((question) => {
    return `- ${question.title}\n  ${formatAnswer(answers, question.id)}`;
  });

  const paths = synthesis.topPaths
    .map((path, index) => {
      return `${index + 1}. ${path.title} (${path.combination})\n   Campos: ${path.fields.join(", ")}\n   ${path.description}`;
    })
    .join("\n");

  const motives = synthesis.motives
    .filter((motive) => motive.active)
    .map((motive) => motive.label)
    .join(", ");

  const patternLines = [
    `- Ambientes: ${synthesis.environments.join(", ") || "não marcados"}`,
    `- Traços: ${synthesis.traits.join(", ") || "não destacados"}`,
    `- Contato humano no dia a dia: ${synthesis.peopleValue}/100 (0 = trabalho quieto, 100 = pessoas o tempo todo)`,
    `- Motivos primários: ${motives || "não marcados"}`,
  ];
  if (synthesis.tension) patternLines.push(`- Tensão observada: ${synthesis.tension}`);

  return `Você é um conselheiro de vocação e trajetória profissional. Vou colar o resultado de um exercício de reflexão chamado "O que eu quero ser quando crescer".

Não quero um veredito do tipo "você deve ser X". Quero um relatório com hipóteses de trabalho, estudo e formato de vida — inclusive combinações entre áreas.

## Minhas respostas
${responseLines.join("\n")}

## Padrões que o exercício identificou
${patternLines.join("\n")}

## Caminhos que o exercício sugeriu
${paths}

## O que eu quero de você
Escreva em português um relatório claro, concreto e sem bajulação, com:

1. Uma leitura dos padrões (o que parece estável, o que parece tensão).
2. 4 a 6 hipóteses de trabalho ou estudo — cargos, ofícios, projetos ou combinações — com uma frase dizendo por que cada uma encaixa.
3. O que eu provavelmente deveria evitar, e por quê.
4. Três experimentos práticos para as próximas quatro semanas (conversas, testes, peças de portfólio, rotinas).
5. Três perguntas que eu ainda deveria me fazer antes de escolher um caminho.

Trate vocação como mapa, não como sentença.`;
}
