import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { BRAND_LOGOS, PRODUCT_LINES, type LineBrand } from "@/data/brands";
import ProductCard from "@/components/ProductCard";
import { fadeUp } from "@/lib/motion";
import { asset } from "@/lib/utils";

/* Complete catalogue — a product-line directory of brand logos (after the original
   putradekamandiri.com/products), then every brand's range. Every card links to its
   product page. */

// `label` is uppercase for display; `brand` matches the products.ts data field.
const BRAND_ORDER: { brand: string; label: string; id: string; badge?: string; intro: string; groupOrder?: string[] }[] = [
  {
    brand: "Busch",
    label: "BUSCH",
    id: "busch",
    badge: "Authorized distributor",
    intro:
      "The world's largest manufacturer of vacuum pumps, blowers, and compressors — all 18 Busch families available through PDM with genuine parts and local service.",
  },
  {
    brand: "Nikkiso",
    label: "NIKKISO",
    id: "nikkiso",
    intro: "Japanese-engineered diaphragm metering pumps for precise chemical dosing in water treatment, food, chemical, and hydroponic applications.",
  },
  {
    brand: "Trundean",
    label: "TRUNDEAN",
    id: "trundean",
    intro: "Taiwanese roots blowers and process pumps with excellent value for general industrial duty.",
    groupOrder: ["roots blowers", "process pumps"],
  },
  {
    brand: "Verderair",
    label: "VERDERAIR",
    id: "verderair",
    intro: "Air-operated double diaphragm pumps for chemically aggressive, viscous, or abrasive fluids — VA metallic and non-metallic, PURE, HP high-pressure, split manifolds, and drum pumps.",
    groupOrder: ["drum pumps", "high-pressure", "PURE PTFE series", "split manifolds", "VA series"],
  },
  {
    brand: "Dino",
    label: "DINO",
    id: "dino",
    intro: "Drum and container pumps for safe fluid transfer.",
  },
  {
    brand: "Longer",
    label: "LONGER",
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
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

const countFor = (b: LineBrand) =>
  b.brand ? PRODUCTS.filter((p) => p.brand === b.brand && (!b.group || p.group === b.group)).length : 0;

/* White plate holding a logo at its optical size; `scale` shrinks it for tighter spots. */
function LogoPlate({ id, scale = 1, className = "" }: { id: keyof typeof BRAND_LOGOS; scale?: number; className?: string }) {
  const l = BRAND_LOGOS[id];
  return (
    <div
      className={
        "flex shrink-0 items-center justify-center rounded-xl border border-line bg-white px-4 shadow-card " + className
      }
    >
      <img
        src={asset(l.logo)}
        alt={`${l.name} logo`}
        style={{ height: Math.round(l.h * scale) }}
        className="w-auto max-w-full object-contain"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

function BrandTile({ b }: { b: LineBrand }) {
  const l = BRAND_LOGOS[b.key];
  const n = countFor(b);
  const meta = b.note ?? (b.group ? `${n} ${b.group}` : `${n} products`);
  return (
    <a
      href={b.href}
      className="group relative flex h-[148px] flex-col overflow-hidden rounded-xl border border-line bg-white px-4 pb-3.5 pt-4 shadow-card outline-none transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-card-lg focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
    >
      {b.authorized && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-busch">
          <BadgeCheck size={12} strokeWidth={2.4} />
          Authorized
        </span>
      )}
      <div className="flex flex-1 items-center justify-center">
        <img
          src={asset(l.logo)}
          alt=""
          style={{ height: l.h }}
          className="w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-800">{l.name}</p>
          <p className="mt-0.5 truncate text-[11px] tabular-nums text-neutral-500">{meta}</p>
        </div>
        <ArrowRight
          size={14}
          strokeWidth={2.4}
          className="mb-0.5 shrink-0 -translate-x-1 text-neutral-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-neutral-900 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        />
      </div>
      {/* PDM-yellow rule that draws in on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand-yellow transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </a>
  );
}

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
              {PRODUCTS.length} products from nine world-class principals — click
              any product for details, specifications, and a quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ————— Product-line directory ————— */}
      <section id="lines" aria-labelledby="product-lines" className="scroll-mt-20 border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
          <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
            <h2 id="product-lines" className="font-display text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              Browse by product line
            </h2>
            <p className="text-sm text-neutral-500">Pick a brand to jump straight to its range.</p>
          </motion.div>

          <div className="mt-8 divide-y divide-line border-y border-line">
            {PRODUCT_LINES.map((line) => {
              const total = line.brands.reduce((s, b) => s + countFor(b), 0);
              return (
                <motion.div
                  key={line.title}
                  {...fadeUp}
                  className="grid gap-5 py-7 lg:grid-cols-[250px,1fr] lg:gap-10 lg:py-9"
                >
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-neutral-900">{line.title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-neutral-600">{line.desc}</p>
                    <p className="mt-3 text-xs font-semibold tabular-nums text-neutral-400">
                      {line.brands.length} {line.brands.length === 1 ? "brand" : "brands"}
                      {total > 0 && <> · {total} products</>}
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {line.brands.map((b) => (
                      <li key={b.href}>
                        <BrandTile b={b} />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
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
              <section key={meta.id} id={meta.id} aria-label={meta.label} className="scroll-mt-32">
                <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
                  <LogoPlate id={meta.id as keyof typeof BRAND_LOGOS} scale={0.9} className="h-[84px] w-[176px]" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">{meta.label}</h2>
                      {meta.badge && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-busch/50 bg-busch/[0.07] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-busch">
                          <BadgeCheck size={13} />
                          {meta.badge}
                        </span>
                      )}
                      <span className="rounded-full bg-ground px-2.5 py-1 text-[11px] font-bold tabular-nums text-neutral-500">
                        {items.length} products
                      </span>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">{meta.intro}</p>
                  </div>
                </motion.div>

                {groups.map(({ g, items: gi }) => (
                  <div key={g || "all"}>
                    {g && (
                      <motion.h3
                        {...fadeUp}
                        id={`${meta.id}-${slug(g)}`}
                        className="mt-8 scroll-mt-32 border-l-[3px] border-brand-yellow pl-3 font-display text-sm font-bold uppercase tracking-wide text-neutral-700"
                      >
                        {cap(g)}
                        <span className="ml-2 font-sans text-xs font-semibold text-neutral-400">
                          {gi.length}
                        </span>
                      </motion.h3>
                    )}
                    <div className={(g ? "mt-4" : "mt-8") + " grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"}>
                      {gi.map((p) => (
                        <motion.div
                          key={p.slug}
                          {...fadeUp}
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
          <section id="tonson" aria-label="Tonson" className="scroll-mt-32">
            <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
              <LogoPlate id="tonson" scale={0.9} className="h-[84px] w-[176px]" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">TONSON</h2>
                  <span className="rounded-full bg-ground px-2.5 py-1 text-[11px] font-bold text-neutral-500">
                    Air Motors
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  Vane air motors for explosion-proof, washdown, and stall-tolerant duty.
                </p>
              </div>
            </motion.div>
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
                    <img src={asset(t.img)} alt={`Tonson ${t.name}`} loading="lazy" className="max-h-full w-auto object-contain" />
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
          <section id="tubings" aria-label="Industrial tubings and hoses" className="scroll-mt-32">
            <motion.div {...fadeUp} className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
                INDUSTRIAL TUBINGS &amp; HOSES
              </h2>
            </motion.div>
            <motion.p {...fadeUp} className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
              Certified tubing and hose for hygienic, chemical, and high-purity transfer.
            </motion.p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { id: "newage" as const, name: "NEW AGE INDUSTRIES", desc: "Plastic & rubber tubing, reinforced hose, and fittings — FDA, USP, and 3-A sanitary options." },
                { id: "saint-gobain" as const, name: "SAINT-GOBAIN", desc: "Tygon®, Norprene®, and PharMed® high-performance tubing for food, beverage, and biopharma." },
              ].map((t) => (
                <motion.div
                  key={t.name}
                  id={t.id}
                  {...fadeUp}
                  className="flex scroll-mt-32 flex-col gap-5 rounded-2xl border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center"
                >
                  <LogoPlate id={t.id} scale={0.85} className="h-[76px] w-[160px] shadow-none" />
                  <div>
                    <h3 className="font-display text-base font-bold text-neutral-900">{t.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{t.desc}</p>
                  </div>
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
