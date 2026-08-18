import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Cable } from "lucide-react";
import { fadeUp } from "@/lib/motion";

// Real Busch product-family photos from PDM's own catalogue.
const BUSCH_FAMILIES = [
  { img: "/img/products/Cobra-Industry.png", name: "COBRA", type: "Dry screw" },
  { img: "/img/products/Mink.png", name: "Mink", type: "Claw" },
  { img: "/img/products/Busch-Fossa-Vacuum-Pumps.png", name: "Fossa", type: "Scroll" },
  { img: "/img/products/Busch-Combi-Vacuum-Pumps.png", name: "Combi", type: "Systems" },
  { img: "/img/products/Busch-Dolphin-Vacuum-Pumps.png", name: "Dolphin", type: "Liquid ring" },
  { img: "/img/products/Busch-Samos-Vacuum-Pumps.png", name: "Samos", type: "Side channel" },
  { img: "/img/products/Busch-Panther-Rotary-Lobe-Blowers.png", name: "Panther", type: "Lobe blower" },
  { img: "/img/products/Busch-Zebra-Vacuum-Pumps.png", name: "Zebra", type: "Two-stage" },
  { img: "/img/products/Busch-Turbo-Vacuum-Pumps.png", name: "Turbo", type: "Turbomolecular" },
  { img: "/img/products/Huckepack.png", name: "Huckepack", type: "Once-through" },
  { img: "/img/products/Panda_Puma.png", name: "Panda / Puma", type: "Vacuum boosters" },
  { img: "/img/products/Seco.png", name: "Seco", type: "Dry rotary vane" },
];

const LINES = [
  {
    title: "Process Pumps",
    intro:
      "Air-operated diaphragm, peristaltic, canned-motor, and drum pumps for chemicals, food, pharma, and abrasive fluids.",
    items: [
      { img: "/img/products/Verderair-VA-25-HP.jpg", name: "Verderair VA series", desc: "Air-operated double-diaphragm pumps, VA-15 to VA-80 plus Pure PTFE series." },
      { img: "/img/products/Verderair-VA-15-drum-pumps.jpg", name: "Verderair drum pumps", desc: "Safe transfer from drums and IBCs." },
      { img: "/img/products/Verderflex-Hose-Pump.jpg", name: "Verderflex peristaltic", desc: "Hose and tube pumps for abrasive or shear-sensitive media." },
      { img: null, name: "Nikkiso · Dino · Longer · Trundean", desc: "Seal-less canned-motor pumps, drum pumps, precision dosing, and self-priming process pumps." },
    ],
  },
  {
    title: "Air Motors",
    intro: "Pneumatic motors that run cool, safe, and continuous where electric motors can't.",
    items: [
      { img: "/img/products/Tonson-Angle-bung-air-mixer1.png", name: "Tonson air motors & mixers", desc: "Vane air motors for explosion-proof, washdown, and stall-tolerant duty." },
      { img: "/img/products/IBC-drum-mixers1.png", name: "Tonson IBC & drum mixers", desc: "Direct-mount agitators for drums and IBC totes." },
    ],
  },
  {
    title: "Industrial Tubings & Hoses",
    intro: "Certified tubing and hose for hygienic, chemical, and high-purity transfer.",
    items: [
      { img: null, name: "New Age Industries", desc: "Plastic and rubber tubing, reinforced hose, and fittings — FDA, USP, and 3-A sanitary options." },
      { img: null, name: "Saint-Gobain", desc: "Tygon®, Norprene®, and PharMed® high-performance tubing for food, beverage, and biopharma." },
    ],
  },
  {
    title: "Vacuum Pumps — other brands",
    intro: "Value-engineered vacuum for general industrial duty.",
    items: [
      { img: "/img/products/Trundean-TH-Type-Roots-Blower.jpg", name: "Trundean", desc: "Rotary vane, liquid-ring pumps, and TH/THD roots blowers." },
      { img: null, name: "Vacutronic", desc: "Vacuum systems and accessories for packaging, forming, and holding." },
    ],
  },
];

export default function Products() {
  return (
    <>
      <section className="border-b border-line bg-ground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Products</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              The full range.
            </h1>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Four product lines from ten world-class principals — every unit
              backed by PDM sizing support, genuine spare parts, and after-sales
              service.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* ————— BUSCH flagship section ————— */}
        <section aria-label="Busch vacuum pumps">
          <motion.div {...fadeUp} className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              Busch Vacuum Pumps
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-busch/50 bg-busch/[0.07] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-busch">
              <BadgeCheck size={13} />
              Authorized distributor
            </span>
          </motion.div>
          <motion.p {...fadeUp} className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
            The world&rsquo;s largest manufacturer of vacuum pumps, blowers, and
            compressors — every major Busch family available through PDM with
            genuine parts and local service.
          </motion.p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {BUSCH_FAMILIES.map((f, i) => (
              <motion.article
                key={f.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 4) * 0.05 }}
                className="group rounded-2xl border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:border-busch/40 hover:shadow-card-lg"
              >
                <div className="flex h-28 items-center justify-center md:h-32">
                  <img
                    src={f.img}
                    alt={`Busch ${f.name} ${f.type} vacuum pump`}
                    loading="lazy"
                    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-3 border-t border-line pt-3">
                  <h3 className="font-display text-sm font-bold text-neutral-900">{f.name}</h3>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">{f.type}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ————— Other lines ————— */}
        <div className="mt-16 space-y-16">
          {LINES.map((line) => (
            <section key={line.title} aria-label={line.title}>
              <motion.h2 {...fadeUp} className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
                {line.title}
              </motion.h2>
              <motion.p {...fadeUp} className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                {line.intro}
              </motion.p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {line.items.map((it, i) => (
                  <motion.article
                    key={it.name}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: (i % 4) * 0.05 }}
                    className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg"
                  >
                    <div className="flex h-36 items-center justify-center border-b border-line bg-white p-4">
                      {it.img ? (
                        <img
                          src={it.img}
                          alt={it.name}
                          loading="lazy"
                          className="max-h-full w-auto object-contain"
                        />
                      ) : (
                        <Cable size={44} strokeWidth={1.2} className="text-neutral-300" />
                      )}
                    </div>
                    <div className="flex-1 p-5">
                      <h3 className="font-display text-sm font-bold text-neutral-900">{it.name}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">{it.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          className="mt-16 rounded-2xl bg-ink p-8 text-center md:p-10"
        >
          <h2 className="font-display text-2xl font-bold text-white">
            Not sure which pump fits your process?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/60">
            Tell us your flow, vacuum level, and media — we&rsquo;ll size it and quote the right unit.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
          >
            Ask our engineers
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </>
  );
}
