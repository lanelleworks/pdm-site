import { motion, useReducedMotion } from "motion/react";
import { asset } from "@/lib/utils";
import { EASE_APPLE } from "@/lib/motion";

/* Mission & Value panel for the hero, rebuilt from PDM's own brochure panel
   (public/img/company/visi-misi.jpg) as live text instead of a baked image.
   Craft notes:
   - The brochure is a 2:1 banner with a steep diagonal. The hero column is ~1.1:1, so the
     same angle would crush the text; the diagonal is kept but flattened. All geometry lives
     in the --a / --b / --band / --p1 / --p2 custom properties, set per breakpoint below.
   - mission-refinery.jpg (1116x2000, 9:16, AI-generated for this slot) replaces the old
     brochure crop, which sliced the tower. The tower sits ~35% across, so the photo is
     anchored at 30% horizontally: the tower stays inside the slanted wedge at every
     breakpoint, and the wedge is narrower than 9:16, so it is fitted to the full height
     and the top of the tower is never cut. 2000px tall covers 3x phones.
   - Labels use Archivo at a condensed width to echo the brochure's condensed caps.
*/

const BLOCKS = [
  {
    label: "Our Mission:",
    body:
      "To expand the business not only to become a reliable vendor, but also to be a partnership of growth with our customers, through our ability to recognize the specific problems of our partners and develop custom-made solutions for them.",
    pad: "var(--p1)",
  },
  {
    label: "Our Value:",
    body:
      "To offer powerful, durable and magnificent products. This professional partnership commitment is complemented by our dedication to delivering world-class product quality and service, which makes our company a practical and productive reality in giving our customers value for money.",
    pad: "var(--p2)",
  },
];

export default function HeroMissionPanel() {
  const reducedMotion = useReducedMotion();
  const photo = asset("/img/company/mission-refinery.jpg");

  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_APPLE, delay: 0.15 }}
    >
      <div
        className={[
          "relative overflow-hidden rounded-2xl bg-ink shadow-card-lg",
          // diagonal geometry: photo edge top (--a) → bottom (--b), band width, text indents
          "[--a:15%] [--b:23%] [--band:6%] [--p1:27%] [--p2:32%]",
          "sm:[--a:27%] sm:[--b:39%] sm:[--band:7%] sm:[--p1:42%] sm:[--p2:49%]",
        ].join(" ")}
      >
        {/* Photo wedge */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "polygon(0 0, var(--a) 0, var(--b) 100%, 0 100%)" }}
          aria-hidden="true"
        >
          <img
            src={photo}
            alt=""
            className="absolute inset-y-0 left-0 h-full w-[var(--b)] object-cover object-[30%_50%]"
            draggable={false}
          />
        </div>

        {/* Faint plant behind the text, as in the brochure */}
        <div
          className="absolute inset-0"
          style={{
            clipPath:
              "polygon(calc(var(--a) + var(--band)) 0, 100% 0, 100% 100%, calc(var(--b) + var(--band)) 100%)",
          }}
          aria-hidden="true"
        >
          <img
            src={photo}
            alt=""
            className="absolute inset-y-0 right-0 h-full w-3/5 object-cover object-bottom opacity-[0.13] grayscale"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30" />
        </div>

        {/* Yellow diagonal band */}
        <motion.div
          className="absolute inset-0 bg-brand-yellow"
          style={{
            clipPath:
              "polygon(calc(var(--a) - 1px) 0, calc(var(--a) + var(--band)) 0, calc(var(--b) + var(--band)) 100%, calc(var(--b) - 1px) 100%)",
          }}
          initial={reducedMotion ? false : { opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE_APPLE }}
          aria-hidden="true"
        />

        {/* Copy */}
        <div className="relative z-10 flex min-h-[420px] flex-col justify-center gap-7 py-9 pr-5 sm:min-h-[460px] sm:py-11 sm:pr-8">
          {BLOCKS.map((b) => (
            <motion.div
              key={b.label}
              style={{ paddingLeft: b.pad }}
            >
              <h2 className="inline-block bg-brand-yellow px-2.5 pb-[3px] pt-1 font-display text-[17px] font-extrabold uppercase leading-none tracking-[0.01em] text-black [font-stretch:72%] sm:text-[19px]">
                {b.label}
              </h2>
              <p className="mt-2.5 text-[13px] leading-[1.6] text-white/85 sm:text-[13.5px]">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs text-neutral-500">
        <span className="font-semibold text-neutral-700">Established 2007</span>
        <span>Durability · Reliability · Trust</span>
      </figcaption>
    </motion.figure>
  );
}
