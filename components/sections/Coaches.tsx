"use client";

import { useRef } from "react";
import Image from "next/image";

interface CoachesDict {
  badge: string; headline: string; sub: string;
  experience: string; certified: string;
}

const COACHES = [
  { id:"c1", initials:"AH", name:"Aziz Haydarov",   role:"Bosh Murabbiy va Asoschi",          spec:"Kuch va Natija",                    exp:12, certs:["NSCA-CSCS","ACE-CPT"], image: "/images/coach-aziz.png" },
  { id:"c2", initials:"RK", name:"Rustam Karimov",   role:"Bodibilding Murabbiyi",            spec:"Gipertrofiya va Musobaqa Tayyorgarligi", exp: 9, certs:["IFBB-PRO","NASM-CPT"],  image: "/images/coach-rustam.png" },
  { id:"c3", initials:"DY", name:"Dilnoza Yusupova", role:"Ayollar Fitnes Murabbiyi",         spec:"Vazn Yo'qotish va Turmush Tarzi",   exp: 7, certs:["ACE-CPT","Prec. Nutrition"], image: "/images/coach-dilnoza.png" },
  { id:"c4", initials:"ST", name:"Shokir Toshev",    role:"Kross Trening Bosh Murabbiyi",    spec:"Athletik Natija",                   exp: 8, certs:["CrossFit L3","NSCA"],  image: "/transformations/bobur-after.png" },
  { id:"c5", initials:"KR", name:"Kamola Rahimova",  role:"Oziqlanish va Tiklanish Mutaxassisi", spec:"Sport Oziqlanishi",              exp: 6, certs:["PN Level 2","ISSA"],    image: "/transformations/nilufar-after.png" },
];

export default function Coaches({ dict }: { dict: CoachesDict }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX   = useRef(0);
  const scrollL  = useRef(0);

  const onDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startX.current   = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollL.current  = trackRef.current?.scrollLeft ?? 0;
  };
  const onMove = (e: React.MouseEvent) => {
    if (!dragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollL.current - (x - startX.current) * 1.2;
  };
  const onUp = () => { dragging.current = false; };

  return (
    <section
      id="coaches"
      className="section section--surface"
      aria-label="Coaches"
    >
      {/* Header */}
      <div className="container" style={{ marginBottom: "var(--gap-inner)" }}>
        <span className="label label--accent" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span className="accent-line" aria-hidden="true" />
          {dict.badge}
        </span>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24 }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(48px, 6.5vw, 88px)",
            textTransform: "uppercase",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
          }}>
            {dict.headline}
          </h2>
          <p style={{ fontSize: 13, color: "var(--ink-40)", maxWidth: 280, lineHeight: 1.65, paddingBottom: 4 }}>
            {dict.sub}
          </p>
        </div>
      </div>

      {/* Drag-scroll track */}
      <div
        ref={trackRef}
        className="coaches-track no-scrollbar"
        style={{ padding: "0 var(--container)" }}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        role="list"
        aria-label="Coaches list"
      >
        {COACHES.map((c, i) => (
          <article
            key={c.id}
            id={c.id}
            className="coach-card glass-card"
            style={{ borderRadius: 16 }}
            role="listitem"
            aria-label={`${c.name} — ${c.role}`}
          >
            <div className="coach-avatar" style={{ position: "relative" }} aria-hidden="true">
              <Image
                src={c.image}
                alt={c.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
              />
              <div className="coach-avatar-accent" />
            </div>

            <div className="coach-body">
              <h3 className="coach-name">{c.name}</h3>
              <div className="coach-role">{c.role}</div>

              <div style={{ fontSize: 13, color: "var(--ink-40)", marginBottom: 16, lineHeight: 1.55 }}>
                {c.spec}
              </div>

              <div className="coach-exp">
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 24,
                  color: "var(--ink)",
                  marginRight: 6,
                }}>
                  {c.exp}+
                </span>
                <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-40)" }}>
                  {dict.experience}
                </span>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
                  {c.certs.map(cert => (
                    <span key={cert} style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ink-40)",
                      padding: "4px 10px",
                      border: "1px solid var(--line)",
                    }}>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Drag hint */}
      <div className="container" style={{ marginTop: 20 }}>
        <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "var(--ink-25)", textTransform: "uppercase" }}
           aria-hidden="true">
          ← Drag to explore →
        </p>
      </div>
    </section>
  );
}
