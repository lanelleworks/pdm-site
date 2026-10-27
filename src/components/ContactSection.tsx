import { motion } from "motion/react";
import { Phone, Mail, MapPin, Printer, ArrowUpRight, Navigation } from "lucide-react";
import { fadeUp } from "@/lib/motion";

// PDM's own Google Maps listing ("Putra Deka Mandiri. CV - Metro Permata 1"). The cid is
// the listing's id, so the link always opens this exact business, not a fuzzy search.
const MAPS_LISTING = "https://maps.google.com/?cid=9085324989371105086";
const MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Putra+Deka+Mandiri.+CV+-+Metro+Permata+1";
// Keyless embed of the same place. It is a preview only: a link laid over it opens the
// listing, so the map never traps scrolling on phones.
const MAPS_EMBED =
  "https://www.google.com/maps?q=Putra+Deka+Mandiri.+CV+-+Metro+Permata+1&ll=-6.202623,106.714694&z=16&output=embed";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line bg-ground">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Tell us what you need to move, pump, or evacuate.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-neutral-600">
              Send your application details or a part number — our team will
              reply with a recommendation and quotation.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <a href="tel:+62217305773" className="flex items-center gap-3 font-medium text-neutral-700 transition-colors hover:text-black">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-yellow/20">
                  <Phone size={16} className="text-neutral-900" />
                </span>
                +62-21-730-5773 &nbsp;/&nbsp; +62-21-730-5774
              </a>
              <div className="flex items-center gap-3 font-medium text-neutral-700">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-yellow/20">
                  <Printer size={16} className="text-neutral-900" />
                </span>
                Fax: +62-21-734-50841
              </div>
              <a
                href="mailto:pdm@putradekamandiri.com"
                className="flex items-center gap-3 font-medium text-neutral-700 transition-colors hover:text-black"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-yellow/20">
                  <Mail size={16} className="text-neutral-900" />
                </span>
                pdm@putradekamandiri.com
              </a>
              <a
                href={MAPS_LISTING}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 font-medium text-neutral-700 transition-colors hover:text-black"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-yellow/20">
                  <MapPin size={16} className="text-neutral-900" />
                </span>
                <span className="pt-1.5">
                  Ruko Metro Permata I Blok A2/12
                  <br />
                  Karang Mulya – Ciledug, Tangerang 15157, Indonesia
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-neutral-500 transition-colors group-hover:text-black">
                    Open in Google Maps
                    <ArrowUpRight size={13} strokeWidth={2.4} className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                  </span>
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="rounded-2xl border border-line bg-white p-8 shadow-card-lg"
          >
            <h3 className="font-display text-xl font-bold text-neutral-900">Request a quotation</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Email us with the details below and we&rsquo;ll respond promptly:
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
              <li className="flex gap-2.5">
                <span className="font-bold text-neutral-900">1.</span> Product or brand (e.g. Busch R5 vacuum pump)
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-neutral-900">2.</span> Application &amp; capacity requirements
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-neutral-900">3.</span> Your company name and location
              </li>
            </ul>
            <a
              href="mailto:pdm@putradekamandiri.com?subject=Quotation%20Request&body=Product%2Fbrand%3A%0AApplication%3A%0ACompany%3A%0ALocation%3A%0A"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-yellow px-6 py-3.5 text-sm font-bold text-black shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-lg"
            >
              <Mail size={16} strokeWidth={2.5} />
              Email a Quote Request
            </a>
            <a
              href="tel:+62217305773"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-500"
            >
              <Phone size={16} />
              Call +62-21-730-5773
            </a>
          </motion.div>
        </div>

        {/* Location: live map preview that opens the Google Maps listing */}
        <motion.div
          {...fadeUp}
          className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-card-lg"
        >
          <div className="group relative h-[280px] bg-ground md:h-[360px]">
            <iframe
              src={MAPS_EMBED}
              title="Map showing CV. Putra Deka Mandiri, Ruko Metro Permata I, Ciledug, Tangerang"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
              className="pointer-events-none h-full w-full border-0 saturate-[0.85] transition-[filter] duration-300 group-hover:saturate-100"
            />
            <a
              href={MAPS_LISTING}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open CV. Putra Deka Mandiri in Google Maps"
              className="absolute inset-0 flex items-end p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-yellow md:p-5"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-neutral-900 shadow-card-lg ring-1 ring-black/5 backdrop-blur transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-ink group-hover:text-white">
                <MapPin size={14} strokeWidth={2.4} />
                Open in Google Maps
                <ArrowUpRight size={14} strokeWidth={2.4} />
              </span>
            </a>
          </div>
          <div className="flex flex-col gap-5 border-t border-line p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow">
                <MapPin size={18} className="text-black" />
              </span>
              <div>
                <p className="font-display text-base font-bold text-neutral-900">CV. Putra Deka Mandiri</p>
                <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">
                  Ruko Metro Permata I Blok A2/12, Karang Mulya – Ciledug, Tangerang 15157
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0">
              <a
                href={MAPS_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow px-5 py-3 text-sm font-bold text-black shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-lg"
              >
                <Navigation size={15} strokeWidth={2.5} />
                Get directions
              </a>
              <a
                href={MAPS_LISTING}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-500"
              >
                Open in Google Maps
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
