import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

// The 12 application sectors from the original site, with its real photography.
const SECTORS = [
  { img: "/img/apps/Chemical.jpg", title: "Chemical Industries", desc: "Corrosive and hazardous media handled with seal-less and diaphragm technology." },
  { img: "/img/apps/Environmental.png", title: "Environmental", desc: "Wastewater treatment, biogas, and soil remediation vacuum systems." },
  { img: "/img/apps/Beverages-Industry.png", title: "Beverages Industries", desc: "Filling, deaeration, and bottling lines that stay hygienic at speed." },
  { img: "/img/apps/Food-Industries.jpg", title: "Food Industries", desc: "Vacuum packaging, freeze drying, and processing for food safety." },
  { img: "/img/apps/Brickmaking-and-Ceramic.png", title: "Brickmaking & Ceramic", desc: "De-airing extruders and forming vacuum for dense, defect-free product." },
  { img: "/img/apps/Electrical.png", title: "Electrical Industries", desc: "Semiconductor, lamp, and component manufacturing vacuum processes." },
  { img: "/img/apps/Wood-industry.png", title: "Wood Industries", desc: "Hold-down for CNC routing plus drying and impregnation systems." },
  { img: "/img/apps/Packaging.png", title: "Packaging", desc: "Thermoforming, pick-and-place, and modified-atmosphere packaging." },
  { img: "/img/apps/Plastic-Industries.png", title: "Plastic Industries", desc: "Extruder degassing, EPS moulding, and material conveying." },
  { img: "/img/apps/Printing.png", title: "Printing Industries", desc: "Paper feed, ink handling, and press vacuum for every format." },
  { img: "/img/apps/Textile-Industries.png", title: "Textile Industries", desc: "Dyeing, drying, and moisture extraction across the line." },
  { img: "/img/apps/OEM-Machines.png", title: "OEM Machines", desc: "Pumps and air motors engineered into your machine design." },
];

export default function Applications() {
  return (
    <>
      <section className="border-b border-line bg-ground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
              Applications
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              Twelve industries. One partner.
            </h1>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Wherever fluid moves or vacuum works, PDM has equipment running in
              the field — and the references to prove it.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s, i) => (
            <motion.article
              key={s.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-yellow" />
              </div>
              <div className="p-6">
                <h2 className="font-display text-lg font-bold text-neutral-900">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 text-sm font-bold text-black shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-lg"
          >
            Discuss your application
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </>
  );
}
