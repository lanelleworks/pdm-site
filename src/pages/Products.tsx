import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Cable, ChevronDown } from "lucide-react";
import { fadeUp } from "@/lib/motion";

/* ————— Complete catalogue, extracted from putradekamandiri.com product pages ————— */

// 18 Busch families
const BUSCH_FAMILIES = [
  { img: "/img/products/Busch-R5.png", name: "R5", type: "Oil-lubricated rotary vane" },
  { img: "/img/products/Mink.png", name: "Mink", type: "Dry claw" },
  { img: "/img/products/Cobra-Industry.png", name: "COBRA Industry", type: "Dry screw" },
  { img: "/img/products/Cobra-Semicon.png", name: "COBRA Semicon", type: "Dry screw · semiconductor" },
  { img: "/img/products/Panda_Puma.png", name: "Panda & Puma", type: "Vacuum boosters" },
  { img: "/img/products/Seco.png", name: "Seco", type: "Dry-running rotary vane" },
  { img: "/img/products/Seco-Print.png", name: "Seco Print", type: "Print-industry air" },
  { img: "/img/products/Tyr.png", name: "Tyr", type: "Rotary lobe blower" },
  { img: "/img/products/dingo.png", name: "Cat & Dingo", type: "Rotary lobe blowers" },
  { img: "/img/products/Busch-Panther-Rotary-Lobe-Blowers.png", name: "Panther", type: "Rotary lobe blower" },
  { img: "/img/products/Huckepack.png", name: "Huckepack", type: "Once-through oil" },
  { img: "/img/products/Busch-Dolphin-Vacuum-Pumps.png", name: "Dolphin", type: "Liquid ring" },
  { img: "/img/products/Busch-Samos-Vacuum-Pumps.png", name: "Samos", type: "Side channel blower" },
  { img: "/img/products/merlin.png", name: "Merlin", type: "Combined vacuum" },
  { img: "/img/products/Busch-Zebra-Vacuum-Pumps.png", name: "Zebra", type: "Two-stage rotary vane" },
  { img: "/img/products/Busch-Combi-Vacuum-Pumps.png", name: "Combi", type: "Vacuum systems" },
  { img: "/img/products/Busch-Fossa-Vacuum-Pumps.png", name: "Fossa", type: "Scroll" },
  { img: "/img/products/Busch-Turbo-Vacuum-Pumps.png", name: "Turbo", type: "Turbomolecular" },
];

type Item = { img: string | null; name: string; desc?: string; models?: string[] };
type BrandSection = { id: string; brand: string; category: string; intro: string; items: Item[] };

const BRAND_SECTIONS: BrandSection[] = [
  {
    id: "trundean-vacuum",
    brand: "Trundean",
    category: "Vacuum Pumps & Blowers",
    intro: "Taiwanese roots blowers and vacuum pumps with excellent value for general industrial duty.",
    items: [
      { img: "/img/products/Trundean-TH-Type-Roots-Blower.jpg", name: "TH Type Roots Blower" },
      { img: "/img/products/Trundean-THS-Type-Roots-Blower.jpg", name: "THS Type Roots Blower" },
      { img: "/img/products/Trundean-THW-Type-Roots-Blower.jpg", name: "THW Type Roots Blower" },
      { img: "/img/products/Trundean-THD-Type-Roots-Blower.jpg", name: "THD Type Roots Blower" },
    ],
  },
  {
    id: "vacutronic",
    brand: "Vacutronic",
    category: "Vacuum Pumps",
    intro: "Oil-less piston vacuum pumps and compressors for clean, low-maintenance duty.",
    items: [
      { img: "/img/products/JP-90_120_140V.png", name: "JP Series", desc: "Oil-less piston vacuum pump & compressor" },
      { img: "/img/products/DP-40C.png", name: "DP Series — compressor", desc: "Oil-less piston compressor" },
      { img: "/img/products/DP-180H_200H.png", name: "DP Series — vacuum", desc: "Oil-less piston vacuum pump" },
      { img: "/img/products/DV-8V.png", name: "DV Series" },
      { img: "/img/products/DA-30.png", name: "DA Series" },
      { img: "/img/products/rv10_b.png", name: "RV Series" },
    ],
  },
  {
    id: "verderair",
    brand: "Verderair",
    category: "Process Pumps",
    intro: "Air-operated double-diaphragm pumps in metallic, non-metallic, high-pressure, and PTFE-pure builds.",
    items: [
      {
        img: "/img/products/Verderair-VA-25-HP.jpg",
        name: "VA metallic & HP series",
        models: ["VA 20", "VA 25", "VA 40", "VA 50", "VA 25 HP", "VA 40 HP", "VA 50 HP", "VA 80 HP"],
      },
      {
        img: null,
        name: "VA non-metallic series",
        models: ["VA 8", "VA 10", "VA 15", "VA 25", "VA 40", "VA 50", "VA 80"],
      },
      {
        img: null,
        name: "PURE PTFE series",
        models: ["P08", "P10", "P15", "P25", "P40", "P50"],
      },
      {
        img: "/img/products/Verderair-VA-15-drum-pumps.jpg",
        name: "Drum pumps",
        models: ["VA 15 drum", "VA 20 drum"],
      },
    ],
  },
  {
    id: "verderflex",
    brand: "Verderflex",
    category: "Process Pumps",
    intro: "Peristaltic hose and tube pumps for abrasive or shear-sensitive media.",
    items: [
      { img: "/img/products/Verderflex-Hose-Pump.jpg", name: "Industrial hose & tube pumps" },
      { img: null, name: "Cased tube pumps" },
      { img: null, name: "OEM pumps" },
    ],
  },
  {
    id: "dino",
    brand: "Dino",
    category: "Process Pumps",
    intro: "Drum and container pumps for safe fluid transfer.",
    items: [
      { img: "/img/products/Machinery-HD-A1.png", name: "HD-A1" },
      { img: "/img/products/Machinery-HD-16.png", name: "HD-16" },
      { img: "/img/products/Machinery-HD-HV.png", name: "HD-HV1" },
      { img: null, name: "HD-E1-V & HD-E2-V" },
    ],
  },
  {
    id: "nikkiso",
    brand: "Nikkiso",
    category: "Process Pumps",
    intro: "Japanese seal-less canned-motor pumps for hazardous and high-purity liquids.",
    items: [
      { img: "/img/products/CHEMIPON-B-Series-BX450x350.jpg", name: "CHEMIPON B Series BX" },
      { img: "/img/products/N-series-NFH-450x350-1.jpg", name: "CHEMIPON N Series NFH" },
      { img: null, name: "ADONY Series AH" },
    ],
  },
  {
    id: "trundean-process",
    brand: "Trundean",
    category: "Process Pumps",
    intro: "Self-priming and centrifugal process pumps.",
    items: [
      { img: "/img/products/TMD37.png", name: "TMD-37-350" },
      { img: null, name: "TMD-06-25" },
    ],
  },
  {
    id: "longer",
    brand: "Longer",
    category: "Process Pumps · Precision Dosing",
    intro:
      "Precision peristaltic, syringe, and gear pumps for laboratory, pharma filling, and OEM integration — the full Longer range, 60+ products.",
    items: [
      {
        img: "/img/products/lipp001.jpg",
        name: "Intelligent & dispensing peristaltic",
        models: ["L100-1F/1FS", "L300-1F/1FS", "L600-1F/1FS", "BT100-1F", "BT300-1F", "WT600-1F", "FK1-100Z filling system", "FK-1C controller"],
      },
      {
        img: "/img/products/dpbp020001.jpg",
        name: "Industrial peristaltic",
        models: ["G100-1L", "G300-1L / G300-3F", "G600-1L", "WT600-4F", "dPOFLEX BP01 / BP02 / GP02", "dPOFLEX PFS / PFU filling", "Explosion-proof motor pump"],
      },
      {
        img: null,
        name: "Flow-rate series",
        models: ["Miniature", "Low flow", "Medium flow", "Medium-high flow", "High flow", "High flow IP", "JY 15-12 / 15-24 ODM", "T100 ODM", "WX10 ODM"],
      },
      {
        img: "/img/products/LSP02-1B-Dual-Channels-Syringe-Pump.jpg",
        name: "Syringe pumps",
        models: ["LSP01-1A2A", "LSP01-1BH", "LSP01-1C", "LSP02-1B", "LSP04-1A", "LSP10-1B", "TJ-1A", "TJ-2A", "TJ-3A"],
      },
      {
        img: "/img/products/Peristaltic-pump-head-KZ35.jpg",
        name: "Pump heads",
        models: ["YZII", "YZ1515X / YZ2515X", "YZ35-13", "DG series", "DG15", "KZ25", "KZ35", "BZ25"],
      },
      {
        img: null,
        name: "Gear pumps, tubing & accessories",
        models: ["WT3000-1JA / 1JB gear pumps", "Silicone tubing", "PharMed-BPT", "Tygon® R-3603 / F-4040-A", "Norprene Chemical", "Fluran® F-5500-A", "Biosicon tubing", "Footswitch & control interface"],
      },
    ],
  },
  {
    id: "tonson",
    brand: "Tonson",
    category: "Air Motors",
    intro: "Vane air motors for explosion-proof, washdown, and stall-tolerant duty.",
    items: [
      { img: "/img/products/Tonson-Angle-bung-air-mixer1.png", name: "Air motors & bung mixers" },
      { img: "/img/products/IBC-drum-mixers1.png", name: "IBC & drum mixers" },
    ],
  },
  {
    id: "tubings",
    brand: "New Age Industries · Saint-Gobain",
    category: "Industrial Tubings & Hoses",
    intro: "Certified tubing and hose for hygienic, chemical, and high-purity transfer.",
    items: [
      { img: null, name: "New Age Industries", desc: "Plastic & rubber tubing, reinforced hose, fittings — FDA, USP, 3-A options" },
      { img: null, name: "Saint-Gobain", desc: "Tygon®, Norprene®, PharMed® high-performance tubing" },
    ],
  },
];

const JUMP = [
  { id: "busch", label: "Busch" },
  ...BRAND_SECTIONS.filter((s) => !["trundean-process", "verderflex"].includes(s.id)).map((s) => ({
    id: s.id,
    label: s.brand.split(" ·")[0],
  })),
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
              120+ products from ten world-class principals — every unit backed
              by PDM sizing support, genuine spare parts, and after-sales service.
            </p>
          </motion.div>
          {/* Brand jump nav */}
          <motion.nav {...fadeUp} aria-label="Jump to brand" className="mt-8 flex flex-wrap gap-2">
            {JUMP.map((j) => (
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
        {/* ————— BUSCH flagship — all 18 families ————— */}
        <section id="busch" aria-label="Busch vacuum pumps" className="scroll-mt-24">
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
            compressors — all 18 Busch families available through PDM with
            genuine parts and local service.
          </motion.p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {BUSCH_FAMILIES.map((f, i) => (
              <motion.article
                key={f.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 4) * 0.04 }}
                className="group rounded-2xl border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:border-busch/40 hover:shadow-card-lg"
              >
                <div className="flex h-28 items-center justify-center md:h-32">
                  <img
                    src={f.img}
                    alt={`Busch ${f.name} — ${f.type}`}
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

        {/* ————— All other brands ————— */}
        <div className="mt-16 space-y-16">
          {BRAND_SECTIONS.map((s) => (
            <section key={s.id} id={s.id} aria-label={`${s.brand} — ${s.category}`} className="scroll-mt-24">
              <motion.div {...fadeUp}>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  {s.category}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-neutral-900 md:text-3xl">
                  {s.brand}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">{s.intro}</p>
              </motion.div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {s.items.map((it, i) => (
                  <motion.article
                    key={it.name}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
                    className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg"
                  >
                    <div className="flex h-36 items-center justify-center border-b border-line bg-white p-4">
                      {it.img ? (
                        <img src={it.img} alt={`${s.brand} ${it.name}`} loading="lazy" className="max-h-full w-auto object-contain" />
                      ) : (
                        <Cable size={40} strokeWidth={1.2} className="text-neutral-300" />
                      )}
                    </div>
                    <div className="flex-1 p-5">
                      <h3 className="font-display text-sm font-bold text-neutral-900">{it.name}</h3>
                      {it.desc && <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">{it.desc}</p>}
                      {it.models && (
                        <details className="group/models mt-3">
                          <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-bold text-neutral-700 transition-colors hover:text-black [&::-webkit-details-marker]:hidden">
                            {it.models.length} models
                            <ChevronDown size={13} className="transition-transform group-open/models:rotate-180" />
                          </summary>
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {it.models.map((m) => (
                              <span key={m} className="rounded-full bg-ground px-2.5 py-1 text-[10px] font-semibold tracking-wide text-neutral-600">
                                {m}
                              </span>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp} className="mt-16 rounded-2xl bg-ink p-8 text-center md:p-10">
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
