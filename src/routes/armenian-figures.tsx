import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/armenian-figures")({
  head: () => ({
    meta: [
      { title: "Армянские деятели — ПОСТУМ" },
      {
        name: "description",
        content:
          "Армянские деятели — страницы о выдающихся армянских мыслях и деятелях в истории культуры.",
      },
      { property: "og:title", content: "Армянские деятели — ПОСТУМ" },
      {
        property: "og:description",
        content: "Познакомьтесь с армянскими деятелями и их вкладом в литературу, философию и культуру.",
      },
    ],
  }),
  component: ArmenianFigures,
});

function ArmenianFigures() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-foreground">
          ← ПОСТУМ
        </Link>
        <span>Армянские деятели</span>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:text-xs">
          Спецпроект POСТУМ
        </p>
        <h1
          className="mt-6 font-display font-medium leading-[0.9] tracking-tight text-foreground"
          style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
        >
          Армянские
          <br />
          <em className="italic text-accent">деятели</em>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-display text-base italic text-muted-foreground md:mt-8 md:text-xl">
          Страница с материалами об армянских деятелях и их значении для культуры,
          литературы и философии.
        </p>
        <img
          src="https://avatars.mds.yandex.net/i?id=09f9c275bd873805473c74216ba8cb9f_l-12244410-images-thumbs&n=13"
          alt="Армянский символ"
          className="mt-12 w-72 h-72 mx-auto rounded-lg shadow-lg"
        />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <Link to="/" className="transition-colors hover:text-foreground">
            ← Вернуться в ПОСТУМ
          </Link>
          <span className="ornament font-display normal-case tracking-normal italic">
            verba volant, scripta manent
          </span>
          <span>Армянские деятели</span>
        </div>
      </footer>
    </div>
  );
}
