import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { useI18n } from "../../lib/i18n";

type HackEggContextValue = {
  open: () => void;
  close: () => void;
  active: boolean;
};

const HackEggContext = createContext<HackEggContextValue | null>(null);

export function useHackEgg() {
  const context = useContext(HackEggContext);
  if (!context) {
    throw new Error("useHackEgg must be used within HackEggProvider");
  }
  return context;
}

export function HackEggProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const buffer = useRef("");

  const open = useCallback(() => setActive(true), []);
  const close = useCallback(() => {
    setActive(false);
    if (window.location.hash === "#hack") {
      const url = new URL(window.location.href);
      url.hash = "";
      window.history.replaceState({}, "", url);
    }
  }, []);

  useEffect(() => {
    if (window.location.hash === "#hack") open();

    const onHash = () => {
      if (window.location.hash === "#hack") open();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key.length !== 1) return;
      buffer.current = (buffer.current + event.key.toLowerCase()).slice(-4);
      if (buffer.current === "hack") {
        buffer.current = "";
        open();
      }
    };

    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
    };
  }, [close, open]);

  return (
    <HackEggContext.Provider value={{ open, close, active }}>
      {children}
      <HackEggOverlay />
    </HackEggContext.Provider>
  );
}

function HackEggOverlay() {
  const { copy } = useI18n();
  const { active, close } = useHackEgg();
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!active) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const stop = (event: Event) => event.preventDefault();
    window.addEventListener("wheel", stop, { passive: false });
    window.addEventListener("touchmove", stop, { passive: false });

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
    };
  }, [active]);

  if (!mounted) return null;

  return createPortal(
    active ? (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="hack-overlay fixed inset-0 z-[80] cursor-pointer overflow-hidden bg-[#0c0b09] text-[#f0c36a]"
        onClick={close}
      >
        <MatrixRain />
        <div className="hack-scanlines pointer-events-none absolute inset-0" />
          <div className="relative z-10 mx-auto flex min-h-svh max-w-[1400px] flex-col justify-between px-5 py-8 md:px-10 md:py-12">
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#c98414] uppercase">
              {copy.hack.eyebrow}
            </p>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <h2
                id={titleId}
                className="font-display text-[clamp(3.4rem,9vw,7.2rem)] leading-[0.84] tracking-[-0.03em] text-[#fff3d0] lg:col-span-7"
              >
                {copy.hack.title}
              </h2>
              <div className="lg:col-span-5">
                <TerminalLines lines={copy.hack.lines} />
              </div>
            </div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#9a6c10] uppercase">
              {copy.hack.dismiss}
            </p>
          </div>
      </div>
    ) : null,
    document.body,
  );
}

function TerminalLines({ lines }: { lines: string[] }) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setCount(lines.length);
      return;
    }

    setCount(0);
    let shown = 0;
    const id = window.setInterval(() => {
      shown += 1;
      setCount(shown);
      if (shown >= lines.length) window.clearInterval(id);
    }, 420);

    return () => window.clearInterval(id);
  }, [lines, reduced]);

  return (
    <div className="mt-8 max-w-xl space-y-1 font-mono text-[13px] leading-relaxed md:text-[15px]">
      {lines.slice(0, count).map((line, index) => (
        <p
          key={`${line}-${index}`}
          className={line.startsWith("$") ? "text-[#fff3d0]" : "text-[#e8a317]"}
        >
          {line}
        </p>
      ))}
      {count < lines.length ? (
        <p className="hack-caret text-[#fff3d0]" aria-hidden>
          ▍
        </p>
      ) : null}
    </div>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const glyphs = "HACK01xh4ck";
    let frame = 0;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.floor(window.innerWidth / 18);
      drops = Array.from({ length: columns }, () => Math.random() * -40);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      context.fillStyle = "rgba(12, 11, 9, 0.14)";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.font = "13px 'IBM Plex Mono', ui-monospace, monospace";

      for (let i = 0; i < drops.length; i += 1) {
        const glyph = glyphs[(i + frame) % glyphs.length] ?? "H";
        context.fillStyle = i % 5 === 0 ? "rgba(255, 243, 208, 0.72)" : "rgba(201, 157, 74, 0.5)";
        context.fillText(glyph, i * 18, drops[i]! * 18);
        if (drops[i]! * 18 > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] = (drops[i] ?? 0) + 1;
        }
      }

      frame += 1;
      raf = window.requestAnimationFrame(draw);
    };

    let raf = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export function HackTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { copy } = useI18n();
  const { open } = useHackEgg();

  return (
    <button type="button" className={className} onClick={open} aria-label={copy.hack.trigger}>
      {children}
    </button>
  );
}
