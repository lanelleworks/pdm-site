import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* Rotating product showcase for the hero.
   Applied craft:
   - one authored motion moment (Ken Burns zoom during display + soft cross-fade)
   - GPU-cheap: only opacity + transform animate
   - reduced-motion: static first slide, no timer
   - hover pauses; tab-hidden pauses (saves battery, respects user attention)
   - image slot reserves its box so there's zero layout shift
*/

const SLIDES = [
  {
    img: "/img/products/Cobra-Industry.png",
    name: "BUSCH COBRA",
    type: "Dry screw vacuum pump",
  },
  {
    img: "/img/products/Busch-R5.png",
    name: "BUSCH R5",
    type: "Oil-lubricated rotary vane",
  },
  {
    img: "/img/products/Mink.png",
    name: "BUSCH Mink",
    type: "Dry claw vacuum pump",
  },
  {
    img: "/img/products/Verderair-VA-25-HP.jpg",
    name: "VERDERAIR VA-25 HP",
    type: "Air-operated diaphragm pump",
  },
  {
    img: "/img/products/Busch-Fossa-Vacuum-Pumps.png",
    name: "BUSCH Fossa",
    type: "Scroll vacuum pump",
  },
];

const DURATION_MS = 3500;

export default function HeroProductShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || paused) return;
    let visible = document.visibilityState === "visible";
    const onVis = () => (visible = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    const id = window.setInterval(() => {
      if (!visible) return;
      setIndex((i) => (i + 1) % SLIDES.length);
    }, DURATION_MS);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion, paused]);

  // Preload the next couple of slides so the crossfade is never image-loading-in-the-open.
  useEffect(() => {
    for (let step = 1; step <= 2; step++) {
      const next = SLIDES[(index + step) % SLIDES.length];
      const preload = new Image();
      preload.src = next.img;
    }
  }, [index]);

  const slide = SLIDES[index];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={-1}
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ground p-8 md:p-10">
        {/* Fixed-height stage so cross-fading images don't shift layout */}
        <div className="relative mx-auto h-[300px] w-full md:h-[340px]" aria-live="off">
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={slide.img}
              src={slide.img}
              alt={`${slide.name} — ${slide.type}`}
              initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
              animate={
                reducedMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                        scale: { duration: DURATION_MS / 1000 + 1, ease: [0.22, 1, 0.36, 1] },
                      },
                    }
              }
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
              className="absolute inset-0 mx-auto h-full w-auto max-w-full object-contain"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-1.5" role="tablist" aria-label="Product showcase">
          {SLIDES.map((s, i) => (
            <button
              key={s.img}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${s.name}`}
              onClick={() => setIndex(i)}
              className={
                "h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 " +
                (i === index ? "w-6 bg-neutral-800" : "w-1.5 bg-neutral-300 hover:bg-neutral-500")
              }
            />
          ))}
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-between text-xs text-neutral-500">
        <motion.span
          key={slide.name}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-semibold text-neutral-700"
        >
          {slide.name} — {slide.type}
        </motion.span>
        <span>Genuine unit · full warranty</span>
      </figcaption>
    </motion.figure>
  );
}
