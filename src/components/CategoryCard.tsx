import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { asset } from "@/lib/utils";

/* Category card — single-image layout (like the pre-mini-tile version) but the image
   cycles through every brand in the category on a ~3s timer. Same refero-style
   prev/next arrow pill as the hero. Hover pauses; reduced-motion → static first brand. */

export type BrandImg = { name: string; img: string; alt: string };

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

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={`Previous brand in ${title}`}
              className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-600 shadow-card backdrop-blur transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
            >
              <ChevronLeft size={14} strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={`Next brand in ${title}`}
              className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-600 shadow-card backdrop-blur transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
            >
              <ChevronRight size={14} strokeWidth={2.4} />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold text-neutral-900">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {brands.map((b, i) => (
            <button
              key={b.name}
              type="button"
              onClick={() => setIndex(i)}
              className={
                "rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide transition-colors " +
                (i === index
                  ? "bg-brand-yellow text-black"
                  : "bg-ground text-neutral-600 hover:bg-neutral-200")
              }
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
