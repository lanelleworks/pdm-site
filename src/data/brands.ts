/* Brand logos and the product-line directory on /products.
   Logos are the ones PDM already uses on putradekamandiri.com, trimmed of whitespace
   (public/brand/logos). `h` is an optical height in px: every logo is sized to roughly
   the same area (~4,600px²) rather than the same height, so a wide strip like LONGER and
   a near-square mark like BUSCH read as the same weight. Heavy marks (solid TONSON block,
   DINO ellipse) are nudged down a little by eye. `site` is each principal's official
   site, from the old Reference page, updated where the brand has moved (Verderair ->
   verderliquids.com, Saint-Gobain -> tygon.com, Nikkiso instead of Shun Eiko). Dino's
   site only serves plain http. */

export type BrandLogo = { name: string; logo: string; h: number; site: string };

export const BRAND_LOGOS: Record<string, BrandLogo> = {
  busch: { name: "Busch", logo: "/brand/logos/busch.png", h: 48, site: "https://www.buschvacuum.com/" },
  nikkiso: { name: "Nikkiso", logo: "/brand/logos/nikkiso.png", h: 40, site: "https://www.nikkiso.com/" },
  trundean: { name: "Trundean", logo: "/brand/logos/trundean.png", h: 31, site: "https://www.trundean.com/" },
  verderair: { name: "Verderair", logo: "/brand/logos/verderair.png", h: 40, site: "https://www.verderliquids.com/int/en/verderair/" },
  dino: { name: "Dino", logo: "/brand/logos/dino.png", h: 45, site: "http://www.dino.com.tw/" },
  longer: { name: "Longer", logo: "/brand/logos/longer.png", h: 27, site: "https://www.longerpump.com/" },
  tonson: { name: "Tonson", logo: "/brand/logos/tonson.png", h: 30, site: "https://www.tonson-motor.com/" },
  newage: { name: "New Age Industries", logo: "/brand/logos/newage.png", h: 34, site: "https://newageindustries.com/" },
  "saint-gobain": { name: "Saint-Gobain", logo: "/brand/logos/saint-gobain.png", h: 50, site: "https://www.tygon.com/" },
};

/* One entry per brand tile. `brand` + `group` select which products it counts (from
   products.ts); entries without catalogue pages carry a fixed `note` instead. `href` is
   the anchor of the section the tile jumps to. */
export type LineBrand = {
  key: keyof typeof BRAND_LOGOS;
  href: string;
  brand?: string;
  group?: string;
  note?: string;
  authorized?: boolean;
};

export type ProductLine = { title: string; desc: string; brands: LineBrand[] };

export const PRODUCT_LINES: ProductLine[] = [
  {
    title: "Vacuum Pumps",
    desc: "Dry, oil-lubricated, and liquid-ring vacuum pumps for every industrial process.",
    brands: [
      { key: "busch", href: "#busch", brand: "Busch", authorized: true },
      { key: "trundean", href: "#trundean-roots-blowers", brand: "Trundean", group: "roots blowers" },
    ],
  },
  {
    title: "Process Pumps",
    desc: "Diaphragm, peristaltic, and specialty process pumps for demanding fluids.",
    brands: [
      { key: "verderair", href: "#verderair", brand: "Verderair" },
      { key: "nikkiso", href: "#nikkiso", brand: "Nikkiso" },
      { key: "dino", href: "#dino", brand: "Dino" },
      { key: "longer", href: "#longer", brand: "Longer" },
      { key: "trundean", href: "#trundean-process-pumps", brand: "Trundean", group: "process pumps" },
    ],
  },
  {
    title: "Air Motors",
    desc: "Reliable pneumatic motors for explosion-proof and washdown environments.",
    brands: [{ key: "tonson", href: "#tonson", note: "2 product lines" }],
  },
  {
    title: "Tubings & Hoses",
    desc: "Industrial-grade tubing and hose systems for fluid and air transfer.",
    brands: [
      { key: "newage", href: "#newage", note: "Catalogue on request" },
      { key: "saint-gobain", href: "#saint-gobain", note: "Catalogue on request" },
    ],
  },
];
