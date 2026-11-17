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
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-primary selection:text-primary-foreground" suppressHydrationWarning>
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/10 blur-[150px] rounded-full z-0" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-border/80 cyber-panel px-4 sm:px-6 py-3.5 backdrop-blur-md transition-all duration-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src={LOGO}
                alt="Logo LOVX"
                className="w-8 h-8 border border-primary/40 bg-background rounded-md object-cover"
              />
              <span className="text-lg font-display font-bold tracking-tight text-foreground">
                LOVX
              </span>
              <Badge variant="outline" className="text-[10px] font-sans border-border text-muted-foreground bg-muted/40 px-2 py-0.5">
                v2.4
              </Badge>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#demo" className="hover:text-foreground transition-colors">
              Simulador
            </a>
            <a href="#recursos" className="hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#prints" className="hover:text-foreground transition-colors">
              Galeria
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Sistema ativo</span>
            </div>
            <a
              href={STORE}
              target="_blank"
              rel="noreferrer"
              className="arcade-btn bg-primary text-primary-foreground px-4 py-2 text-xs sm:text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" /> Instalar Extensão
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION - FIRST SCREEN FULL VALUE PROPOSITION */}
      <section className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between items-center px-4 sm:px-6 pt-10 pb-12 overflow-hidden max-w-6xl mx-auto">
        <div className="absolute inset-0 grid-floor pointer-events-none z-0" />

        <div className="relative z-10 w-full flex flex-col items-center text-center my-auto">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary">
            <Zap className="w-3.5 h-3.5" /> Extensão oficial para Google Chrome
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-tight text-foreground max-w-3xl">
            Peça em português. <br />
            <span className="text-primary">A LOVX executa seu código.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Assistente de inteligência artificial integrado diretamente ao editor Lovable.
            Altera arquivos React, realiza commits no <span className="text-foreground font-semibold">GitHub</span> e gerencia o banco de dados.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
            <a
              href={STORE}
              target="_blank"
              rel="noreferrer"
              className="arcade-btn bg-primary text-primary-foreground px-7 py-3 rounded-md font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 border border-primary min-h-[44px] w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4" /> Adicionar ao Chrome
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#demo"
              className="arcade-btn border border-border bg-card/90 text-foreground px-7 py-3 rounded-md font-semibold text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto"
            >
              <Terminal className="w-4 h-4 text-primary" /> Ver simulador interativo
            </a>
          </div>

          {/* REAL PRODUCT UI IN BROWSER MOCKUP FRAME */}
          <div className="mt-10 w-full max-w-4xl cyber-panel border border-border/80 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-muted/70 px-4 py-2.5 border-b border-border flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-muted-foreground hidden sm:inline">lovable.dev/editor</span>
              </div>
              <div className="text-[11px] font-mono">LOVX AI Chat Extension v2.4</div>
            </div>
            <div className="relative aspect-[16/9] bg-black overflow-hidden">
              <img
                src={shots[0].src}
                alt="Interface do Chat no Editor Lovable"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* PROOF BADGES */}
        <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border/60 text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-2 text-foreground/90 font-medium">
            <ShieldCheck className="w-4 h-4 text-primary" /> Integração via GitHub API
          </div>
          <div className="flex items-center justify-center gap-2 text-foreground/90 font-medium">
            <Cpu className="w-4 h-4 text-primary" /> Suporte TypeScript & Tailwind
          </div>
          <div className="flex items-center justify-center gap-2 text-foreground/90 font-medium">
            <Database className="w-4 h-4 text-primary" /> Migrations no Supabase
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-border bg-card/40 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-5 rounded-lg border border-border bg-background/60">
            <div className="text-2xl sm:text-3xl font-display font-bold text-primary">10.000+</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">Prompts executados</div>
          </div>
          <div className="p-5 rounded-lg border border-border bg-background/60">
            <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">0.4s</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">Tempo de resposta médio</div>
          </div>
          <div className="p-5 rounded-lg border border-border bg-background/60">
            <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">100%</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">Sincronizado via Git</div>
          </div>
          <div className="p-5 rounded-lg border border-border bg-background/60">
            <div className="text-2xl sm:text-3xl font-display font-bold text-primary">5/5 ★</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">Avaliação na Web Store</div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO SIMULATOR */}
      <section id="demo" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
            Simulador de prompts
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl mx-auto">
            Escolha uma instrução abaixo para ver como a LOVX processa e aplica alterações diretamente no seu projeto.
          </p>
        </div>

        {/* PROMPT SELECTOR TABS */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-6">
          {interactivePrompts.map((p, idx) => (
            <button
              key={p.label}
              onClick={() => handleRunSim(idx)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all border flex items-center gap-2 min-h-[44px] ${
                activePromptIndex === idx
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-border/80 text-muted-foreground"
              }`}
            >
              <Play className="w-3.5 h-3.5" /> {p.label}
            </button>
          ))}
        </div>

        {/* TERMINAL BOX */}
        <div className="cyber-panel border border-border rounded-xl overflow-hidden shadow-xl">
          {/* TERMINAL HEADER */}
          <div className="bg-muted/80 px-4 py-3 border-b border-border flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-destructive/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-muted-foreground">lovx-executor.ts</span>
            </div>
            <button
              onClick={() => handleCopyPrompt(currentPrompt.prompt)}
              className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors min-h-[44px] px-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> COPIADO
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> COPIAR PROMPT
                </>
              )}
            </button>
          </div>

          {/* TERMINAL BODY */}
          <div className="p-6 bg-background/95 font-mono text-xs sm:text-sm space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">&gt;</span>
              <div className="flex-1 bg-card/70 p-3.5 rounded border border-border text-foreground">
                <span className="text-[11px] font-mono text-muted-foreground block mb-1">
                  Prompt enviado:
                </span>
                "{currentPrompt.prompt}"
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-mono text-sky-400 font-semibold">
                Execução do agente:
              </div>
              {currentPrompt.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    idx <= simStep ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {idx <= simStep ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-muted-foreground/30 flex-shrink-0" />
                  )}
                  <span className={idx <= simStep ? "text-foreground" : "text-muted-foreground"}>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>

            {simStep >= 3 && (
              <div className="mt-4 p-3.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Alteração executada e sincronizada
                </span>
                <span className="font-mono text-foreground font-semibold">{currentPrompt.fileCreated}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SCREENSHOTS GALLERY */}
      <section id="prints" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Veja a LOVX em ação
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Capturas de tela reais da extensão integrada ao editor do Lovable.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSlideIndex((slideIndex - 1 + shots.length) % shots.length)}
              className="p-2.5 border border-border rounded-md hover:border-primary text-foreground bg-card transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSlideIndex((slideIndex + 1) % shots.length)}
              className="p-2.5 border border-border rounded-md hover:border-primary text-foreground bg-card transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN DISPLAY CARD */}
        <div className="cyber-panel border border-border rounded-xl overflow-hidden p-2 relative group">
          <div className="relative aspect-[16/10] overflow-hidden bg-black rounded-lg">
            <img
              src={shots[slideIndex].src}
              alt={shots[slideIndex].title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <button
              onClick={() => setModalImage(shots[slideIndex].src)}
              className="absolute top-4 right-4 bg-background/90 backdrop-blur-md p-2 rounded-md border border-border text-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-xs min-h-[44px] px-3"
              title="Expandir imagem"
            >
              <Maximize2 className="w-4 h-4" /> Expandir
            </button>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/30 px-2.5 py-1 rounded inline-block">
                Tela {slideIndex + 1} de {shots.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mt-2">
                {shots[slideIndex].title}
              </h3>
              <p className="text-sm text-muted-foreground">{shots[slideIndex].desc}</p>
            </div>
          </div>
        </div>

        {/* THUMBNAILS STRIP (SCROLL HORIZONTAL NO MOBILE) */}
        <div className="flex sm:grid sm:grid-cols-5 gap-3 mt-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x">
          {shots.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`relative flex-shrink-0 w-36 sm:w-auto aspect-[16/10] overflow-hidden rounded-md border transition-all snap-start min-h-[44px] ${
                idx === slideIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border/60 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="recursos" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
            Recursos projetados para criadores
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Tudo o que você precisa para acelerar o desenvolvimento do seu projeto Lovable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="interactive-card p-6 sm:p-8 rounded-xl border border-border bg-card">
            <div className="w-10 h-10 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center text-primary mb-5">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">Chat integrado no editor</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Painel lateral nativo no Lovable. Escreva o que você precisa em português e receba o código pronto e testado.
            </p>
          </div>

          <div className="interactive-card p-6 sm:p-8 rounded-xl border border-border bg-card">
            <div className="w-10 h-10 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center text-primary mb-5">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">Sincronização no GitHub</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Edição direta de arquivos TypeScript e React com criação automática de commits e push para a sua branch main.
            </p>
          </div>

          <div className="interactive-card p-6 sm:p-8 rounded-xl border border-border bg-card">
            <div className="w-10 h-10 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center text-primary mb-5">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">Automação de banco de dados</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Criação de tabelas, colunas e políticas de acesso RLS no Supabase integrados às telas do seu aplicativo.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/40 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Como funciona
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center justify-center font-mono text-xs font-bold mb-4">
                1
              </div>
              <div className="text-base font-display font-bold text-foreground mb-2">Instale a Extensão</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Adicione a LOVX ao seu navegador Google Chrome diretamente da Web Store.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center justify-center font-mono text-xs font-bold mb-4">
                2
              </div>
              <div className="text-base font-display font-bold text-foreground mb-2">Acesse seu projeto no Lovable</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Abra o painel do Lovable e o assistente LOVX aparecerá na barra lateral.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center justify-center font-mono text-xs font-bold mb-4">
                3
              </div>
              <div className="text-base font-display font-bold text-foreground mb-2">Descreva a mudança</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Digite seu comando e veja as alterações aplicadas e commitadas no repositório.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
            Perguntas Frequentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          <AccordionItem value="item-1" className="border border-border bg-card rounded-lg px-6 py-1">
            <AccordionTrigger className="text-sm sm:text-base font-semibold hover:text-primary transition-colors text-left min-h-[44px]">
              Preciso de chave de API para usar a LOVX?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Sim, a extensão conecta de forma segura à API do GitHub e ao agente de IA da LOVX para realizar commits no seu repositório.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-border bg-card rounded-lg px-6 py-1">
            <AccordionTrigger className="text-sm sm:text-base font-semibold hover:text-primary transition-colors text-left min-h-[44px]">
              A LOVX altera projetos existentes sem quebrar o código?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Sim! A LOVX analisa a estrutura do projeto (Tailwind, componentes shadcn/ui e rotas) antes de aplicar qualquer alteração.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-border bg-card rounded-lg px-6 py-1">
            <AccordionTrigger className="text-sm sm:text-base font-semibold hover:text-primary transition-colors text-left min-h-[44px]">
              Como funciona a integração com o Supabase?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              A LOVX cria migrations SQL estruturadas e aplica diretamente na sua instância Postgres/Supabase conectada.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-border bg-card rounded-lg px-6 py-1">
            <AccordionTrigger className="text-sm sm:text-base font-semibold hover:text-primary transition-colors text-left min-h-[44px]">
              Posso usar em qualquer plano do Lovable?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Sim, a extensão funciona como uma camada sobre o navegador Chrome para qualquer projeto ativo no Lovable.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 sm:py-24 text-center px-4 sm:px-6 border-t border-border bg-card/20 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-foreground">
            Pronto para acelerar seus projetos?
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Instale a extensão LOVX agora mesmo no Chrome Web Store e transforme suas ideias em código no GitHub.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={STORE}
              target="_blank"
              rel="noreferrer"
              className="arcade-btn bg-primary text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-base hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 border border-primary min-h-[44px] w-full sm:w-auto"
            >
              <ExternalLink className="w-5 h-5" /> Adicionar ao Google Chrome
            </a>
          </div>

          <div className="mt-5 text-xs text-muted-foreground">
            Compatível com Google Chrome v110+
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto gap-4">
        <div className="flex items-center gap-2">
          <img src={LOGO} alt="LOVX" className="w-5 h-5 rounded object-cover" />
          <span className="font-semibold text-foreground">LOVX</span>
        </div>
        <div>© 2026 LOVX — Todos os direitos reservados</div>
        <div className="flex gap-4">
          <a href={STORE} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors min-h-[44px] flex items-center">
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
              className="absolute -top-10 right-0 text-white flex items-center gap-1.5 text-xs font-medium bg-muted px-3 py-1.5 rounded"
            >
              <Minimize2 className="w-4 h-4" /> Fechar [ESC]
            </button>
            <img
              src={modalImage}
              alt="Visualização expandida"
              className="w-full border border-border rounded-lg shadow-2xl object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
