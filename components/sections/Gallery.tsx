"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface GalleryDict {
  badge: string; headline: string; sub: string;
  filters: { all: string; gym: string; training: string; events: string; community: string; };
}

const ITEMS = [
  { id:"g1",  cat:"gym",       label:"Og'irliklar Xonasi",  h:280, img: "/images/facility-strength.jpg" },
  { id:"g2",  cat:"training",  label:"Kuch Mashg'uloti",    h:200, img: "/images/facility-cardio.jpg" },
  { id:"g3",  cat:"community", label:"Jamiyat Mashg'uloti", h:340, img: "/images/facility-nutrition.jpg" },
  { id:"g4",  cat:"gym",       label:"Kardio Zonasi",       h:240, img: "/images/facility-cardio.jpg" },
  { id:"g5",  cat:"training",  label:"Krossfit Mashg'uloti",h:300, img: "/images/facility-functional.jpg" },
  { id:"g6",  cat:"events",    label:"Musobaqa Kuni",       h:210, img: "/images/facility-strength.jpg" },
  { id:"g7",  cat:"gym",       label:"Funksional Zona",     h:260, img: "/images/facility-functional.jpg" },
  { id:"g8",  cat:"community", label:"Jamoaviy Mashg'ulot", h:200, img: "/images/facility-locker.jpg" },
  { id:"g9",  cat:"training",  label:"Shaxsiy Mashg'ulot",  h:340, img: "/images/facility-strength.jpg" },
  { id:"g10", cat:"events",    label:"Sport Oziqlanish",    h:210, img: "/images/facility-nutrition.jpg" },
  { id:"g11", cat:"gym",       label:"Tiklanish Zonasi",    h:280, img: "/images/facility-recovery.jpg" },
  { id:"g12", cat:"community", label:"Oziqlanish Burchagi", h:220, img: "/images/facility-nutrition.jpg" },
];

export default function Gallery({ dict }: { dict: GalleryDict }) {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<typeof ITEMS[0] | null>(null);
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  const FILTERS = [
    { k: "all",       l: dict.filters.all       },
    { k: "gym",       l: dict.filters.gym       },
    { k: "training",  l: dict.filters.training  },
    { k: "events",    l: dict.filters.events    },
    { k: "community", l: dict.filters.community },
  ];

  const items = filter === "all" ? ITEMS : ITEMS.filter(i => i.cat === filter);

  return (
    <section
      id="gallery"
      ref={ref as React.RefObject<HTMLElement>}
      className="section section--surface"
      aria-label="Gallery"
    >
      <div className="container">
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "end", justifyContent: "space-between",
          gap: 24, marginBottom: 36,
          opacity: vis ? 1 : 0, transition: "opacity 0.8s var(--ease)",
        }}>
          <div>
            <span className="label label--accent" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span className="accent-line" aria-hidden="true" />
              {dict.badge}
            </span>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(48px, 6vw, 88px)", textTransform: "uppercase",
              lineHeight: 0.9, letterSpacing: "-0.01em", color: "var(--ink)",
            }}>
              {dict.headline}
            </h2>
          </div>

          {/* Filters */}
          <div
            role="tablist"
            aria-label="Gallery filters"
            style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end", paddingBottom: 4 }}
          >
            {FILTERS.map(f => (
              <button
                key={f.k}
                role="tab"
                aria-selected={filter === f.k}
                id={`gallery-filter-${f.k}`}
                onClick={() => setFilter(f.k)}
                style={{
                  padding: "8px 16px",
                  fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  background: filter === f.k ? "var(--red)" : "transparent",
                  color: filter === f.k ? "var(--ink)" : "var(--ink-40)",
                  border: `1px solid ${filter === f.k ? "var(--red)" : "var(--line)"}`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  if (filter !== f.k) e.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={e => {
                  if (filter !== f.k) e.currentTarget.style.color = "var(--ink-40)";
                }}
              >
                {f.l}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid — 3 columns */}
        <div
          style={{
            columns: "3", columnGap: 2,
            opacity: vis ? 1 : 0, transition: "opacity 0.8s var(--ease) 0.1s",
          }}
          role="list"
          aria-label="Gallery images"
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              className="gallery-item"
              role="listitem"
              tabIndex={0}
              onClick={() => setLightbox(item)}
              onKeyDown={e => e.key === "Enter" && setLightbox(item)}
              aria-label={`${item.label} — press Enter to enlarge`}
              style={{
                height: item.h,
                marginBottom: 2,
                breakInside: "avoid",
              }}
            >
              {/* Image visual */}
              <div style={{ position: "absolute", inset: 0, overflow: "hidden" }} aria-hidden="true">
                <Image
                  src={item.img}
                  alt={item.label}
                  fill
                  className="cinematic-photo"
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)"
                }} />
                <span style={{
                  position: "absolute", bottom: 12, left: 14,
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "var(--ink)", zIndex: 2
                }}>
                  {item.label}
                </span>
              </div>

              <div className="gallery-item-overlay" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 6v16M6 14h16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.label} enlarged`}
        >
          <div
            style={{
              width: "min(800px, 90vw)", aspectRatio: "16/9",
              background: "var(--surface-2)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={lightbox.img}
              alt={lightbox.label}
              fill
              style={{ objectFit: "cover" }}
              sizes="800px"
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "24px",
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
            }}>
              <span style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: 22, textTransform: "uppercase", color: "var(--ink)",
              }}>
                {lightbox.label}
              </span>
            </div>
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute", top: 16, right: 16,
                width: 36, height: 36,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--line)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--ink-60)",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          #gallery .container > div:last-child { columns: 2 !important; }
        }
        @media (max-width: 480px) {
          #gallery .container > div:last-child { columns: 1 !important; }
        }
      `}</style>
    </section>
  );
}
