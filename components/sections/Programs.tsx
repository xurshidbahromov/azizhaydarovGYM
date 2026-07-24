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
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(200, 55, 45, 0.12)", color: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(200, 55, 45, 0.2)", flexShrink: 0 }}>
                    {p.id === "strength" && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 5v14M18 5v14M3 8v8M21 8v8M6 12h12" />
                      </svg>
                    )}
                    {p.id === "bodybuilding" && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                        <line x1="16" y1="8" x2="2" y2="22" />
                        <line x1="17.5" y1="15" x2="9" y2="6.5" />
                      </svg>
                    )}
                    {p.id === "weightloss" && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </svg>
                    )}
                    {p.id === "functional" && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    )}
                    {p.id === "crossfit" && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    )}
                    {p.id === "personal" && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </div>
                  <div className="program-name">{p.title}</div>
                </div>
                <div style={{
                  fontSize: 13, color: "var(--ink-40)", marginTop: 6,
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
