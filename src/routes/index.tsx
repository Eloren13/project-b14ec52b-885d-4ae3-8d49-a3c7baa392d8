import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { poems } from "../data/poems";

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
      </section>

      {/* Random poem */}
<section className="mx-auto max-w-3xl px-6 pb-32 text-center">
  <div className="border-t border-border pt-16 md:pt-20">
    <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground md:text-base">
      Стихотворение дня
    </p>
    <div className="ornament mt-2 font-display text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70">
      обновляется при каждом визите
    </div>

    <div className="mt-10 md:mt-12">
      <h2 className="font-display text-5xl font-medium leading-tight md:text-6xl">
        {poem.title}
      </h2>
      <p className="mt-4 font-display text-2xl italic text-accent md:text-3xl">
        {poem.author}
        {poem.year ? <span className="text-muted-foreground"> · {poem.year}</span> : null}
      </p>
    </div>

    <div className="mt-10 space-y-1 font-display text-xl leading-relaxed text-foreground md:text-2xl">
      {poem.lines.map((line, i) => (
        <p key={i} className="italic">
          {line}
        </p>
      ))}
    </div>

    <div className="mt-14 flex items-center justify-center gap-4 text-muted-foreground">
      <span className="h-px w-16 bg-rule" />
      <span className="font-display text-xs italic">∗</span>
      <span className="h-px w-16 bg-rule" />
    </div>
  </div>
</section>

      {/* Special projects */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
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
          <span className="font-display text-xs uppercase tracking-[0.3em]">
            <Link
              to="/armenian-figures"
              className="text-inherit underline-offset-2 transition-colors hover:underline"
            >
              А
            </Link>
            ЛЬМАНАХ
          </span>
        </div>
      </footer>
    </div>
  );
}
