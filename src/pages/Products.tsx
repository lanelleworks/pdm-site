import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Cable } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { fadeUp } from "@/lib/motion";

/* Complete catalogue — every card links to its product page. */

const BRAND_ORDER: { brand: string; id: string; badge?: string; intro: string; groupOrder?: string[] }[] = [
  {
    brand: "Busch",
    id: "busch",
    badge: "Authorized distributor",
    intro:
      "The world's largest manufacturer of vacuum pumps, blowers, and compressors — all 18 Busch families available through PDM with genuine parts and local service.",
  },
  {
    brand: "Trundean",
    id: "trundean",
    intro: "Taiwanese roots blowers and process pumps with excellent value for general industrial duty.",
    groupOrder: ["roots blowers", "process pumps"],
  },
  {
    brand: "Vacutronic",
    id: "vacutronic",
    intro: "Oil-less piston vacuum pumps and compressors for clean, low-maintenance duty.",
  },
  {
    brand: "Verderair",
    id: "verderair",
    intro: "Air-operated double-diaphragm pumps in metallic, non-metallic, high-pressure, and PTFE-pure builds.",
    groupOrder: ["VA series", "high-pressure", "PURE PTFE series", "drum pumps", "split manifolds"],
  },
  {
    brand: "Verderflex",
    id: "verderflex",
    intro: "Peristaltic hose and tube pumps for abrasive or shear-sensitive media.",
  },
  {
    brand: "Dino",
    id: "dino",
    intro: "Drum and container pumps for safe fluid transfer.",
  },
  {
    brand: "Shuneiko",
    id: "shuneiko",
    intro: "Taiwanese-manufactured diaphragm metering pumps for precise chemical dosing in water treatment, food, chemical, and hydroponic applications.",
  },
  {
    brand: "Longer",
    id: "longer",
    intro:
      "Precision peristaltic, syringe, and gear pumps for laboratory, pharma filling, and OEM integration — the complete Longer range.",
    groupOrder: [
      "peristaltic pumps",
      "filling systems",
      "syringe pumps",
      "pump heads",
      "gear pumps",
      "OEM series",
      "tubing",
      "accessories",
    ],
  },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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
              {PRODUCTS.length} products from ten world-class principals — click
              any product for details, specifications, and a quote.
            </p>
          </motion.div>
          <motion.nav {...fadeUp} aria-label="Jump to brand" className="mt-8 flex flex-wrap gap-2">
            {[...BRAND_ORDER.map((b) => ({ id: b.id, label: b.brand })),
              { id: "tonson", label: "Tonson" },
              { id: "tubings", label: "Tubings & Hoses" }].map((j) => (
              <a
                key={j.id}
                href={`#${j.id}`}
                className="rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-brand-yellow hover:bg-brand-yellow/10"
              >
                {j.label}
              </a>
            ))}
          </motion.nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="space-y-20">
          {BRAND_ORDER.map((meta) => {
            const items = PRODUCTS.filter((p) => p.brand === meta.brand);
            const groups = meta.groupOrder
              ? meta.groupOrder
                  .map((g) => ({ g, items: items.filter((p) => p.group === g) }))
                  .filter((x) => x.items.length)
              : [{ g: "", items }];
            return (
              <section key={meta.id} id={meta.id} aria-label={meta.brand} className="scroll-mt-24">
                <motion.div {...fadeUp} className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
                    {meta.brand}
                  </h2>
                  {meta.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-busch/50 bg-busch/[0.07] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-busch">
                      <BadgeCheck size={13} />
                      {meta.badge}
                    </span>
                  )}
                  <span className="rounded-full bg-ground px-2.5 py-1 text-[11px] font-bold text-neutral-500">
                    {items.length} products
                  </span>
                </motion.div>
                <motion.p {...fadeUp} className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  {meta.intro}
                </motion.p>

                {groups.map(({ g, items: gi }) => (
                  <div key={g || "all"}>
                    {g && (
                      <motion.h3
                        {...fadeUp}
                        className="mt-8 border-l-[3px] border-brand-yellow pl-3 font-display text-sm font-bold uppercase tracking-wide text-neutral-700"
                      >
                        {cap(g)}
                        <span className="ml-2 font-sans text-xs font-semibold text-neutral-400">
                          {gi.length}
                        </span>
                      </motion.h3>
                    )}
                    <div className={(g ? "mt-4" : "mt-8") + " grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"}>
                      {gi.map((p, i) => (
                        <motion.div
                          key={p.slug}
                          {...fadeUp}
                          transition={{ ...fadeUp.transition, delay: (i % 4) * 0.04 }}
                        >
                          <ProductCard product={p} compact={items.length > 10} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            );
          })}

          {/* Tonson — catalogue listing (no per-product pages on source site) */}
          <section id="tonson" aria-label="Tonson" className="scroll-mt-24">
            <motion.div {...fadeUp} className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">Tonson</h2>
              <span className="rounded-full bg-ground px-2.5 py-1 text-[11px] font-bold text-neutral-500">
                Air Motors
              </span>
            </motion.div>
            <motion.p {...fadeUp} className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
              Vane air motors for explosion-proof, washdown, and stall-tolerant duty.
            </motion.p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[
                { img: "/img/products/Tonson-Angle-bung-air-mixer1.png", name: "Air motors & bung mixers" },
                { img: "/img/products/IBC-drum-mixers1.png", name: "IBC & drum mixers" },
              ].map((t) => (
                <motion.div
                  key={t.name}
                  {...fadeUp}
                  className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card"
                >
                  <div className="flex h-36 items-center justify-center border-b border-line bg-white p-4">
                    <img src={t.img} alt={`Tonson ${t.name}`} loading="lazy" className="max-h-full w-auto object-contain" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-bold text-neutral-900">{t.name}</h3>
                    <p className="mt-1 text-xs text-neutral-500">Ask us for the model list</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tubings & hoses */}
          <section id="tubings" aria-label="Industrial tubings and hoses" className="scroll-mt-24">
            <motion.div {...fadeUp} className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
                Industrial Tubings &amp; Hoses
              </h2>
            </motion.div>
            <motion.p {...fadeUp} className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
              Certified tubing and hose for hygienic, chemical, and high-purity transfer.
            </motion.p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { name: "New Age Industries", desc: "Plastic & rubber tubing, reinforced hose, and fittings — FDA, USP, and 3-A sanitary options." },
                { name: "Saint-Gobain", desc: "Tygon®, Norprene®, and PharMed® high-performance tubing for food, beverage, and biopharma." },
              ].map((t) => (
                <motion.div key={t.name} {...fadeUp} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                  <Cable size={22} strokeWidth={1.6} className="text-neutral-400" />
                  <h3 className="mt-3 font-display text-base font-bold text-neutral-900">{t.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <motion.div {...fadeUp} className="mt-20 rounded-2xl bg-ink p-8 text-center md:p-10">
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
