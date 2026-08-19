import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { CUSTOMERS } from "@/data/customers";
import { fadeUp } from "@/lib/motion";
import { asset, cn } from "@/lib/utils";

const PRINCIPALS = [
  { group: "Vacuum Pumps", names: ["Busch", "Trundean"] },
  { group: "Process Pumps", names: ["Verderflex", "Nikkiso", "Dino", "Longer", "Trundean"] },
  { group: "Air Motors", names: ["Tonson"] },
  { group: "Industrial Tubings & Hoses", names: ["New Age Industries", "Saint-Gobain"] },
];

export default function Reference() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string | null>(null);

  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of CUSTOMERS) counts.set(c.sector, (counts.get(c.sector) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const filtered = useMemo(
    () =>
      CUSTOMERS.filter(
        (c) =>
          (!sector || c.sector === sector) &&
          (!query || c.name.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, sector],
  );

  return (
    <>
      <section className="border-b border-line bg-ground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
              Reference
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              Our customers.
            </h1>
            <p className="mt-4 leading-relaxed text-neutral-600">
              More than {CUSTOMERS.length} companies across {sectors.length}{" "}
              sectors trust PDM — from global pharma to national food producers.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* Featured logos */}
        <motion.div {...fadeUp} className="rounded-2xl border border-line bg-white p-6 shadow-card md:p-10">
          <img
            src={asset("/brand/happy-customer.png")}
            alt="Featured customers: Nestlé, Charoen Pokphand, Darya-Varia Laboratoria, Kalbe, and Tempo Scan"
            className="w-full"
          />
        </motion.div>

        {/* Filter bar */}
        <motion.div {...fadeUp} className="mt-12 flex flex-col gap-4">
          <div className="relative max-w-sm">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company…"
              aria-label="Search customer companies"
              className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 shadow-card placeholder:text-neutral-400 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/40"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSector(null)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                !sector
                  ? "border-brand-yellow bg-brand-yellow text-black"
                  : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500",
              )}
            >
              All ({CUSTOMERS.length})
            </button>
            {sectors.map(([s, n]) => (
              <button
                key={s}
                type="button"
                onClick={() => setSector(sector === s ? null : s)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  sector === s
                    ? "border-brand-yellow bg-brand-yellow text-black"
                    : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500",
                )}
              >
                {s} ({n})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Customer grid */}
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {filtered.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-card"
            >
              <span className="text-sm font-medium text-neutral-800">{c.name}</span>
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                {c.sector}
              </span>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full rounded-xl border border-line bg-white px-4 py-6 text-center text-sm text-neutral-500">
              No company matches &ldquo;{query}&rdquo;
              {sector ? ` in ${sector}` : ""}. Try a different search.
            </p>
          )}
        </div>
        <p className="mt-4 text-center text-xs italic text-neutral-400">…and many more across Indonesia.</p>

        {/* Principals */}
        <section aria-label="Our principals" className="mt-16">
          <motion.h2 {...fadeUp} className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
            Our principals.
          </motion.h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPALS.map((p, i) => (
              <motion.div
                key={p.group}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-2xl border border-line bg-white p-6 shadow-card"
              >
                <h3 className="border-b-2 border-brand-yellow pb-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-900">
                  {p.group}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {p.names.map((n) => (
                    <li key={n} className="text-sm font-medium text-neutral-700">
                      {n}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div {...fadeUp} className="mt-14 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 text-sm font-bold text-black shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-lg"
          >
            Join these companies
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </>
  );
}
