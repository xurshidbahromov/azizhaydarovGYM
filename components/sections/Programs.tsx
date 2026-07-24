"use client";

import { useRef, useState, useEffect } from "react";

interface ProgramItem { title: string; desc: string; duration: string; level: string; }
interface ProgramsDict {
  badge: string; headline: string; sub: string; learnMore: string;
  items: {
    strength: ProgramItem; bodybuilding: ProgramItem; weightloss: ProgramItem;
    functional: ProgramItem; crossfit: ProgramItem; personal: ProgramItem;
  };
}

const KEYS = ["strength","bodybuilding","weightloss","functional","crossfit","personal"] as const;

export default function Programs({ dict }: { dict: ProgramsDict }) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const programs = KEYS.map((k, i) => ({ ...dict.items[k], id: k, num: String(i + 1).padStart(2, "0") }));

  return (
    <section
      id="programs"
      ref={ref as React.RefObject<HTMLElement>}
      className="section section--dark"
      aria-label="Training programs"
    >
      <div className="container">
        {/* Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "end",
          gap: 24,
          marginBottom: "var(--gap-inner)",
          opacity: vis ? 1 : 0,
          transition: "opacity 0.8s var(--ease)",
        }}>
          <div>
            <span className="label label--accent" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span className="accent-line" aria-hidden="true" />
              {dict.badge}
            </span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(52px, 7vw, 96px)",
              textTransform: "uppercase",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
            }}>
              {dict.headline}
            </h2>
          </div>
          <p style={{
            fontSize: 14,
            color: "var(--ink-40)",
            lineHeight: 1.7,
            maxWidth: 340,
            marginLeft: "auto",
            paddingBottom: 4,
          }}>
            {dict.sub}
          </p>
        </div>

        {/* Numbered list */}
        <div role="list" aria-label="Programs">
          {programs.map((p, i) => (
            <div
              key={p.id}
              className="program-item"
              role="listitem"
              id={`program-${p.id}`}
              tabIndex={0}
              aria-label={`${p.num}. ${p.title} — ${p.desc}`}
              style={{
                opacity: vis ? 1 : 0,
                transition: `opacity 0.6s var(--ease) ${0.05 + i * 0.07}s`,
              }}
            >
              <span className="program-num">{p.num}</span>

              <div>
                <div className="program-name">{p.title}</div>
                <div style={{
                  fontSize: 13, color: "var(--ink-40)", marginTop: 3,
                  maxWidth: 500, lineHeight: 1.6,
                }}>
                  {p.desc}
                </div>
              </div>

              <div className="program-meta">
                <span className="program-tag">{p.duration}</span>
                <span className="program-tag">{p.level}</span>
                <svg
                  className="program-arrow"
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
