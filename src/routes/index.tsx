import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { poems } from "@/data/poems";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ПОСТУМ — Литература и философия" },
      {
        name: "description",
        content:
          "ПОСТУМ — пространство литературы и философии. Случайное стихотворение русского поэта при каждом визите и спецпроекты ПОСТУМ.",
      },
      { property: "og:title", content: "ПОСТУМ — Литература и философия" },
      {
        property: "og:description",
        content: "Случайное стихотворение русского поэта и спецпроекты ПОСТУМ.",
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
      <section className="relative mx-auto flex max-w-[1600px] flex-col items-center px-4 pt-8 pb-20 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          ex post — после написанного
        </p>
        <h1
          className="mt-6 font-display font-medium leading-[0.85] tracking-tight text-foreground"
          style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}
        >
          ПОСТУМ
        </h1>
        <div className="mt-8 flex items-center gap-4 text-muted-foreground">
          <span className="h-px w-16 bg-rule md:w-32" />
          <span className="font-display text-base italic md:text-lg">
            альманах <em className="text-accent">слова и мысли</em>
          </span>
          <span className="h-px w-16 bg-rule md:w-32" />
        </div>
        <div className="ornament mt-10 inline-block font-display text-xs uppercase tracking-[0.4em] text-muted-foreground">
          выпуск №01 · MMXXVI
        </div>
      </section>

      {/* Random poem */}
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="mb-12 border-y border-border py-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Раздел №01 · Стихотворение дня
          </p>
        </div>

        <article className="grid gap-10 border-t border-border pt-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="font-display text-6xl font-medium text-accent/70">01</div>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {poem.author}
            </p>
            {poem.year && (
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {poem.year}
              </p>
            )}
            <p className="mt-4 font-display italic text-muted-foreground">
              обновляется при каждом визите
            </p>
          </div>

          <div className="md:col-span-9">
            <h2 className="font-display text-4xl font-medium leading-tight md:text-5xl">
              {poem.title}
              <br />
              <em className="italic text-accent text-2xl md:text-3xl">
                — {poem.author}
              </em>
            </h2>
            <div className="mt-8 space-y-2 font-display text-xl leading-relaxed text-foreground md:text-2xl">
              {poem.lines.map((line, i) => (
                <p key={i} className="italic">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* Special projects */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-12 border-y border-border py-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Раздел №02 · Спецпроекты
          </p>
        </div>

        <div className="mb-14 text-center">
          <h2
            className="font-display font-medium leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Спецпроекты
            <br />
            <em className="italic text-accent">ПОСТУМ</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-display text-lg italic text-muted-foreground">
            Длинные формы, в которых мы возвращаем мысли время и место.
          </p>
          <div className="ornament mx-auto mt-8 inline-block font-display text-xs uppercase tracking-[0.4em] text-muted-foreground">
            1 проект в эфире
          </div>
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
              История
              <br />
              <em className="italic text-accent">философии</em>
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
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
              <span>Спецпроект №02</span>
              <span>скоро</span>
            </div>
            <h3 className="mt-8 font-display text-4xl font-medium leading-tight md:text-5xl">
              Готовится
              <br />
              <em className="italic text-accent/70">к&nbsp;изданию</em>
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
          <span>© ПОСТУМ</span>
          <span className="ornament font-display normal-case tracking-normal italic">
            verba volant, scripta manent
          </span>
          <span>альманах</span>
        </div>
      </footer>
    </div>
  );
}
