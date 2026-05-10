import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { movements } from "@/data/movements";

export const Route = createFileRoute("/history-of-philosophy")({
  head: () => ({
    meta: [
      { title: "История философии — Спецпроект POSTUM" },
      {
        name: "description",
        content:
          "Карта философских течений от античности до наших дней: основные идеи и философы каждой эпохи.",
      },
      {
        property: "og:title",
        content: "История философии — Спецпроект POSTUM",
      },
      {
        property: "og:description",
        content: "От досократиков до современности — идеи и философы.",
      },
    ],
  }),
  component: HistoryOfPhilosophy,
});

function HistoryOfPhilosophy() {
  const eras = useMemo(() => {
    const order: string[] = [];
    for (const m of movements) if (!order.includes(m.era)) order.push(m.era);
    return order;
  }, []);

  const [activeEra, setActiveEra] = useState<string>("all");
  const filtered =
    activeEra === "all" ? movements : movements.filter((m) => m.era === activeEra);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-foreground">
          ← POSTUM
        </Link>
        <span>Спецпроект №01</span>
      </header>

      {/* Title */}
      <section className="mx-auto max-w-5xl px-6 pt-12 pb-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Спецпроект POSTUM
        </p>
        <h1
          className="mt-6 font-display font-medium leading-[0.9] tracking-tight text-foreground"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
        >
          История
          <br />
          <em className="italic text-accent">философии</em>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl font-display text-lg italic text-muted-foreground md:text-xl">
          От первых вопросов о начале мира — к мысли о сетях, объектах и
          катастрофах. Карта философских течений с их главными идеями и
          философами.
        </p>
        <div className="ornament mx-auto mt-10 inline-block font-display text-sm uppercase tracking-[0.4em] text-muted-foreground">
          {movements.length} течений
        </div>
      </section>

      {/* Era filters */}
      <nav className="sticky top-0 z-10 border-y border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4 text-xs uppercase tracking-[0.25em]">
          <FilterButton
            active={activeEra === "all"}
            onClick={() => setActiveEra("all")}
          >
            Все эпохи
          </FilterButton>
          {eras.map((era) => (
            <FilterButton
              key={era}
              active={activeEra === era}
              onClick={() => setActiveEra(era)}
            >
              {era}
            </FilterButton>
          ))}
        </div>
      </nav>

      {/* Movements timeline */}
      <main className="mx-auto max-w-6xl px-6 py-20">
        <ol className="space-y-20">
          {filtered.map((m, i) => (
            <li
              key={m.id}
              className="grid gap-10 border-t border-border pt-12 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <div className="font-display text-6xl font-medium text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {m.era}
                </p>
                <p className="mt-1 font-display italic text-muted-foreground">
                  {m.period}
                </p>
              </div>

              <div className="md:col-span-9">
                <h2 className="font-display text-4xl font-medium leading-tight md:text-5xl">
                  {m.name}
                </h2>
                <p className="mt-3 font-display text-lg italic text-muted-foreground md:text-xl">
                  «{m.tagline}»
                </p>

                <div className="mt-8 grid gap-10 md:grid-cols-2">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Основные идеи
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {m.ideas.map((idea, j) => (
                        <li key={j} className="flex gap-3 text-base leading-relaxed">
                          <span className="mt-2 h-1 w-3 shrink-0 bg-accent" />
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Философы
                    </h3>
                    <ul className="mt-4 divide-y divide-border">
                      {m.philosophers.map((p) => (
                        <li
                          key={p.name}
                          className="flex items-baseline justify-between gap-4 py-2"
                        >
                          <span className="font-display text-lg">{p.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {p.years}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <Link to="/" className="transition-colors hover:text-foreground">
            ← Вернуться в POSTUM
          </Link>
          <span className="ornament font-display normal-case italic tracking-normal">
            philosophia perennis
          </span>
          <span>Спецпроект №01</span>
        </div>
      </footer>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative pb-1 transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent" />
      )}
    </button>
  );
}
