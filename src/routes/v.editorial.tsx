import { createFileRoute } from "@tanstack/react-router";

import { About } from "../components/site/About";
import { Contact, Footer } from "../components/site/Contact";
import { Experience } from "../components/site/Experience";
import { HackEggProvider } from "../components/site/HackEgg";
import { Header } from "../components/site/Header";
import { Hero } from "../components/site/Hero";
import { Thinking } from "../components/site/Thinking";
import { Work } from "../components/site/Work";
import { useLenis } from "../hooks/lenis";
import { copyForSearch, pageHead } from "../lib/seo";

export const Route = createFileRoute("/v/editorial")({
  head: ({ match }) => {
    const { locale, copy } = copyForSearch(match.search);
    return pageHead({
      title: `${copy.versions.editorial.name} — Vinícius Hack`,
      description: copy.versions.editorial.tag,
      path: "/v/editorial",
      locale,
      index: false,
    });
  },
  component: EditorialPage,
});

function EditorialPage() {
  useLenis();

  return (
    <HackEggProvider>
      <div className="min-h-svh bg-paper text-ink">
        <Header />
        <main id="conteudo">
          <Hero />
          <About />
          <Thinking />
          <Work />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </HackEggProvider>
  );
}
