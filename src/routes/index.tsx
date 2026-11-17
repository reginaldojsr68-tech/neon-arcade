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
                className="relative w-9 h-9 border border-primary/40 bg-background rounded-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-bold tracking-tight text-foreground flex items-center gap-2">
                LOVX
              </span>
              <Badge variant="outline" className="text-[10px] font-mono border-accent/40 text-accent bg-accent/10 px-1.5 py-0.5">
                v2.4
              </Badge>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <a href="#demo" className="hover:text-foreground transition">
              Simulador
            </a>
            <a href="#recursos" className="hover:text-foreground transition">
              Recursos
            </a>
            <a href="#prints" className="hover:text-foreground transition">
              Galeria
            </a>
            <a href="#faq" className="hover:text-foreground transition">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>SISTEMA ATIVO</span>
            </div>
            <a
              href={STORE}
              target="_blank"
              rel="noreferrer"
              className="arcade-btn border border-primary bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold rounded-md hover:bg-primary/90 transition flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Instalar Extensão
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[40%] grid-floor pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3.5 py-1 text-xs font-mono text-secondary">
            <Zap className="w-3.5 h-3.5" /> Extensão oficial Chrome para Lovable
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-none text-foreground">
            Peça em português. <br />
            <span className="text-primary">A LOVX executa.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Assistente de inteligência artificial integrado diretamente ao editor Lovable.
            Altera seu código React, cria commits no <span className="text-foreground font-semibold">GitHub</span> e atualiza o banco de dados sem esforço.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href={STORE}
              target="_blank"
              rel="noreferrer"
              className="arcade-btn bg-primary text-primary-foreground px-7 py-3.5 rounded-md font-semibold text-sm hover:bg-primary/90 transition flex items-center justify-center gap-2.5 border border-primary shadow-[var(--glow)]"
            >
              <Sparkles className="w-4 h-4" /> Adicionar ao Chrome
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#demo"
              className="arcade-btn border border-border bg-card/80 text-foreground px-7 py-3.5 rounded-md font-semibold text-sm hover:bg-accent/10 hover:border-accent/50 transition flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-accent" /> Ver simulador interativo
            </a>
          </div>

          <div className="mt-14 flex flex-wrap justify-center items-center gap-8 text-xs text-muted-foreground border-t border-border/60 pt-6 w-full max-w-3xl">
            <span className="flex items-center gap-2 text-foreground/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-accent" /> Integração direta via GitHub API
            </span>
            <span className="flex items-center gap-2 text-foreground/90 font-medium">
              <Cpu className="w-4 h-4 text-primary" /> Suporte a TypeScript & Tailwind
            </span>
            <span className="flex items-center gap-2 text-foreground/90 font-medium">
              <Database className="w-4 h-4 text-secondary" /> Auto Migrations no Supabase
            </span>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-border bg-card/50 backdrop-blur-md py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-md border border-border/50 bg-background/50">
            <div className="text-2xl sm:text-3xl font-display font-bold text-primary">10.000+</div>
            <div className="text-xs text-muted-foreground mt-1">Prompts executados</div>
          </div>
          <div className="p-4 rounded-md border border-border/50 bg-background/50">
            <div className="text-2xl sm:text-3xl font-display font-bold text-secondary">0.4s</div>
            <div className="text-xs text-muted-foreground mt-1">Tempo de resposta médio</div>
          </div>
          <div className="p-4 rounded-md border border-border/50 bg-background/50">
            <div className="text-2xl sm:text-3xl font-display font-bold text-accent">100%</div>
            <div className="text-xs text-muted-foreground mt-1">Sincronizado via Git</div>
          </div>
          <div className="p-4 rounded-md border border-border/50 bg-background/50">
            <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">5/5 ★</div>
            <div className="text-xs text-muted-foreground mt-1">Avaliação na Web Store</div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO SIMULATOR */}
      <section id="demo" className="py-20 px-4 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            Experimente um prompt simulado
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Escolha uma instrução abaixo para ver como a LOVX processa e aplica alterações diretamente no seu projeto.
          </p>
        </div>

        {/* PROMPT SELECTOR TABS */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-6">
          {interactivePrompts.map((p, idx) => (
            <button
              key={p.label}
              onClick={() => handleRunSim(idx)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition border flex items-center gap-2 ${
                activePromptIndex === idx
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card hover:border-border/80 text-muted-foreground"
              }`}
            >
              <Play className="w-3 h-3" /> {p.label}
            </button>
          ))}
        </div>

        {/* TERMINAL BOX */}
        <div className="cyber-panel border border-border rounded-lg overflow-hidden shadow-2xl">
          {/* TERMINAL HEADER */}
          <div className="bg-muted/80 px-4 py-3 border-b border-border flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-destructive/80" />
              <span className="w-3 h-3 rounded-full bg-accent/80" />
              <span className="w-3 h-3 rounded-full bg-secondary/80" />
              <span className="ml-2 font-mono text-muted-foreground">lovx-executor.ts</span>
            </div>
            <button
              onClick={() => handleCopyPrompt(currentPrompt.prompt)}
              className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-accent" /> COPIADO
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> COPIAR PROMPT
                </>
              )}
            </button>
          </div>

          {/* TERMINAL BODY */}
          <div className="p-6 bg-background/95 font-mono text-xs sm:text-sm space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-accent font-bold">&gt;</span>
              <div className="flex-1 bg-card/60 p-3.5 rounded border border-border text-foreground">
                <span className="text-[11px] font-mono text-muted-foreground block mb-1">
                  Prompt enviado:
                </span>
                "{currentPrompt.prompt}"
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-mono text-secondary font-semibold">
                Execução do agente:
              </div>
              {currentPrompt.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    idx <= simStep ? "opacity-100" : "opacity-30"
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
              <div className="mt-4 p-3.5 rounded border border-accent/40 bg-accent/10 text-accent text-xs flex justify-between items-center animate-fade-in">
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
      <section id="prints" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">
              Veja a LOVX em ação
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Capturas de tela reais da extensão integrada ao editor do Lovable.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSlideIndex((slideIndex - 1 + shots.length) % shots.length)}
              className="p-2 border border-border rounded-md hover:border-primary text-foreground bg-card transition"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSlideIndex((slideIndex + 1) % shots.length)}
              className="p-2 border border-border rounded-md hover:border-primary text-foreground bg-card transition"
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
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <button
              onClick={() => setModalImage(shots[slideIndex].src)}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-md p-2 rounded-md border border-border text-foreground hover:text-primary transition opacity-0 group-hover:opacity-100"
              title="Expandir imagem"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-mono text-primary uppercase tracking-wider bg-primary/10 border border-primary/30 px-2.5 py-1 rounded">
                Tela {slideIndex + 1} de {shots.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mt-2">
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
              className={`relative aspect-[16/10] overflow-hidden rounded-md border transition ${
                idx === slideIndex
                  ? "border-primary ring-2 ring-primary/20 scale-105"
                  : "border-border/60 opacity-60 hover:opacity-100"
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
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground">
            Recursos projetados para criadores
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
            Tudo o que você precisa para acelerar o desenvolvimento do seu projeto Lovable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="cyber-panel p-8 rounded-xl border border-border bg-card hover:border-accent/50 transition duration-300 relative group">
            <div className="w-10 h-10 rounded-lg border border-accent/40 bg-accent/10 flex items-center justify-center text-accent mb-5 group-hover:scale-105 transition">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">Chat integrado no editor</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Painel lateral nativo no Lovable. Escreva o que você precisa em português e receba o código pronto e testado.
            </p>
          </div>

          <div className="cyber-panel p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition duration-300 relative group">
            <div className="w-10 h-10 rounded-lg border border-primary/40 bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-105 transition">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">Sincronização no GitHub</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Edição direta de arquivos TypeScript e React com criação automática de commits e push para a sua branch main.
            </p>
          </div>

          <div className="cyber-panel p-8 rounded-xl border border-border bg-card hover:border-secondary/50 transition duration-300 relative group">
            <div className="w-10 h-10 rounded-lg border border-secondary/40 bg-secondary/10 flex items-center justify-center text-secondary mb-5 group-hover:scale-105 transition">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">Automação de Banco de Dados</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Criação de tabelas, colunas e políticas de acesso RLS no Supabase integrados às telas do seu aplicativo.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            Como funciona
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
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
            <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary border border-secondary/30 flex items-center justify-center font-mono text-xs font-bold mb-4">
              2
            </div>
            <div className="text-base font-display font-bold text-foreground mb-2">Acesse seu projeto no Lovable</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Abra o painel do Lovable e o assistente LOVX aparecerá na barra lateral.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-background">
            <div className="w-8 h-8 rounded-full bg-accent/10 text-accent border border-accent/30 flex items-center justify-center font-mono text-xs font-bold mb-4">
              3
            </div>
            <div className="text-base font-display font-bold text-foreground mb-2">Descreva a mudança</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Digite seu comando e veja as alterações aplicadas e commitadas no repositório.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Perguntas Frequentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          <AccordionItem value="item-1" className="border border-border bg-card rounded-lg px-6 py-1">
            <AccordionTrigger className="text-sm sm:text-base font-semibold hover:text-primary transition">
              Preciso de chave de API para usar a LOVX?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Sim, a extensão conecta de forma segura à API do GitHub e ao agente de IA da LOVX para realizar commits no seu repositório.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-border bg-card rounded-lg px-6 py-1">
            <AccordionTrigger className="text-sm sm:text-base font-semibold hover:text-secondary transition">
              A LOVX altera projetos existentes sem quebrar o código?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Sim! A LOVX analisa a estrutura do projeto (Tailwind, componentes shadcn/ui e rotas) antes de aplicar qualquer alteração.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-border bg-card rounded-lg px-6 py-1">
            <AccordionTrigger className="text-sm sm:text-base font-semibold hover:text-accent transition">
              Como funciona a integração com o Supabase?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              A LOVX cria migrations SQL estruturadas e aplica diretamente na sua instância Postgres/Supabase conectada.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-border bg-card rounded-lg px-6 py-1">
            <AccordionTrigger className="text-sm sm:text-base font-semibold hover:text-primary transition">
              Posso usar em qualquer plano do Lovable?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Sim, a extensão funciona como uma camada sobre o navegador Chrome para qualquer projeto ativo no Lovable.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 text-center px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-foreground">
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
              className="arcade-btn bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold text-base shadow-[var(--glow)] hover:bg-primary/90 transition flex items-center justify-center gap-3 border border-primary"
            >
              <ExternalLink className="w-5 h-5" /> Adicionar ao Google Chrome
            </a>
          </div>

          <div className="mt-6 text-xs text-muted-foreground font-mono">
            Compatível com Google Chrome v110+
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
        <div className="flex items-center gap-2">
          <img src={LOGO} alt="LOVX" className="w-5 h-5 rounded" />
          <span className="font-semibold text-foreground">LOVX ARCADE EDITION</span>
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
              className="absolute -top-10 right-0 text-white flex items-center gap-1 text-xs font-mono"
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
