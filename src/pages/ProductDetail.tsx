import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight, Mail, Phone, Package } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { fadeUp } from "@/lib/motion";
import { asset } from "@/lib/utils";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (product) document.title = `${product.title} — Putra Deka Mandiri`;
    return () => {
      document.title =
        "Putra Deka Mandiri — Pumps, Blowers & Vacuum Pumps Distributor Indonesia";
    };
  }, [product]);

  if (!product) return <Navigate to="/products" replace />;

  const related = PRODUCTS.filter(
    (p) => p.brand === product.brand && p.slug !== product.slug,
  ).slice(0, 4);

  const mailSubject = encodeURIComponent(`Quotation Request — ${product.title}`);
  const mailBody = encodeURIComponent(
    `Product: ${product.title}\nApplication:\nCompany:\nLocation:\n`,
  );

  // Treat the first spec row as a header only when it has no digits (label row).
  const specs = product.specs;
  const headerRow =
    specs && specs.length > 1 && specs[0].every((c) => !/\d/.test(c)) ? specs[0] : null;
  const bodyRows = specs ? (headerRow ? specs.slice(1) : specs) : [];

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-line bg-ground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5 px-4 py-4 text-xs font-medium text-neutral-500 md:px-6">
          <Link to="/products" className="transition-colors hover:text-neutral-900">
            Products
          </Link>
          <ChevronRight size={13} />
          <span className="text-neutral-500">{product.brand}</span>
          <ChevronRight size={13} />
          <span className="font-semibold text-neutral-900">{product.title}</span>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[440px,1fr]">
          {/* Image */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-line bg-white p-8 lg:sticky lg:top-24"
          >
            <div className="flex h-72 items-center justify-center md:h-80">
              {product.img ? (
                <img
                  src={asset(product.img)}
                  alt={product.title}
                  className="max-h-full w-auto object-contain"
                />
              ) : (
                <Package size={64} strokeWidth={1} className="text-neutral-300" />
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                {product.brand}
              </span>
              <span className="rounded-full bg-ground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
                {product.group}
              </span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {product.title}
            </h1>

            {product.paras.length > 0 && (
              <div className="mt-5 space-y-4">
                {product.paras.map((t, i) => (
                  <p
                    key={i}
                    className="whitespace-pre-line text-sm leading-relaxed text-neutral-600"
                  >
                    {t}
                  </p>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:pdm@putradekamandiri.com?subject=${mailSubject}&body=${mailBody}`}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 text-sm font-bold text-black shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-lg"
              >
                <Mail size={16} strokeWidth={2.5} />
                Request a Quote for this product
              </a>
              <a
                href="tel:+62217305773"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-500"
              >
                <Phone size={16} />
                +62-21-730-5773
              </a>
            </div>

            {/* Specifications */}
            {specs && bodyRows.length > 0 && (
              <section aria-label="Specifications" className="mt-10">
                <h2 className="border-b-2 border-brand-yellow pb-2 font-display text-lg font-bold text-neutral-900">
                  Specifications
                </h2>
                <div className="mt-4 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full border-collapse text-left text-xs [font-variant-numeric:tabular-nums] md:text-sm">
                    {headerRow && (
                      <thead>
                        <tr className="bg-ink text-white">
                          {headerRow.map((c, i) => (
                            <th key={i} className="px-4 py-2.5 font-semibold">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {bodyRows.map((row, ri) => (
                        <tr key={ri} className="odd:bg-white even:bg-ground/60">
                          {row.map((c, ci) => (
                            <td
                              key={ci}
                              className={
                                "border-t border-line px-4 py-2.5 text-neutral-700" +
                                (ci === 0 ? " font-medium text-neutral-900" : "")
                              }
                            >
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section aria-label={`More from ${product.brand}`} className="mt-16">
            <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-neutral-900 md:text-2xl">
                More from {product.brand}
              </h2>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 underline decoration-brand-yellow decoration-[3px] underline-offset-4 transition-colors hover:decoration-black"
              >
                Full catalogue
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </motion.div>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
