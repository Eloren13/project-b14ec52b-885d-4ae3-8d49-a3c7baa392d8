import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { movements, type Movement, type Philosopher } from "@/data/movements";

export const Route = createFileRoute("/history-of-philosophy")({
  head: () => ({
    meta: [
      { title: "История философии — Спецпроект ПОСТУМ" },
      {
        name: "description",
        content:
          "Карта философских школ от античности до наших дней: основные идеи и философы каждой школы.",
      },
      {
        property: "og:title",
        content: "История философии — Спецпроект ПОСТУМ",
      },
      {
        property: "og:description",
        content: "От досократиков до современности — школы, идеи и философы.",
      },
    ],
  }),
  component: HistoryOfPhilosophy,
});

interface SchoolGroup {
  school: string;
  movement: Movement;
  philosophers: Philosopher[];
}

function buildSchools(ms: Movement[]): SchoolGroup[] {
  const groups: SchoolGroup[] = [];
  for (const m of ms) {
    const order: string[] = [];
    const map = new Map<string, Philosopher[]>();
    for (const p of m.philosophers) {
      const key = p.school || m.name;
      if (!map.has(key)) {
        order.push(key);
        map.set(key, []);
      }
      map.get(key)!.push(p);
    }
    for (const key of order) {
      groups.push({ school: key, movement: m, philosophers: map.get(key)! });
    }
  }
  return groups;
}

function HistoryOfPhilosophy() {
  const eras = useMemo(() => {
    const order: string[] = [];
    for (const m of movements) if (!order.includes(m.era)) order.push(m.era);
    return order;
  }, []);

  const [activeEra, setActiveEra] = useState<string>("all");
  const filteredMovements =
    activeEra === "all" ? movements : movements.filter((m) => m.era === activeEra);
  const groups = useMemo(() => buildSchools(filteredMovements), [filteredMovements]);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
        <Link to="/" className="transition-colors hover:text-foreground">
          ← ПОСТУМ
        </Link>
        <span>Спецпроект №01</span>
      </header>

      {/* Title */}
      <section className="mx-auto max-w-5xl px-5 pt-8 pb-12 text-center md:pt-12 md:pb-16">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:text-xs">
          Спецпроект ПОСТУМ
        </p>
        <h1
          className="mt-6 font-display font-medium leading-[0.9] tracking-tight text-foreground"
          style={{ fontSize: "clamp(3rem, 13vw, 9rem)" }}
        >
          История
          <br />
          <em className="italic text-accent">философии</em>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-display text-base italic text-muted-foreground md:mt-8 md:text-xl">
          От первых вопросов о начале мира — к мысли о сетях, объектах и
          катастрофах. Карта философских школ с их главными идеями и философами.
        </p>
        <div className="ornament mx-auto mt-8 inline-block font-display text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:text-xs">
          {groups.length} школ · {movements.length} эпох мысли
        </div>
      </section>

      {/* Era filters */}
      <nav className="sticky top-0 z-10 border-y border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-3 text-[10px] uppercase tracking-[0.25em] md:gap-x-8 md:py-4 md:text-xs">
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

      {/* Schools timeline */}
      <main className="mx-auto max-w-5xl px-5 py-12 md:py-20">
        <ol className="space-y-16 md:space-y-24">
          {groups.map((g, i) => (
            <li
              key={`${g.movement.id}-${g.school}`}
              className="border-t border-border pt-10 md:pt-12"
            >
              {/* School header */}
              <div className="flex items-baseline gap-5 md:gap-7">
                <div className="font-display text-5xl font-medium leading-none text-accent/70 md:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
                    {g.movement.era} · {g.movement.period}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-medium leading-tight md:text-5xl">
                    {g.school}
                  </h2>
                  <p className="mt-2 font-display text-sm italic text-muted-foreground md:text-base">
                    {g.movement.name}
                  </p>
                </div>
              </div>

              {/* Philosophers */}
              <div className="mt-10 space-y-12 md:mt-14 md:space-y-16">
                {g.philosophers.map((p) => (
                  <article
                    key={p.name}
                    className="border-l-2 border-accent/30 pl-5 md:pl-8"
                  >
                    <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-2xl font-medium leading-tight md:text-3xl">
                        {p.name}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground md:text-sm">
                        {p.years}
                      </span>
                    </header>

                    {p.bio && (
                      <p className="mt-4 font-display text-base italic leading-relaxed text-foreground/90 md:text-lg">
                        {p.bio}
                      </p>
                    )}

                    {p.ideas && p.ideas.length > 0 && (
                      <div className="mt-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
                          Основные идеи
                        </p>
                        <ul className="mt-4 space-y-3">
                          {p.ideas.map((idea, k) => (
                            <li
                              key={k}
                              className="flex gap-3 text-[15px] leading-relaxed md:text-base"
                            >
                              <span className="mt-2.5 h-px w-3 shrink-0 bg-accent/70 md:w-4" />
                              <span>{idea}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {p.video && (
                      <figure className="mt-7">
                        <div
                          className="relative w-full overflow-hidden rounded-sm border border-border bg-card"
                          style={{ aspectRatio: "16 / 9" }}
                        >
                          <iframe
                            src={p.video.url}
                            title={p.video.title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 h-full w-full"
                          />
                        </div>
                        <figcaption className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
                          Видео · {p.video.title}
                        </figcaption>
                      </figure>
                    )}
                  </article>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:text-xs">
          <Link to="/" className="transition-colors hover:text-foreground">
            ← Вернуться в ПОСТУМ
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
