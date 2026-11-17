import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEONVERSE — Plataforma de Jogos Retro-Futurista" },
      { name: "description", content: "Jogue, conecte-se e domine o neon. Baixe a NEONVERSE e entre na comunidade." },
      { property: "og:title", content: "NEONVERSE — Plataforma de Jogos" },
      { property: "og:description", content: "Jogos imersivos, comunidade viva e estética synthwave." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const games = [
  { t: "Chrome Drift", g: "Corrida", c: "from-primary to-accent" },
  { t: "Void Sentinels", g: "Shooter", c: "from-accent to-secondary" },
  { t: "Pixel Ronin", g: "Ação", c: "from-secondary to-primary" },
  { t: "Synth Tactics", g: "Estratégia", c: "from-primary to-secondary" },
];

function Index() {
  const [i, setI] = useState(0);
  const g = games[i];
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-mono">
      <nav className="flex justify-between items-center px-8 py-6">
        <span className="text-2xl font-black tracking-widest text-primary neon">NEONVERSE</span>
        <a href="#download" className="border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition">BAIXAR</a>
      </nav>

      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 grid-floor" />
        <div className="cube mb-10"><div/><div/><div/><div/><div/><div/></div>
        <h1 className="relative text-5xl md:text-7xl font-black tracking-tight">
          ENTRE NO <span className="text-accent neon">FUTURO</span> DO PASSADO
        </h1>
        <p className="relative mt-4 max-w-xl text-muted-foreground">Uma plataforma de jogos com alma oitentista e tecnologia de amanhã.</p>
        <a href="#download" className="relative mt-8 bg-primary text-primary-foreground px-8 py-4 font-bold shadow-[var(--glow)] hover:scale-105 transition">JOGAR AGORA</a>
      </section>

      <section className="px-8 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-secondary neon">// VITRINE</h2>
        <div className={`h-72 bg-gradient-to-br ${g.c} flex flex-col justify-end p-8 transition-all [transform:perspective(800px)_rotateX(6deg)]`}>
          <span className="text-sm text-primary-foreground/80">{g.g}</span>
          <h3 className="text-4xl font-black text-primary-foreground">{g.t}</h3>
        </div>
        <div className="flex gap-3 mt-6 justify-center">
          <button onClick={() => setI((i + games.length - 1) % games.length)} className="border border-border px-4 py-2 hover:border-primary">◀</button>
          {games.map((_, k) => (
            <button key={k} aria-label={`Jogo ${k + 1}`} onClick={() => setI(k)} className={`w-3 h-3 self-center ${k === i ? "bg-primary" : "bg-muted"}`} />
          ))}
          <button onClick={() => setI((i + 1) % games.length)} className="border border-border px-4 py-2 hover:border-primary">▶</button>
        </div>
      </section>

      <section className="px-8 py-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {[["2M+", "Jogadores ativos"], ["Clãs", "Monte seu esquadrão"], ["Torneios", "Prêmios semanais"]].map(([a, b]) => (
          <div key={a} className="border border-accent/40 p-6 bg-card hover:shadow-[var(--glow-accent)] transition">
            <div className="text-3xl font-black text-accent">{a}</div>
            <div className="text-muted-foreground mt-2">{b}</div>
          </div>
        ))}
      </section>

      <section id="download" className="py-24 text-center px-4">
        <h2 className="text-4xl font-black">PRONTO PARA <span className="text-primary neon">CONECTAR</span>?</h2>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          {["Windows", "macOS", "Linux"].map((p) => (
            <button key={p} className="bg-secondary text-secondary-foreground px-6 py-3 font-bold hover:scale-105 transition">⬇ {p}</button>
          ))}
        </div>
      </section>
      <footer className="text-center text-muted-foreground py-8 text-sm">© 2026 NEONVERSE</footer>
    </div>
  );
}
