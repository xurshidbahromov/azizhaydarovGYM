"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  result: string;
  text: string;
}

interface TransformationsDict {
  badge: string;
  headline: string;
  sub: string;
  before: string;
  after: string;
  testimonials: Testimonial[];
}

const MEMBER_IMAGES = [
  { before: "/transformations/jasur-before.png", after: "/transformations/jasur-after.png" },
  { before: "/transformations/nilufar-before.png", after: "/transformations/nilufar-after.png" },
  { before: "/transformations/bobur-before.png", after: "/transformations/bobur-after.png" },
];

/* ── Interactive Before/After Visual Card ── */
function BASlider({
  beforeLabel,
  afterLabel,
  beforeImg,
  afterImg,
}: {
  beforeLabel: string;
  afterLabel: string;
  beforeImg: string;
  afterImg: string;
}) {
  const [pos, setPos] = useState(50);
  const el = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const calc = (clientX: number) => {
    if (!el.current) return;
    const { left, width } = el.current.getBoundingClientRect();
    setPos(Math.min(Math.max(((clientX - left) / width) * 100, 5), 95));
  };

  const onDown = (e: React.PointerEvent) => {
    drag.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (drag.current) calc(e.clientX);
  };
  const onUp = () => {
    drag.current = false;
  };

  return (
    <div
      ref={el}
      style={{
        position: "relative",
        height: 440,
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--line)",
        background: "var(--void)",
        userSelect: "none",
        cursor: "ew-resize",
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      role="slider"
      aria-label="Before and after transformation photo slider"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
    >
      {/* Before Image Layer */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src={beforeImg}
          alt={beforeLabel}
          fill
          style={{ objectFit: "cover", filter: "grayscale(80%) brightness(0.7)" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            padding: "6px 14px",
            borderRadius: 4,
            border: "1px solid var(--line)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--ink-60)",
          }}
        >
          {beforeLabel}
        </div>
      </div>

      {/* After Image Layer (Clipped) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          transition: drag.current ? "none" : "clip-path 0.1s ease",
        }}
      >
        <Image
          src={afterImg}
          alt={afterLabel}
          fill
          style={{ objectFit: "cover", filter: "contrast(1.05) brightness(0.9)" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            background: "var(--red)",
            padding: "6px 14px",
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--ink)",
            boxShadow: "0 4px 12px rgba(200, 55, 45, 0.4)",
          }}
        >
          {afterLabel}
        </div>
      </div>

      {/* Slider Splitter Line & Knob */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          background: "var(--red)",
          transform: "translateX(-50%)",
          boxShadow: "0 0 10px rgba(200, 55, 45, 0.8)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--red)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
            border: "2px solid #FFFFFF",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M18 8l4 4-4 4M6 8l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Transformations({ dict }: { dict: TransformationsDict }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const activeImages = MEMBER_IMAGES[active] || MEMBER_IMAGES[0];

  return (
    <section
      id="transformations"
      ref={ref as React.RefObject<HTMLElement>}
      className="section section--surface"
      aria-label="Transformations"
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            marginBottom: "var(--gap-inner)",
            opacity: vis ? 1 : 0,
            transition: "opacity 0.8s var(--ease)",
          }}
        >
          <span
            className="label label--accent"
            style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}
          >
            <span className="accent-line" aria-hidden="true" />
            {dict.badge}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(44px, 6vw, 84px)",
              textTransform: "uppercase",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
            }}
          >
            {dict.headline}
          </h2>
        </div>

        {/* 2-Column Responsive Grid */}
        <div
          className="grid-responsive-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 48,
            alignItems: "center",
            opacity: vis ? 1 : 0,
            transition: "opacity 0.8s var(--ease) 0.15s",
          }}
        >
          {/* Photo Slider */}
          <div>
            <BASlider
              beforeLabel={dict.before}
              afterLabel={dict.after}
              beforeImg={activeImages.before}
              afterImg={activeImages.after}
            />
            <p
              style={{
                marginTop: 14,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink-40)",
                textAlign: "center",
              }}
              aria-hidden="true"
            >
              ← TAQQOSLASH UCHUN SURING →
            </p>
          </div>

          {/* Testimonial Cards List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {dict.testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    cursor: "pointer",
                    padding: "24px 28px",
                    background: isActive ? "var(--bg)" : "transparent",
                    border: isActive ? "1px solid var(--line-hover)" : "1px solid var(--line)",
                    borderLeft: isActive ? "3px solid var(--red)" : "1px solid var(--line)",
                    borderRadius: 8,
                    transition: "all 0.3s var(--ease)",
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`Read ${t.name} testimonial`}
                  onKeyDown={(e) => e.key === "Enter" && setActive(i)}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isActive ? 12 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          background: isActive ? "var(--red)" : "var(--surface-2)",
                          color: "var(--ink)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 16,
                          transition: "background 0.3s ease",
                        }}
                        aria-hidden="true"
                      >
                        {t.name[0]}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: 18,
                            textTransform: "uppercase",
                            letterSpacing: "0.02em",
                            color: "var(--ink)",
                          }}
                        >
                          {t.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--red)",
                            marginTop: 2,
                          }}
                        >
                          {t.result}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: 18,
                        color: isActive ? "var(--red)" : "var(--ink-25)",
                        transition: "transform 0.3s ease, color 0.3s ease",
                        transform: isActive ? "rotate(90deg)" : "none",
                      }}
                    >
                      →
                    </span>
                  </div>

                  {isActive && (
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginTop: 12,
                        paddingTop: 12,
                        borderTop: "1px solid var(--line)",
                      }}
                    >
                      "{t.text}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
