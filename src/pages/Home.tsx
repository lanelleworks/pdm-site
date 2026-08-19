import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  BadgeCheck,
  Wrench,
  Clock,
  Package,
  ArrowRight,
} from "lucide-react";
import ContactSection from "@/components/ContactSection";
import HeroProductShowcase from "@/components/HeroProductShowcase";
import { fadeUp } from "@/lib/motion";
import { asset } from "@/lib/utils";
import CategoryCard from "@/components/CategoryCard";

const STATS = [
  { n: "2007", label: "Serving industry since" },
  { n: "94+", label: "Customer references" },
  { n: "12", label: "Industries served" },
  { n: "9", label: "World-class principals" },
];

// Each brand in a category gets its own product-image tile in the card.
// `to` is the /products anchor its section lives at.
const CATEGORIES: {
  title: string;
  desc: string;
  brands: { name: string; img: string; alt: string; to: string }[];
}[] = [
  {
    title: "Vacuum Pumps",
    desc: "Dry, oil-lubricated, and liquid-ring vacuum pumps for every industrial process.",
    brands: [
      { name: "Busch", img: "/img/products/Cobra-Industry.png", alt: "Busch COBRA dry screw vacuum pump", to: "/products#busch" },
      { name: "Trundean", img: "/img/products/Trundean-TH-Type-Roots-Blower.jpg", alt: "Trundean TH roots blower", to: "/products#trundean" },
    ],
  },
  {
    title: "Process Pumps",
    desc: "Diaphragm, peristaltic, and specialty process pumps for demanding fluids.",
    brands: [
      { name: "Verderflex", img: "/img/products/Verderflex-Hose-Pump.jpg", alt: "Verderflex peristaltic hose pump", to: "/products#verderflex" },
      { name: "Nikkiso", img: "/img/products/Nikkiso-CHEMIPON-B-Series-BX.jpg", alt: "Nikkiso CHEMIPON B diaphragm metering pump", to: "/products#nikkiso" },
      { name: "Dino", img: "/img/products/Machinery-HD-A1.png", alt: "Dino HD-A1 drum pump", to: "/products#dino" },
      { name: "Longer", img: "/img/products/lipp001.jpg", alt: "Longer intelligent peristaltic pump", to: "/products#longer" },
      { name: "Trundean", img: "/img/products/TMD37.png", alt: "Trundean TMD magnetic drive process pump", to: "/products#trundean" },
    ],
  },
  {
    title: "Air Motors",
    desc: "Reliable pneumatic motors for explosion-proof and washdown environments.",
    brands: [
      { name: "Tonson", img: "/img/products/Tonson-Angle-bung-air-mixer1.png", alt: "Tonson pneumatic air motor mixer", to: "/products#tonson" },
    ],
  },
  {
    title: "Tubings & Hoses",
    desc: "Industrial-grade tubing and hose systems for fluid and air transfer.",
    brands: [
      { name: "New Age Industries", img: "/img/products/NewAge-Tubing.jpg", alt: "New Age Industries industrial tubing", to: "/products#tubings" },
      { name: "Saint-Gobain", img: "/img/products/Peristaltic-Pump-Tubing-Tygon%C2%AER-3603.jpg", alt: "Saint-Gobain Tygon R-3603 tubing", to: "/products#tubings" },
    ],
  },
];

const APP_TEASER = [
  { img: "/img/apps/Food-Industries.jpg", label: "Food Industries" },
  { img: "/img/apps/Chemical.jpg", label: "Chemical Industries" },
  { img: "/img/apps/Packaging.png", label: "Packaging" },
  { img: "/img/apps/Electrical.png", label: "Electrical Industries" },
  { img: "/img/apps/Plastic-Industries.png", label: "Plastic Industries" },
  { img: "/img/apps/Printing.png", label: "Printing Industries" },
];

const WHY = [
  {
    icon: BadgeCheck,
    title: "Authorized Distributor",
    desc: "Official distributor of Busch Vacuum Solutions and other world-class brands — genuine units, genuine parts, full warranty.",
  },
  {
    icon: Clock,
    title: "Since 2007",
    desc: "Nearly two decades supplying pumps and vacuum technology to industries across Indonesia.",
  },
  {
    icon: Wrench,
    title: "After-Sales Service",
    desc: "Commissioning, maintenance, and repair handled by our own technical team — not just a reseller.",
  },
  {
    icon: Package,
    title: "Spare Parts Ready",
    desc: "Genuine spare parts and consumables in stock, so your downtime stays short.",
  },
];

// Each brand links to its section on the /products page.
// New Age + Saint-Gobain live in the shared "Tubings & Hoses" section (#tubings).
const BRANDS: { label: string; to: string }[] = [
  { label: "BUSCH", to: "/products#busch" },
  { label: "NIKKISO", to: "/products#nikkiso" },
  { label: "TRUNDEAN", to: "/products#trundean" },
  { label: "TONSON", to: "/products#tonson" },
  { label: "DINO", to: "/products#dino" },
  { label: "LONGER", to: "/products#longer" },
  { label: "VERDERFLEX", to: "/products#verderflex" },
  { label: "NEW AGE", to: "/products#tubings" },
  { label: "SAINT-GOBAIN", to: "/products#tubings" },
];

export default function Home() {
  return (
    <>
      {/* ————— Hero — light, photography-led ————— */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[1.05fr,0.95fr] lg:gap-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-busch/50 bg-busch/[0.07] px-4 py-1.5"
            >
              <BadgeCheck size={15} className="shrink-0 text-busch" />
              <span className="text-[11px] font-bold tracking-wide text-busch md:text-xs">
                Authorized Distributor — pumps, blowers &amp; vacuum technology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl xl:text-[3.4rem]"
            >
              Pumps &amp; vacuum technology,{" "}
              <span className="bg-gradient-to-b from-transparent from-60% to-brand-yellow to-60%">
                supplied and supported
              </span>{" "}
              across Indonesia.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg"
            >
              Since 2007, CV. Putra Deka Mandiri has equipped Indonesian industry
              with vacuum pumps, process pumps, air motors, and industrial hoses —
              with genuine parts and real after-sales service.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.46 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 text-sm font-bold text-black shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-lg"
              >
                Explore Products
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-500"
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>

          {/* Product visual — auto-rotating showcase of real distributed units */}
          <HeroProductShowcase />
        </div>
      </section>

      {/* ————— Stats band ————— */}
      <section aria-label="Company facts" className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-4 py-10 md:grid-cols-4 md:px-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-brand-yellow md:text-4xl">{s.n}</div>
              <div className="mt-1 text-xs font-medium tracking-wide text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ————— Brand marquee ————— */}
      <section aria-label="Brands we distribute" className="border-b border-line bg-paper">
        <div className="marquee py-6">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                {BRANDS.map((b) => (
                  <Link
                    key={b.label + copy}
                    to={b.to}
                    tabIndex={copy === 1 ? -1 : 0}
                    className="mx-7 font-display text-sm font-bold tracking-[0.18em] text-neutral-300 transition-colors hover:text-neutral-900 focus-visible:text-neutral-900 focus-visible:outline-none md:mx-9"
                  >
                    {b.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Product lines — real product photos ————— */}
      <section id="products" className="scroll-mt-20 bg-ground">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
              What we supply
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Four product lines. One supplier.
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Every unit sourced as an authorized distributor — with datasheets,
              sizing help, and spare parts to match.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.07 }}
              >
                <CategoryCard title={c.title} desc={c.desc} brands={c.brands} />
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-9">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 underline decoration-brand-yellow decoration-[3px] underline-offset-4 transition-colors hover:decoration-black"
            >
              See the full product range
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ————— Applications — real factory photography ————— */}
      <section id="applications" className="scroll-mt-20 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
          <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
                Applications
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                Trusted on the factory floor.
              </h2>
            </div>
            <Link
              to="/applications"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 underline decoration-brand-yellow decoration-[3px] underline-offset-4 transition-colors hover:decoration-black"
            >
              All 12 industries
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {APP_TEASER.map((a, i) => (
              <motion.div
                key={a.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 3) * 0.07 }}
                className="group relative h-44 overflow-hidden rounded-2xl md:h-52"
              >
                <img
                  src={asset(a.img)}
                  alt={a.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 border-l-[3px] border-brand-yellow pl-3 font-display text-sm font-bold text-white md:text-base">
                  {a.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Why PDM + real team photo ————— */}
      <section id="why" className="scroll-mt-20 bg-ground">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr,400px]">
            <div>
              <motion.div {...fadeUp} className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
                  Why PDM
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                  A distributor that stays after the delivery.
                </h2>
              </motion.div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {WHY.map((w, i) => (
                  <motion.div
                    key={w.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                    className="rounded-2xl border border-line bg-white p-6 shadow-card"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-yellow/20 text-neutral-900">
                      <w.icon size={19} strokeWidth={2} />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-neutral-900">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{w.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Service panel — product-as-hero, hairline dividers, no shadow */}
            <motion.aside
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              aria-label="Service commitment"
              className="rounded-2xl border border-line bg-ground p-8"
            >
              <div className="flex h-56 items-center justify-center lg:h-64">
                <img
                  src={asset("/img/products/Busch-Combi-Vacuum-Pumps.png")}
                  alt="Busch COMBI vacuum system — commissioned on-site by PDM"
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                COMBI system — commissioned on-site by PDM
              </p>
              <div className="mt-6 divide-y divide-line border-t border-line">
                {[
                  "On-site commissioning & repair",
                  "Genuine spare parts, in stock",
                  "Response within one business day",
                ].map((line) => (
                  <div key={line} className="flex items-center gap-3 py-3.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow ring-4 ring-brand-yellow/20" />
                    <span className="text-sm font-medium text-neutral-700">{line}</span>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ————— Customers ————— */}
      <section aria-label="Our customers" className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
              Our happy customers
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Trusted by names you know.
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              From food and pharma to consumer goods — Indonesia&rsquo;s leading
              manufacturers run on equipment supplied and serviced by PDM.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="mx-auto mt-10 max-w-5xl rounded-2xl border border-line bg-white p-6 shadow-card md:p-10"
          >
            <img
              src={asset("/brand/happy-customer.png")}
              alt="Customers of Putra Deka Mandiri: Nestlé, Charoen Pokphand, Darya-Varia Laboratoria, Kalbe, and Tempo Scan"
              className="w-full"
            />
          </motion.div>
          <motion.div {...fadeUp} className="mt-8 text-center">
            <Link
              to="/reference"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 underline decoration-brand-yellow decoration-[3px] underline-offset-4 transition-colors hover:decoration-black"
            >
              See 94+ customer references
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ————— Yellow CTA band ————— */}
      <section aria-label="Get a quote" className="bg-brand-yellow">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-12 md:flex-row md:px-6">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-black md:text-3xl">
              Ready to spec your pump?
            </h2>
            <p className="mt-1.5 text-sm font-medium text-black/70">
              Send your application details — we&rsquo;ll size it and quote within one business day.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-black px-7 py-3.5 text-sm font-bold text-brand-yellow transition-transform hover:-translate-y-0.5"
          >
            Request a Quote
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
