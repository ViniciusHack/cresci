// Estudos de caso dos apps do ecossistema pessoal (sem link público para baixar).
// Os prints são de bancos de demonstração: nada de dado real.

export type CaseShot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** phone = print de iPhone, desenhado estreito e lado a lado com o próximo. */
  frame?: "window" | "card" | "page" | "phone";
};

export type CaseFeature = {
  id: string;
  title: string;
  body: string;
  size?: "wide" | "tall";
};

/** Uma parte do que foi entregue (ex.: o site público e o sistema por trás). */
export type CasePart = {
  label: string;
  title: string;
  body: string;
  items: string[];
};

/** Uma etapa do processo do cliente: o que travava e como ficou. */
export type CaseStep = {
  step: string;
  before: string;
  after: string;
};

export type CaseStudy = {
  slug: "ritmo" | "finance-hub" | "alento" | "lume";
  path: string;
  name: string;
  kicker: string;
  headline: string;
  lead: string;
  meta: { title: string; description: string };
  facts: Array<{ value: string; label: string }>;
  problem: { title: string; body: string; points?: string[] };
  /** Link público do produto (site do cliente, landing). */
  site?: { href: string; label: string };
  /** O que foi entregue, em partes. */
  delivers?: { title: string; lead: string; parts: CasePart[] };
  /** O processo do cliente, etapa por etapa. */
  process?: { title: string; lead: string; labels?: [string, string]; steps: CaseStep[] };
  shots: CaseShot[];
  /** Vídeo curto no topo da página (passa por /media para tocar no iPhone). */
  video?: { src: string; poster: string };
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
  video: { src: "/media/ritmo.mp4", poster: "/comercial/ritmo.jpg" },
  kicker: "Mac e iPhone · app pessoal",
  headline: "Mede o seu dia sem você apertar play.",
  lead: "App nativo que mede sozinho o uso do computador e do celular, aprende como costuma ser a sua semana e avisa na hora certa, inclusive quando o que você está fazendo não é a sua prioridade. Os dados ficam no aparelho.",
  meta: {
    title: "Ritmo, app de tempo, hábitos e foco para Mac e iPhone · Vinícius Hack",
    description:
      "Estudo de caso do Ritmo, app nativo de Mac e iPhone que mede o tempo sozinho, aprende a semana típica e mostra quando o que você faz foge das suas prioridades.",
  },
  facts: [
    { value: "0", label: "cliques para começar a medir" },
    { value: "5 s", label: "entre cada leitura do Mac" },
    { value: "182", label: "testes no núcleo" },
    { value: "R$ 0", label: "de servidor, tudo fica no aparelho" },
  ],
  problem: {
    title: "O problema",
    body: "Apps de tempo pedem que você inicie uma sessão. Você esquece e fica sem o dado. E mesmo sabendo onde o tempo foi, é difícil parar no meio de algo que parece produtivo e não é a prioridade.",
  },
  shots: [
    {
      src: "/projetos/ritmo/inicio.png",
      alt: "Tela inicial do Ritmo com o bloco rodando agora, a palavra do dia e a visão diária",
      caption: "O início mostra o que está rodando agora, a palavra do dia e o dia já dividido em blocos, sem apertar play.",
      width: 1600,
      height: 1042,
    },
    {
      src: "/projetos/ritmo/coach.png",
      alt: "Cartão do coach em tela cheia mostrando o tempo gasto e a prioridade do momento",
      caption: "Quando um projeto toma o dia e a prioridade fica esperando, o coach aparece em tela cheia com 3 opções.",
      width: 1200,
      height: 907,
      frame: "card",
    },
    {
      src: "/projetos/ritmo/seuritmo.png",
      alt: "Mapa da semana típica por meia hora e blocos previstos para cada dia",
      caption: "A semana típica que o app aprendeu, de meia em meia hora, e o que costuma acontecer em cada dia.",
      width: 1600,
      height: 1042,
    },
    {
      src: "/projetos/ritmo/semana.png",
      alt: "Jornada da semana com horas por dia, tempo por área, metas e hábitos",
      caption: "A semana com horas por dia e por área, metas, hábitos e a revisão do que funcionou e do que travou.",
      width: 1600,
      height: 1042,
    },
  ],
  featuresTitle: "O que ele faz",
  featuresLead: "Cada bloco abaixo é uma parte do app redesenhada em tamanho pequeno.",
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
      body: "Ordena o que importa agora e compara com o que você está fazendo. Se você passou do limite e a prioridade está esperando, ele abre em tela cheia.",
    },
    {
      id: "habits",
      title: "Hábitos que se marcam sozinhos",
      body: "Com 20 min de leitura no Kindle, a chegada na academia ou um treino do Saúde, o hábito se marca sem você tocar em nada.",
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
      body: "Toda manhã, uma frase e uma missão pequena para revelar no iPhone. Cada missão feita dá XP, e a que você faz sempre vira hábito.",
    },
    {
      id: "examen",
      title: "Revisão da noite por voz",
      body: "Perguntas do dia montadas a partir do que o Ritmo viu. Você responde falando; a transcrição é feita no aparelho.",
    },
    {
      id: "wake",
      title: "Despertador que pede para levantar",
      body: "Se você para o alarme deitado, ele toca de novo em 2 min até você abrir o app e dar os primeiros passos.",
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
      body: "Os dois trocam arquivos JSON pela pasta do app no iCloud Drive, sem backend e sem conta.",
    },
    {
      title: "Poucos avisos",
      body: "Uma sugestão por vez, com intervalo mínimo e silêncio à noite e em reunião. Se você responde \"não é meu padrão\" duas vezes no mesmo horário, ele para de sugerir ali.",
    },
    {
      title: "IA opcional e barata",
      body: "Modelos pequenos decidem o que a regra não decide, como a foto da refeição ou um app sem área. Se a IA não responde, vale a regra. Rotinas do Claude leem a CLI e escrevem a revisão da semana.",
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
  video: { src: "/media/finance-hub.mp4", poster: "/comercial/finance-hub.jpg" },
  kicker: "Web e PWA · app pessoal",
  headline: "Bancos, cartões e investimentos num painel que escreve todo dia o que mudou.",
  lead: "Agregador financeiro que puxa bancos e cartões pelo Open Finance e as cotações de ações e cripto. Mostra patrimônio, fluxo de caixa e o aporte do mês, e todo dia uma IA lê os dados e escreve o que mudou.",
  meta: {
    title: "Finance Hub, agregador financeiro com IA · Vinícius Hack",
    description:
      "Estudo de caso do Finance Hub, com Open Finance, patrimônio, fluxo de caixa, plano de aportes e uma IA que escreve a análise do mês.",
  },
  facts: [
    { value: "0", label: "lançamentos à mão" },
    { value: "1×", label: "resumo por dia, às 19h" },
    { value: "5", label: "pilares da carteira checados" },
    { value: "R$ 0", label: "de custo mensal" },
  ],
  problem: {
    title: "O problema",
    body: "O dinheiro fica espalhado entre banco, cartão, corretora e cripto. Cada app mostra o próprio extrato e nenhum diz se o mês está bom, quanto vai sobrar e onde aportar.",
  },
  shots: [
    {
      src: "/projetos/finance-hub/home.jpg",
      alt: "Início do Finance Hub com patrimônio líquido, gastos do mês, aporte de outubro e indicadores",
      caption: "O início mostra o patrimônio, o gasto do mês comparado ao normal, o aporte planejado e os principais indicadores.",
      width: 1600,
      height: 1328,
      frame: "page",
    },
    {
      src: "/projetos/finance-hub/fluxo.jpg",
      alt: "Fluxo de caixa com sobra prevista, gasto acumulado contra o mês típico e categorias",
      caption: "O fluxo de caixa mostra a sobra prevista antes do fim do mês, para onde vai o dinheiro e os orçamentos.",
      width: 1600,
      height: 1114,
      frame: "page",
    },
    {
      src: "/projetos/finance-hub/aportes.jpg",
      alt: "Tela de aporte do mês com a divisão por classe e o checklist escrito pela IA",
      caption: "No aporte do mês aparece a divisão por classe e por ativo e o checklist que o Claude escreve, com o motivo de cada item.",
      width: 1600,
      height: 1257,
      frame: "page",
    },
    {
      src: "/projetos/finance-hub/patrimonio.jpg",
      alt: "Patrimônio com gráfico de evolução, onde está o dinheiro e os pilares da carteira",
      caption: "O patrimônio mostra a evolução, onde está cada real e os 5 pilares da carteira em forma de checklist.",
      width: 1600,
      height: 1443,
      frame: "page",
    },
  ],
  featuresTitle: "O que ele faz",
  featuresLead: "Cada bloco abaixo é uma parte do painel, com números fictícios.",
  features: [
    {
      id: "aggregate",
      size: "wide",
      title: "Contas e investimentos juntos",
      body: "Contas, cartões e investimentos chegam pelo Open Finance; ações no exterior e cripto, por cotação diária. Patrimônio e evolução sem digitar nada.",
    },
    {
      id: "forecast",
      title: "Quanto vai sobrar",
      body: "Soma o que entrou, o que já foi gasto e as contas e parcelas que ainda vão cair, e mostra a sobra prevista antes de o mês acabar.",
    },
    {
      id: "split",
      title: "Reembolso casado sozinho",
      body: "O Pix de quem dividiu o jantar abate a compra certa no centavo, seja inteira, metade ou um terço.",
    },
    {
      id: "bands",
      title: "Carteira × faixas",
      body: "Cada classe é comparada com a faixa combinada e só aparece o que está fora dela.",
    },
    {
      id: "contribution",
      title: "Aporte do mês",
      body: "Digite o valor e veja quanto vai em cada classe e em qual ativo, com o porquê.",
    },
    {
      id: "report",
      size: "tall",
      title: "Análise escrita pela IA",
      body: "Todo dia o Claude lê o contexto e escreve a análise do mês, o plano de aportes e o checklist em blocos visuais.",
    },
    {
      id: "notify",
      title: "Poucas notificações",
      body: "Só o urgente avisa na hora, como renda que caiu ou fatura vencendo. O resto vai para um resumo às 19h.",
    },
    {
      id: "goals",
      title: "Objetivos com projeção",
      body: "Para reserva, viagem ou independência financeira, mostra o progresso, a projeção no ritmo atual e quanto aportar até o prazo.",
    },
    {
      id: "theses",
      size: "wide",
      title: "Teses de investimento",
      body: "As convicções viram faixas e regras. A IA só propõe mudar uma tese quando um sinal dispara.",
    },
  ],
  decisions: [
    {
      title: "Dado fechado no servidor",
      body: "Tudo fica num schema com RLS ligado e nenhuma policy, então a API pública do Supabase não enxerga nada. Só o servidor Next.js lê o Postgres.",
    },
    {
      title: "IA sem API paga",
      body: "Uma tarefa agendada do Claude Code roda a CLI do projeto, lê um JSON com o contexto e grava relatórios e alertas. Roda na assinatura, sem custo por chamada.",
    },
    {
      title: "Relatório como dado",
      body: "A IA escreve markdown com blocos (kpis, barras, faixas, aporte, checklist) que a tela desenha. O bloco de aporte alimenta direto a tela de aportes.",
    },
    {
      title: "Regras antes da IA",
      body: "Orçamento estourado, fatura vencendo e previsão negativa viram alertas determinísticos que fecham sozinhos. A IA fica com o que a regra não pega.",
    },
    {
      title: "Notificação sem repetição",
      body: "Notificações deduplicadas por impressão digital, silêncio das 23h às 7h e um único resumo por dia.",
    },
    {
      title: "Sincronização em camadas",
      body: "Um cron diário na Vercel puxa os dados, e o webhook do Open Finance e o pg_cron, 3 vezes por dia, rodam as checagens. Gravar de novo não duplica nada.",
    },
  ],
  stack: ["Next.js 16", "React 19", "Postgres", "Supabase", "Pluggy (Open Finance)", "Vercel Cron", "Web Push", "Claude Code"],
  note: "Uso pessoal, sem link público. Os prints vêm de um banco local com dados fictícios.",
};

export const alento: CaseStudy = {
  slug: "alento",
  path: "/projetos/alento",
  name: "Alento Foto & Filme",
  kicker: "Freela · site e sistema interno",
  headline: "O site da Alento e o sistema onde eles entregam as fotos de cada casal.",
  lead: "A Alento fotografa e filma casamentos. Fiz o site deles e um sistema interno onde eles montam a galeria de cada casal. Como o sistema é deles, quando surge uma ideia nova a gente coloca, tanto na área do cliente quanto na organização interna.",
  meta: {
    title: "Alento Foto & Filme, site e sistema de galerias · Vinícius Hack",
    description:
      "Estudo de caso da Alento Foto & Filme. Site de casamento com um sistema interno próprio para montar galerias, compartilhar com a família e baixar fotos e filmes pelo celular.",
  },
  site: { href: "https://alentofotoefilme.com.br", label: "Ver o site no ar" },
  facts: [
    { value: "6 meses", label: "de funcionalidades novas desde o lançamento" },
    { value: "1.400+", label: "fotos numa galeria" },
    { value: "30 MB", label: "por foto, no arquivo original" },
    { value: "1 link", label: "por casal, com senha" },
  ],
  problem: {
    title: "A ideia",
    body: "Dá para entregar fotos por uma plataforma pronta. Só que aí a Alento se adapta à ferramenta, o casal recebe a galeria com a marca de outra empresa e qualquer mudança depende de alguém de fora. Com um sistema próprio, eles organizam as galerias do jeito que trabalham, entregam com a marca deles e, quando querem mudar alguma coisa, a mudança entra.",
    points: [
      "Organização do jeito deles. Cada foto tem um momento do dia e uma fase, pré-wedding ou casamento.",
      "Mais autoridade. O casal abre a galeria no site da Alento, com a marca deles do começo ao fim.",
      "Liberdade para mudar. Quando aparece uma ideia, ela vira funcionalidade, para o casal ou para a organização interna.",
      "Custo sob controle. A galeria que passou da validade sai do armazenamento sozinha.",
    ],
  },
  delivers: {
    title: "O que eu fiz",
    lead: "São três partes que usam o mesmo banco de dados.",
    parts: [
      {
        label: "Para quem ainda vai fechar",
        title: "Site",
        body: "Portfólio, sobre, como é a entrega e a proposta com os pacotes. Os botões abrem o WhatsApp deles com a mensagem já escrita.",
        items: [
          "Depoimentos de casais",
          "Portfólio por casal e por momento do dia",
          "Página da entrega com caixa, pen drive e álbuns",
          "Proposta com os pacotes de foto e filme",
          "Prévia do link quando alguém compartilha no WhatsApp",
        ],
      },
      {
        label: "Para a Alento",
        title: "Painel interno",
        body: "É onde eles criam a galeria de cada casal sem precisar de mim.",
        items: [
          "Galeria com senha e data para expirar",
          "Envio de centenas de fotos de até 30 MB de uma vez",
          "Momento do dia e fase em cada foto",
          "Ordem arrastando, capa e miniaturas",
          "Mais de um filme por galeria",
          "Uma opção para a galeria aparecer no portfólio",
        ],
      },
      {
        label: "Para o casal",
        title: "Área do cliente",
        body: "A galeria do casal, dentro do site da Alento.",
        items: [
          "Entra com a senha e ganha um link para mandar para a família",
          "Abas de pré-wedding e casamento",
          "Baixa só as fotos escolhidas ou tudo num ZIP",
          "Trailer e curta para assistir e baixar",
          "Download pelo celular que não reinicia no meio",
        ],
      },
    ],
  },
  process: {
    title: "Como o sistema foi mudando",
    lead: "Desde abril, o que a Alento precisou virou funcionalidade. Umas para o casal, outras para a organização deles.",
    labels: ["Precisavam", "Entrou"],
    steps: [
      {
        step: "Abril",
        before: "Organizar a entrega e controlar quanto tempo cada galeria fica no ar.",
        after: "Galerias com validade, momentos do dia, ordem arrastando, filmes e um link para o casal compartilhar.",
      },
      {
        step: "Maio",
        before: "Mostrar para quem ainda vai fechar como é o depois do casamento.",
        after: "Páginas de depoimentos, sobre a dupla e da entrega.",
      },
      {
        step: "Julho",
        before: "Subir casamentos com mais de mil fotos e separar o ensaio do casamento.",
        after: "Envio em lote, galerias paginadas, abas de pré-wedding e casamento e uma proposta nova.",
      },
      {
        step: "Agosto",
        before: "Escolher quais galerias aparecem no portfólio separado por momento.",
        after: "Uma opção em cada galeria para entrar em “Por momento”.",
      },
      {
        step: "Outubro",
        before: "Casais avisaram que o download pelo celular reiniciava no meio.",
        after: "O servidor passou a mandar o ZIP e o filme direto para o download do celular.",
      },
    ],
  },
  shots: [
    {
      src: "/comercial/alento.jpg",
      alt: "Página inicial da Alento com um casal se beijando entre os convidados",
      caption: "O início do site. A foto de um casamento ocupa a tela toda.",
      width: 1600,
      height: 903,
      frame: "page",
    },
    {
      src: "/projetos/alento/entrega.jpg",
      alt: "Página da entrega da Alento com a caixa de fotos e polaroides",
      caption: "A página da entrega mostra o que o casal recebe depois, além da galeria online.",
      width: 1600,
      height: 1000,
      frame: "page",
    },
  ],
  featuresTitle: "Por dentro do sistema",
  featuresLead: "Partes do painel e da área do cliente redesenhadas com nomes inventados, porque as fotos são dos casais.",
  features: [
    {
      id: "a-gallery",
      size: "wide",
      title: "Uma galeria por casal",
      body: "Nome, data, senha, capa e validade. Se marcar como pública, ela aparece no portfólio.",
    },
    {
      id: "a-upload",
      title: "Envio em lote",
      body: "Sobem centenas de fotos de até 30 MB numa fila. A miniatura é gerada no navegador antes de enviar.",
    },
    {
      id: "a-moments",
      title: "Momento e fase",
      body: "Cada foto tem um momento do dia e uma fase. Isso organiza o painel e o portfólio.",
    },
    {
      id: "a-share",
      title: "Link para a família",
      body: "Depois da senha, o casal manda um link para a família. A Alento pode desligar esse link quando quiser.",
    },
    {
      id: "a-download",
      size: "tall",
      title: "Download pelo celular",
      body: "Dá para escolher fotos ou baixar tudo. O ZIP e o filme chegam do servidor aos poucos, então o celular não trava.",
    },
    {
      id: "a-films",
      title: "Trailer e curta",
      body: "Cada galeria pode ter mais de um filme. O download pega a maior resolução disponível.",
    },
    {
      id: "a-expire",
      title: "Validade",
      body: "Na data marcada a galeria fecha e os arquivos saem do armazenamento.",
    },
  ],
  decisions: [
    {
      title: "Site estático com um Worker",
      body: "O site é React com Vite, servido como arquivo estático na Cloudflare. Só abrir a galeria, a prévia do link e os downloads passam por um Worker.",
    },
    {
      title: "ZIP montado aos poucos",
      body: "O Worker busca foto por foto e vai montando o ZIP enquanto envia. Uma galeria de vários GB não passa pela memória do celular. Para isso precisei do plano de US$ 5 por mês da Cloudflare.",
    },
    {
      title: "Senha checada no servidor",
      body: "A senha da galeria e o link da família são conferidos no servidor. O painel usa o login do Supabase.",
    },
    {
      title: "Filmes no Bunny Stream",
      body: "O Bunny cuida da conversão, do player e das resoluções de cada filme.",
    },
    {
      title: "Galerias com mais de mil fotos",
      body: "As fotos ficam numa tabela própria, paginada e em ordem natural, então IMG_2 vem antes de IMG_10.",
    },
    {
      title: "Imagem no tamanho da tela",
      body: "Cada foto tem várias larguras. A grade usa a miniatura e o original só aparece no download.",
    },
  ],
  stack: ["React 19", "TypeScript", "Vite", "Tailwind", "Supabase", "Cloudflare Workers", "Bunny Stream", "TanStack Query"],
  note: "Freela feito do zero e no ar, com casais usando. O painel e as galerias privadas aparecem redesenhados com nomes inventados.",
};

export const lume: CaseStudy = {
  slug: "lume",
  path: "/projetos/lume",
  name: "Lume",
  kicker: "Mac e iPhone · agente pessoal",
  headline: "Compara o que você disse que ia fazer com o que você está fazendo.",
  lead: "O Lume lê a sua lista do dia, as suas metas e os seus hábitos, e olha o que você está fazendo no Mac e no iPhone. Se os dois se afastam, ele aparece enquanto ainda dá tempo de voltar, usando as palavras que você mesmo escreveu. Ele nasceu do Ritmo. O Ritmo mede o tempo e o Lume age em cima disso.",
  meta: {
    title: "Lume, agente que compara a sua promessa com o que você faz · Vinícius Hack",
    description:
      "Estudo de caso do Lume, agente de Mac e iPhone que compara a promessa do dia com o que você está fazendo e avisa enquanto ainda dá tempo.",
  },
  site: { href: "https://lume.viniciushack.com", label: "Ver a landing" },
  facts: [
    { value: "30 s", label: "entre uma checagem e outra" },
    { value: "1 botão", label: "principal por tela" },
    { value: "US$ 0,001", label: "por análise da noite" },
    { value: "0", label: "dado de uso do iPhone mandado para a IA" },
  ],
  problem: {
    title: "O problema",
    body: "Eu sabia onde o meu tempo ia e mesmo assim não mudava nada. Bloqueador resolve o Instagram, mas não resolve passar duas horas num projeto paralelo com a tarefa difícil esperando desde terça.",
    points: [
      "O app de tempo sabia o que eu fiz, mas não sabia o que eu tinha prometido fazer.",
      "O aviso chegava tarde, no relatório da semana, ou chegava toda hora e eu ignorava.",
      "Um lembrete se fecha com um toque. Pular precisava dar mais trabalho que fazer.",
    ],
  },
  delivers: {
    title: "O que existe hoje",
    lead: "O mesmo agente no Mac, no iPhone e numa landing, lendo o banco do Ritmo.",
    parts: [
      {
        label: "No Mac",
        title: "App na barra de menus",
        body: "Fica quieto e só abre em tela cheia quando precisa.",
        items: [
          "Avisa na hora da fuga, na troca de tarefa e no hábito que está passando",
          "Quando o momento passou, sugere uma versão menor que ainda cabe no dia",
          "Abre o dia com voz e pede a promessa",
          "Primeiro uso por conversa, falando",
          "Mostra o que percebeu de você e de onde tirou isso",
        ],
      },
      {
        label: "No iPhone",
        title: "Onde a fuga acontece",
        body: "Usa o Tempo de Uso da Apple, então funciona com o app fechado.",
        items: [
          "Pergunta para que você vai abrir o Instagram antes de abrir",
          "Limite de minutos nos apps de fuga, com a tela do Lume",
          "Atividade ao Vivo e widget com o que você prometeu",
          "Promessa da manhã respondida na notificação",
        ],
      },
      {
        label: "Na web",
        title: "Landing com lista de espera",
        body: "Para testar a ideia com outras pessoas.",
        items: [
          "Uma semana de exemplo para explorar com o mouse",
          "Diagrama de como ele funciona",
          "Lista de espera num Worker com D1",
          "Piloto planejado de 8 semanas, alternando com e sem o Lume",
        ],
      },
    ],
  },
  shots: [
    {
      src: "/projetos/lume/confronto.jpg",
      alt: "Cartão do Lume em tela cheia dizendo que a tarefa CNPJ está esperando desde segunda, com o botão Fazer agora",
      caption: "Quando o momento passou, ele mostra há quanto tempo a tarefa espera e o menor passo que ainda dá para fazer hoje.",
      width: 1600,
      height: 1025,
      frame: "card",
    },
    {
      src: "/projetos/lume/onboarding.jpg",
      alt: "Tela do onboarding do Lume perguntando o que importa agora, com três itens classificados como hábito, meta e tarefa",
      caption: "No primeiro uso você fala o que importa. Ele separa em hábito, meta e tarefa e explica como vai conferir cada um.",
      width: 1200,
      height: 1004,
      frame: "card",
    },
    {
      src: "/projetos/lume/iphone-entendi.png",
      alt: "Lume no iPhone com a promessa aberta e o que a IA percebeu dos padrões de fuga",
      caption: "No iPhone, a promessa de agora e o que ele percebeu nos seus dias. Dá para marcar o que estiver errado.",
      width: 506,
      height: 1100,
      frame: "phone",
    },
    {
      src: "/projetos/lume/iphone-praque.png",
      alt: "Tela Pra quê? do Lume antes de abrir um app de fuga",
      caption: "Antes de abrir um app de fuga, ele pergunta para quê.",
      width: 552,
      height: 1200,
      frame: "phone",
    },
  ],
  featuresTitle: "O que ele faz",
  featuresLead: "Cada bloco é uma tela do Lume redesenhada em tamanho pequeno.",
  features: [
    {
      id: "l-said",
      size: "wide",
      title: "Promessa e comportamento lado a lado",
      body: "De um lado o que você escreveu para o dia. Do outro o que o Mac e o iPhone mostram. O Lume age quando os dois não batem.",
    },
    {
      id: "l-escape",
      title: "Fuga que parece trabalho",
      body: "Passou do limite num projeto enquanto a prioridade espera? Ele mostra quanto tempo foi e o que você tinha prometido.",
    },
    {
      id: "l-transition",
      title: "Na troca de tarefa",
      body: "Quando um bloco acaba ou você volta depois de um tempo, ele mostra o que falta da lista do dia.",
    },
    {
      id: "l-skip",
      size: "tall",
      title: "Pular dá mais trabalho",
      body: "Os botões de fazer aparecem primeiro. O de pular só aparece depois de 3 segundos e pede um motivo. Sem motivo, nada é registrado.",
    },
    {
      id: "l-fez",
      title: "Conferência",
      body: "Se dá para ver pelo Mac ou pelo iPhone, ele confere sozinho. Se não, pergunta se você fez.",
    },
    {
      id: "l-learn",
      title: "Aprende com cada fuga",
      body: "Guarda o que veio antes, o que você fez e o que aconteceu depois. Só cria uma hipótese com pelo menos dois casos.",
    },
    {
      id: "l-move",
      title: "Frases e imagens suas",
      body: "O que você guardou aparece antes de um horário difícil, durante uma fuga ou depois de uma queda.",
    },
  ],
  decisions: [
    {
      title: "Regra decide quando, IA decide como",
      body: "O código decide se é hora de interromper. O modelo só escolhe entre tela cheia, notificação ou esperar, com limite de chamadas por dia.",
    },
    {
      title: "Toda resposta da IA é checada",
      body: "O modelo só cita episódios pelo id e quem escreve a evidência é o código. Se você marcou algo como errado, aquilo não volta.",
    },
    {
      title: "Cada fuga vira um episódio",
      body: "Gatilho, comportamento e consequência, como na análise do comportamento. Um placar cruza o tipo de aviso com a volta ao foco para saber o que funciona com cada pessoa.",
    },
    {
      title: "Três níveis de privacidade",
      body: "Básico, contexto ou visão, cada um com aceite próprio. A visão roda no próprio Mac e guarda só um rótulo de até 6 palavras.",
    },
    {
      title: "Regras da Apple",
      body: "Na versão comercial, nenhum dado de uso do iPhone vai para a IA nem para o piloto, porque o Family Controls não permite.",
    },
    {
      title: "Um aviso de cada vez",
      body: "Ritmo e Lume usam o mesmo SQLite. Com o Lume aberto o Ritmo fica quieto, para nunca ter dois apps avisando.",
    },
  ],
  stack: ["Swift", "SwiftUI", "SQLite", "FamilyControls", "ScreenCaptureKit", "Vision", "Foundation Models", "SpeechAnalyzer", "AI Gateway", "Cloudflare D1"],
  note: "Uso pessoal por enquanto. A landing está no ar com lista de espera e os prints são de um banco de demonstração.",
};

export const caseStudies = [alento, ritmo, lume, financeHub];

export function caseStudyForPath(pathname: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.path === pathname.replace(/\/$/, ""));
}
