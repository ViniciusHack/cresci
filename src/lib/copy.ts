import { SOCIALS } from "./site";

export type Locale = "pt-BR" | "en";

export type WorkItem = {
  id: string;
  title: string;
  metric: string;
  body: string;
  href?: string;
};

export type Principle = {
  title: string;
  body: string;
};

export type CraftCard = {
  title: string;
  body: string;
};

export type Copy = {
  meta: {
    title: string;
    description: string;
  };
  skip: string;
  nav: {
    thinking: string;
    work: string;
    talk: string;
    sections: string;
    versions: string;
  };
  versions: {
    title: string;
    lead: string;
    current: string;
    meta: {
      title: string;
      description: string;
    };
    editorial: { name: string; tag: string };
    noir: { name: string; tag: string };
    brutal: { name: string; tag: string };
    studio: { name: string; tag: string };
  };
  studio: {
    hello: string;
    role: string;
    headline: string;
    ctaWork: string;
    available: string;
    aboutEyebrow: string;
    aboutTitle: string;
    aboutBody: string;
    skillsTitle: string;
    skills: Array<{ group: string; items: string[] }>;
    workEyebrow: string;
    workTitle: string;
    workLead: string;
    projectLink: string;
    experienceEyebrow: string;
    experienceTitle: string;
    jobs: Array<{ company: string; role: string; period: string; body: string }>;
    navAbout: string;
    navWork: string;
    navExperience: string;
    navContact: string;
    photoAlt: string;
    photoCard: string;
    calendly: string;
    themeToDark: string;
    themeToLight: string;
  };
  lang: {
    label: string;
    pt: string;
    en: string;
  };
  hero: {
    index: string;
    name: string;
    thesis: string;
    location: string;
    year: string;
    nowLabel: string;
    now: string[];
    talk: string;
  };
  thinking: {
    index: string;
    title: string;
    lead: string;
    principles: Principle[];
    cardLabel: string;
    cardNext: string;
    cards: CraftCard[];
  };
  work: {
    index: string;
    title: string;
    lead: string;
    open: string;
    close: string;
    visit: string;
    items: WorkItem[];
  };
  talk: {
    index: string;
    title: string;
    body: string;
    emailLabel: string;
    email: string;
    linksLabel: string;
  };
  footer: {
    rights: string;
    place: string;
  };
  notFound: {
    title: string;
    body: string;
    back: string;
  };
  error: {
    title: string;
    body: string;
    retry: string;
    back: string;
  };
  socials: Array<{ label: string; href: string }>;
  hack: {
    trigger: string;
    eyebrow: string;
    title: string;
    lines: string[];
    dismiss: string;
  };
};

export const copies: Record<Locale, Copy> = {
  "pt-BR": {
    meta: {
      title: "Vinícius Hack — engenheiro de software e produto",
      description:
        "Engenheiro de software e produto em Balneário Camboriú. Constrói apps e plataformas do zero à produção, com IA no ciclo e conversa direta com o negócio.",
    },
    skip: "Ir para o conteúdo",
    nav: {
      thinking: "Ofício",
      work: "Produtos",
      talk: "Conversar",
      sections: "Seções",
      versions: "Versões",
    },
    versions: {
      title: "Outras peles.",
      lead: "O mesmo ofício. Várias linguagens — do portfólio clássico à página bruta.",
      current: "Editorial — a primeira",
      meta: {
        title: "Versões do site — Vinícius Hack",
        description:
          "O mesmo ofício em outras linguagens visuais: studio, editorial, noir e brutal.",
      },
      editorial: {
        name: "Editorial",
        tag: "A versão original. Papel, serif, seções numeradas.",
      },
      noir: {
        name: "Noir",
        tag: "Navy, um acento menta, rail fixo. Brittany Chiang.",
      },
      brutal: {
        name: "Brutal",
        tag: "Borda grossa, amarelo elétrico, sombra dura.",
      },
      studio: {
        name: "Studio",
        tag: "Portfólio clássico de desenvolvedor. Projetos, stack e experiência.",
      },
    },
    studio: {
      hello: "Oi, eu sou",
      role: "Engenheiro de software e produto",
      headline: "Da ideia ao lançamento — software que as pessoas usam.",
      ctaWork: "Ver portfólio",
      calendly: "Agendar 30 min",
      available: "Aberto a uma conversa",
      aboutEyebrow: "Sobre",
      aboutTitle: "Quem sou.",
      aboutBody:
        "Trabalho como desenvolvedor contratado desde 2021 (escrevi a primeira linha de código em 2019) e, à parte, crio apps próprios e para clientes (freelance). O que me interessa é o caminho. Sentar com o problema, escolher a ferramenta mais adequada e entregar algo que as pessoas usem de verdade — e que traga valor para o negócio.",
      skillsTitle: "Stack",
      skills: [
        { group: "Front", items: ["TypeScript", "React", "Next.js", "Tailwind"] },
        { group: "Back", items: ["NestJS", "Rust", "Postgres", "Firebase", "Supabase", "BullMQ"] },
        { group: "Mobile & produto", items: ["Expo", "React Native", "Stripe", "AI (Agent)"] },
      ],
      workEyebrow: "Portfólio",
      workTitle: "Projetos selecionados.",
      workLead: "Escolha um projeto para ver a capa e a história.",
      projectLink: "Ver projeto",
      experienceEyebrow: "Experiência",
      experienceTitle: "Onde trabalhei.",
      jobs: [
        {
          company: "Automatize",
          role: "Engenheiro de software e produto",
          period: "Julho 2026 — agora",
          body: "Agente para o cliente leigo criar, pausar e ler campanha de tráfego pago — no app e no WhatsApp. A mesma ideia serve para vender, alertar suporte ou o time interno.",
        },
        {
          company: "Layback Trading",
          role: "Engenheiro de software e produto",
          period: "2022 — agora",
          body: "Front da plataforma white-label (100k+ usuários/dia), API NestJS e motor de bots em Rust num prazo regulatório, e uma simulação financeira que precisava filtrar 30GB+ sem pedir mais máquina — e muito mais.",
        },
        {
          company: "Goalfy",
          role: "Engenheiro de software — front-end",
          period: "2021 — 2022",
          body: "Fluxo de pagamento e assinatura na Stripe, e um fluxograma em react-flow, para a conversão parar de travar no meio do caminho.",
        },
      ],
      navAbout: "Sobre",
      navWork: "Portfólio",
      navExperience: "Experiência",
      navContact: "Contato",
      photoAlt: "Retrato de Vinícius Hack",
      photoCard: "Aberto a conversar",
      themeToDark: "Ativar modo escuro",
      themeToLight: "Ativar modo claro",
    },
    lang: {
      label: "Idioma",
      pt: "PT-BR",
      en: "EN",
    },
    hero: {
      index: "Perfil / 2026",
      name: "Vinícius Hack",
      thesis:
        "Eu construo produtos do zero à produção. Traduzo necessidade de negócio em software que as pessoas usam. IA entra no ciclo para acelerar — não para entregar qualquer coisa.",
      location: "Balneário Camboriú, SC",
      year: "2026",
      nowLabel: "Agora",
      now: ["Layback", "MyTribe", "Your Daily Cards"],
      talk: "Conversar",
    },
    thinking: {
      index: "01 / Ofício",
      title: "Como penso.",
      lead: "O currículo lista o que foi feito. Aqui está o critério.",
      principles: [
        {
          title: "Produto antes de ticket",
          body: "Eu sento com o cliente, alinho expectativa e só então escrevo código. Feature que não existe no mundo não conta.",
        },
        {
          title: "IA como ciclo, não como truque",
          body: "Do blank ao deploy com a mesma barra: teste, review, refatoração, observabilidade. A ferramenta encurta o caminho. Não baixa o padrão.",
        },
        {
          title: "Trade-off explícito",
          body: "POC documentada para decidir — o que ganha, o que se perde, o que fica para depois. Impressionar a sala não é um resultado.",
        },
        {
          title: "Prazo é arquitetura",
          body: "Três meses e uma lei no calendário mudam o desenho. O exemplo não é o bullet. É o produto que substituiu o que a regra não aceitava mais.",
        },
      ],
      cardLabel: "Carta do ofício",
      cardNext: "Próxima carta",
      cards: [
        {
          title: "Senta com quem vai usar",
          body: "Descoberta não é cerimônia. É entender o que o negócio precisa e devolver uma função que existe de verdade.",
        },
        {
          title: "A IA não assina o deploy",
          body: "Eu uso o fluxo assistido para ir mais rápido. Qualidade, revisão e observabilidade continuam sendo minhas.",
        },
        {
          title: "Mostra o custo da escolha",
          body: "Toda arquitetura fecha uma porta. Eu deixo isso escrito antes de alguém descobrir na sexta à noite.",
        },
        {
          title: "O calendário desenha o sistema",
          body: "Quando o prazo é real, modularidade e clareza não são luxo. São o que permite entregar e continuar.",
        },
        {
          title: "Rigor sem pose",
          body: "Uma medalha de ouro na OBMEP não é o ponto. O ponto é tratar o problema até ele caber numa decisão.",
        },
      ],
    },
    work: {
      index: "02 / Produtos",
      title: "O que construí.",
      lead: "Não é uma linha do tempo de cargos. São os produtos que tirei do papel.",
      open: "Abrir",
      close: "Fechar",
      visit: "Ver o produto",
      items: [
        {
          id: "alento",
          title: "Alento Foto & Filme",
          metric: "freela",
          body: "Site de fotografia e filmagem de casamento: portfólio, galerias e orçamento. Um freela do rascunho aos clientes usando.",
          href: "https://alentofotoefilme.com.br",
        },
        {
          id: "mytribe",
          title: "MyTribe",
          metric: "iOS / Android",
          body: "App de comunidades digitais: pessoas por cidade, mensagem, RSVP, push. Backend no Supabase, admin em Next.js com Stripe, convite com deep link. Eu queria um produto em que a conversa tenha para onde ir.",
          href: "https://my-tribe-landing.vercel.app/",
        },
        {
          id: "cards",
          title: "Your Daily Cards",
          metric: "app store",
          body: "Hábitos e intenções viram a mão do dia e missões aleatórias com XP. Sem conta, sem servidor, PT e EN. O app cabe no aparelho — e essa restrição é o produto.",
          href: "https://apps.apple.com/app/id6767341939",
        },
        {
          id: "bot",
          title: "Layback App / Bot",
          metric: "desktop",
          body: "Sem Rust e sem app nativo no currículo, arquitetei a API NestJS e o motor de bots em Rust para um prazo regulatório. O produto central não-conforme saiu. Entrou uma versão modular, que a regra aceita e o usuário consegue customizar.",
          href: "https://www.layback.trade/ptBR/layback-bot",
        },
        {
          id: "simulation",
          title: "Layback Backtest",
          metric: "full-stack",
          body: "Do zero à produção: dados ao vivo no Firebase, fila BullMQ, CRUD no Postgres. O gargalo era filtrar histórico demais. Resolvi com consulta e algoritmo — não com mais máquina.",
          href: "https://backtest.layback.trade/",
        },
        {
          id: "automatize",
          title: "Automatize",
          metric: "IA",
          body: "Um agente para o cliente leigo criar, pausar e ler campanha de tráfego pago — no app ou no WhatsApp. A tese que eu defendi: o mesmo agente pode vender; outro pode alertar suporte e o time interno.",
          href: "https://www.automatizemarketing.com/",
        },
        {
          id: "whitelabel",
          title: "Layback White-label",
          metric: "consultoria",
          body: "A Layback era contratada por outra software house — dona do back-end. Eu fiquei com o front e o backoffice, e falava direto com o stakeholder de lá. White-label de alto volume: o problema não era tela, era o dia, o cliente e a operação ao mesmo tempo.",
        },
        {
          id: "goalfy",
          title: "Goalfy",
          metric: "front-end",
          body: "Uma linha do passado que ainda importa: o fluxo de pagamento e assinatura na Stripe, e um fluxograma em react-flow, para a conversão parar de travar no meio do caminho.",
          href: "https://goalfy.com.br/",
        },
      ],
    },
    talk: {
      index: "03 / Presença",
      title: "Vamos conversar.",
      body: "Aberto a uma conversa — um produto travado, um time que precisa de alguém que tire do papel, ou uma parceria que ainda não tem nome.",
      emailLabel: "Escreva",
      email: "viniciuswhack@gmail.com",
      linksLabel: "Por aí",
    },
    footer: {
      rights: "© 2026 Vinícius Hack",
      place: "Balneário Camboriú, SC",
    },
    notFound: {
      title: "Esta página não está aqui.",
      body: "O endereço mudou ou nunca existiu.",
      back: "Voltar ao início",
    },
    hack: {
      trigger: "Abrir o easter egg do sobrenome Hack",
      eyebrow: "sobrenome / de verdade",
      title: "Você achou o Hack.",
      lines: [
        "$ quem_é_você",
        "vinícius. o hack é o sobrenome.",
        "$ vai_me_hackear?",
        "não. eu não vou te hackear.",
        "$ o_que_você_hackeia?",
        "a velocidade de entrega. se precisar, conta comigo.",
      ],
      dismiss: "esc ou clique para voltar",
    },
    error: {
      title: "Esta página não carregou.",
      body: "Algo falhou do nosso lado. Vale tentar de novo.",
      retry: "Tentar de novo",
      back: "Voltar ao início",
    },
    socials: [...SOCIALS],
  },
  en: {
    meta: {
      title: "Vinícius Hack — software and product engineer",
      description:
        "Software and product engineer in Balneário Camboriú. Builds apps and platforms from zero to production, with AI in the loop and a direct line to the business.",
    },
    skip: "Skip to content",
    nav: {
      thinking: "Craft",
      work: "Work",
      talk: "Talk",
      sections: "Sections",
      versions: "Versions",
    },
    versions: {
      title: "Other skins.",
      lead: "The same craft. Several languages — from a classic portfolio to a raw page.",
      current: "Editorial — the first one",
      meta: {
        title: "Site versions — Vinícius Hack",
        description:
          "The same craft in other visual languages: studio, editorial, noir and brutal.",
      },
      editorial: {
        name: "Editorial",
        tag: "The original. Paper, serif, numbered sections.",
      },
      noir: {
        name: "Noir",
        tag: "Navy, one mint accent, a fixed rail. Brittany Chiang.",
      },
      brutal: {
        name: "Brutal",
        tag: "Thick border, electric yellow, a hard offset shadow.",
      },
      studio: {
        name: "Studio",
        tag: "A classic developer portfolio. Projects, stack, and experience.",
      },
    },
    studio: {
      hello: "Hi, I am",
      role: "Software and product engineer",
      headline: "From idea to launch — software people actually use.",
      ctaWork: "View portfolio",
      calendly: "Book 30 min",
      available: "Open to a conversation",
      aboutEyebrow: "About",
      aboutTitle: "Who I am.",
      aboutBody:
        "I have been a hired developer since 2021 (I wrote my first line of code in 2019) and, on the side, I build my own apps and apps for clients (freelance). What I care about is the path. Sit with the problem, pick the right tool, and ship something people actually use — that also creates business value.",
      skillsTitle: "Stack",
      skills: [
        { group: "Front", items: ["TypeScript", "React", "Next.js", "Tailwind"] },
        { group: "Back", items: ["NestJS", "Rust", "Postgres", "Firebase", "Supabase", "BullMQ"] },
        { group: "Mobile & product", items: ["Expo", "React Native", "Stripe", "AI (Agent)"] },
      ],
      workEyebrow: "Portfolio",
      workTitle: "Selected work.",
      workLead: "Pick a project to see the cover and the story.",
      projectLink: "View project",
      experienceEyebrow: "Experience",
      experienceTitle: "Where I have worked.",
      jobs: [
        {
          company: "Automatize",
          role: "Software and product engineer",
          period: "July 2026 — present",
          body: "An agent so a non-technical customer can create, pause, and read paid-traffic campaigns — in the app and on WhatsApp. The same idea can sell, alert support, or brief the internal team.",
        },
        {
          company: "Layback Trading",
          role: "Software and product engineer",
          period: "2022 — present",
          body: "Front of the white-label platform (100k+ users/day), a NestJS API and Rust bot engine against a regulatory deadline, and a financial simulation that had to filter 30GB+ without asking for more machines — and much more.",
        },
        {
          company: "Goalfy",
          role: "Software engineer — front-end",
          period: "2021 — 2022",
          body: "The Stripe payment and subscription flow, and a react-flow diagram, so conversion stopped dying in the middle of the path.",
        },
      ],
      navAbout: "About",
      navWork: "Work",
      navExperience: "Experience",
      navContact: "Contact",
      photoAlt: "Portrait of Vinícius Hack",
      photoCard: "Open to chat",
      themeToDark: "Turn on dark mode",
      themeToLight: "Turn on light mode",
    },
    lang: {
      label: "Language",
      pt: "PT-BR",
      en: "EN",
    },
    hero: {
      index: "Profile / 2026",
      name: "Vinícius Hack",
      thesis:
        "I take products from a blank page to production. I turn a business need into software people actually use. AI speeds the cycle — it does not lower the bar.",
      location: "Balneário Camboriú, Brazil",
      year: "2026",
      nowLabel: "Now",
      now: ["Layback", "MyTribe", "Your Daily Cards"],
      talk: "Start a conversation",
    },
    thinking: {
      index: "01 / Craft",
      title: "How I think.",
      lead: "A résumé lists what shipped. This is the standard behind it.",
      principles: [
        {
          title: "Product before tickets",
          body: "I sit with the customer, align the expectation, then write the code. A feature that never meets the world does not count.",
        },
        {
          title: "AI as a cycle, not a trick",
          body: "Blank page to deploy, same bar: tests, review, refactor, observability. The tool shortens the path. It does not drop the standard.",
        },
        {
          title: "Make the trade-off visible",
          body: "A documented POC exists to decide — what we gain, what we lose, what waits. Impressing the room is not a result.",
        },
        {
          title: "The deadline is the architecture",
          body: "Three months and a law on the calendar change the design. The point is not the bullet. It is the product that replaced what the rule would no longer accept.",
        },
      ],
      cardLabel: "A card from the craft",
      cardNext: "Next card",
      cards: [
        {
          title: "Sit with the person who will use it",
          body: "Discovery is not ceremony. It is understanding what the business needs and returning a function that actually exists.",
        },
        {
          title: "AI does not sign the deploy",
          body: "I use an assisted workflow to move faster. Quality, review, and observability stay mine.",
        },
        {
          title: "Show the cost of the choice",
          body: "Every architecture closes a door. I write that down before someone finds it on a Friday night.",
        },
        {
          title: "The calendar draws the system",
          body: "When the date is real, modularity and clarity are not luxuries. They are how you ship and keep going.",
        },
        {
          title: "Rigor without the pose",
          body: "A gold medal at OBMEP is not the point. The point is staying with a problem until it fits a decision.",
        },
      ],
    },
    work: {
      index: "02 / Work",
      title: "What I built.",
      lead: "Not a job timeline. The products I took from a blank page to the world.",
      open: "Open",
      close: "Close",
      visit: "See the product",
      items: [
        {
          id: "alento",
          title: "Alento Foto & Filme",
          metric: "freelance",
          body: "A wedding photography and film site: portfolio, galleries, and a quote request. A freelance job from a draft to clients using it.",
          href: "https://alentofotoefilme.com.br",
        },
        {
          id: "mytribe",
          title: "MyTribe",
          metric: "iOS / Android",
          body: "A social app for digital communities: people by city, messaging, RSVP, push. Supabase on the back, a Next.js admin with Stripe, invites with deep links. I wanted a product where the conversation has somewhere to go.",
          href: "https://my-tribe-landing.vercel.app/",
        },
        {
          id: "cards",
          title: "Your Daily Cards",
          metric: "app store",
          body: "Habits and intentions become a daily hand and timed missions with XP. No account, no server, PT and EN. The app lives on the phone — and that constraint is the product.",
          href: "https://apps.apple.com/app/id6767341939",
        },
        {
          id: "bot",
          title: "Layback App / Bot",
          metric: "desktop",
          body: "With no Rust and no native app on my résumé, I designed the NestJS API and a Rust bot engine against a regulatory deadline. The non-compliant core came out. A modular version went in — one the rule accepts and the user can actually shape.",
          href: "https://www.layback.trade/ptBR/layback-bot",
        },
        {
          id: "simulation",
          title: "Layback Backtest",
          metric: "full-stack",
          body: "Zero to production: live data on Firebase, a BullMQ queue, CRUD on Postgres. The bottleneck was filtering too much history. I fixed it with queries and algorithms — not with more machines.",
          href: "https://backtest.layback.trade/",
        },
        {
          id: "automatize",
          title: "Automatize",
          metric: "AI",
          body: "An agent so a non-technical customer can create, pause, and read paid-traffic campaigns — in the app or on WhatsApp. The case I made: the same agent can sell; another can alert support and the internal team.",
          href: "https://www.automatizemarketing.com/",
        },
        {
          id: "whitelabel",
          title: "Layback White-label",
          metric: "consulting",
          body: "Layback was hired by another software company that owned the backend. I ran the front and the backoffice, and talked straight to their stakeholder. High-volume white-label: the job was not screens — it was the day, the customer, and the operation at once.",
        },
        {
          id: "goalfy",
          title: "Goalfy",
          metric: "front-end",
          body: "One line from earlier that still matters: the Stripe payment and subscription flow, and a react-flow diagram, so conversion stopped dying in the middle of the path.",
          href: "https://goalfy.com.br/",
        },
      ],
    },
    talk: {
      index: "03 / Presence",
      title: "Let's talk.",
      body: "Open to a conversation — a stuck product, a team that needs someone who will take it off the page, or a partnership that does not have a name yet.",
      emailLabel: "Write",
      email: "viniciuswhack@gmail.com",
      linksLabel: "Elsewhere",
    },
    footer: {
      rights: "© 2026 Vinícius Hack",
      place: "Balneário Camboriú, Brazil",
    },
    notFound: {
      title: "This page is not here.",
      body: "The address moved, or it never existed.",
      back: "Back to the start",
    },
    hack: {
      trigger: "Open the Hack surname easter egg",
      eyebrow: "surname / for real",
      title: "You found the Hack.",
      lines: [
        "$ who_are_you",
        "vinícius. hack is the last name.",
        "$ are_you_going_to_hack_me?",
        "no. i'm not going to hack you.",
        "$ what_do_you_hack?",
        "delivery speed. if you need that, count on me.",
      ],
      dismiss: "esc or click to go back",
    },
    error: {
      title: "This page did not load.",
      body: "Something failed on our side. Worth trying again.",
      retry: "Try again",
      back: "Back to the start",
    },
    socials: [...SOCIALS],
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "pt-BR" || value === "en";
}
