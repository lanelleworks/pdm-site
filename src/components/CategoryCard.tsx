import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { asset } from "@/lib/utils";

/* Category card — single image on top that cycles through every brand in the
   category on a ~3s timer. Controls below mirror the hero showcase: prev arrow +
   dot pill (active dot fills as a progress bar) + next arrow. Brand chips under
   the controls are UPPERCASE links to that brand's section on /products. */

export type BrandImg = { name: string; img: string; alt: string; to: string };

const DURATION_MS = 3000;

export default function CategoryCard({
  title,
  desc,
  brands,
}: {
  title: string;
  desc: string;
  brands: BrandImg[];
}) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || paused || brands.length < 2) return;
    let visible = document.visibilityState === "visible";
    const onVis = () => (visible = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    const id = window.setInterval(() => {
      if (!visible) return;
      setIndex((i) => (i + 1) % brands.length);
    }, DURATION_MS);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion, paused, brands.length]);

  const step = (delta: 1 | -1) => setIndex((i) => (i + delta + brands.length) % brands.length);
  const jumpTo = (i: number) => setIndex(i);

  const current = brands[index];
  const hasMultiple = brands.length > 1;

  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex h-44 items-center justify-center border-b border-line bg-white p-5">
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
            key={current.img}
            src={asset(current.img)}
            alt={current.alt}
            loading="lazy"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, x: -8, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }}
            className="absolute inset-0 mx-auto my-auto h-full max-h-[80%] w-auto object-contain p-5"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold text-neutral-900">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{desc}</p>

        {hasMultiple && (
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={`Previous brand in ${title}`}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-neutral-600 shadow-card transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
            >
              <ChevronLeft size={13} strokeWidth={2.4} />
            </button>

            <div
              className="flex items-center gap-1.5 rounded-full bg-ground px-3 py-2"
              role="tablist"
              aria-label={`${title} brand slides`}
            >
              {brands.map((b, i) => {
                const active = i === index;
                return (
                  <button
                    key={b.name}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Show ${b.name}`}
                    onClick={() => jumpTo(i)}
                    data-active={active}
                    className="group relative h-1.5 w-1.5 overflow-hidden rounded-full bg-neutral-300 transition-all hover:bg-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 data-[active=true]:w-5 data-[active=true]:bg-neutral-300"
                  >
                    {active && !reducedMotion && !paused && (
                      <motion.span
                        key={index}
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: DURATION_MS / 1000, ease: "linear" }}
                        className="absolute inset-0 block bg-neutral-800"
                      />
                    )}
                    {active && (paused || reducedMotion) && (
                      <span className="absolute inset-0 bg-neutral-800" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label={`Next brand in ${title}`}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-neutral-600 shadow-card transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
            >
              <ChevronRight size={13} strokeWidth={2.4} />
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {brands.map((b, i) => (
            <Link
              key={b.name}
              to={b.to}
              className={
                "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide transition-colors " +
                (i === index
                  ? "bg-brand-yellow text-black"
                  : "bg-ground text-neutral-700 hover:bg-neutral-200")
              }
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
