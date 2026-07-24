"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface StatsDict {
  members: string;
  coaches: string;
  years: string;
  satisfaction: string;
}

export default function Stats({ dict }: { dict: StatsDict }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={ref}
      className="section"
      style={{
        background: "var(--void)",
        borderTop: "1px solid var(--line)",
        position: "relative"
      }}
      aria-label="Gym stats and features"
    >
      <div className="container">
        {/* Editorial Features Grid (Exact match to the Titan screenshot grid layout) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 1fr",
            gap: 20,
            alignItems: "stretch",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(32px)",
            transition: "opacity 1s var(--ease), transform 1s var(--ease)"
          }}
          className="stats-features-grid"
        >
          {/* Left Column (3 features) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Feature 1 */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 28,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 16
              }}
            >
              {/* Asterisk/Star icon */}
              <div style={{ color: "var(--red)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
                </svg>
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-80)", lineHeight: 1.5 }}>
                {dict.coaches}: certified trainers with at least 5 years of athletic coaching experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 28,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 16
              }}
            >
              {/* Plus icon */}
              <div style={{ color: "var(--red)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-80)", lineHeight: 1.5 }}>
                Medical supervision & checkups. Safe training under expert physical guidance.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 28,
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 20
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 800, color: "var(--red)", lineHeight: 1 }}>
                10+
              </span>
              <p style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink-60)", lineHeight: 1.4 }}>
                {dict.years} of building strong body and discipline.
              </p>
            </div>
          </div>

          {/* Central Visual Column (Athlete visual with massive Red monogram logo) */}
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--line)",
              minHeight: 400
            }}
          >
            <Image
              src="/about-athlete.jpg"
              alt="Gym setup visual"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            <div 
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)"
              }}
            />
            {/* Giant Monogram logo (Titan visual look) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontFamily: "var(--font-display)",
                fontSize: 160,
                fontWeight: 900,
                color: "var(--red)",
                opacity: 0.95,
                letterSpacing: "-0.05em",
                lineHeight: 1
              }}
            >
              .AH
            </div>
          </div>

          {/* Right Column (5 features/metrics) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Right Row 1: Wi-Fi Free */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                alignItems: "center",
                gap: 16
              }}
            >
              {/* Wi-Fi Icon */}
              <div style={{ color: "var(--red)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                WI-FI FREE & CONNECTED
              </span>
            </div>

            {/* Right Row 2: Protein Bar */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                flex: 1,
                justifyContent: "center"
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                REFRESHMENT
              </span>
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>
                Protein Bar & Fresh Coffee
              </p>
            </div>

            {/* Right Row 3: Wearable integration */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                alignItems: "center",
                gap: 16
              }}
            >
              {/* Smartwatch icon */}
              <div style={{ color: "var(--red)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="6" y="4" width="12" height="16" rx="3" />
                  <path d="M9 18h6" />
                  <path d="M9 6h6" />
                </svg>
              </div>
              <p style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-80)", lineHeight: 1.4 }}>
                Fitness trackers & smart bio-analyser scales.
              </p>
            </div>

            {/* Right Row 4: Satisfaction */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 20,
                display: "flex",
                alignItems: "baseline",
                gap: 8
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: "var(--red)" }}>
                {dict.satisfaction}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "var(--ink-40)" }}>
                Mijoz Mamnuniyati
              </span>
            </div>

            {/* Right Row 5: Gym space */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 20,
                display: "flex",
                alignItems: "baseline",
                gap: 8
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: "var(--ink)" }}>
                3,000 M²
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "var(--ink-40)" }}>
                Premium Space
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
