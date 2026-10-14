// Estudos de caso dos apps do ecossistema pessoal (sem link público para baixar).
// Os prints são de bancos de demonstração: nada de dado real.

export type CaseShot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  frame?: "window" | "card" | "page";
};

export type CaseFeature = {
  id: string;
  title: string;
  body: string;
  size?: "wide" | "tall";
};

export type CaseStudy = {
  slug: "ritmo" | "finance-hub";
  path: string;
  name: string;
  kicker: string;
  headline: string;
  lead: string;
  meta: { title: string; description: string };
  facts: Array<{ value: string; label: string }>;
  problem: { title: string; body: string };
  shots: CaseShot[];
  featuresTitle: string;
  featuresLead: string;
  features: CaseFeature[];
  decisions: Array<{ title: string; body: string }>;
  stack: string[];
  note: string;
};

export const ritmo: CaseStudy = {
  slug: "ritmo",
  path: "/projetos/ritmo",
  name: "Ritmo",
  kicker: "Mac + iPhone · ecossistema pessoal",
  headline: "Mede o seu dia sem você apertar play.",
  lead: "App nativo que mede sozinho o uso do computador e do celular, aprende a sua semana típica e avisa na hora certa — inclusive quando o que você está fazendo não é o que importa. Tudo local.",
  meta: {
    title: "Ritmo — app de tempo, hábitos e foco para Mac e iPhone · Vinícius Hack",
    description:
      "Estudo de caso do Ritmo: app nativo de Mac e iPhone que mede o tempo sozinho, aprende a semana típica e confronta o que você faz com as suas prioridades.",
  },
  facts: [
    { value: "0", label: "cliques para começar a medir" },
    { value: "5 s", label: "entre cada leitura do Mac" },
    { value: "182", label: "testes no núcleo" },
    { value: "R$ 0", label: "de servidor: tudo local" },
  ],
  problem: {
    title: "O problema",
    body: "Apps de tempo pedem que você inicie uma sessão. Você esquece, e o dado morre. E saber onde o tempo foi não basta: o difícil é parar no meio daquilo que parece produtivo, mas não é a prioridade.",
  },
  shots: [
    {
      src: "/projetos/ritmo/inicio.png",
      alt: "Tela inicial do Ritmo com o bloco rodando agora, a palavra do dia e a visão diária",
      caption: "Início: o que está rodando agora, a palavra do dia e o dia já dividido em blocos — sem nenhum play.",
      width: 1600,
      height: 1042,
    },
    {
      src: "/projetos/ritmo/coach.png",
      alt: "Cartão do coach em tela cheia mostrando o tempo gasto e a prioridade do momento",
      caption: "O coach: quando o projeto da frente come o dia e a prioridade espera, ele aparece em tela cheia — com 3 saídas.",
      width: 1200,
      height: 907,
      frame: "card",
    },
    {
      src: "/projetos/ritmo/seuritmo.png",
      alt: "Mapa da semana típica por meia hora e blocos previstos para cada dia",
      caption: "Seu ritmo: a semana típica aprendida, meia hora por meia hora, e o que costuma acontecer em cada dia.",
      width: 1600,
      height: 1042,
    },
    {
      src: "/projetos/ritmo/semana.png",
      alt: "Jornada da semana com horas por dia, tempo por área, metas e hábitos",
      caption: "Jornada da semana: horas por dia e por área, metas, hábitos e a revisão com acertos e travas.",
      width: 1600,
      height: 1042,
    },
  ],
  featuresTitle: "O que ele faz",
  featuresLead: "Cada bloco abaixo é um pedaço real do app, desenhado pequeno.",
  features: [
    {
      id: "auto",
      size: "wide",
      title: "Mede sozinho",
      body: "App da frente, site da aba, pasta do projeto e título da janela viram área e atividade. No iPhone, os lugares e o Tempo de Uso entram na mesma linha do tempo.",
    },
    {
      id: "coach",
      title: "Um coach que confronta",
      body: "Ranqueia o que importa agora e compara com o que você está fazendo. Passou do limite com a prioridade esperando? Tela cheia.",
    },
    {
      id: "habits",
      title: "Hábitos que se marcam sozinhos",
      body: "20 min de leitura no Kindle, chegada na academia, treino do Saúde: o hábito fecha sem você tocar em nada.",
    },
    {
      id: "limits",
      title: "Limites e foco, no Mac e no iPhone",
      body: "Passou de 30 min no Instagram? O app sai da frente nos dois aparelhos. Liberar pede quantos minutos e por quê.",
    },
    {
      id: "quick",
      title: "Tarefas em uma linha",
      body: "Data, hora, área, prioridade e estimativa saem do próprio texto.",
    },
    {
      id: "cards",
      size: "tall",
      title: "Cartas do dia",
      body: "Toda manhã, uma frase e uma missão pequena para revelar no iPhone. Feita, vira XP; feita sempre, vira hábito.",
    },
    {
      id: "examen",
      title: "Revisão da noite por voz",
      body: "Perguntas do dia montadas a partir do que o Ritmo viu. Você responde falando; a transcrição é feita no aparelho.",
    },
    {
      id: "wake",
      title: "Despertador que pede para levantar",
      body: "Parou o alarme deitado? Ele toca de novo em 2 min — até você abrir o app e dar os primeiros passos.",
    },
    {
      id: "meals",
      size: "wide",
      title: "Refeição por foto",
      body: "Uma foto vira itens, gramas e proteína do dia contra a meta. Cerca de US$ 0,0006 por foto.",
    },
  ],
  decisions: [
    {
      title: "Nativo e sem dependências",
      body: "SwiftUI no Mac e no iPhone, SQLite pela API em C e migrações por versão. O app do Mac é montado pelo SwiftPM, sem projeto Xcode.",
    },
    {
      title: "Classificar na leitura",
      body: "O rastreador grava só o que viu; a área é decidida ao ler. Mudar uma regra reclassifica todo o histórico na hora.",
    },
    {
      title: "iPhone ↔ Mac sem servidor",
      body: "Os dois trocam arquivos JSON pela pasta do app no iCloud Drive. Zero backend, zero conta.",
    },
    {
      title: "Não vigiar, não apitar",
      body: "Uma sugestão por vez, intervalo mínimo, silêncio à noite e em reunião. Dois \"não é meu padrão\" no mesmo horário e ele para de sugerir ali.",
    },
    {
      title: "IA opcional e barata",
      body: "Modelos pequenos decidem o que a regra não decide (foto de refeição, contexto sem área). Sem resposta, vale a regra. Rotinas do Claude leem a CLI e escrevem a revisão da semana.",
    },
    {
      title: "Bloqueio com as APIs da Apple",
      body: "No iPhone, o Tempo de Uso (FamilyControls + DeviceActivity) aplica o bloqueio mesmo com o app fechado. No Mac, acessibilidade e AppleScript tiram o app da frente.",
    },
  ],
  stack: ["Swift", "SwiftUI", "SQLite", "FamilyControls", "AlarmKit", "Speech", "CoreLocation", "HealthKit", "Claude Haiku"],
  note: "Uso pessoal, sem link para baixar. Os prints vêm de um banco de demonstração com 6 semanas de dados falsos.",
};

export const financeHub: CaseStudy = {
  slug: "finance-hub",
  path: "/projetos/finance-hub",
  name: "Finance Hub",
  kicker: "Web + PWA · ecossistema pessoal",
  headline: "Todas as contas num painel que lê os números por você.",
  lead: "Agregador financeiro: puxa bancos e cartões pelo Open Finance, cotações de ações e cripto, e mostra patrimônio, fluxo de caixa e o aporte do mês. Todo dia, uma IA lê os dados e escreve o que mudou.",
  meta: {
    title: "Finance Hub — agregador financeiro com IA · Vinícius Hack",
    description:
      "Estudo de caso do Finance Hub: Open Finance, patrimônio, fluxo de caixa, plano de aportes e uma IA que escreve a leitura do mês.",
  },
  facts: [
    { value: "0", label: "lançamentos à mão" },
    { value: "1×", label: "resumo por dia, às 19h" },
    { value: "5", label: "pilares da carteira checados" },
    { value: "R$ 0", label: "de custo mensal" },
  ],
  problem: {
    title: "O problema",
    body: "O dinheiro fica espalhado entre banco, cartão, corretora e cripto. Cada app mostra o seu extrato; nenhum diz se o mês está bom, quanto vai sobrar e onde aportar.",
  },
  shots: [
    {
      src: "/projetos/finance-hub/home.jpg",
      alt: "Início do Finance Hub com patrimônio líquido, gastos do mês, aporte de outubro e indicadores",
      caption: "Início: patrimônio, gasto do mês contra o típico, o aporte planejado e a saúde do dinheiro num olhar.",
      width: 1600,
      height: 1328,
      frame: "page",
    },
    {
      src: "/projetos/finance-hub/fluxo.jpg",
      alt: "Fluxo de caixa com sobra prevista, gasto acumulado contra o mês típico e categorias",
      caption: "Fluxo de caixa: a sobra prevista antes do fim do mês, para onde vai o dinheiro e os orçamentos.",
      width: 1600,
      height: 1114,
      frame: "page",
    },
    {
      src: "/projetos/finance-hub/aportes.jpg",
      alt: "Tela de aporte do mês com a divisão por classe e o checklist escrito pela IA",
      caption: "Aporte do mês: a divisão por classe e ativo, e o checklist que o Claude escreve — cada item com o porquê.",
      width: 1600,
      height: 1257,
      frame: "page",
    },
    {
      src: "/projetos/finance-hub/patrimonio.jpg",
      alt: "Patrimônio com gráfico de evolução, onde está o dinheiro e os pilares da carteira",
      caption: "Patrimônio: evolução, onde está cada real e os 5 pilares da carteira como checklist.",
      width: 1600,
      height: 1443,
      frame: "page",
    },
  ],
  featuresTitle: "O que ele faz",
  featuresLead: "Cada bloco abaixo é um pedaço real do painel, com números fictícios.",
  features: [
    {
      id: "aggregate",
      size: "wide",
      title: "Tudo num lugar",
      body: "Contas, cartões e investimentos chegam pelo Open Finance; ações no exterior e cripto, por cotação diária. Patrimônio e evolução sem digitar nada.",
    },
    {
      id: "forecast",
      title: "Quanto vai sobrar",
      body: "Recebido, gasto até hoje, contas e parcelas que ainda caem: a sobra prevista do mês antes de o mês acabar.",
    },
    {
      id: "split",
      title: "Reembolso casado sozinho",
      body: "O Pix de quem dividiu o jantar abate a compra certa — inteira, metade ou terço, no centavo.",
    },
    {
      id: "bands",
      title: "Carteira × faixas",
      body: "Cada classe contra a faixa combinada. O que está fora aparece; o que está dentro não vira alarme.",
    },
    {
      id: "contribution",
      title: "Aporte do mês",
      body: "Digite o valor e veja quanto vai em cada classe e em qual ativo, com o porquê.",
    },
    {
      id: "report",
      size: "tall",
      title: "Leitura escrita pela IA",
      body: "Todo dia, o Claude lê o contexto e escreve a leitura do mês, o plano de aportes e o checklist — em blocos visuais, não em parágrafos.",
    },
    {
      id: "notify",
      title: "Avisa sem apitar",
      body: "Só sai na hora o que é urgente (renda, fatura vencendo). O resto vira um resumo às 19h.",
    },
    {
      id: "goals",
      title: "Objetivos com ritmo",
      body: "Reserva, viagem, independência: progresso, projeção no ritmo atual e quanto aportar até o prazo.",
    },
    {
      id: "theses",
      size: "wide",
      title: "Teses no lugar de notícia",
      body: "As convicções viram faixas e regras. A IA só propõe mudar uma tese quando um sinal dispara.",
    },
  ],
  decisions: [
    {
      title: "Dado fechado no servidor",
      body: "Tudo fica num schema com RLS ligado e nenhuma policy: a API pública do Supabase não enxerga nada. Só o servidor Next.js lê o Postgres.",
    },
    {
      title: "IA sem API paga",
      body: "Uma tarefa agendada do Claude Code roda a CLI do projeto: lê um JSON com o contexto e grava relatórios e alertas. Roda na assinatura, sem custo por chamada.",
    },
    {
      title: "Relatório como dado",
      body: "A IA escreve markdown com blocos (kpis, barras, faixas, aporte, checklist) que a tela desenha. O bloco de aporte alimenta direto a tela de aportes.",
    },
    {
      title: "Regras antes da IA",
      body: "Orçamento estourado, fatura vencendo, previsão negativa: alertas determinísticos que fecham sozinhos. A IA fica com o que regra não pega.",
    },
    {
      title: "Conselheiro, não alarme",
      body: "Notificações deduplicadas por impressão digital, silêncio das 23h às 7h e um único resumo por dia.",
    },
    {
      title: "Sincronização em camadas",
      body: "Um cron diário na Vercel puxa os dados; o webhook do Open Finance e o pg_cron (3× por dia) rodam os vigias. Gravar de novo nunca duplica.",
    },
  ],
  stack: ["Next.js 16", "React 19", "Postgres", "Supabase", "Pluggy (Open Finance)", "Vercel Cron", "Web Push", "Claude Code"],
  note: "Uso pessoal, sem link público. Os prints vêm de um banco local com dados fictícios.",
};

export const caseStudies = [ritmo, financeHub];

export function caseStudyForPath(pathname: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.path === pathname.replace(/\/$/, ""));
}
