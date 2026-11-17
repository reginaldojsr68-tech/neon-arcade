import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const STORE = "https://chromewebstore.google.com/detail/lovx/jchnmipjgodjjlnagcddbnpbnohahlec?hl=pt-BR";
const IMG = "https://lh3.googleusercontent.com/";
const LOGO = IMG + "nUx6bbly7AM5lVFELnqZjfKrbHBN3KtiGNC60ca0NJYz5vXrlLngZ5o1z8rWsFV2Y-TAJKoDhxLmT1SPCday5VN1=s120";
const shots = [
  "m2FqZ7rHl-Ui6l-aKhwq1fHuvxm8s9OvdQ8o2ZBE7liOaa8McyqTs2BZljQNS3oWTTT9Scpp6KS-0AnWHBTUCCpBlw",
  "aQicGYL5THg9y6zBAHULtbToEWoDHe-eNrOHP6hIiElZ0ltAX0wBoXXP6DuzVhV-j5J1XE4tJVaVYpge0np8xhHKEw",
  "NtHXOLdk6zPJREqLTikJ2Lb9Obdaa3HZ3wl8SBfNTIq6QclDCFwsDv1b0AqeFjx0haVxoztv4p80XICRbuZJP8bYqAQ",
  "KYktZbpAvOeC9XYUWBjcR0j6neeXGmUo4hCs30Fx-D1yd_2dvAnnj5yNJMeX_-_xrfLQdk-TxzkXJAN56k7jZnF8tO0",
  "4XPK1q0oErSUP9pmlsITSbij1W55o_xDVLi2Fw4yle8hHKED1Gb7HcdbLHkRPtVpo-8A2CDt1vTIJkh7HjMc5erEjQ",
].map((s) => `${IMG}${s}=s1280-w1280-h800`);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOVX — Chat de IA para seus projetos Lovable" },
      { name: "description", content: "Peça em português o que quer mudar e a LOVX altera o código, envia ao GitHub e atualiza o banco." },
      { property: "og:title", content: "LOVX — Chat de IA para projetos Lovable" },
      { property: "og:description", content: "Extensão para Chrome que aplica mudanças no código pelo GitHub e no banco." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: shots[0] },
      { name: "twitter:image", content: shots[0] },
    ],
  }),
  component: Index,
});

const features = [
  ["Chat no editor", "Um chat de IA dentro do editor do Lovable, em português."],
  ["Direto no GitHub", "A LOVX altera os arquivos e envia para o seu repositório."],
  ["Banco de dados", "Aplica mudanças no banco junto com o código."],
];

function Index() {
  const [i, setI] = useState(0);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-mono">
      <nav className="flex justify-between items-center px-8 py-6">
        <span className="flex items-center gap-3 text-2xl font-black tracking-widest text-primary neon">
          <img src={LOGO} alt="Logo LOVX" className="w-9 h-9" /> LOVX
        </span>
        <a href={STORE} target="_blank" rel="noreferrer" className="border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition">INSTALAR</a>
      </nav>

      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 grid-floor" />
        <div className="cube mb-10"><div/><div/><div/><div/><div/><div/></div>
        <h1 className="relative text-5xl md:text-7xl font-black tracking-tight">
          PEÇA. A <span className="text-accent neon">LOVX</span> FAZ.
        </h1>
        <p className="relative mt-4 max-w-xl text-muted-foreground">
          Chat de IA para projetos do Lovable: aplica as mudanças no código pelo GitHub e no banco.
        </p>
        <a href={STORE} target="_blank" rel="noreferrer" className="relative mt-8 bg-primary text-primary-foreground px-8 py-4 font-bold shadow-[var(--glow)] hover:scale-105 transition">USAR NO CHROME</a>
      </section>

      <section className="px-8 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-secondary neon">// VEJA EM AÇÃO</h2>
        <img src={shots[i]} alt={`Captura de tela ${i + 1} da LOVX`} className="w-full aspect-[16/10] object-cover border border-secondary shadow-[var(--glow)]" />
        <div className="flex gap-3 mt-6 justify-center">
          <button onClick={() => setI((i + shots.length - 1) % shots.length)} className="border border-border px-4 py-2 hover:border-primary">◀</button>
          {shots.map((_, k) => (
            <button key={k} aria-label={`Imagem ${k + 1}`} onClick={() => setI(k)} className={`w-3 h-3 self-center ${k === i ? "bg-primary" : "bg-muted"}`} />
          ))}
          <button onClick={() => setI((i + 1) % shots.length)} className="border border-border px-4 py-2 hover:border-primary">▶</button>
        </div>
      </section>

      <section className="px-8 py-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map(([a, b]) => (
          <div key={a} className="border border-accent/40 p-6 bg-card hover:shadow-[var(--glow-accent)] transition">
            <div className="text-2xl font-black text-accent">{a}</div>
            <div className="text-muted-foreground mt-2">{b}</div>
          </div>
        ))}
      </section>

      <section className="py-24 text-center px-4">
        <h2 className="text-4xl font-black">PRONTO PARA <span className="text-primary neon">ACELERAR</span>?</h2>
        <p className="mt-3 text-muted-foreground">Requer chave de acesso.</p>
        <a href={STORE} target="_blank" rel="noreferrer" className="inline-block mt-8 bg-secondary text-secondary-foreground px-8 py-4 font-bold hover:scale-105 transition">⬇ ADICIONAR AO CHROME</a>
      </section>
      <footer className="text-center text-muted-foreground py-8 text-sm">© 2026 LOVX</footer>
    </div>
  );
}
