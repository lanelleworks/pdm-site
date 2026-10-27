import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Droplet, SprayCan, ShieldCheck } from "lucide-react";
import { fadeUp } from "@/lib/motion";

// Content preserved from putradekamandiri.com/vacuum-pumps-maintenance/
const STEPS = [
  {
    icon: ShieldCheck,
    title: "Inspect the o-rings",
    body: "Check and replace the o-rings in the intake caps, gas ballast, and oil drain before they harden and leak.",
  },
  {
    icon: Droplet,
    title: "Change the oil properly",
    body: "Run the pump for 30 minutes to warm the oil, drain it fully, cycle the pump briefly to push out what remains, then refill with clean vacuum pump oil.",
  },
  {
    icon: SprayCan,
    title: "Clean the exterior",
    body: "Wipe the pump down with a mild degreaser and cover the exhaust so moisture can't creep in during storage.",
  },
  {
    icon: Wrench,
    title: "Replace worn parts",
    body: "Swap externally worn components as needed — small parts now beat a rebuild later.",
  },
];

export default function Articles() {
  return (
    <>
      <section className="border-b border-line bg-ground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Articles</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              Knowledge from the field.
            </h1>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Practical guidance from our technical team on keeping your
              equipment running.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <motion.article {...fadeUp}>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            Vacuum Pumps
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Vacuum Pumps Maintenance
          </h2>
          <p className="mt-5 leading-relaxed text-neutral-600">
            To get a long life span from a vacuum pump, plan an annual
            maintenance check. It takes under an hour, ensures a clean and easy
            startup, and protects the investment you&rsquo;ve made in the pump.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {STEPS.map((s) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                className="rounded-2xl border border-line bg-white p-6 shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-yellow/20 text-neutral-900">
                  <s.icon size={19} strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-neutral-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="mt-10 rounded-2xl bg-ink p-8"
          >
            <h3 className="font-display text-xl font-bold text-white">
              Need oil, spare parts, or a service visit?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              PDM stocks high-quality vacuum pump oils and genuine spare parts —
              and our technical team can handle the maintenance for you.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
            >
              Contact our team
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </motion.article>
      </div>
    </>
  );
}
