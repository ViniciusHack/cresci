import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduced
      ? null
      : new Lenis({
          autoRaf: true,
          duration: 1.05,
          easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        });

    if (lenis) {
      document.documentElement.classList.add("lenis", "lenis-smooth");
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const id = decodeURIComponent(link.hash.replace("#", ""));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -8, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      const url = new URL(window.location.href);
      url.hash = id;
      window.history.replaceState({}, "", url);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);
}
