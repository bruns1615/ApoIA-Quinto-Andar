import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Coins, 
  Clock, 
  Users, 
  Copy, 
  Check, 
  RefreshCw, 
  BookOpen, 
  Volume2, 
  Target, 
  MessageSquare, 
  Play, 
  HelpCircle, 
  Key, 
  ChevronRight, 
  GraduationCap, 
  Award, 
  Info, 
  Flame, 
  AlertCircle,
  TrendingUp,
  FileText,
  Search,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- DEFINIÇÕES DE INTERFACES E TIPOS ---

interface Alternative {
  tecnica: string;
  script: string;
  psicologia: string;
  acaoFechamento: string;
}

interface ObjectionPreset {
  id: string;
  category: string;
  label: string;
  text: string;
  alternatives: Alternative[];
}

interface TrainerScenario {
  id: string;
  objection: string;
  category: string;
  options: {
    id: string;
    technique: string;
    script: string;
    isBest: boolean;
    reason: string;
  }[];
}

interface FrameworkInfo {
  name: string;
  tagline: string;
  description: string;
  example: string;
  howToUse: string;
}

// --- BANCO DE DADOS LOCAL DE OBJEÇÕES E CONTORNOS ---

const OBJECTION_PRESETS: ObjectionPreset[] = [
  {
    id: 'price-1',
    category: 'Preço',
    label: 'Está muito caro / Sem orçamento',
    text: 'O seu produto/serviço está muito caro, nós não temos orçamento para esse investimento agora.',
    alternatives: [
      {
        tecnica: 'Feel-Felt-Found (Sentir-Sentiu-Encontrou)',
        script: 'Eu entendo perfeitamente que o orçamento esteja apertado. Outros clientes do seu segmento sentiram exatamente a mesma preocupação com o preço no início. No entanto, o que eles descobriram após a implementação foi que a automatização de tarefas reduziu o custo operacional em 35%, fazendo com que o sistema se pagasse integralmente logo nas primeiras 4 semanas de uso.',
        psicologia: 'Valida a emoção do cliente reduzindo barreiras de atrito através da prova social indireta (outras pessoas sentiram o mesmo e tiveram sucesso).',
        acaoFechamento: 'Faria sentido analisar juntos uma simulação de retorno sobre o investimento específica para o seu volume atual?'
      },
      {
        tecnica: 'Isolamento de Objeção (Método Sandler)',
        script: 'Compreendo perfeitamente. Se nós deixarmos a questão do investimento de lado por apenas um momento... Você sente que a nossa solução é exatamente o que você precisa para eliminar os gargalos e vazamentos de leads que você me contou que tem hoje?',
        psicologia: 'Isola o preço de outras objeções ocultas (como falta de confiança ou utilidade). Se o cliente concordar que o produto é ideal, a conversa vira uma simples negociação de fluxo de caixa.',
        acaoFechamento: 'Se o orçamento for a única barreira real, podemos conversar sobre alternativas de parcelamento customizadas para caber no fluxo deste mês?'
      },
      {
        tecnica: 'Inversão de Perspectiva (Boomerang)',
        script: 'Se o orçamento é o seu maior desafio hoje, é exatamente por isso que você precisa começar. Quanto mais tempo sua equipe passar perdendo horas preciosas em processos manuais ineficientes, mais orçamento e dinheiro você continuará perdendo todos os meses. Começar hoje é o que vai gerar a economia necessária para recuperar seu orçamento.',
        psicologia: 'Transforma a própria objeção do cliente na razão principal pela qual ele deve contratar a solução imediatamente.',
        acaoFechamento: 'Podemos começar com um escopo inicial reduzido focado apenas no seu principal gargalo para acelerar essa economia?'
      }
    ]
  },
  {
    id: 'time-1',
    category: 'Tempo',
    label: 'Não tenho tempo agora / Agenda cheia',
    text: 'Estou extremamente sem tempo agora com outros projetos. Fale comigo no próximo trimestre.',
    alternatives: [
      {
        tecnica: 'Desafio Consultivo de Urgência (SPIN Selling)',
        script: 'Entendo que a sua agenda está cheia. Mas deixe-me te fazer uma pergunta: se adiarmos essa implementação em 3 meses, quanto tempo e energia sua equipe continuará gastando com esse problema que estamos tentando resolver? Se iniciarmos agora, não seria justamente o caminho para você liberar essas horas valiosas da sua agenda ainda este mês?',
        psicologia: 'Faz o lead refletir sobre o custo da inação. Adiar a solução só prolonga o próprio problema de falta de tempo.',
        acaoFechamento: 'Para não sobrecarregar sua rotina, nossa equipe faz 90% do setup inicial. Faria sentido termos uma chamada rápida de 5 minutos na próxima terça apenas para eu te guiar pelo roteiro de transição rápida?'
      },
      {
        tecnica: 'Técnica do Micro-compromisso',
        script: 'Compreendo perfeitamente, tempo é o recurso mais escasso hoje. Justamente por isso, eu não quero tomar o seu tempo com reuniões longas. O que eu sugiro é uma chamada ultrarrápida de exatamente 5 minutos. Vou projetar apenas a tela com os 3 pontos críticos de otimização que preparei para o seu negócio. Se após esses 5 minutos você achar que não agrega valor, eu não volto a te ligar.',
        psicologia: 'Reduz o "custo cognitivo" percebido da interação ao mínimo absoluto, facilitando um "sim" para um micro-compromisso de baixo risco.',
        acaoFechamento: 'Temos um espaço disponível na quarta-feira às 14h ou prefere na sexta-feira às 10h para essa rápida validação?'
      }
    ]
  },
  {
    id: 'trust-1',
    category: 'Sócio / Autoridade',
    label: 'Preciso falar com o sócio / chefe',
    text: 'Gostei muito, mas preciso apresentar para o meu sócio e para a diretoria antes de fecharmos.',
    alternatives: [
      {
        tecnica: 'Venda Consultiva Cooperativa',
        script: 'Excelente iniciativa! Sabe, seu sócio e a diretoria certamente farão perguntas muito técnicas sobre o retorno financeiro e segurança. Como eu sei que você está bastante ocupado, eu posso preparar um resumo de negócios personalizado, focado exclusivamente no ROI, para facilitar a sua apresentação para eles. O que você acha de nos aliarmos para garantir que eles enxerguem o mesmo valor que você viu?',
        psicologia: 'Transiciona o vendedor do papel de "negociador" para o papel de "aliado estratégico" do lead, ajudando-o a vender internamente.',
        acaoFechamento: 'Para te poupar trabalho, o que acha de eu participar dessa apresentação por 10 minutos apenas para tirar as dúvidas mais complexas de infraestrutura?'
      },
      {
        tecnica: 'Isolamento de Aprovação',
        script: 'Faria o mesmo no seu lugar, a opinião da diretoria é fundamental. Mas me diga, apenas para eu entender nosso alinhamento: se a decisão dependesse única e exclusivamente de você, você estaria pronto para começarmos essa parceria hoje?',
        psicologia: 'Qualifica o lead e descobre se ele é um verdadeiro promotor do seu produto ou se está apenas usando o sócio como desculpa polida para adiar.',
        acaoFechamento: 'Ótimo! Sendo assim, quais são as principais dúvidas ou objeções que você imagina que seu sócio possa levantar para que possamos nos antecipar a elas agora?'
      }
    ]
  },
  {
    id: 'comp-1',
    category: 'Concorrência',
    label: 'Já trabalho com concorrente / Mais barato',
    text: 'Nós já trabalhamos com a solução concorrente X e eles cobram metade do valor que vocês pediram.',
    alternatives: [
      {
        tecnica: 'Ancoragem de Qualidade vs. Custo Oculto',
        script: 'Eles de fato têm um valor nominal muito agressivo. Mas quando conversamos com empresas que migraram deles para nós, o que ouvimos é que a economia na mensalidade deles se perdia devido à alta taxa de instabilidade e à lentidão do suporte técnico, o que gerava prejuízos operacionais silenciosos. Você prefere uma mensalidade ligeiramente menor ou a tranquilidade de um suporte prioritário que resolve seus problemas em minutos e protege seu faturamento?',
        psicologia: 'Reenquadra o "preço barato" do concorrente como um risco severo à operação do próprio cliente, explorando o viés cognitivo de aversão à perda.',
        acaoFechamento: 'Faz sentido fazermos um teste gratuito de uma semana focado apenas na estabilidade para você comparar os dois na prática?'
      },
      {
        tecnica: 'Foco na Diferenciação de Valor',
        script: 'Entendo perfeitamente. O concorrente X é excelente para soluções genéricas. No entanto, o motivo de cobrarmos mais é que nós incluímos o módulo integrado de inteligência e acompanhamento consultivo mensal, algo que eles não oferecem. Se o seu objetivo atual é apenas reduzir despesas básicas, eles atendem bem; mas se o seu foco é aumentar a sua taxa de conversão em vendas, nós somos a única solução desenhada para isso.',
        psicologia: 'Evita a guerra de preços redefinindo a categoria. Mostra que o cliente estaria comparando "banana com maçã".',
        acaoFechamento: 'Você está buscando apenas um software de registro básico ou quer a nossa metodologia de aceleração de resultados?'
      }
    ]
  },
  {
    id: 'email-1',
    category: 'Proposta por E-mail',
    label: 'Me mande tudo por e-mail',
    text: 'Pode me mandar todos os detalhes, preços e propostas por e-mail? Eu dou uma olhada e te respondo.',
    alternatives: [
      {
        tecnica: 'Qualificação de Interesse & Customização',
        script: 'Claro, posso mandar sim! Mas para eu evitar te encher de e-mails com propostas genéricas de 20 páginas que não se aplicam ao seu dia a dia: quais são as 2 principais prioridades ou dúvidas que você gostaria de ver respondidas detalhadamente nesse documento?',
        psicologia: 'Quebra o hábito do lead de dar uma desculpa polida de "me mande um e-mail" para se livrar do vendedor. Obriga-o a engajar e indicar o real interesse.',
        acaoFechamento: 'Se eu te enviar uma proposta simplificada de 1 página focada exatamente nessas duas prioridades hoje, podemos agendar 5 minutos na quinta-feira às 14h apenas para eu te guiar pelas opções de implementação?'
      },
      {
        tecnica: 'Contorno de Valor síncrono',
        script: 'Com certeza, envio agora mesmo para o seu e-mail. No entanto, por experiência, eu sei que propostas de valores frias por escrito costumam parecer muito mais complexas de implementar do que realmente são na prática. Que tal darmos uma olhada rápida de 3 minutos na tela juntos agora mesmo, enquanto o e-mail chega, para eu te resumir o escopo principal?',
        psicologia: 'Tira vantagem do momentum quente do contato telefônico ou chat em vez de deixar a venda "esfriar" em uma caixa de entrada lotada.',
        acaoFechamento: 'Vou abrir meu painel aqui rápido para te mostrar, você prefere que eu foque na parte técnica ou comercial nesses 3 minutos?'
      }
    ]
  }
];

// --- SCENARIOS DE TREINAMENTO (GAMIFICAÇÃO) ---

const TRAINER_SCENARIOS: TrainerScenario[] = [
  {
    id: 'scen-1',
    objection: 'O cliente cruza os braços e diz: "Eu adorei sua demonstração, mas o seu preço é 40% superior ao meu orçamento anual disponível."',
    category: 'Preço',
    options: [
      {
        id: 'opt-1a',
        technique: 'Dar desconto imediato',
        script: 'Tudo bem! Se você fechar comigo agora, eu consigo falar com meu gerente e aplicar exatamente um desconto de 40% para bater o seu orçamento. Vamos assinar?',
        isBest: false,
        reason: 'Dar um desconto gigantesco de imediato destrói totalmente o seu valor percebido e a sua autoridade. O cliente vai achar que você estava cobrando caro de propósito ou que seu produto não vale nada.'
      },
      {
        id: 'opt-1b',
        technique: 'Isolamento de Objeção',
        script: 'Entendo perfeitamente, o orçamento é uma diretriz séria. Mas me ajude a compreender: se o investimento estivesse perfeitamente alinhado com o seu teto anual, você daria o sinal verde para começarmos essa operação hoje?',
        isBest: true,
        reason: 'Excelente escolha! Esta técnica isola o fator financeiro. Se o cliente disser "sim", você sabe que o valor do produto foi vendido com sucesso e agora é apenas uma negociação técnica de prazos, escopos ou condições.'
      },
      {
        id: 'opt-1c',
        technique: ' Confrontar o cliente',
        script: 'Mas veja bem, nosso produto é muito melhor que os outros. Se você quer resultado de verdade, você precisa pagar mais. O barato sai caro no final.',
        isBest: false,
        reason: 'Adotar uma postura combativa ou arrogante quebra o rapport instantaneamente e coloca o cliente em uma posição defensiva.'
      }
    ]
  },
  {
    id: 'scen-2',
    objection: 'O lead de vendas B2B diz no chat: "Estou muito corrido hoje com o fechamento do trimestre. Me manda a proposta por e-mail que se eu gostar eu te ligo."',
    category: 'Proposta por E-mail',
    options: [
      {
        id: 'opt-2a',
        technique: 'Envio passivo',
        script: 'Perfeito! Vou anexar o PDF de 30 páginas e enviar agora mesmo para o seu e-mail. Fico no aguardo do seu retorno!',
        isBest: false,
        reason: 'O envio passivo tem uma taxa de resposta menor que 5%. O e-mail se tornará apenas mais um spam na caixa de entrada superlotada do lead ocupado.'
      },
      {
        id: 'opt-2b',
        technique: 'Qualificação de Interesse & Agendamento Prévio',
        script: 'Claro, posso mandar sim! Mas para poupar o seu tempo e não encher sua caixa com páginas genéricas: qual é o principal problema operacional que você gostaria de ver precificado no e-mail? Assim que eu enviar, podemos agendar 5 minutos na quinta às 15h apenas para validar os números juntos?',
        isBest: true,
        reason: 'Sensacional! Você demonstra respeito ao tempo dele, filtra curiosos ao pedir que ele defina o foco do e-mail, e já pré-agenda um acompanhamento síncrono para a proposta não morrer no limbo.'
      },
      {
        id: 'opt-2c',
        technique: 'Insistir agressivamente',
        script: 'Não faça isso! E-mails nunca funcionam. Você precisa me dar 15 minutos agora mesmo ou vai perder o desconto exclusivo que acaba hoje!',
        isBest: false,
        reason: 'Pressionar o cliente ignorando sua rotina declarada causa antipatia imediata e queima permanentemente a oportunidade comercial.'
      }
    ]
  },
  {
    id: 'scen-3',
    objection: 'O cliente diz: "Eu já uso a ferramenta X, o plano deles cobre quase a mesma coisa e custa metade do preço de vocês."',
    category: 'Concorrência',
    options: [
      {
        id: 'opt-3a',
        technique: 'Falar mal do concorrente',
        script: 'A ferramenta X é horrível, vive caindo e o suporte deles não funciona de jeito nenhum. Se você continuar com eles, sua empresa vai quebrar.',
        isBest: false,
        reason: 'Falar mal diretamente da concorrência faz o vendedor parecer desesperado e pouco ético. Além disso, ofende indiretamente a decisão anterior do cliente de contratá-los.'
      },
      {
        id: 'opt-3b',
        technique: 'Concordar com o cliente',
        script: 'É verdade, eles são muito baratos mesmo. Nós somos mais caros porque somos maiores. Se você acha que o preço deles é melhor, talvez seja melhor continuar com eles.',
        isBest: false,
        reason: 'Desistir e concordar com a inferioridade de valor destrói qualquer chance de venda e aceita a commoditização do seu serviço.'
      },
      {
        id: 'opt-3c',
        technique: 'Foco na Diferenciação & Custo Oculto',
        script: 'Eles têm um preço atrativo mesmo. Mas o motivo de termos clientes migrando deles para nós é que a economia nominal deles gera custos ocultos com retrabalho técnico e falta de suporte em tempo real. Você prefere economizar na mensalidade ou garantir uma entrega sem falhas que protege seu faturamento final?',
        isBest: true,
        reason: 'Perfeito! Você reconhece a concorrência sem atacá-la vulgarmente, e introduz de forma brilhante o conceito de "custos ocultos" e "segurança", elevando a conversa do preço básico para o valor de longo prazo.'
      }
    ]
  }
];

// --- DICIONÁRIO DE GLOSSÁRIO DE TÉCNICAS (PSICOLOGIA DE VENDAS) ---

const FAMOUS_FRAMEWORKS: FrameworkInfo[] = [
  {
    name: 'Feel-Felt-Found (Sentir-Sentiu-Encontrou)',
    tagline: 'A rainha da empatia e da prova social',
    description: 'Um método clássico de comunicação em 3 passos projetado para neutralizar a resistência defensiva do cliente através da identificação emocional e prova social.',
    example: '"Eu entendo como você se SENTTE [Feel]. Meus outros clientes também SENTIRAM [Felt] o mesmo no início sobre o valor. Mas o que eles DESCOBRIRAM [Found] foi que..."',
    howToUse: 'Use para objeções emocionais, medo de errar na compra ou ceticismo sobre a eficácia da solução.'
  },
  {
    name: 'Isolamento de Objeção (Sandler Selling)',
    tagline: 'Filtre as desculpas e encontre a barreira real',
    description: 'Técnica cirúrgica para separar "desculpas de fumaça" da barreira de compra real. Consiste em propor um cenário hipotético onde a objeção citada é removida para testar se há outros empecilhos.',
    example: '"Se deixarmos o fator [Preço/Tempo] de lado por um instante... Há algum outro detalhe que te impede de começarmos hoje?"',
    howToUse: 'Use sempre que desconfiar que o cliente está usando "preço" ou "tempo" apenas como uma desculpa polida para não dizer "não".'
  },
  {
    name: 'Método Boomerang (Reenquadramento de Objeção)',
    tagline: 'Transforme o obstáculo no motivo principal de compra',
    description: 'Consiste em capturar a objeção trazida pelo cliente e usá-la como a razão lógica exata pela qual ele deve prosseguir com a compra imediatamente.',
    example: '"É exatamente porque você não tem [Tempo/Orçamento] hoje que você precisa da nossa ferramenta, pois ela foi criada especificamente para liberar seu tempo..."',
    howToUse: 'Excelente para contornar desculpas crônicas de falta de tempo, falta de dinheiro ou falta de prioridade.'
  },
  {
    name: 'Investigação Socrática / SPIN Selling',
    tagline: 'Deixe que o cliente perceba o problema sozinho',
    description: 'Em vez de argumentar diretamente (o que gera resistência mecânica), você faz perguntas estratégicas de implicação que guiam a mente do cliente para calcular o enorme prejuízo financeiro ou operacional de continuar com o problema atual.',
    example: '"Qual é o custo real mensal para sua operação se continuarmos perdendo esses leads por falta de acompanhamento nos próximos 90 dias?"',
    howToUse: 'Altamente eficaz para leads frios que ainda não compreenderam o valor ou a urgência de resolver sua dor.'
  }
];

export default function App() {
  // --- ESTADOS DO DASHBOARD ---
  const [objectionInput, setObjectionInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Preço');
  const [selectedNiche, setSelectedNiche] = useState('B2B / SaaS');
  const [leadTemperature, setLeadTemperature] = useState('Morno');
  const [responseTone, setResponseTone] = useState('Persuasivo');
  
  // Resultados da geração
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedAlternatives, setGeneratedAlternatives] = useState<Alternative[]>(OBJECTION_PRESETS[0].alternatives);
  const [objectionAnalyzed, setObjectionAnalyzed] = useState(OBJECTION_PRESETS[0].text);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'trainer' | 'library'>('dashboard');

  // Copiado clipboard feedback
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Gemini API Configs
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('OBJECTION_GEMINI_API_KEY') || '';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [geminiError, setGeminiError] = useState<string | null>(null);

  // --- ESTADOS DO TREINADOR (JOGO/SIMULADOR) ---
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showTrainerFeedback, setShowTrainerFeedback] = useState(false);
  const [trainerScore, setTrainerScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  // Efeitos de Loading Text variados
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % 4);
    }, 900);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Carrega chave de API salva
  const handleSaveApiKey = (key: string) => {
    const cleanKey = key.trim();
    setGeminiApiKey(cleanKey);
    localStorage.setItem('OBJECTION_GEMINI_API_KEY', cleanKey);
    setIsSettingsOpen(false);
    setGeminiError(null);
  };

  const handleClearApiKey = () => {
    setGeminiApiKey('');
    localStorage.removeItem('OBJECTION_GEMINI_API_KEY');
    setGeminiError(null);
  };

  // --- ALGORITMO DUAL DE GERENCIA DE RESPOSTA (AI OU REGEX LOCAL) ---
  const handleAnalyzeObjection = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!objectionInput.trim()) return;

    setIsLoading(true);
    setLoadingStep(0);
    setGeminiError(null);

    // Se temos a API Key do Gemini, usamos inteligência real!
    if (geminiApiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`;
        const prompt = `Você é um psicólogo de vendas altamente experiente e especialista em persuasão avançada.
Analise a seguinte objeção que um vendedor acabou de receber de um cliente:
"${objectionInput}"

Contexto do Lead:
- Nicho de atuação: ${selectedNiche}
- Temperatura do Lead (Prontidão de compra): ${leadTemperature}
- Tom de comunicação preferencial para o roteiro: ${responseTone}

Sua tarefa é formular exatamente 3 alternativas/roteiros de contorno de objeção inovadores e altamente persuasivos baseados em psicologia aplicada e técnicas de negociação (como Sandler, SPIN Selling, Feel-Felt-Found, Challanger Sale, etc).

Você DEVE retornar a resposta EXATAMENTE no formato JSON com a estrutura especificada. Retorne apenas o JSON bruto válido, sem tags de marcação de código markdown como \`\`\`json no início ou fim.
Estrutura do JSON obrigatória:
{
  "alternativas": [
    {
      "tecnica": "Nome descritivo da técnica clássica ou combinada (ex: Isolamento Sandler + Urgência)",
      "script": "Roteiro exato e pronto em português para o vendedor falar ou enviar via Whatsapp/E-mail. Escreva no tom ${responseTone} solicitado e incorpore elementos do nicho ${selectedNiche}.",
      "psicologia": "Análise psicológica rápida e matadora de por que essa estrutura desarma a objeção na mente do cliente.",
      "acaoFechamento": "Uma frase de fechamento ou pergunta condicional recomendada para passar o controle do diálogo de volta ao vendedor."
    },
    {
      "tecnica": "...",
      "script": "...",
      "psicologia": "...",
      "acaoFechamento": "..."
    },
    {
      "tecnica": "...",
      "script": "...",
      "psicologia": "...",
      "acaoFechamento": "..."
    }
  ]
}`;

        // Simula o tempo mínimo de análise para fins estéticos de "brainstorm" do robô
        await new Promise(resolve => setTimeout(resolve, 1500));

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.7,
            }
          }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody?.error?.message || `Erro HTTP ${response.status}`);
        }

        const data = await response.json();
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textResult) {
          throw new Error("Resposta do modelo veio vazia.");
        }

        const cleanedJsonText = textResult.trim().replace(/^```json/i, '').replace(/```$/, '').trim();
        const parsedData = JSON.parse(cleanedJsonText);

        if (parsedData && Array.isArray(parsedData.alternativas)) {
          setGeneratedAlternatives(parsedData.alternativas);
          setObjectionAnalyzed(objectionInput);
        } else {
          throw new Error("Formato JSON retornado não possui o array 'alternativas'.");
        }
      } catch (err: any) {
        console.error("Falha ao consultar Gemini API:", err);
        setGeminiError(`Falha na API Gemini (${err.message || err}). Ativando nosso motor analítico heurístico local premium para garantir sua resposta instantaneamente!`);
        // Fallback para Heurística Local
        generateLocalHeuristics();
      } finally {
        setIsLoading(false);
      }
    } else {
      // Se não há API Key, roda o motor heurístico local super detalhado!
      await new Promise(resolve => setTimeout(resolve, 1800)); // Delay fidedigno para simular análise profunda
      generateLocalHeuristics();
      setIsLoading(false);
    }
  };

  // --- MOTOR HEURÍSTICO LOCAL DE ALTA ACURÁCIA (PORTUGUÊS) ---
  const generateLocalHeuristics = () => {
    const textLower = objectionInput.toLowerCase();
    let detectedTheme = 'general';

    // Heurística de palavras-chave
    if (/caro|preço|preco|orçamento|orcamento|dinheiro|investimento|cust|pagar|reais|desconto|grátis|gratis/i.test(textLower)) {
      detectedTheme = 'price';
    } else if (/tempo|agora|depois|hoje|mes|trimestre|busy|ocupado|agenda|esperar|atrasar/i.test(textLower)) {
      detectedTheme = 'time';
    } else if (/sócio|socio|chefe|esposa|marido|diretor|gerente|diretoria|aprova|decidir/i.test(textLower)) {
      detectedTheme = 'authority';
    } else if (/concorrente|concorrencia|outro|fornecedor|já uso|ja uso|ferramenta x/i.test(textLower)) {
      detectedTheme = 'competition';
    } else if (/email|e-mail|proposta|pdf|envia|manda|proposta/i.test(textLower)) {
      detectedTheme = 'email';
    }

    // Gerador de scripts baseados no tom selecionado
    const toneIntro = {
      Empático: 'Eu entendo perfeitamente o seu lado e concordo que cada centavo e minuto contam na sua operação atual de ' + selectedNiche + '.',
      Persuasivo: 'Compreendo sua colocação. Analisando as métricas de líderes de ' + selectedNiche + ', percebemos que o gargalo que você enfrenta é exatamente o que drena seu potencial.',
      Assertivo: 'Entendido. Sejamos práticos: o gargalo atual que você mencionou não vai sumir sozinho e está te custando caro todos os dias.',
      Consultivo: 'Perfeito. Quero dar um passo atrás e analisar os números: me ajude a entender como esse ponto específico impacta sua rotina hoje.'
    }[responseTone] || '';

    let alts: Alternative[] = [];

    if (detectedTheme === 'price') {
      alts = [
        {
          tecnica: 'Ancoragem de Valor & Reenquadramento de Dor',
          script: `${toneIntro} Se olharmos para o problema de "${objectionInput.substring(0, 40)}...", continuar perdendo tempo e retrabalho está custando ao seu caixa muito mais do que a nossa mensalidade. Investir agora na correção é estancar esse prejuízo invisível.`,
          psicologia: 'Desvia o foco da dor imediata do desembolso (preço) para a dor cumulativa de continuar perdendo faturamento (custo da inação).',
          acaoFechamento: 'Se pudermos diluir esse valor em um plano flexível de faturamento que proteja seu fluxo de caixa este mês, faria sentido darmos o primeiro passo?'
        },
        {
          tecnica: 'O Isolamento de Objeção Financeira',
          script: `${toneIntro} Deixando de lado o investimento monetário por apenas um momento... Você sente que a nossa proposta resolve perfeitamente a dor operacional que você tem hoje no nicho de ${selectedNiche}?`,
          psicologia: 'Técnica cirúrgica baseada em Sandler que isola a objeção. Se o cliente concordar que o valor do produto é real, a discussão deixa de ser se o produto presta e passa a ser apenas como viabilizar o pagamento.',
          acaoFechamento: 'Sendo assim, se encontrarmos uma forma de viabilizar a entrada no orçamento da equipe para este semestre, teríamos seu sinal verde?'
        },
        {
          tecnica: 'Feel-Felt-Found (Empatia e Prova Social)',
          script: `${toneIntro} Entendo que o investimento inicial assuste. Vários outros players de ${selectedNiche} sentiram exatamente a mesma hesitação financeira. No entanto, o que eles descobriram após 30 dias foi que o retorno sobre o investimento (ROI) veio em triplo graças à otimização.`,
          psicologia: 'Usa o viés de conformidade e prova social. Elimina o medo de tomar uma decisão financeira errada ao ver que outros estiveram no mesmo lugar e venceram.',
          acaoFechamento: 'Gostaria que eu te apresentasse o painel de métricas real de um desses parceiros similares para você avaliar a segurança desse investimento?'
        }
      ];
    } else if (detectedTheme === 'time') {
      alts = [
        {
          tecnica: 'Técnica do Micro-compromisso Reduzido',
          script: `${toneIntro} Entendo que você esteja sem tempo. Justamente por isso, eu não quero te vender nada longo agora. O que eu proponho é um compromisso de exatos 3 minutos. Vou te mandar um link com 2 perguntas rápidas. Se o resultado não te der um diagnóstico útil imediato, você pode me ignorar.`,
          psicologia: 'Utiliza a psicologia do micro-compromisso. É muito mais fácil para o cérebro do cliente dizer "sim" para um esforço de 3 minutos do que para uma reunião formal.',
          acaoFechamento: 'Faria sentido abrirmos esses 3 minutos agora mesmo na tela ou prefere que eu dispare pelo WhatsApp para você ver no carro?'
        },
        {
          tecnica: 'Boomerang de Escassez Temporal',
          script: `${toneIntro} É exatamente por você estar correndo e sem tempo que precisamos implantar isso logo. A razão de você estar atarefado hoje é que seus processos de ${selectedNiche} continuam manuais e ineficientes. Continuar adiando só vai garantir que você continue sem tempo no próximo trimestre.`,
          psicologia: 'Gera urgência ao provar matematicamente que o motivo para adiar (falta de tempo) é causado justamente pela falta da ferramenta que ele quer adiar.',
          acaoFechamento: 'Se nossa equipe técnica fizer 95% do setup de integração pesado para você sem exigir sua presença, podemos dar início à configuração inicial amanhã?'
        },
        {
          tecnica: 'Investigação do Custo do Atraso',
          script: `${toneIntro} Compreendo a prioridade dos seus projetos atuais. Mas me ajude a estimar: se esperarmos mais 90 dias para automatizar esses gargalos, quanto tempo a mais de estresse e perda de eficiência sua equipe terá acumulado até lá?`,
          psicologia: 'Ativa o gatilho de aversão à perda. Mostra que o tempo de espera não é gratuito, ele tem um preço operacional amargo.',
          acaoFechamento: 'Qual seria o dia mais seguro para conversarmos sobre um cronograma de transição suave em fases bem leves?'
        }
      ];
    } else if (detectedTheme === 'authority') {
      alts = [
        {
          tecnica: 'Aliança Estratégica (Co-vendedor)',
          script: `${toneIntro} Faria o mesmo no seu lugar, alinhar com os sócios e diretoria é vital. inclusive, eles certamente farão perguntas duras sobre retorno de investimento e custos de integração de ${selectedNiche}. Que tal nós nos unirmos? Eu posso preparar um relatório executivo de 1 página focado nas dores exatas que seu sócio mais quer resolver.`,
          psicologia: 'Traz o lead para o seu lado. Ele deixa de se sentir pressionado e passa a te ver como um colega de equipe ajudando-o a aprovar um projeto benéfico para a empresa.',
          acaoFechamento: 'Para facilitar seu trabalho, acha melhor eu te enviar esses slides de apoio em formato editável ou prefere que eu te acompanhe em uma chamada rápida de 8 minutos com eles?'
        },
        {
          tecnica: 'Isolamento de Intenção Pessoal',
          script: `${toneIntro} Compreendo a necessidade de aprovação. Mas me diga, apenas para eu garantir que estamos no mesmo barco: se a decisão dependesse exclusivamente do seu veredito pessoal, você defenderia a contratação da nossa solução hoje?`,
          psicologia: 'Ajuda a descobrir se a desculpa do sócio é real ou se o lead apenas não viu valor pessoal na solução. Revela o verdadeiro nível de engajamento.',
          acaoFechamento: 'Se você está entusiasmado com a ideia, qual é o principal argumento ou dúvida técnica que seu sócio costuma levantar para que possamos nos blindar agora?'
        }
      ];
    } else if (detectedTheme === 'competition') {
      alts = [
        {
          tecnica: 'Reenquadramento de Custo Total (TCO)',
          script: `${toneIntro} O concorrente realmente tem um valor de etiqueta mais baixo. Mas quando calculamos o Custo Total de Propriedade (TCO) de empresas de ${selectedNiche}, percebemos que o suporte demorado deles e a falta de recursos customizados gera um prejuízo operacional silencioso considerável. Você busca apenas a ferramenta mais barata ou a solução que gera maior retorno líquido para sua empresa no fim do mês?`,
          psicologia: 'Muda a conversa da economia superficial de assinatura para a produtividade real do negócio de ponta a ponta.',
          acaoFechamento: 'Se eu te provar matematicamente que nossa eficiência cobre com sobra essa diferença de valor nas primeiras semanas, faria sentido darmos uma chance a um teste de conceito rápido?'
        },
        {
          tecnica: 'Foco na Especialização e Recursos Exclusivos',
          script: `${toneIntro} Eles atendem muito bem demandas genéricas de mercado. No entanto, o motivo de marcas exigentes nos escolherem é que nós desenvolvemos módulos específicos de alta performance pensados para os desafios operacionais de ${selectedNiche}, garantindo uma vantagem que os sistemas genéricos de baixo custo simplesmente não oferecem.`,
          psicologia: 'Posiciona o seu produto como uma solução de alta costura / cirúrgica, rebaixando o concorrente a uma commodity genérica.',
          acaoFechamento: 'Faz sentido compararmos os relatórios de conversão de ambos para você entender onde está a diferença real de faturamento que geramos?'
        }
      ];
    } else if (detectedTheme === 'email') {
      alts = [
        {
          tecnica: 'Qualificação de Proposta Customizada',
          script: `${toneIntro} Envio a proposta sim, com todo prazer! Mas para eu não entupir sua caixa com um PDF genérico que não serve para o seu momento atual: quais são as 2 principais métricas ou dúvidas operacionais que você quer ver respondidas detalhadamente nesse arquivo?`,
          psicologia: 'Desarma o reflexo mecânico do cliente de "descartar" o vendedor solicitando um e-mail. Força-o a pensar sobre as suas reais prioridades.',
          acaoFechamento: 'Vou detalhar essas duas dúvidas agora. Se eu te mandar o PDF resumido de 1 página até o fim do dia, podemos fazer um alinhamento rápido de 5 minutos na quinta-feira às 11h apenas para fecharmos os termos?'
        },
        {
          tecnica: 'Exploração Síncrona de Valor',
          script: `${toneIntro} Claro, vou preparar e disparar. No entanto, propostas por escrito costumam parecer muito mais complexas e demoradas do que realmente são na vida real. Para você economizar 30 minutos lendo um documento frio: o que acha de darmos uma olhada rápida de 3 minutos na minha tela agora mesmo para eu destacar os 3 pontos mais cruciais de retorno do seu investimento?`,
          psicologia: 'Toma proveito do gatilho de momentum e urgência antes que o lead esfrie e a oportunidade se dissipe na caixa de entrada.',
          acaoFechamento: 'Já estou com o painel aberto aqui. Você prefere que eu te mostre o fluxo comercial ou a parte de relatórios integrados?'
        }
      ];
    } else {
      // Tema Geral / Inteligência de Adaptação Universal
      alts = [
        {
          tecnica: 'Método de Isolamento Direto',
          script: `${toneIntro} Entendo sua posição em relação a "${objectionInput}". Mas diga-me com toda franqueza: se nós resolvermos essa questão específica com uma flexibilização ou apoio técnico dedicado, haveria algum outro motivo para não fazermos negócios hoje?`,
          psicologia: 'Isola e desmascara qualquer resistência oculta, transformando uma barreira difusa em um plano de ação concreto e negociável.',
          acaoFechamento: 'O que seria necessário acontecer hoje para você se sentir 100% confortável em dar início a esse projeto conosco?'
        },
        {
          tecnica: 'Feel-Felt-Found Adaptado',
          script: `${toneIntro} Compreendo sua reação. É muito comum que outros profissionais do setor de ${selectedNiche} passem pelo mesmo questionamento sobre "${objectionInput}". Porém, o que eles descobriram na prática foi que superar essa fase inicial de transição abriu as portas para resultados incríveis de faturamento.`,
          psicologia: 'Usa a validação da preocupação do cliente para restabelecer rapport e segurança de grupo.',
          acaoFechamento: 'Gostaria de agendar uma breve conversa com nosso gerente de sucesso de clientes para entender como ajudamos outras marcas a superarem essa exata dor?'
        },
        {
          tecnica: 'Reenquadramento de Custo-Benefício Socrático',
          script: `${toneIntro} Se analisarmos a fundo essa questão de "${objectionInput}"... Qual você acredita que é o impacto financeiro de manter esse problema ativo por mais um ano no seu negócio de ${selectedNiche}? Mudar o cenário atual não traria mais benefícios do que manter o status quo confortável?`,
          psicologia: 'Usa o método socrático para fazer o cliente admitir, em suas próprias palavras, que manter o problema dói mais do que adotar a solução.',
          acaoFechamento: 'Podemos trabalhar juntos em um plano piloto de 30 dias para você testar essa transformação sem risco algum?'
        }
      ];
    }

    setGeneratedAlternatives(alts);
    setObjectionAnalyzed(objectionInput);
  };

  // --- FUNÇÕES AUXILIARES ---

  const handlePresetClick = (preset: ObjectionPreset) => {
    setObjectionInput(preset.text);
    setSelectedCategory(preset.category);
    setGeneratedAlternatives(preset.alternatives);
    setObjectionAnalyzed(preset.text);
    // Auto-scroll suave para o painel de resultados se for mobile
    const resultsElement = document.getElementById('results-panel');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  // --- LÓGICA DO JOGO/TREINADOR DE VENDAS ---

  const handleSelectTrainerOption = (optionId: string) => {
    if (showTrainerFeedback) return;
    setSelectedOptionId(optionId);
    setShowTrainerFeedback(true);
    setTotalAnswered(prev => prev + 1);

    const activeScenario = TRAINER_SCENARIOS[currentScenarioIndex];
    const chosenOption = activeScenario.options.find(o => o.id === optionId);
    if (chosenOption?.isBest) {
      setTrainerScore(prev => prev + 10);
    }
  };

  const handleNextScenario = () => {
    setSelectedOptionId(null);
    setShowTrainerFeedback(false);
    if (currentScenarioIndex < TRAINER_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else {
      // Reinicia o jogo ou mostra painel final de score
      setCurrentScenarioIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-[#1a1a1e] font-sans selection:bg-[#005fcc] selection:text-white transition-colors duration-200">
      
      {/* HEADER DE LUXO */}
      <header className="sticky top-0 z-40 bg-[#fbf8f3]/90 backdrop-blur-md border-b border-[#ebe2d3] px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#005fcc] flex items-center justify-center shadow-lg shadow-[#005fcc]/20">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#1a1a1e] flex items-center gap-2">
                Objeção<span className="text-[#005fcc]">Zero</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#005fcc]/10 text-[#005fcc] px-2 py-0.5 rounded-full">
                  Elite Pro
                </span>
              </h1>
              <p className="text-xs text-[#7a7a73] hidden sm:block">FAQ & Simulador Avançado de Psicologia de Vendas</p>
            </div>
          </div>

          {/* ABAS DO MENU SUPERIOR */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#005fcc] text-white shadow-md shadow-[#005fcc]/15'
                  : 'hover:bg-[#f5efe6] text-[#57574f]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Análise de</span> Objeções
              </div>
            </button>

            <button
              onClick={() => setActiveTab('trainer')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'trainer'
                  ? 'bg-[#005fcc] text-white shadow-md shadow-[#005fcc]/15'
                  : 'hover:bg-[#f5efe6] text-[#57574f]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" />
                <span>Simulador de Treino</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'library'
                  ? 'bg-[#005fcc] text-white shadow-md shadow-[#005fcc]/15'
                  : 'hover:bg-[#f5efe6] text-[#57574f]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Biblioteca de</span> Técnicas
              </div>
            </button>

            {/* BOTÃO INTEGRAÇÃO GEMINI COM CORES PREMIUM */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2.5 rounded-xl transition-all relative ${
                geminiApiKey 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                  : 'bg-[#f5efe6] text-[#7a7a73] border border-transparent hover:bg-[#ebe2d3]'
              }`}
              title="Configurar Inteligência Gemini AI"
              id="settings-trigger-btn"
            >
              <Key className="h-4 w-4" />
              {geminiApiKey && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* PAINEL DE ADVERTÊNCIA SE GOOGLE PAGES / GEMINI API INFO */}
      <div className="bg-[#005fcc]/5 border-y border-[#005fcc]/10 px-4 py-2 text-center text-xs text-[#005fcc] font-medium">
        🚀 Prontinho para GitHub Pages! Funciona 100% offline com IA local, ou ative o poder do <span className="underline cursor-pointer" onClick={() => setIsSettingsOpen(true)}>Gemini AI</span> inserindo sua chave de API pessoal.
      </div>

      {/* METADATA SECRETA / SETTINGS DRAWER (INTEGRAÇÃO GEMINI) */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#ebe2d3] shadow-2xl relative"
            >
              <h3 className="text-lg font-bold text-[#1a1a1e] flex items-center gap-2 mb-2">
                <Key className="h-5 w-5 text-[#005fcc]" />
                Integração Gemini AI
              </h3>
              <p className="text-sm text-[#7a7a73] mb-4">
                Adicione sua chave de API do Gemini para gerar contornos dinâmicos hiper-personalizados para qualquer objeção incomum em tempo real.
              </p>

              <div className="bg-[#fbf8f3] p-3 rounded-xl border border-[#ebe2d3] mb-4">
                <span className="text-xs font-bold text-[#57574f] block mb-1">Como conseguir uma chave de graça?</span>
                <span className="text-xs text-[#7a7a73] block leading-relaxed">
                  1. Acesse o site do Google AI Studio.<br />
                  2. Clique em "Get API Key" e copie sua chave.<br />
                  3. Cole abaixo. Ela ficará salva de forma segura apenas no navegador.
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#57574f] mb-1">
                    Sua Chave API Gemini
                  </label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    defaultValue={geminiApiKey}
                    id="gemini-key-input"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#ebe2d3] text-sm focus:outline-none focus:border-[#005fcc] focus:ring-2 focus:ring-[#005fcc]/10 transition-all font-mono"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  {geminiApiKey && (
                    <button
                      onClick={handleClearApiKey}
                      className="px-4 py-2 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all"
                    >
                      Remover Chave
                    </button>
                  )}
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#7a7a73] hover:bg-[#fbf8f3] rounded-xl transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      const input = document.getElementById('gemini-key-input') as HTMLInputElement;
                      if (input) handleSaveApiKey(input.value);
                    }}
                    className="px-4 py-2 text-xs font-medium bg-[#005fcc] text-white hover:bg-[#005fcc]/90 rounded-xl shadow-md shadow-[#005fcc]/15 transition-all"
                  >
                    Salvar Chave
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONTEÚDO PRINCIPAL (DASHBOARD RECEPTOR DE OBJEÇÕES) */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        
        {/* SEÇÃO 1: DASHBOARD INTERATIVO */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* HERO MINI-CARD */}
            <div className="bg-gradient-to-r from-[#005fcc] to-[#0a4da6] text-white p-6 md:p-8 rounded-3xl shadow-xl shadow-[#005fcc]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                  <Flame className="h-3.5 w-3.5 text-[#ffc64b]" />
                  Acelerador Comercial de Resultados
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">FAQ de Objeções Interativo</h2>
                <p className="text-white/80 max-w-xl text-sm leading-relaxed">
                  Seja bem-vindo ao laboratório de vendas perfeito. Cole abaixo qualquer barreira verbal imposta pelo seu cliente e receba imediatamente 3 caminhos de contorno com justificativa psicológica baseada em neurovendas.
                </p>
              </div>

              {/* CARD DE SCORE PEQUENO */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 self-start md:self-auto min-w-[200px]">
                <div className="h-11 w-11 rounded-xl bg-[#ffc64b]/20 flex items-center justify-center text-[#ffc64b]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Treinamento Semanal</div>
                  <div className="text-lg font-bold text-white">{trainerScore} Pontos</div>
                  <div className="text-xs text-white/80">{totalAnswered} simulações respondidas</div>
                </div>
              </div>
            </div>

            {/* SELEÇÃO RÁPIDA DE PRESETS (FAQ COMUM) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#57574f] uppercase tracking-wider">
                <HelpCircle className="h-4 w-4 text-[#005fcc]" />
                FAQ Rápido: Objeções mais comuns do mercado
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {OBJECTION_PRESETS.map((preset) => {
                  const isActive = objectionInput === preset.text;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetClick(preset)}
                      className={`p-3 rounded-2xl text-left text-xs border transition-all flex flex-col justify-between h-24 ${
                        isActive 
                          ? 'bg-white border-[#005fcc] ring-2 ring-[#005fcc]/10 shadow-md' 
                          : 'bg-white border-[#ebe2d3] hover:border-[#cbcbc6] hover:bg-[#fbf8f3]/50'
                      }`}
                    >
                      <span className="font-bold text-[#1a1a1e] line-clamp-2 leading-snug">{preset.label}</span>
                      <span className="text-[10px] text-[#7a7a73] flex items-center gap-1 mt-1 bg-[#f5efe6] px-1.5 py-0.5 rounded-md self-start font-medium">
                        {preset.category === 'Preço' && <Coins className="h-3 w-3 text-amber-500" />}
                        {preset.category === 'Tempo' && <Clock className="h-3 w-3 text-sky-500" />}
                        {preset.category === 'Sócio / Autoridade' && <Users className="h-3 w-3 text-purple-500" />}
                        {preset.category === 'Concorrência' && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                        {preset.category === 'Proposta por E-mail' && <FileText className="h-3 w-3 text-blue-500" />}
                        {preset.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ERRO DO GEMINI CASO CAIA */}
            {geminiError && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl text-xs flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Aviso Técnico de Integração:</span> {geminiError}
                </div>
              </div>
            )}

            {/* GRID DO SIMULADOR PRINCIPAL */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* COLUNA ESQUERDA: ENTRADA E PARAMETRIZAÇÃO */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#ebe2d3] space-y-6 shadow-sm">
                
                <form onSubmit={handleAnalyzeObjection} className="space-y-6">
                  
                  {/* TEXTAREA DO INPUT */}
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold uppercase tracking-widest text-[#57574f] flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-[#005fcc]" />
                      O que o cliente disse exatamente?
                    </label>
                    <div className="relative">
                      <textarea
                        value={objectionInput}
                        onChange={(e) => setObjectionInput(e.target.value)}
                        placeholder="Ex: 'Adorei a apresentação, mas está fora do nosso orçamento no momento' ou digite sua própria objeção customizada aqui..."
                        className="w-full h-32 px-4 py-3 bg-[#fbf8f3] border border-[#ebe2d3] rounded-2xl text-sm focus:outline-none focus:border-[#005fcc] focus:ring-4 focus:ring-[#005fcc]/5 transition-all resize-none leading-relaxed placeholder:text-[#cbcbc6]"
                        maxLength={400}
                        required
                      />
                      <span className="absolute bottom-2 right-3 text-[10px] text-[#7a7a73] font-mono">
                        {objectionInput.length}/400
                      </span>
                    </div>
                  </div>

                  {/* PARÂMETRO 1: NICHO */}
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold uppercase tracking-widest text-[#57574f] flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-[#005fcc]" />
                      Nicho / Segmento de Atuação
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['B2B / SaaS', 'Imobiliário', 'Serviços / B2C', 'Educação / Cursos'].map((niche) => (
                        <button
                          key={niche}
                          type="button"
                          onClick={() => setSelectedNiche(niche)}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-all ${
                            selectedNiche === niche
                              ? 'bg-[#005fcc]/10 border-[#005fcc] text-[#005fcc] font-bold'
                              : 'bg-[#fbf8f3] border-[#ebe2d3] hover:border-[#cbcbc6] text-[#57574f]'
                          }`}
                        >
                          {niche}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PARÂMETROS DUPLOS: LEAD TEMP & RESPONSE TONE */}
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* TEMPERATURA */}
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-widest text-[#57574f] flex items-center gap-1.5">
                        <Flame className="h-4 w-4 text-[#ffc64b]" />
                        Prontidão (Lead)
                      </label>
                      <select
                        value={leadTemperature}
                        onChange={(e) => setLeadTemperature(e.target.value)}
                        className="w-full px-3 py-2 bg-[#fbf8f3] border border-[#ebe2d3] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#005fcc]"
                      >
                        <option value="Frio">Frio (Desconfiado)</option>
                        <option value="Morno">Morno (Interessado)</option>
                        <option value="Quente">Quente (Quer fechar)</option>
                      </select>
                    </div>

                    {/* TOM DO SCRIPT */}
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-widest text-[#57574f] flex items-center gap-1.5">
                        <Volume2 className="h-4 w-4 text-[#005fcc]" />
                        Tom da Resposta
                      </label>
                      <select
                        value={responseTone}
                        onChange={(e) => setResponseTone(e.target.value)}
                        className="w-full px-3 py-2 bg-[#fbf8f3] border border-[#ebe2d3] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#005fcc]"
                      >
                        <option value="Persuasivo">Persuasivo (Valor)</option>
                        <option value="Empático">Empático (Rapport)</option>
                        <option value="Assertivo">Assertivo (Direto)</option>
                        <option value="Consultivo">Consultivo (SPIN)</option>
                      </select>
                    </div>

                  </div>

                  {/* BOTÃO GERADOR PRINCIPAL */}
                  <button
                    type="submit"
                    disabled={isLoading || !objectionInput.trim()}
                    className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm tracking-wide text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                      isLoading || !objectionInput.trim()
                        ? 'bg-slate-300 cursor-not-allowed shadow-none'
                        : 'bg-[#005fcc] hover:bg-[#0a4da6] shadow-[#005fcc]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>
                          {loadingStep === 0 && 'Analisando psicologia de dor...'}
                          {loadingStep === 1 && 'Gerando scripts de contorno...'}
                          {loadingStep === 2 && 'Calibrando tom desejado...'}
                          {loadingStep === 3 && 'Estruturando fechamentos...'}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Gerar {geminiApiKey ? 'IA Contorno Personalizado' : 'Sugestões Heurísticas de Contorno'}</span>
                      </>
                    )}
                  </button>

                </form>

                {/* DICAS DE PSICOLOGIA DE VENDAS */}
                <div className="bg-[#fbf8f3] p-4 rounded-2xl border border-[#ebe2d3] space-y-2">
                  <div className="text-xs font-extrabold text-[#1a1a1e] flex items-center gap-1">
                    <Info className="h-3.5 w-3.5 text-[#005fcc]" />
                    Dica rápida de Persuasão
                  </div>
                  <p className="text-[11px] text-[#7a7a73] leading-relaxed">
                    Nunca discuta ou debata preço diretamente com o cliente. Sempre valide o sentimento dele primeiro usando empatia, desvie para o valor gerado e, em seguida, isole o problema financeiro das outras variáveis técnicas para manter o controle da conversa.
                  </p>
                </div>

              </div>

              {/* COLUNA DIREITA: PAINEL DE CONTORNO INTELIGENTE */}
              <div id="results-panel" className="lg:col-span-7 space-y-6">
                
                {/* HEADLINE DOS RESULTADOS */}
                <div className="bg-white px-6 py-4 rounded-2xl border border-[#ebe2d3] flex items-center justify-between shadow-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#7a7a73]">Análise Pronta</span>
                    <h3 className="text-sm font-bold text-[#1a1a1e] line-clamp-1">
                      Objeção: <span className="font-normal text-[#57574f]">"{objectionAnalyzed || 'Está caro...'}"</span>
                    </h3>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                </div>

                {/* RENDER DOS ANIMAÇÕES COM FRAMER-MOTION */}
                <div className="space-y-4">
                  {isLoading ? (
                    // LOADING SKELETON ULTRA-POLIDO
                    <div className="space-y-4">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="bg-white p-6 rounded-3xl border border-[#ebe2d3] space-y-4 animate-pulse">
                          <div className="flex justify-between items-center">
                            <div className="h-5 bg-slate-200 rounded-lg w-1/3" />
                            <div className="h-4 bg-slate-200 rounded-lg w-1/6" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-slate-200 rounded-lg w-full" />
                            <div className="h-3 bg-slate-200 rounded-lg w-11/12" />
                            <div className="h-3 bg-slate-200 rounded-lg w-3/4" />
                          </div>
                          <div className="pt-4 border-t border-dashed border-slate-100 flex gap-4">
                            <div className="h-8 bg-slate-200 rounded-xl w-1/2" />
                            <div className="h-8 bg-slate-200 rounded-xl w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    generatedAlternatives.map((alt, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-[#ebe2d3] hover:border-[#cbcbc6] transition-all duration-200 relative group overflow-hidden shadow-xs"
                      >
                        {/* DECORAÇÃO LATERAL DE ALERTA DE SUCESSO COZY */}
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#005fcc]/30 group-hover:bg-[#005fcc] transition-colors" />

                        {/* TOP BAR DO CARD */}
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <span className="text-xs font-extrabold uppercase tracking-widest text-[#005fcc] bg-[#005fcc]/10 px-2.5 py-1 rounded-lg">
                            {alt.tecnica}
                          </span>
                          <span className="text-[10px] font-bold text-[#7a7a73] uppercase tracking-wider bg-[#f5efe6] px-2 py-0.5 rounded-md">
                            Opção #{index + 1}
                          </span>
                        </div>

                        {/* SCRIPT PRONTO DE VENDAS */}
                        <div className="bg-[#fbf8f3] p-4 rounded-2xl border border-[#ebe2d3]/60 relative my-3">
                          <div className="text-[10px] font-extrabold text-[#7a7a73] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <FileText className="h-3 w-3 text-[#005fcc]" />
                            Roteiro Pronto (Copiar e Adaptar)
                          </div>
                          <p className="text-sm font-medium text-[#1a1a1e] leading-relaxed">
                            {alt.script}
                          </p>
                        </div>

                        {/* PSICOLOGIA DE VENDAS DETALHADA */}
                        <div className="space-y-1 mb-4">
                          <div className="text-[10px] font-extrabold text-[#7a7a73] uppercase tracking-widest flex items-center gap-1">
                            <Info className="h-3 w-3 text-amber-500" />
                            Gatilho Mental Utilizado
                          </div>
                          <p className="text-xs text-[#57574f] leading-relaxed">
                            {alt.psicologia}
                          </p>
                        </div>

                        {/* PRÓXIMO FECHAMENTO CTA */}
                        {alt.acaoFechamento && (
                          <div className="border-t border-[#ebe2d3] pt-4 mt-4 space-y-1">
                            <div className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                              <Check className="h-3.5 w-3.5" />
                              Pergunta de Avanço Recomendada
                            </div>
                            <p className="text-xs font-semibold text-[#1a1a1e] leading-relaxed">
                              {alt.acaoFechamento}
                            </p>
                          </div>
                        )}

                        {/* AÇÕES DE RODAPÉ (COPY / CLIPBOARD) */}
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-dashed border-[#ebe2d3]/50">
                          <button
                            onClick={() => handleCopyToClipboard(alt.script, index)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                              copiedIndex === index
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                : 'bg-[#f5efe6] text-[#1a1a1e] hover:bg-[#ebe2d3] border border-transparent'
                            }`}
                          >
                            {copiedIndex === index ? (
                              <>
                                <Check className="h-3.5 w-3.5 animate-bounce" />
                                <span>Roteiro Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>Copiar Roteiro</span>
                              </>
                            )}
                          </button>
                        </div>

                      </motion.div>
                    ))
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* SEÇÃO 2: SIMULADOR DE TREINO (JOGO/GAMIFICAÇÃO) */}
        {activeTab === 'trainer' && (
          <div className="max-w-3xl mx-auto space-y-8">
            
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#005fcc]/10 text-[#005fcc] mb-2">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Simulador de Treino Comercial</h2>
              <p className="text-sm text-[#7a7a73] max-w-lg mx-auto">
                Teste suas habilidades práticas desarmando objeções. Escolha o melhor roteiro persuasivo e aprenda a justificativa correta.
              </p>
            </div>

            {/* PLACAR DO VENDEDOR DE ELITE */}
            <div className="bg-white p-4 rounded-3xl border border-[#ebe2d3] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <div className="text-[10px] text-[#7a7a73] uppercase font-extrabold tracking-wider">Pontuação Acumulada</div>
                  <div className="text-sm font-bold text-[#1a1a1e]">{trainerScore} Pontos</div>
                </div>
              </div>
              <div className="h-8 w-px bg-[#ebe2d3]" />
              <div>
                <div className="text-[10px] text-[#7a7a73] uppercase font-extrabold tracking-wider text-right">Progresso</div>
                <div className="text-sm font-bold text-[#1a1a1e] text-right">Cenário {currentScenarioIndex + 1} de {TRAINER_SCENARIOS.length}</div>
              </div>
            </div>

            {/* CARTÃO DO CENÁRIO ATUAL */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#ebe2d3] shadow-md space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#005fcc] text-white text-xs font-bold px-3 py-1 rounded-bl-2xl">
                Cenário Prático
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#005fcc] bg-[#005fcc]/10 px-2 py-0.5 rounded-md">
                  Objeção em Jogo ({TRAINER_SCENARIOS[currentScenarioIndex].category})
                </span>
                <p className="text-lg font-bold text-[#1a1a1e] leading-relaxed">
                  {TRAINER_SCENARIOS[currentScenarioIndex].objection}
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <label className="block text-xs font-extrabold text-[#57574f] uppercase tracking-wider">
                  Como você reage a essa situação? Selecione a melhor alternativa:
                </label>

                <div className="space-y-3">
                  {TRAINER_SCENARIOS[currentScenarioIndex].options.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    const isCorrect = option.isBest;
                    
                    let bgBorderClass = 'bg-[#fbf8f3] border-[#ebe2d3] hover:border-[#cbcbc6]';
                    if (showTrainerFeedback) {
                      if (isCorrect) {
                        bgBorderClass = 'bg-emerald-50/50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/10';
                      } else if (isSelected && !isCorrect) {
                        bgBorderClass = 'bg-rose-50/50 border-rose-400 text-rose-900';
                      } else {
                        bgBorderClass = 'bg-white border-[#ebe2d3] opacity-60';
                      }
                    } else if (isSelected) {
                      bgBorderClass = 'bg-[#005fcc]/5 border-[#005fcc] ring-2 ring-[#005fcc]/10';
                    }

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectTrainerOption(option.id)}
                        disabled={showTrainerFeedback}
                        className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-start gap-3 ${bgBorderClass}`}
                      >
                        <div className={`h-6 w-6 rounded-full border flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          showTrainerFeedback
                            ? isCorrect
                              ? 'bg-emerald-500 border-emerald-600 text-white'
                              : isSelected
                                ? 'bg-rose-500 border-rose-600 text-white'
                                : 'bg-[#f5efe6] text-[#7a7a73]'
                            : isSelected
                              ? 'bg-[#005fcc] border-[#005fcc] text-white'
                              : 'bg-white border-[#cbcbc6] text-[#1a1a1e]'
                        }`}>
                          {showTrainerFeedback ? (isCorrect ? '✓' : isSelected ? '✕' : '•') : '•'}
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-extrabold uppercase tracking-wide text-[#7a7a73] block">
                            Técnica: {option.technique}
                          </span>
                          <p className="font-semibold leading-relaxed">"{option.script}"</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FEEDBACK EXPLICAÇÃO APÓS RESPONDER */}
              {showTrainerFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-2xl border ${
                    TRAINER_SCENARIOS[currentScenarioIndex].options.find(o => o.id === selectedOptionId)?.isBest
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-xl">
                      {TRAINER_SCENARIOS[currentScenarioIndex].options.find(o => o.id === selectedOptionId)?.isBest ? '🎉' : '💡'}
                    </div>
                    <div className="space-y-1 text-xs">
                      <span className="font-extrabold block text-sm">
                        {TRAINER_SCENARIOS[currentScenarioIndex].options.find(o => o.id === selectedOptionId)?.isBest 
                          ? 'Excelente! Você acertou na mosca!' 
                          : 'Resposta incorreta. Que tal entender a alternativa recomendada?'}
                      </span>
                      <p className="leading-relaxed">
                        {TRAINER_SCENARIOS[currentScenarioIndex].options.find(o => o.id === selectedOptionId)?.reason}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNextScenario}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-[#ebe2d3] text-[#1a1a1e] hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>
                        {currentScenarioIndex === TRAINER_SCENARIOS.length - 1 ? 'Reiniciar Simulador' : 'Próximo Cenário'}
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

          </div>
        )}

        {/* SEÇÃO 3: GLOSSÁRIO/BIBLIOTECA DE PSICOLOGIA DE VENDAS */}
        {activeTab === 'library' && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#005fcc]/10 text-[#005fcc] mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Enciclopédia de Psicologia de Vendas</h2>
              <p className="text-sm text-[#7a7a73] max-w-lg mx-auto">
                Explore os maiores frameworks científicos de persuasão utilizados por negociadores de alta performance no B2B e varejo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FAMOUS_FRAMEWORKS.map((framework, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-[#ebe2d3] space-y-4 hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-20 w-20 bg-[#005fcc]/5 rounded-bl-full flex items-start justify-end p-3 text-2xl font-bold text-[#005fcc]/20">
                    0{idx + 1}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#1a1a1e]">{framework.name}</h3>
                    <span className="text-xs text-[#005fcc] font-semibold">{framework.tagline}</span>
                  </div>

                  <p className="text-xs text-[#57574f] leading-relaxed">
                    {framework.description}
                  </p>

                  <div className="bg-[#fbf8f3] p-3.5 rounded-2xl border border-[#ebe2d3]/50 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-[#7a7a73]">Exemplo de uso</div>
                    <p className="text-xs font-mono text-[#1a1a1e] leading-relaxed">
                      {framework.example}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="font-extrabold text-[#57574f]">Quando usar:</span>
                    <p className="text-[#7a7a73] leading-relaxed">{framework.howToUse}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CARD METODOLOGIA EXTRA */}
            <div className="bg-[#005fcc]/5 border border-[#005fcc]/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#005fcc] flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#005fcc]" />
                  A Regra de Ouro do Contorno
                </h3>
                <p className="text-xs text-[#57574f] leading-relaxed max-w-xl">
                  Toda objeção é, no fundo, uma barreira de medo disfarçada de barreira lógica. Nunca tente vencer o cliente em um debate intelectual: o cliente prefere ficar sem a ferramenta do que admitir que perdeu a discussão para você. Use empatia para rebaixar a adrenalina emocional dele e, em seguida, faça perguntas estratégicas para ajudá-lo a reavaliar.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="px-5 py-3 rounded-2xl font-bold text-xs bg-[#005fcc] text-white hover:bg-[#0a4da6] transition-all shadow-md shadow-[#005fcc]/10"
                >
                  Ir Praticar no Painel
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* RODAPÉ PREMIUM */}
      <footer className="bg-white border-t border-[#ebe2d3] py-8 px-4 text-center text-xs text-[#7a7a73] mt-12">
        <div className="max-w-7xl mx-auto space-y-3">
          <p className="font-semibold text-[#57574f]">
            ObjeçãoZero — Desenvolvido de forma personalizada sob medida com os tokens de marca acolhedora.
          </p>
          <p>
            © {new Date().getFullYear()} ObjeçãoZero Inc. Todos os direitos reservados. Focado em Conversão e Alta Performance.
          </p>
        </div>
      </footer>

    </div>
  );
}
