export type Tag = string;

export type Option = {
  id: string;
  label: string;
  hint?: string;
  tags: Tag[];
};

export type Question =
  | {
      kind: "multi";
      id: string;
      phase: string;
      title: string;
      intro: string;
      max?: number;
      options: Option[];
    }
  | {
      kind: "single";
      id: string;
      phase: string;
      title: string;
      intro: string;
      options: Option[];
    }
  | {
      kind: "scale";
      id: string;
      phase: string;
      title: string;
      intro: string;
      leftLabel: string;
      rightLabel: string;
      leftTags: Tag[];
      rightTags: Tag[];
    };

export const questions: Question[] = [
  {
    kind: "multi",
    id: "areas",
    phase: "Fase 01 • Territórios",
    title: "Quais assuntos você continua procurando sem ninguém pedir?",
    intro:
      "Interesse verdadeiro é aquilo que você lê no fim do dia, quando já não há obrigação nenhuma.",
    max: 4,
    options: [
      { id: "ciencia", label: "Ciência e natureza", hint: "Biologia, física, clima, o funcionamento das coisas vivas.", tags: ["pesquisar", "abstrato", "conhecimento", "verdade"] },
      { id: "tecnologia", label: "Tecnologia e sistemas", hint: "Código, máquinas, automação, infraestruturas invisíveis.", tags: ["resolver", "abstrato", "sistemico", "criacao"] },
      { id: "pessoas", label: "Pessoas e comportamento", hint: "Psicologia, cultura, por que agimos como agimos.", tags: ["humano", "cuidar", "servico"] },
      { id: "arte", label: "Arte, narrativa e estética", hint: "Escrita, música, cinema, design, forma e sentido.", tags: ["criar", "estetico", "criacao", "beleza"] },
      { id: "sociedade", label: "Sociedade e instituições", hint: "Política, direito, economia, como se organiza o coletivo.", tags: ["sistemico", "impacto", "humano"] },
      { id: "negocios", label: "Negócios e empreendimento", hint: "Vendas, mercados, montar um negócio, o jogo de criar valor.", tags: ["impacto", "dinheiro", "variedade", "criar", "mercado"] },
      { id: "corpo", label: "Corpo, saúde e cuidado", hint: "Medicina, movimento, alimentação, sofrimento e alívio.", tags: ["cuidar", "servico", "humano"] },
      { id: "materia", label: "Matéria e ofício manual", hint: "Construir, cozinhar, plantar, consertar, dar forma ao mundo físico.", tags: ["material", "criar", "oficio"] },
      { id: "ideias", label: "Filosofia e ideias fundamentais", hint: "Sentido, ética, linguagem, as perguntas que não fecham.", tags: ["abstrato", "verdade", "conhecimento", "pesquisar"] },
    ],
  },
  {
    kind: "multi",
    id: "verbos",
    phase: "Fase 02 • Verbos",
    title: "Qual é o verbo do seu dia bom?",
    intro:
      "Menos importante do que o assunto é o gesto: o que suas mãos e sua atenção estavam fazendo quando o tempo passou sem você notar.",
    max: 2,
    options: [
      { id: "descobrir", label: "Descobrir", hint: "Ir atrás do que ninguém entendeu ainda.", tags: ["descobrir", "pesquisar", "conhecimento"] },
      { id: "aplicar", label: "Aplicar", hint: "Levar o que você sabe a um caso concreto e ver se funciona.", tags: ["aplicar", "conhecimento", "oficio"] },
      { id: "criar", label: "Criar", hint: "Fazer existir algo que não existia.", tags: ["criar", "criacao", "autoria"] },
      { id: "transmitir", label: "Transmitir", hint: "Fazer o difícil chegar ao outro, com clareza.", tags: ["transmitir", "comunicar", "servico"] },
      { id: "cuidar", label: "Cuidar", hint: "Sustentar alguém num momento frágil.", tags: ["cuidar", "servico", "humano"] },
    ],
  },
  {
    kind: "multi",
    id: "problemas",
    phase: "Fase 03 • Dificuldade",
    title: "Que tipos de problemas fazem seus olhos brilharem?",
    intro:
      "O trabalho não é apenas o que você faz, mas a dificuldade que você aceita carregar com prazer.",
    max: 2,
    options: [
      { id: "abstratos", label: "Problemas abstratos", hint: "Teorias, lógica pura e sistemas invisíveis que organizam o caos.", tags: ["abstrato", "resolver", "conhecimento"] },
      { id: "humanos", label: "Problemas humano-centrados", hint: "Mediar conflitos, entender emoções e desenhar soluções para o bem-estar social.", tags: ["humano", "cuidar", "servico"] },
      { id: "materiais", label: "Problemas materiais", hint: "Construir, consertar, otimizar recursos físicos e transformar a matéria.", tags: ["material", "construir", "oficio"] },
      { id: "expressivos", label: "Problemas de expressão", hint: "Encontrar a forma exata para dizer algo que ainda está informe.", tags: ["estetico", "criar", "comunicar"] },
      { id: "institucionais", label: "Problemas institucionais", hint: "Incentivos torcidos, processos lentos, coisas grandes que emperram.", tags: ["sistemico", "organizar", "impacto"] },
    ],
  },
  {
    kind: "multi",
    id: "ambientes",
    phase: "Fase 04 • Ambiente",
    title: "Em que mundo esse trabalho deveria aterrissar?",
    intro:
      "Assunto e gesto ainda não são um ofício. O ofício aparece quando eles encontram um chão concreto — uma escola, um hospital, uma empresa, uma bancada.",
    max: 3,
    options: [
      { id: "educacao", label: "Educação e formação", hint: "Escola, universidade, curso, alguém aprendendo.", tags: ["transmitir", "servico", "conhecimento"] },
      { id: "saude", label: "Saúde e cuidado", hint: "Clínica, saúde mental, corpo, sofrimento e alívio.", tags: ["cuidar", "humano", "servico", "local"] },
      { id: "tech_produto", label: "Tecnologia e produto", hint: "Ferramentas, software, startups, sistemas que outras pessoas usam.", tags: ["aplicar", "criar", "sistemico"] },
      { id: "investigacao", label: "Ciência e investigação", hint: "Bancada, campo, arquivo — produzir conhecimento público.", tags: ["pesquisar", "conhecimento", "verdade", "abstrato"] },
      { id: "midia", label: "Mídia e cultura", hint: "Texto, imagem, som, palco — o trabalho precisa ser visto ou lido.", tags: ["comunicar", "estetico", "criar", "autoria"] },
      { id: "vida_publica", label: "Instituições e vida pública", hint: "Estado, direito, políticas, organizações que duram mais que um projeto.", tags: ["sistemico", "impacto", "organizar", "estavel"] },
      { id: "mercado", label: "Empresas e mercado", hint: "Finanças, produtividade, clientes, o jogo econômico.", tags: ["impacto", "dinheiro", "variedade"] },
      { id: "fe", label: "Fé e sentido", hint: "Religião, comunidades de prática, as perguntas últimas no chão da vida.", tags: ["vocacao", "verdade", "servico"] },
      { id: "oficio_local", label: "Ofício com endereço", hint: "Oficina, consultório, horta, bairro — o trabalho tem lugar.", tags: ["oficio", "local", "material"] },
    ],
  },
  {
    kind: "scale",
    id: "pessoas_contato",
    phase: "Fase 05 • Presença",
    title: "Quanto contato humano você quer no seu dia?",
    intro:
      "Há trabalhos que só acontecem em silêncio e trabalhos que só acontecem entre pessoas.",
    leftLabel: "Trabalho quieto, poucas interações",
    rightLabel: "Pessoas o tempo todo",
    leftTags: ["pessoas_baixa", "profundidade"],
    rightTags: ["pessoas_alta", "comunicar", "humano"],
  },
  {
    kind: "single",
    id: "vida",
    phase: "Fase 06 • Estilo de vida",
    title: "Que desenho de vida você quer sustentar?",
    intro:
      "Não é só o conteúdo do trabalho. É o formato dos dias: onde você está, como o tempo se organiza, o que sobra à noite.",
    options: [
      { id: "rotina", label: "Raiz e rotina", hint: "Mesmo lugar, semana previsível, o corpo reconhece os dias.", tags: ["estavel", "local"] },
      { id: "estudio", label: "Espaço próprio", hint: "Ateliê, consultório, oficina ou casa-trabalho. Você manda no ritmo, mas fica.", tags: ["autonomia", "oficio", "local"] },
      { id: "transito", label: "Em trânsito", hint: "Cidade, cliente e endereço mudam. O trabalho acompanha você.", tags: ["nomade", "liberdade", "variedade"] },
      { id: "sazonal", label: "Sazonal", hint: "Meses de imersão quase total, depois folga ou outro modo de viver.", tags: ["intenso", "profundidade", "liberdade"] },
    ],
  },
  {
    kind: "multi",
    id: "dores",
    phase: "Fase 07 • Preço",
    title: "Quais dores você aceita enfrentar?",
    intro:
      "Toda escolha vem com um sofrimento embutido. Escolher bem é escolher qual sofrimento faz sentido.",
    max: 3,
    options: [
      { id: "incerteza", label: "Renda incerta", hint: "Meses bons e meses magros.", tags: ["autonomia", "liberdade", "criacao"] },
      { id: "burocracia", label: "Burocracia e lentidão", hint: "Instituições que se movem devagar.", tags: ["sistemico", "estavel", "impacto"] },
      { id: "solidao", label: "Solidão de trabalho", hint: "Horas longas sozinho com um problema.", tags: ["profundidade", "pessoas_baixa", "pesquisar"] },
      { id: "critica", label: "Exposição e crítica pública", hint: "Ser lido, visto e julgado.", tags: ["autoria", "comunicar", "estetico"] },
      { id: "emocional", label: "Peso emocional dos outros", hint: "Absorver dor alheia com regularidade.", tags: ["cuidar", "humano", "servico"] },
      { id: "repeticao", label: "Repetição e treino longo", hint: "Anos de exercício antes da maestria.", tags: ["oficio", "profundidade", "conhecimento"] },
      { id: "fisica", label: "Cansaço físico", hint: "Corpo em uso, mãos sujas, pé no chão.", tags: ["material", "construir", "oficio"] },
    ],
  },
  {
    kind: "single",
    id: "papel",
    phase: "Fase 08 • Lugar do trabalho",
    title: "Que papel o trabalho deve ter na sua vida?",
    intro: "Nenhuma dessas respostas é superior. Elas apenas pedem coisas diferentes de você.",
    options: [
      { id: "meio", label: "Meio de vida", hint: "Sustenta o que realmente importa, que está fora do trabalho.", tags: ["meio_de_vida", "estavel", "dinheiro"] },
      { id: "oficio", label: "Ofício", hint: "Algo que eu quero fazer cada vez melhor, com orgulho técnico.", tags: ["oficio", "profundidade", "autoria"] },
      { id: "vocacao", label: "Vocação", hint: "Um chamado: sinto que devo isso a alguém ou a algo.", tags: ["vocacao", "servico", "impacto"] },
      { id: "identidade", label: "Eixo de identidade", hint: "Não sei me separar do que faço.", tags: ["identidade", "autoria", "criacao"] },
    ],
  },
  {
    kind: "multi",
    id: "motivos",
    phase: "Fase 09 • Motivos",
    title: "Por que, no fundo, você trabalha?",
    intro:
      "Escolha os motivos que sobreviveriam se ninguém estivesse olhando.",
    max: 3,
    options: [
      { id: "dinheiro", label: "Dinheiro", hint: "Segurança, folga, poder escolher.", tags: ["dinheiro", "estavel"] },
      { id: "liberdade", label: "Liberdade", hint: "Mandar no próprio tempo.", tags: ["liberdade", "autonomia", "nomade"] },
      { id: "conhecimento", label: "Conhecimento", hint: "Entender mais hoje do que ontem.", tags: ["conhecimento", "pesquisar", "profundidade"] },
      { id: "criacao", label: "Criação", hint: "Deixar objetos e obras no mundo.", tags: ["criacao", "criar", "autoria"] },
      { id: "servico", label: "Serviço", hint: "Ser útil a quem está perto.", tags: ["servico", "cuidar", "local"] },
      { id: "impacto", label: "Impacto", hint: "Mudar algo em escala.", tags: ["impacto", "sistemico", "global"] },
      { id: "verdade", label: "Verdade", hint: "Não suportar o falso.", tags: ["verdade", "pesquisar", "abstrato"] },
      { id: "beleza", label: "Beleza", hint: "Que a forma importe.", tags: ["beleza", "estetico", "criar"] },
    ],
  },
];

export type Path = {
  id: string;
  title: string;
  combination: string;
  description: string;
  tags: Tag[];
  fields: string[];
};

export const paths: Path[] = [
  {
    id: "arquiteto-social",
    title: "O arquiteto de sistemas sociais",
    combination: "Autonomia × problemas institucionais × impacto amplo",
    description:
      "Você não quer atender casos isolados: quer mexer na engrenagem que produz os casos. Um caminho que mistura pesquisa aplicada, desenho de processos e política pública.",
    tags: ["sistemico", "impacto", "organizar", "autonomia", "global", "humano", "vida_publica"],
    fields: ["Design de políticas", "Urbanismo e cidades", "Gestão pública", "Economia aplicada"],
  },
  {
    id: "pesquisador-autor",
    title: "O pesquisador com voz própria",
    combination: "Profundidade × verdade × autoria",
    description:
      "Investigar por anos uma pergunta estreita e depois escrever sobre ela de um jeito que atravesse. Meio acadêmico, meio autoral: o rigor sustenta o texto.",
    tags: ["pesquisar", "profundidade", "verdade", "conhecimento", "autoria", "abstrato", "solidao", "investigacao"],
    fields: ["Pesquisa acadêmica", "Jornalismo de longa duração", "Ensaio e não-ficção", "Divulgação científica"],
  },
  {
    id: "artesao-tecnico",
    title: "O artesão técnico",
    combination: "Ofício × matéria × autonomia local",
    description:
      "Trabalho com começo, meio e fim visíveis. Uma oficina própria, poucos clientes, qualidade reconhecível. A maestria vem do tempo, não da escala.",
    tags: ["oficio", "material", "construir", "autonomia", "local", "profundidade", "beleza", "oficio_local"],
    fields: ["Ofícios especializados", "Restauro e marcenaria", "Cozinha autoral", "Agricultura e paisagismo"],
  },
  {
    id: "criador-sistemas",
    title: "O criador de sistemas",
    combination: "Aplicar × abstrato × criação",
    description:
      "Você gosta do momento em que uma ideia abstrata começa a funcionar sozinha. Construir ferramentas que outras pessoas usam todos os dias sem pensar em você.",
    tags: ["resolver", "abstrato", "criacao", "sistemico", "criar", "aplicar", "autonomia", "tech_produto"],
    fields: ["Engenharia de software", "Produto e ferramentas", "Automação", "Arquitetura de dados"],
  },
  {
    id: "tradutor",
    title: "O tradutor de mundos difíceis",
    combination: "Transmitir × conhecimento",
    description:
      "Sua vantagem é entender coisas complexas e devolvê-las simples sem falsificá-las. Um papel de ponte entre especialistas e todos os outros.",
    tags: ["transmitir", "comunicar", "conhecimento", "pessoas_alta", "estetico", "variedade", "educacao", "midia"],
    fields: ["Educação e formação", "Comunicação científica", "Editoria", "Design de conteúdo"],
  },
  {
    id: "cuidador-clinico",
    title: "O cuidador com método",
    combination: "Cuidar × pessoas × uma vida por vez",
    description:
      "Um trabalho que só existe na presença: acompanhar alguém por meses ou anos e ver mudança real. Alto peso emocional, retorno concreto.",
    tags: ["cuidar", "humano", "servico", "pessoas_alta", "local", "emocional", "profundidade", "saude"],
    fields: ["Clínica e saúde", "Psicologia", "Terapias corporais", "Acompanhamento social"],
  },
  {
    id: "autor-forma",
    title: "O autor de formas",
    combination: "Criar × beleza × exposição aceita",
    description:
      "A forma não é enfeite: é o próprio conteúdo do seu trabalho. Você aceita ser julgado publicamente em troca de assinar o que faz.",
    tags: ["criar", "estetico", "beleza", "autoria", "criacao", "critica", "identidade", "midia"],
    fields: ["Design", "Escrita e literatura", "Cinema e audiovisual", "Música"],
  },
  {
    id: "generalista",
    title: "O generalista de projetos",
    combination: "Variedade × liberdade × muitos contextos",
    description:
      "Você entra em problemas diferentes, aprende rápido, entrega e sai. O risco é a superficialidade; a força é ver padrões que especialistas não veem.",
    tags: ["variedade", "generalista", "liberdade", "nomade", "resolver", "pessoas_alta", "incerteza", "mercado"],
    fields: ["Consultoria independente", "Gestão de projetos", "Estratégia", "Empreendedorismo"],
  },
  {
    id: "guardiao-instituicao",
    title: "O guardião de instituição",
    combination: "Estabilidade × serviço × paciência com burocracia",
    description:
      "Nem todo impacto é criado: parte dele é sustentado. Fazer uma instituição funcionar bem é um trabalho invisível e enorme.",
    tags: ["estavel", "servico", "organizar", "burocracia", "meio_de_vida", "sistemico", "local", "vida_publica", "educacao"],
    fields: ["Serviço público", "Direito", "Administração", "Educação institucional"],
  },
  {
    id: "explorador-fronteira",
    title: "O explorador de fronteira",
    combination: "Descobrir × incerteza aceita × campo novo",
    description:
      "Você prefere territórios sem mapa, onde ainda não há carreira definida. Combina risco financeiro alto com curiosidade que não desliga.",
    tags: ["descobrir", "incerteza", "conhecimento", "autonomia", "criacao", "variedade", "global", "investigacao", "tech_produto"],
    fields: ["Pesquisa aplicada", "Novas tecnologias", "Projetos independentes", "Trabalho de campo"],
  },
];

export const traitLabels: Record<string, string> = {
  autonomia: "Autonomia",
  colaboracao: "Colaboração",
  autoria: "Autoria",
  profundidade: "Profundidade",
  variedade: "Variedade",
  generalista: "Generalista",
  pessoas_alta: "Muita gente",
  pessoas_baixa: "Trabalho quieto",
  sistemico: "Visão sistêmica",
  humano: "Foco humano",
  material: "Mundo material",
  abstrato: "Pensamento abstrato",
  estetico: "Sensibilidade estética",
  oficio: "Ofício",
  local: "Escala local",
  global: "Escala ampla",
  estavel: "Estabilidade",
  nomade: "Mobilidade",
  intenso: "Ciclos intensos",
  dinheiro: "Dinheiro",
  liberdade: "Liberdade",
  conhecimento: "Conhecimento",
  criacao: "Criação",
  servico: "Serviço",
  impacto: "Impacto",
  verdade: "Verdade",
  beleza: "Beleza",
  cuidar: "Cuidado",
  criar: "Criar",
  resolver: "Resolver",
  aplicar: "Aplicar",
  descobrir: "Descobrir",
  transmitir: "Transmitir",
  comunicar: "Comunicar",
  pesquisar: "Pesquisar",
  organizar: "Organizar",
  construir: "Construir",
  vocacao: "Chamado",
  identidade: "Identidade",
  meio_de_vida: "Meio de vida",
  incerteza: "Tolerância à incerteza",
  burocracia: "Paciência institucional",
  solidao: "Concentração solitária",
  critica: "Exposição pública",
  emocional: "Resistência emocional",
  repeticao: "Disciplina de treino",
  fisica: "Trabalho físico",
  educacao: "Educação",
  saude: "Saúde",
  tech_produto: "Produto e tecnologia",
  investigacao: "Investigação",
  midia: "Mídia",
  vida_publica: "Vida pública",
  mercado: "Mercado",
  negocios: "Negócios",
  fe: "Fé e sentido",
  oficio_local: "Ofício local",
};

export const motiveIds = [
  "dinheiro",
  "liberdade",
  "conhecimento",
  "criacao",
  "servico",
  "impacto",
  "verdade",
  "beleza",
];
