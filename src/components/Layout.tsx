import { useEffect } from "react";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { asset, cn } from "@/lib/utils";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Applications", to: "/applications" },
  { label: "Reference", to: "/reference" },
  { label: "Articles", to: "/articles" },
  { label: "Contact Us", to: "/contact" },
];

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-paper text-neutral-900">
      <ScrollToTop />

      {/* Utility bar */}
      <div className="hidden bg-ink text-[12px] text-white/70 md:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 md:px-6">
          <span className="font-medium tracking-wide">
            Indonesia&rsquo;s pumps, blowers &amp; vacuum specialist — since 2007
          </span>
          <span className="flex items-center gap-5">
            <a href="tel:+62217305773" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone size={12} /> +62-21-730-5773
            </a>
            <a href="mailto:pdm@putradekamandiri.com" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Mail size={12} /> pdm@putradekamandiri.com
            </a>
          </span>
        </div>
      </div>

      {/* Header — white, original logo untouched */}
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:gap-6 md:px-6">
          <Link to="/" className="flex min-w-0 items-center" aria-label="Putra Deka Mandiri — home">
            <img
              src={asset("/brand/pdm-logo.png")}
              alt="CV. Putra Deka Mandiri — Pumps, Vacuum Pumps, Blowers and Industrial Parts"
              className="h-8 w-auto md:h-10"
            />
          </Link>

          {/* Desktop: nav lives inline in the header */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative py-1 text-sm font-medium transition-colors",
                    isActive
                      ? "font-semibold text-neutral-900 after:absolute after:-top-[21px] after:left-0 after:h-[3px] after:w-full after:bg-brand-yellow"
                      : "text-neutral-500 hover:text-neutral-900",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-yellow px-3 py-2 text-xs font-bold text-black shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-lg md:gap-2 md:px-4 md:text-sm"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Request a Quote</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile: nav on its own row under the header, matches desktop styling */}
        <nav
          aria-label="Main"
          className="scrollbar-none flex items-center gap-5 overflow-x-auto border-t border-line px-4 py-2.5 lg:hidden"
        >
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative shrink-0 py-1 text-sm font-medium transition-colors",
                  isActive
                    ? "font-semibold text-neutral-900 after:absolute after:-bottom-[11px] after:left-0 after:h-[3px] after:w-full after:bg-brand-yellow"
                    : "text-neutral-500 hover:text-neutral-900",
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer — dark graphite anchor */}
      <footer className="border-t border-white/5 bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="rounded-lg bg-white px-4 py-2.5">
              <img src={asset("/brand/pdm-logo.png")} alt="CV. Putra Deka Mandiri" className="h-7 w-auto" />
            </div>
            <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className="text-xs font-medium text-white/50 transition-colors hover:text-white">
                  {n.label}
                </Link>
              ))}
            </nav>
            <p className="text-center text-xs leading-relaxed text-white/40 md:text-right">
              © {new Date().getFullYear()} CV. Putra Deka Mandiri
              <br className="hidden md:block" /> Pumps · Vacuum Pumps · Blowers · Industrial Parts
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
