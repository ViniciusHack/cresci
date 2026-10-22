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
      title: "Vinícius Wilbert Hack, engenheiro de software e produto",
      description:
        "Engenheiro de software em Balneário Camboriú, Santa Catarina. Faço apps próprios e para clientes desde 2021, da ideia ao lançamento.",
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
      title: "Outras versões do site.",
      lead: "O mesmo conteúdo em quatro visuais diferentes, do portfólio clássico a uma página brutalista.",
      current: "Editorial, a primeira",
      meta: {
        title: "Versões do site · Vinícius Hack",
        description:
          "O mesmo site em outros visuais. Studio, editorial, noir e brutal.",
      },
      editorial: {
        name: "Editorial",
        tag: "A versão original, com papel, serifa e seções numeradas.",
      },
      noir: {
        name: "Noir",
        tag: "Azul-marinho, um detalhe verde-menta e menu fixo na lateral. Inspirada no site da Brittany Chiang.",
      },
      brutal: {
        name: "Brutal",
        tag: "Borda grossa, amarelo forte e sombra dura.",
      },
      studio: {
        name: "Studio",
        tag: "Portfólio clássico de desenvolvedor, com projetos, stack e experiência.",
      },
    },
    studio: {
      hello: "Oi, eu sou",
      role: "Engenheiro de software e produto",
      headline: "Tiro ideias do papel e coloco no ar, para clientes e para mim.",
      ctaWork: "Ver portfólio",
      calendly: "Agendar 30 min",
      available: "Aberto a uma conversa",
      aboutEyebrow: "Sobre",
      aboutTitle: "Quem sou.",
      aboutBody:
        "Me chamo Vinícius Wilbert Hack e sou engenheiro de software em Balneário Camboriú, Santa Catarina. Programo desde 2019, trabalho contratado desde 2021 e, por fora, faço apps próprios e freelas para clientes. Gosto de sentar com o problema, escolher a ferramenta certa e entregar algo que as pessoas usem e que dê resultado para o negócio.",
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
          period: "Julho 2026 até hoje",
          body: "Um agente para o cliente leigo criar, pausar e acompanhar campanhas de tráfego pago, no app e no WhatsApp. A mesma base serve para vender ou para avisar o suporte e o time interno.",
        },
        {
          company: "Layback Trading",
          role: "Engenheiro de software e produto",
          period: "2022 até hoje",
          body: "Front da plataforma white-label, com mais de 100 mil usuários por dia. Também fiz a API em NestJS e o motor de bots em Rust para cumprir um prazo regulatório, e uma simulação financeira que filtra mais de 30 GB sem precisar de uma máquina maior.",
        },
        {
          company: "Goalfy",
          role: "Engenheiro de software, front-end",
          period: "2021 a 2022",
          body: "Fiz o fluxo de pagamento e assinatura na Stripe e um fluxograma em react-flow, para a conversão parar de travar no meio do caminho.",
        },
      ],
      navAbout: "Sobre",
      navWork: "Portfólio",
      navExperience: "Experiência",
      navContact: "Contato",
      photoAlt: "Retrato de Vinícius Wilbert Hack, engenheiro de software em Balneário Camboriú",
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
        "Construo produtos do zero até estarem em produção e entendo o que o negócio precisa antes de escrever código. Uso IA para ir mais rápido, com os mesmos testes e revisão de sempre.",
      location: "Balneário Camboriú, SC",
      year: "2026",
      nowLabel: "Agora",
      now: ["Layback", "MyTribe"],
      talk: "Conversar",
    },
    thinking: {
      index: "01 / Ofício",
      title: "Como penso.",
      lead: "O currículo mostra o que eu fiz. Aqui estão os critérios que eu uso.",
      principles: [
        {
          title: "Produto antes de ticket",
          body: "Sento com o cliente, alinho o que ele espera e só depois escrevo código. Feature que não chega em quem usa não conta.",
        },
        {
          title: "IA com o mesmo padrão de qualidade",
          body: "Do primeiro arquivo ao deploy eu mantenho teste, review, refatoração e observabilidade. A IA encurta o caminho sem baixar esse padrão.",
        },
        {
          title: "Trade-off explícito",
          body: "Antes de decidir, faço uma POC documentada com o que se ganha, o que se perde e o que fica para depois.",
        },
        {
          title: "O prazo muda o desenho",
          body: "Três meses e uma lei no calendário mudam a arquitetura. Foi o que aconteceu no Layback Bot, que substituiu o produto que a regra não aceitava mais.",
        },
      ],
      cardLabel: "Carta do ofício",
      cardNext: "Próxima carta",
      cards: [
        {
          title: "Senta com quem vai usar",
          body: "A descoberta serve para entender o que o negócio precisa e entregar uma função que as pessoas usem.",
        },
        {
          title: "A IA não assina o deploy",
          body: "Uso o fluxo assistido para ir mais rápido. Qualidade, revisão e observabilidade continuam sendo responsabilidade minha.",
        },
        {
          title: "Mostra o custo da escolha",
          body: "Toda arquitetura fecha uma porta. Eu deixo isso escrito antes de alguém descobrir na sexta à noite.",
        },
        {
          title: "Prazo apertado pede código modular",
          body: "Com prazo apertado, código modular e claro é o que deixa entregar agora e continuar mexendo depois.",
        },
        {
          title: "Ficar no problema",
          body: "Ganhei medalha de ouro na OBMEP. O que levo disso é trabalhar um problema até ele virar uma decisão.",
        },
      ],
    },
    work: {
      index: "02 / Produtos",
      title: "O que construí.",
      lead: "Os produtos que tirei do papel, meus e de clientes.",
      open: "Abrir",
      close: "Fechar",
      visit: "Ver o produto",
      items: [
        {
          id: "alento",
          title: "Alento Foto & Filme",
          metric: "freela",
          body: "Site de fotografia e filme de casamento com um sistema interno próprio. A Alento monta a galeria de cada casal no painel, e o casal vê, compartilha e baixa tudo no site deles.",
          href: "/projetos/alento",
        },
        {
          id: "mytribe",
          title: "MyTribe",
          metric: "iOS / Android",
          body: "App de comunidades por cidade, com mensagens, RSVP de eventos e push. Backend no Supabase, admin em Next.js com Stripe e convite por deep link. Eu queria um produto em que a conversa tivesse para onde ir.",
          href: "https://usemytribe.com/",
        },
        {
          id: "ritmo",
          title: "Ritmo",
          metric: "Mac + iPhone",
          body: "App nativo que mede sozinho o uso do computador e do celular, aprende como costuma ser a sua semana e avisa na hora certa, com um coach que mostra quando o que você está fazendo não é a sua prioridade. Os dados ficam no aparelho, sem servidor.",
          href: "/projetos/ritmo",
        },
        {
          id: "lume",
          title: "Lume",
          metric: "agente",
          body: "Agente de Mac e iPhone que compara o que você disse que ia fazer com o que você está fazendo. Se os dois se afastam, ele aparece enquanto ainda dá tempo de voltar.",
          href: "/projetos/lume",
        },
        {
          id: "financehub",
          title: "Finance Hub",
          metric: "IA",
          body: "Agregador financeiro com Open Finance, cotações, patrimônio, fluxo de caixa e plano de aportes. Todo dia o Claude lê os dados e escreve a análise do mês em blocos visuais.",
          href: "/projetos/finance-hub",
        },
        {
          id: "bot",
          title: "Layback App / Bot",
          metric: "desktop",
          body: "Eu nunca tinha feito Rust nem app nativo e arquitetei a API em NestJS e o motor de bots em Rust para cumprir um prazo regulatório. O produto principal, que não seguia a regra nova, foi substituído por uma versão modular que a regra aceita e que o usuário consegue personalizar.",
          href: "https://www.layback.trade/ptBR/layback-bot",
        },
        {
          id: "simulation",
          title: "Layback Backtest",
          metric: "full-stack",
          body: "Fiz do zero até produção, com dados ao vivo no Firebase, fila no BullMQ e CRUD no Postgres. O gargalo era filtrar histórico demais, e resolvi com consulta e algoritmo, sem aumentar a máquina.",
          href: "https://backtest.layback.trade/",
        },
        {
          id: "automatize",
          title: "Automatize",
          metric: "IA",
          body: "Um agente para o cliente leigo criar, pausar e acompanhar campanhas de tráfego pago, no app ou no WhatsApp. Eu defendi que o mesmo agente pode vender e que outro pode avisar o suporte e o time interno.",
          href: "https://www.automatizemarketing.com/",
        },
        {
          id: "whitelabel",
          title: "Layback White-label",
          metric: "consultoria",
          body: "A Layback era contratada por outra software house, dona do back-end. Eu fiquei com o front e o backoffice e falava direto com o stakeholder de lá. Era white-label de alto volume, então além das telas eu lidava com o cliente e com a operação do dia a dia.",
        },
        {
          id: "goalfy",
          title: "Goalfy",
          metric: "front-end",
          body: "Fiz o fluxo de pagamento e assinatura na Stripe e um fluxograma em react-flow, para a conversão parar de travar no meio do caminho.",
          href: "https://goalfy.com.br/",
        },
      ],
    },
    talk: {
      index: "03 / Presença",
      title: "Vamos conversar.",
      body: "Topo conversar em Balneário Camboriú ou remoto. Pode ser um produto travado, um time que precisa de alguém para tirar uma ideia do papel ou uma parceria que ainda não tem nome.",
      emailLabel: "Escreva",
      email: "viniciuswhack@gmail.com",
      linksLabel: "Por aí",
    },
    footer: {
      rights: "© 2026 Vinícius Hack",
      place: "Balneário Camboriú, Santa Catarina",
    },
    notFound: {
      title: "Esta página não está aqui.",
      body: "O endereço mudou ou nunca existiu.",
      back: "Voltar ao início",
    },
    hack: {
      trigger: "Abrir o easter egg do sobrenome Hack",
      eyebrow: "sobrenome / não é apelido",
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
      title: "Vinícius Wilbert Hack, software and product engineer",
      description:
        "Software engineer in Balneário Camboriú, Santa Catarina, Brazil. I have built my own apps and apps for clients since 2021, from idea to launch.",
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
      title: "Other versions of the site.",
      lead: "The same content in four different looks, from a classic portfolio to a brutalist page.",
      current: "Editorial, the first one",
      meta: {
        title: "Site versions · Vinícius Hack",
        description:
          "The same site in other looks. Studio, editorial, noir and brutal.",
      },
      editorial: {
        name: "Editorial",
        tag: "The original, with paper, a serif and numbered sections.",
      },
      noir: {
        name: "Noir",
        tag: "Navy, a mint accent and a fixed side menu. Inspired by Brittany Chiang's site.",
      },
      brutal: {
        name: "Brutal",
        tag: "Thick borders, bright yellow and a hard shadow.",
      },
      studio: {
        name: "Studio",
        tag: "A classic developer portfolio with projects, stack and experience.",
      },
    },
    studio: {
      hello: "Hi, I am",
      role: "Software and product engineer",
      headline: "I take ideas off the page and ship them, for clients and for myself.",
      ctaWork: "View portfolio",
      calendly: "Book 30 min",
      available: "Open to a conversation",
      aboutEyebrow: "About",
      aboutTitle: "Who I am.",
      aboutBody:
        "I'm Vinícius Wilbert Hack, a software engineer in Balneário Camboriú, Santa Catarina, Brazil. I have been programming since 2019 and working as a hired developer since 2021, and on the side I build my own apps and freelance for clients. I like to sit with the problem, pick the right tool and ship something people use and that helps the business.",
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
          period: "July 2026 to now",
          body: "An agent that lets a non-technical customer create, pause and check paid-traffic campaigns in the app and on WhatsApp. The same base can sell, or alert support and the internal team.",
        },
        {
          company: "Layback Trading",
          role: "Software and product engineer",
          period: "2022 to now",
          body: "Front end of the white-label platform, with over 100k users a day. I also built the NestJS API and the Rust bot engine to meet a regulatory deadline, and a financial simulation that filters over 30 GB without a bigger machine.",
        },
        {
          company: "Goalfy",
          role: "Software engineer, front end",
          period: "2021 to 2022",
          body: "I built the Stripe payment and subscription flow and a react-flow diagram, so conversion stopped stalling halfway.",
        },
      ],
      navAbout: "About",
      navWork: "Work",
      navExperience: "Experience",
      navContact: "Contact",
      photoAlt: "Portrait of Vinícius Wilbert Hack, software engineer in Balneário Camboriú",
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
        "I build products from scratch to production and figure out what the business needs before writing code. I use AI to move faster, with the same tests and review as always.",
      location: "Balneário Camboriú, Brazil",
      year: "2026",
      nowLabel: "Now",
      now: ["Layback", "MyTribe"],
      talk: "Start a conversation",
    },
    thinking: {
      index: "01 / Craft",
      title: "How I think.",
      lead: "A résumé shows what I did. These are the criteria I use.",
      principles: [
        {
          title: "Product before tickets",
          body: "I sit with the customer, align what they expect, and only then write code. A feature that never reaches the people who use it does not count.",
        },
        {
          title: "AI with the same quality bar",
          body: "From the first file to deploy I keep tests, review, refactoring and observability. AI shortens the path without lowering that bar.",
        },
        {
          title: "Make the trade-off visible",
          body: "Before deciding, I build a documented POC with what we gain, what we lose and what waits for later.",
        },
        {
          title: "The deadline changes the design",
          body: "Three months and a law on the calendar change the architecture. That happened with the Layback Bot, which replaced the product the rule no longer accepted.",
        },
      ],
      cardLabel: "A card from the craft",
      cardNext: "Next card",
      cards: [
        {
          title: "Sit with the person who will use it",
          body: "Discovery is for understanding what the business needs and shipping a function people will use.",
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
          title: "A tight deadline needs modular code",
          body: "With a tight deadline, modular and clear code is what lets you ship now and keep changing it later.",
        },
        {
          title: "Staying with the problem",
          body: "I won a gold medal at OBMEP. What I took from it is working a problem until it turns into a decision.",
        },
      ],
    },
    work: {
      index: "02 / Work",
      title: "What I built.",
      lead: "The products I took off the page, mine and for clients.",
      open: "Open",
      close: "Close",
      visit: "See the product",
      items: [
        {
          id: "alento",
          title: "Alento Foto & Filme",
          metric: "freelance",
          body: "A wedding photo and film site with its own internal system. Alento builds each couple's gallery in the panel, and couples view, share and download everything on Alento's own site. (Case study in Portuguese.)",
          href: "/projetos/alento",
        },
        {
          id: "mytribe",
          title: "MyTribe",
          metric: "iOS / Android",
          body: "A community app by city, with messaging, event RSVPs and push. Supabase on the back, a Next.js admin with Stripe, and invites by deep link. I wanted a product where the conversation had somewhere to go.",
          href: "https://usemytribe.com/",
        },
        {
          id: "ritmo",
          title: "Ritmo",
          metric: "Mac + iPhone",
          body: "A native app that tracks computer and phone use on its own, learns your typical week and nudges at the right time, with a coach that shows when what you're doing isn't your priority. Data stays on the device, with no server. (Case study in Portuguese.)",
          href: "/projetos/ritmo",
        },
        {
          id: "lume",
          title: "Lume",
          metric: "agent",
          body: "A Mac and iPhone agent that compares what you said you'd do with what you're doing. When they drift apart, it shows up while there's still time to get back on track. (Case study in Portuguese.)",
          href: "/projetos/lume",
        },
        {
          id: "financehub",
          title: "Finance Hub",
          metric: "AI",
          body: "A finance aggregator with Open Finance, quotes, net worth, cash flow and a monthly investing plan. Every day, Claude reads the data and writes the month's analysis as visual blocks. (Case study in Portuguese.)",
          href: "/projetos/finance-hub",
        },
        {
          id: "bot",
          title: "Layback App / Bot",
          metric: "desktop",
          body: "I had never written Rust or a native app, and I designed the NestJS API and the Rust bot engine to meet a regulatory deadline. The main product, which didn't follow the new rule, was replaced by a modular version the rule accepts and users can customize.",
          href: "https://www.layback.trade/ptBR/layback-bot",
        },
        {
          id: "simulation",
          title: "Layback Backtest",
          metric: "full-stack",
          body: "I built it from scratch to production, with live data on Firebase, a BullMQ queue and CRUD on Postgres. The bottleneck was filtering too much history, and I solved it with queries and algorithms instead of a bigger machine.",
          href: "https://backtest.layback.trade/",
        },
        {
          id: "automatize",
          title: "Automatize",
          metric: "AI",
          body: "An agent that lets a non-technical customer create, pause and check paid-traffic campaigns in the app or on WhatsApp. I argued that the same agent could sell, and that another one could alert support and the internal team.",
          href: "https://www.automatizemarketing.com/",
        },
        {
          id: "whitelabel",
          title: "Layback White-label",
          metric: "consulting",
          body: "Layback was hired by another software company that owned the backend. I took the front end and the backoffice and talked directly to their stakeholder. It was high-volume white-label, so besides the screens I dealt with the customer and the daily operation.",
        },
        {
          id: "goalfy",
          title: "Goalfy",
          metric: "front-end",
          body: "I built the Stripe payment and subscription flow and a react-flow diagram, so conversion stopped stalling halfway.",
          href: "https://goalfy.com.br/",
        },
      ],
    },
    talk: {
      index: "03 / Presence",
      title: "Let's talk.",
      body: "Happy to talk in Balneário Camboriú or remotely. It could be a stuck product, a team that needs someone to get an idea off the page, or a partnership that doesn't have a name yet.",
      emailLabel: "Write",
      email: "viniciuswhack@gmail.com",
      linksLabel: "Elsewhere",
    },
    footer: {
      rights: "© 2026 Vinícius Hack",
      place: "Balneário Camboriú, Santa Catarina, Brazil",
    },
    notFound: {
      title: "This page is not here.",
      body: "The address moved, or it never existed.",
      back: "Back to the start",
    },
    hack: {
      trigger: "Open the Hack surname easter egg",
      eyebrow: "surname / not a nickname",
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
