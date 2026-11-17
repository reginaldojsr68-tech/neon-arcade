import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Terminal,
  GitBranch,
  Database,
  Zap,
  Play,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  MessageSquareCode,
  Star,
  Copy,
  Check,
  Maximize2,
  Minimize2,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const STORE =
  "https://chromewebstore.google.com/detail/lovx/jchnmipjgodjjlnagcddbnpbnohahlec?hl=pt-BR";
const IMG = "https://lh3.googleusercontent.com/";
const LOGO =
  IMG + "nUx6bbly7AM5lVFELnqZjfKrbHBN3KtiGNC60ca0NJYz5vXrlLngZ5o1z8rWsFV2Y-TAJKoDhxLmT1SPCday5VN1=s120";

const shots = [
  {
    url: "m2FqZ7rHl-Ui6l-aKhwq1fHuvxm8s9OvdQ8o2ZBE7liOaa8McyqTs2BZljQNS3oWTTT9Scpp6KS-0AnWHBTUCCpBlw",
    title: "Interface do Chat no Editor",
    desc: "Peça qualquer alteração diretamente no painel lateral do Lovable.",
  },
  {
    url: "aQicGYL5THg9y6zBAHULtbToEWoDHe-eNrOHP6hIiElZ0ltAX0wBoXXP6DuzVhV-j5J1XE4tJVaVYpge0np8xhHKEw",
    title: "Integração GitHub Automática",
    desc: "Commits limpos e estruturados enviados direto para a branch main.",
  },
  {
    url: "NtHXOLdk6zPJREqLTikJ2Lb9Obdaa3HZ3wl8SBfNTIq6QclDCFwsDv1b0AqeFjx0haVxoztv4p80XICRbuZJP8bYqAQ",
    title: "Execução de Comandos do Banco",
    desc: "Crie tabelas, colunas e políticas de acesso sem sair do navegador.",
  },
  {
    url: "KYktZbpAvOeC9XYUWBjcR0j6neeXGmUo4hCs30Fx-D1yd_2dvAnnj5yNJMeX_-_xrfLQdk-TxzkXJAN56k7jZnF8tO0",
    title: "Edição de Múltiplos Arquivos",
    desc: "Altera rotas, componentes shadcn e estilos em um único prompt.",
  },
  {
    url: "4XPK1q0oErSUP9pmlsITSbij1W55o_xDVLi2Fw4yle8hHKED1Gb7HcdbLHkRPtVpo-8A2CDt1vTIJkh7HjMc5erEjQ",
    title: "Log de Execução em Tempo Real",
    desc: "Acompanhe passo a passo cada alteração feita pela inteligência artificial.",
  },
].map((item) => ({
  ...item,
  src: `${IMG}${item.url}=s1280-w1280-h800`,
}));

const interactivePrompts = [
  {
    label: "Criar Tela de Cupons",
    prompt: "Crie a tela de gerenciamento de cupons de desconto com tabela, filtros e criação rápida.",
    steps: [
      { text: "Lendo estrutura do projeto (Vite + React + Tailwind)", status: "done" },
      { text: "Criando componente src/pages/Coupons.tsx", status: "done" },
      { text: "Registrando rota em src/App.tsx", status: "done" },
      { text: "Commit enviado para reginaldojsr68-tech/neon-arcade@main", status: "done" },
    ],
    fileCreated: "src/pages/Coupons.tsx (+142 linhas)",
  },
  {
    label: "Adicionar Tabela no Banco",
    prompt: "Crie a tabela 'user_preferences' com suporte a tema escuro e notificações ativas.",
    steps: [
      { text: "Verificando esquema Postgres / Supabase", status: "done" },
      { text: "Gerando migration SQL: CREATE TABLE user_preferences", status: "done" },
      { text: "Aplicando RLS (Row Level Security) e índices", status: "done" },
      { text: "Tipos TypeScript atualizados no projeto", status: "done" },
    ],
    fileCreated: "supabase/migrations/20260330_user_prefs.sql",
  },
  {
    label: "Fix de Layout & Mobile",
    prompt: "Ajuste a barra lateral para recolher automaticamente em dispositivos móveis abaixo de 768px.",
    steps: [
      { text: "Analisando src/components/Sidebar.tsx", status: "done" },
      { text: "Adicionando hook useIsMobile()", status: "done" },
      { text: "Atualizando classes de breakpoints Tailwind", status: "done" },
      { text: "Alterações commitadas com sucesso", status: "done" },
    ],
    fileCreated: "src/components/Sidebar.tsx (-12 / +28 linhas)",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOVX — Chat de IA para seus projetos Lovable" },
      {
        name: "description",
        content:
          "Peça em português o que quer mudar e a LOVX altera o código, envia ao GitHub e atualiza o banco.",
      },
      { property: "og:title", content: "LOVX — Chat de IA para projetos Lovable" },
      {
        property: "og:description",
        content: "Extensão para Chrome que aplica mudanças no código pelo GitHub e no banco.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: shots[0].src },
      { name: "twitter:image", content: shots[0].src },
    ],
  }),
  component: Index,
});

function Index() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(4);
  const [copied, setCopied] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const currentPrompt = interactivePrompts[activePromptIndex];

  const handleRunSim = (index: number) => {
    setActivePromptIndex(index);
    setIsSimulating(true);
    setSimStep(0);
  };

  useEffect(() => {
    if (isSimulating && simStep < 4) {
      const timer = setTimeout(() => {
        setSimStep((prev) => prev + 1);
        if (simStep === 3) setIsSimulating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isSimulating, simStep]);

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono crt-scanlines relative overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* GLOW DECORATIONS */}
      <div className="pointer-events-none fixed top-0 left-1/4 w-[500px] h-[300px] bg-primary/10 blur-[140px] rounded-full z-0" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 w-[600px] h-[350px] bg-secondary/10 blur-[160px] rounded-full z-0" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-border/80 cyber-panel px-6 py-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-sm blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <img
                src={LOGO}
                alt="Logo LOVX"
                className="relative w-9 h-9 border border-primary/40 bg-background"
              />
            </div>
            <div>
              <span className="text-2xl font-black tracking-widest text-primary neon flex items-center gap-2">
                LOVX
                <span className="text-[10px] uppercase font-normal px-1.5 py-0.5 border border-accent text-accent bg-accent/10 tracking-normal">
                  v2.4 ARCADE
                </span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs text-muted-foreground uppercase tracking-widest">
            <a href="#demo" className="hover:text-secondary transition">
              // DEMO
            </a>
            <a href="#recursos" className="hover:text-primary transition">
              // RECURSOS
            </a>
            <a href="#prints" className="hover:text-accent transition">
              // GALERIA
            </a>
            <a href="#faq" className="hover:text-secondary transition">
              // FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>SISTEMA ATIVO</span>
            </div>
            <a
              href={STORE}
              target="_blank"
              rel="noreferrer"
              className="arcade-btn border border-primary bg-primary/10 text-primary px-5 py-2 text-sm font-bold hover:bg-primary hover:text-primary-foreground shadow-[var(--glow)] transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> INSTALAR AGORA
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[45%] grid-floor pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <Badge
            variant="outline"
            className="mb-6 border-secondary text-secondary bg-secondary/10 px-4 py-1.5 text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-[var(--glow-cyan)]"
          >
            <Zap className="w-3.5 h-3.5 text-secondary animate-bounce" /> EXTENSÃO OFICIAL CHROME
            PARA LOVABLE
          </Badge>

          <div className="cube mb-8">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none uppercase">
            PEÇA EM PORTUGUÊS. <br />
            A <span className="text-accent neon">LOVX</span> EXECUTA.
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Assistente de IA integrado ao editor Lovable. Altera seu código React, gera commits no{" "}
            <span className="text-primary font-bold">GitHub</span> e atualiza o banco de dados sem
            que você precise programar uma linha.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href={STORE}
              target="_blank"
              rel="noreferrer"
              className="arcade-btn bg-primary text-primary-foreground px-8 py-4 font-bold text-base shadow-[var(--glow)] hover:scale-105 transition flex items-center justify-center gap-3 border border-primary"
            >
              <Sparkles className="w-5 h-5" /> ADICIONAR AO CHROME
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#demo"
              className="arcade-btn border border-secondary text-secondary bg-secondary/10 px-8 py-4 font-bold text-base hover:bg-secondary/20 transition flex items-center justify-center gap-2"
            >
              <Terminal className="w-5 h-5" /> VER SIMULADOR
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-xs text-muted-foreground border-t border-b border-border/50 py-4 w-full max-w-3xl">
            <span className="flex items-center gap-2 text-foreground font-semibold">
              <ShieldCheck className="w-4 h-4 text-accent" /> 100% SEGURO VIA GITHUB API
            </span>
            <span className="flex items-center gap-2 text-foreground font-semibold">
              <Cpu className="w-4 h-4 text-primary" /> SUPORTE A TS, TAILWIND & SHADCN
            </span>
            <span className="flex items-center gap-2 text-foreground font-semibold">
              <Database className="w-4 h-4 text-secondary" /> SUPABASE AUTO MIGRATION
            </span>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-primary/30 bg-card/60 backdrop-blur-md py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 border border-primary/20 bg-background/50">
            <div className="text-3xl font-black text-primary neon">10.000+</div>
            <div className="text-xs text-muted-foreground uppercase mt-1">PROMPTS EXECUTADOS</div>
          </div>
          <div className="p-4 border border-secondary/20 bg-background/50">
            <div className="text-3xl font-black text-secondary neon">0.4s</div>
            <div className="text-xs text-muted-foreground uppercase mt-1">RESPOSTA DA IA</div>
          </div>
          <div className="p-4 border border-accent/20 bg-background/50">
            <div className="text-3xl font-black text-accent neon">100%</div>
            <div className="text-xs text-muted-foreground uppercase mt-1">SINCRONIZADO NO GITHUB</div>
          </div>
          <div className="p-4 border border-primary/20 bg-background/50">
            <div className="text-3xl font-black text-foreground">5/5 ★</div>
            <div className="text-xs text-muted-foreground uppercase mt-1">AVALIAÇÃO NA STORE</div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO SIMULATOR */}
      <section id="demo" className="py-24 px-4 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <Badge
            variant="outline"
            className="border-primary text-primary bg-primary/10 mb-3 px-3 py-1 text-xs"
          >
            TERMINAL INTERATIVO
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            TESTE UM <span className="text-secondary neon">// PROMPT SIMULADO</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Escolha uma instrução abaixo para ver como a LOVX processa e envia alterações ao seu
            repositório.
          </p>
        </div>

        {/* PROMPT SELECTOR TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {interactivePrompts.map((p, idx) => (
            <button
              key={p.label}
              onClick={() => handleRunSim(idx)}
              className={`px-4 py-2 text-xs font-bold uppercase transition border flex items-center gap-2 ${
                activePromptIndex === idx
                  ? "border-accent bg-accent/20 text-accent shadow-[var(--glow-accent)]"
                  : "border-border bg-card hover:border-accent/50 text-muted-foreground"
              }`}
            >
              <Play className="w-3 h-3" /> {p.label}
            </button>
          ))}
        </div>

        {/* TERMINAL BOX */}
        <div className="cyber-panel border border-secondary shadow-[var(--glow-cyan)] overflow-hidden rounded-sm">
          {/* TERMINAL HEADER */}
          <div className="bg-muted/80 px-4 py-3 border-b border-border flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-destructive/80" />
              <span className="w-3 h-3 rounded-full bg-accent/80" />
              <span className="w-3 h-3 rounded-full bg-secondary/80" />
              <span className="ml-2 font-mono text-muted-foreground">lovx-executor-v2.sh</span>
            </div>
            <button
              onClick={() => handleCopyPrompt(currentPrompt.prompt)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-accent" /> COPIADO!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> COPIAR PROMPT
                </>
              )}
            </button>
          </div>

          {/* TERMINAL BODY */}
          <div className="p-6 bg-background/95 font-mono text-sm space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-accent font-bold">&gt;</span>
              <div className="flex-1 bg-card p-3 border border-border/80 text-foreground">
                <span className="text-xs text-muted-foreground uppercase block mb-1">
                  Prompt digitado pelo usuário:
                </span>
                "{currentPrompt.prompt}"
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs text-secondary uppercase font-bold tracking-widest">
                // EXECUÇÃO DA IA:
              </div>
              {currentPrompt.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    idx <= simStep ? "opacity-100" : "opacity-20"
                  }`}
                >
                  {idx <= simStep ? (
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-muted-foreground/30 flex-shrink-0 animate-pulse" />
                  )}
                  <span className={idx <= simStep ? "text-foreground" : "text-muted-foreground"}>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>

            {simStep >= 3 && (
              <div className="mt-4 p-3 border border-accent/40 bg-accent/10 text-accent text-xs flex justify-between items-center animate-fade-in">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> STATUS: MUDANÇA APLICADA COM SUCESSO!
                </span>
                <span className="font-bold underline">{currentPrompt.fileCreated}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SCREENSHOTS GALLERY */}
      <section id="prints" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <Badge
              variant="outline"
              className="border-secondary text-secondary bg-secondary/10 mb-2 px-3 py-1 text-xs"
            >
              INTERFACE REAL
            </Badge>
            <h2 className="text-3xl font-bold text-secondary neon">// VEJA A LOVX EM AÇÃO</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Capturas de tela reais da extensão integrada ao editor do Lovable.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSlideIndex((slideIndex - 1 + shots.length) % shots.length)}
              className="arcade-btn border border-border px-4 py-2 hover:border-primary text-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSlideIndex((slideIndex + 1) % shots.length)}
              className="arcade-btn border border-border px-4 py-2 hover:border-primary text-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN DISPLAY CARD */}
        <div className="cyber-panel border border-secondary shadow-[var(--glow-cyan)] overflow-hidden p-2 relative group">
          <div className="relative aspect-[16/10] overflow-hidden bg-black">
            <img
              src={shots[slideIndex].src}
              alt={shots[slideIndex].title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <button
              onClick={() => setModalImage(shots[slideIndex].src)}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-md p-2 border border-border text-foreground hover:text-primary transition opacity-0 group-hover:opacity-100"
              title="Expandir imagem"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/20 border border-primary px-2.5 py-1">
                TELA {slideIndex + 1} DE {shots.length}
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-2">
                {shots[slideIndex].title}
              </h3>
              <p className="text-sm text-muted-foreground">{shots[slideIndex].desc}</p>
            </div>
          </div>
        </div>

        {/* THUMBNAILS STRIP */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          {shots.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`relative aspect-[16/10] overflow-hidden border transition ${
                idx === slideIndex
                  ? "border-primary shadow-[var(--glow)] scale-105"
                  : "border-border/60 opacity-50 hover:opacity-100"
              }`}
            >
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="recursos" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="border-accent text-accent bg-accent/10 mb-3 px-3 py-1 text-xs"
          >
            TECNOLOGIA ARCADE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black uppercase">
            RECURSOS FEITOS PARA <span className="text-accent neon">DESENVOLVEDORES</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
            Tudo o que você precisa para evoluir sua aplicação Lovable em tempo recorde.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="cyber-panel p-8 border border-accent/40 bg-card hover:border-accent hover:shadow-[var(--glow-accent)] transition duration-300 relative group">
            <div className="w-12 h-12 border border-accent bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition">
              <MessageSquareCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-accent mb-2">Chat no Editor</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Caixa de conversa nativa dentro da interface do Lovable. Digite suas ideias em
              português e veja a IA responder com código pronto.
            </p>
          </div>

          <div className="cyber-panel p-8 border border-primary/40 bg-card hover:border-primary hover:shadow-[var(--glow)] transition duration-300 relative group">
            <div className="w-12 h-12 border border-primary bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition">
              <GitBranch className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Direto no GitHub</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sem arquivos soltos. A LOVX edita seus arquivos TypeScript/React e realiza o commit e
              push direto para a sua branch principal.
            </p>
          </div>

          <div className="cyber-panel p-8 border border-secondary/40 bg-card hover:border-secondary hover:shadow-[var(--glow-cyan)] transition duration-300 relative group">
            <div className="w-12 h-12 border border-secondary bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">Banco de Dados Sync</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crie tabelas, colunas e políticas de segurança no Supabase simultaneamente com as
              telas e componentes da sua aplicação.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-card/40 border-y border-border">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <Badge
            variant="outline"
            className="border-secondary text-secondary bg-secondary/10 mb-3 px-3 py-1 text-xs"
          >
            FLUXO SIMPLES
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            COMO FUNCIONA EM <span className="text-secondary neon">3 PASSOS</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-border bg-background relative">
            <span className="text-5xl font-black text-muted-foreground/30 absolute top-4 right-4">
              01
            </span>
            <div className="text-lg font-bold text-primary mb-2">// 1. INSTALE A EXTENSÃO</div>
            <p className="text-sm text-muted-foreground">
              Adicione a extensão LOVX ao seu navegador Google Chrome em poucos cliques.
            </p>
          </div>

          <div className="p-6 border border-border bg-background relative">
            <span className="text-5xl font-black text-muted-foreground/30 absolute top-4 right-4">
              02
            </span>
            <div className="text-lg font-bold text-secondary mb-2">// 2. ABRA SEU LOVABLE</div>
            <p className="text-sm text-muted-foreground">
              Acesse o painel do seu projeto no Lovable e o chat lateral aparecerá automaticamente.
            </p>
          </div>

          <div className="p-6 border border-border bg-background relative">
            <span className="text-5xl font-black text-muted-foreground/30 absolute top-4 right-4">
              03
            </span>
            <div className="text-lg font-bold text-accent mb-2">// 3. DIGITE E PUBLIQUE</div>
            <p className="text-sm text-muted-foreground">
              Descreva em português o que precisa e veja o código ser atualizado no GitHub.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="border-primary text-primary bg-primary/10 mb-3 px-3 py-1 text-xs"
          >
            DUVIDAS FREQUENTES
          </Badge>
          <h2 className="text-3xl font-bold">
            PERGUNTAS <span className="text-primary neon">// RESPOSTAS</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-border bg-card px-6 py-2">
            <AccordionTrigger className="text-base font-bold hover:text-primary transition">
              Preciso de chave de API para usar a LOVX?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Sim, a extensão utiliza uma chave de acesso segura para integrar com a API do GitHub
              e com a IA do LOVX.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-border bg-card px-6 py-2">
            <AccordionTrigger className="text-base font-bold hover:text-secondary transition">
              A LOVX altera repositórios existentes sem quebrar o código?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Sim! A LOVX lê a estrutura completa do seu projeto (componentes shadcn, rotas e estilos
              Tailwind) para garantir que cada commit respeite os padrões atuais do projeto.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-border bg-card px-6 py-2">
            <AccordionTrigger className="text-base font-bold hover:text-accent transition">
              Como funciona a integração com o Supabase?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Ao solicitar alterações de banco de dados, a LOVX gera migrations e executa comandos
              estruturados via cliente do banco, mantendo os tipos TypeScript atualizados.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-border bg-card px-6 py-2">
            <AccordionTrigger className="text-base font-bold hover:text-primary transition">
              Posso usar em qualquer plano do Lovable?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Sim, a extensão funciona como uma camada extra sobre o editor do navegador Chrome.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-28 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
            PRONTO PARA <span className="text-primary neon">ACELERAR</span>?
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Instale a extensão LOVX agora mesmo no Chrome Web Store e transforme seus prompts em
            código no GitHub.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={STORE}
              target="_blank"
              rel="noreferrer"
              className="arcade-btn bg-secondary text-secondary-foreground px-10 py-4 font-bold text-lg shadow-[var(--glow-cyan)] hover:scale-105 transition flex items-center justify-center gap-3 border border-secondary"
            >
              <ExternalLink className="w-5 h-5" /> ADICIONAR AO CHROME
            </a>
          </div>

          <div className="mt-6 text-xs text-muted-foreground">
            Requer chave de acesso • Compatível com Chrome v110+
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6 text-center text-xs text-muted-foreground flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
        <div className="flex items-center gap-2">
          <img src={LOGO} alt="LOVX" className="w-5 h-5" />
          <span className="font-bold text-foreground">LOVX ARCADE EDITION</span>
        </div>
        <div>© 2026 LOVX — Todos os direitos reservados</div>
        <div className="flex gap-4">
          <a href={STORE} target="_blank" rel="noreferrer" className="hover:text-primary transition">
            Chrome Web Store
          </a>
        </div>
      </footer>

      {/* FULLSCREEN IMAGE MODAL */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-10 right-0 text-white flex items-center gap-1 text-xs"
            >
              <Minimize2 className="w-4 h-4" /> FECHAR [ESC]
            </button>
            <img
              src={modalImage}
              alt="Visualização expandida"
              className="w-full border border-secondary shadow-[var(--glow-cyan)] object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
