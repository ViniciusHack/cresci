import { motiveIds, paths, questions, traitLabels, type Path } from "./quiz-data";

export type Answers = Record<string, string[] | number>;

export type Synthesis = {
  weights: Record<string, number>;
  traits: string[];
  peopleValue: number;
  motives: { id: string; label: string; active: boolean }[];
  environments: string[];
  topPaths: (Path & { score: number })[];
  tension: string | null;
};

function addWeight(map: Record<string, number>, tag: string, amount: number) {
  map[tag] = (map[tag] ?? 0) + amount;
}

export function synthesize(answers: Answers): Synthesis {
  const weights: Record<string, number> = {};

  for (const question of questions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;

    if (question.kind === "scale") {
      const value = typeof answer === "number" ? answer : 50;
      const right = (value - 50) / 50;
      if (right >= 0) {
        for (const tag of question.rightTags) addWeight(weights, tag, 1 + right * 1.5);
        if (right < 0.3) for (const tag of question.leftTags) addWeight(weights, tag, 0.6);
      } else {
        for (const tag of question.leftTags) addWeight(weights, tag, 1 + -right * 1.5);
        if (-right < 0.3) for (const tag of question.rightTags) addWeight(weights, tag, 0.6);
      }
      continue;
    }

    const selected = Array.isArray(answer) ? answer : [];
    for (const optionId of selected) {
      const option = question.options.find((o) => o.id === optionId);
      if (!option) continue;
      const weight = question.kind === "single" ? 1.6 : 1.2;
      for (const tag of option.tags) addWeight(weights, tag, weight);
      addWeight(weights, option.id, weight * 0.4);
    }
  }

  const scored = paths
    .map((path) => {
      const score = path.tags.reduce((total, tag) => total + (weights[tag] ?? 0), 0) / path.tags.length;
      return { ...path, score };
    })
    .sort((a, b) => b.score - a.score);

  const topPaths = scored.slice(0, 4);

  const traits = Object.entries(weights)
    .filter(([tag]) => traitLabels[tag])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag]) => traitLabels[tag]!);

  const peopleRaw = answers["pessoas_contato"];
  const peopleValue = typeof peopleRaw === "number" ? peopleRaw : 50;

  const environmentQuestion = questions.find((question) => question.id === "ambientes");
  const chosenEnvironments = Array.isArray(answers["ambientes"]) ? answers["ambientes"] : [];
  const environments =
    environmentQuestion && environmentQuestion.kind !== "scale"
      ? chosenEnvironments
          .map((id) => environmentQuestion.options.find((option) => option.id === id)?.label)
          .filter((label): label is string => Boolean(label))
      : [];

  const motiveAnswer = answers["motivos"];
  const chosenMotives = Array.isArray(motiveAnswer) ? motiveAnswer : [];
  const motives = motiveIds.map((id) => ({
    id,
    label: traitLabels[id] ?? id,
    active: chosenMotives.includes(id),
  }));

  let tension: string | null = null;
  const dores = Array.isArray(answers["dores"]) ? (answers["dores"] as string[]) : [];
  const papel = Array.isArray(answers["papel"]) ? (answers["papel"] as string[])[0] : undefined;

  if ((weights["autonomia"] ?? 0) > 2 && !dores.includes("incerteza")) {
    tension =
      "Várias respostas pedem autonomia, mas a renda incerta não entrou como uma dor aceitável. Vale procurar formatos de liberdade com base estável: um cargo com espaço real, ou uma prática própria com clientes recorrentes.";
  } else if ((weights["profundidade"] ?? 0) > 2 && (weights["variedade"] ?? 0) > 2) {
    tension =
      "Há uma tração entre querer aprofundar e querer variar. Uma saída comum é ter um eixo profundo e uma órbita de projetos curtos ao redor dele.";
  } else if (papel === "meio" && (weights["identidade"] ?? 0) > 0) {
    tension =
      "Você quer que o trabalho seja apenas meio de vida, mas várias respostas apontam identidade forte no fazer. Talvez o ofício precise existir fora do emprego.";
  } else if ((weights["pessoas_alta"] ?? 0) > 2 && dores.includes("solidao")) {
    tension =
      "Você quer gente por perto e ao mesmo tempo aceita bem a solidão de trabalho. Papéis híbridos — pesquisar sozinho, apresentar em público — costumam encaixar bem nesse par.";
  }

  return {
    weights,
    traits,
    peopleValue,
    motives,
    environments,
    topPaths,
    tension,
  };
}
