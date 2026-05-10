import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { poems } from "@/data/poems";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "POSTUM — Литература и философия" },
      {
        name: "description",
        content:
          "POSTUM — пространство литературы и философии. Случайное стихотворение русского поэта при каждом визите и спецпроекты POSTUM.",
      },
      { property: "og:title", content: "POSTUM — Литература и философия" },
      {
        property: "og:description",
        content: "Случайное стихотворение русского поэта и спецпроекты POSTUM.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const poem = useMemo(() => poems[Math.floor(Math.random() * poems.length)], []);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span>Альманах</span>
        <span className="hidden md:inline">Литература · Философия · Мысль</span>
        <span>MMXXVI</span>
      </header>

      {/* Hero */}
      <section className="relative mx-auto flex max-w-[1600px] flex-col items-center px-4 pt-8 pb-24 text-center">
        <p className="font-display text-sm italic text-muted-foreground md:text-base">
          ex post — после написанного
        </p>
        <h1
          className="font-display font-medium leading-[0.85] tracking-tight text-foreground"
          style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}
        >
          POSTUM
        </h1>
        <div className="mt-6 flex items-center gap-4 text-muted-foreground">
          <span className="h-px w-16 bg-rule md:w-32" />
          <span className="font-display text-base italic md:text-lg">
            альманах слова и мысли
          </span>
          <span className="h-px w-16 bg-rule md:w-32" />
        </div>
      </section>

      {/* Random poem */}
      <section className="mx-auto max-w-3xl px-6 pb-32">
        <div className="mb-10 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-px w-12 bg-rule" />
          Стихотворение дня
          <span className="h-px w-12 bg-rule" />
        </div>

        <article className="relative rounded-sm border border-border bg-card/60 p-10 backdrop-blur-sm md:p-16">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background px-4 font-display text-3xl text-accent">
            ❦
          </span>
          <h2 className="font-display text-3xl font-medium text-foreground md:text-4xl">
            {poem.title}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {poem.author}
            {poem.year ? ` · ${poem.year}` : ""}
          </p>
          <div className="mt-10 space-y-2 font-display text-xl leading-relaxed text-foreground md:text-2xl">
            {poem.lines.map((line, i) => (
              <p key={i} className="italic">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            обновляется при каждом визите
          </p>
        </article>
      </section>

      {/* Special projects */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Раздел
          </p>
          <h2 className="mt-3 font-display text-5xl font-medium md:text-6xl">
            Спецпроекты POSTUM
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-display italic text-muted-foreground">
            Длинные формы, в которых мы возвращаем мысли время и место.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Link
            to="/history-of-philosophy"
            className="group relative block overflow-hidden rounded-sm border border-border bg-card p-10 transition-all hover:border-accent hover:shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--ink)_40%,transparent)]"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span>Спецпроект №01</span>
              <span className="text-accent">→</span>
            </div>
            <h3 className="mt-8 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
              История философии
            </h3>
            <p className="mt-4 max-w-md font-display italic text-muted-foreground">
              От досократиков до спекулятивного реализма — карта движений,
              идей и людей, мысливших мир.
            </p>
            <div className="mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-foreground">
              Войти
              <span className="h-px w-10 bg-foreground transition-all group-hover:w-20 group-hover:bg-accent" />
            </div>
          </Link>

          <div className="relative rounded-sm border border-dashed border-border p-10 text-muted-foreground">
            <div className="text-xs uppercase tracking-[0.3em]">Скоро</div>
            <h3 className="mt-8 font-display text-4xl font-medium italic leading-tight md:text-5xl">
              Готовится&nbsp;к&nbsp;изданию
            </h3>
            <p className="mt-4 max-w-md font-display italic">
              Пока в работе только один спецпроект. Следующие — на письменном
              столе редакции.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <span>© POSTUM</span>
          <span className="ornament font-display normal-case tracking-normal italic">
            verba volant, scripta manent
          </span>
          <span>альманах</span>
        </div>
      </footer>
    </div>
  );
}
