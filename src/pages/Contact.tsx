import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
import ContactSection from "@/components/ContactSection";

export default function Contact() {
  return (
    <>
      <section className="border-b border-line bg-ground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
              Contact Us
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              Let&rsquo;s talk equipment.
            </h1>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Office hours Monday–Friday · Tangerang, Indonesia. We respond to
              every inquiry.
            </p>
          </motion.div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
