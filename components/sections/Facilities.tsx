"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface FacItem {
  title: string;
  desc: string;
}

interface FacilitiesDict {
  badge: string;
  headline: string;
  sub: string;
  items: {
    cardio: FacItem;
    strength: FacItem;
    functional: FacItem;
    locker: FacItem;
    recovery: FacItem;
    nutrition: FacItem;
  };
}

const KEYS = ["cardio", "strength", "functional", "locker", "recovery", "nutrition"] as const;

export default function Facilities({ dict }: { dict: FacilitiesDict }) {
  const [open, setOpen] = useState<string | null>("cardio");
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

  const toggle = (k: string) => setOpen(prev => (prev === k ? null : k));

  const getZoneImage = (zone: string | null) => {
    switch (zone) {
      case "cardio":
      case "locker":
        return "/images/facility-cardio.png";
      case "strength":
      case "functional":
        return "/images/facility-strength.png";
      case "recovery":
      case "nutrition":
      default:
        return "/images/facility-recovery.png";
    }
  };

  return (
    <section
      id="facilities"
      ref={ref}
      className="section"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--line)",
        position: "relative",
      }}
      aria-label="Facilities"
    >
      <div className="container">
        {/* Split Grid Layout (Titan Gym alternating style but merged into an interactive layout) */}
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          {/* Left: Text Header & Accordion */}
          <div 
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-24px)",
              transition: "opacity 1s var(--ease), transform 1s var(--ease)"
            }}
          >
            <span 
              className="label label--accent" 
              style={{ 
                marginBottom: 16, 
                display: "inline-flex", 
                alignItems: "center", 
                gap: 8 
              }}
            >
              <span style={{ width: 12, height: 1, background: "var(--red)" }} />
              {dict.badge}
            </span>

            <h2 
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(36px, 5vw, 64px)",
                textTransform: "uppercase",
                lineHeight: 1.05,
                color: "var(--ink)",
                marginBottom: 16,
                letterSpacing: "-0.01em",
              }}
            >
              {dict.headline}
            </h2>

            <p 
              style={{
                fontSize: 14.5,
                color: "var(--ink-40)",
                lineHeight: 1.7,
                maxWidth: 480,
                marginBottom: 40,
              }}
            >
              {dict.sub}
            </p>

            {/* Accordion Rows */}
            <div role="list" aria-label="Facility zones">
              {KEYS.map((k, i) => {
                const isOpen = open === k;
                const item = dict.items[k];
                return (
                  <div
                    key={k}
                    className={`facility-row${isOpen ? " open" : ""}`}
                    role="listitem"
                    style={{
                      borderBottom: "1px solid var(--line)",
                      background: isOpen ? "rgba(255,255,255,0.01)" : "transparent",
                      transition: "background 0.3s ease",
                    }}
                  >
                    <button
                      className="facility-header"
                      onClick={() => toggle(k)}
                      aria-expanded={isOpen}
                      aria-controls={`fac-body-${k}`}
                      id={`fac-btn-${k}`}
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "24px 16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span 
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 400,
                            fontSize: 13,
                            color: isOpen ? "var(--red)" : "var(--ink-25)",
                            minWidth: 24,
                            transition: "color 0.2s",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div
                          style={{
                            color: isOpen ? "var(--red)" : "var(--ink-40)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.25s ease",
                            flexShrink: 0,
                          }}
                        >
                          {k === "cardio" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                          )}
                          {k === "strength" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 5v14M18 5v14M3 8v8M21 8v8M6 12h12" />
                            </svg>
                          )}
                          {k === "functional" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 2 7 12 12 22 7 12 2" />
                              <polyline points="2 17 12 22 22 17" />
                              <polyline points="2 12 12 17 22 12" />
                            </svg>
                          )}
                          {k === "locker" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          )}
                          {k === "recovery" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                            </svg>
                          )}
                          {k === "nutrition" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2v8M18 6l-6 4M6 6l6 4" />
                              <circle cx="12" cy="15" r="5" />
                            </svg>
                          )}
                        </div>
                        <span 
                          className="facility-title" 
                          style={{ 
                            fontSize: 18,
                            fontWeight: 700,
                            letterSpacing: "0.03em",
                            color: isOpen ? "var(--ink)" : "var(--ink-60)", 
                            transition: "color 0.2s" 
                          }}
                        >
                          {item.title}
                        </span>
                      </div>

                      <div 
                        className="facility-icon-wrap" 
                        aria-hidden="true"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "none",
                          color: isOpen ? "var(--red)" : "var(--ink-40)",
                          transition: "transform 0.3s var(--ease), color 0.3s",
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </div>
                    </button>

                    <div
                      id={`fac-body-${k}`}
                      role="region"
                      aria-labelledby={`fac-btn-${k}`}
                      className="facility-body"
                      style={{
                        maxHeight: isOpen ? 120 : 0,
                        opacity: isOpen ? 1 : 0,
                        padding: isOpen ? "0 16px 24px 40px" : "0 16px 0 40px",
                        transition: "max-height 0.4s var(--ease), opacity 0.3s ease, padding 0.3s ease",
                        overflow: "hidden",
                        fontSize: 14,
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Large Dynamic Image Panel (Titan Gym visual look) */}
          <div 
            style={{
              position: "sticky",
              top: 100,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(24px)",
              transition: "opacity 1s var(--ease) 0.15s, transform 1s var(--ease) 0.15s",
              display: "flex",
              flexDirection: "column",
            }}
            className="hide-mobile"
          >
            <div 
              style={{
                position: "relative",
                aspectRatio: "4/5",
                width: "100%",
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid var(--line-md)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              }}
            >
              <Image
                src={getZoneImage(open)}
                alt="AzizHaydarov GYM Facilities"
                fill
                style={{ objectFit: "cover", transition: "filter 0.5s ease, transform 0.8s ease" }}
                sizes="40vw"
              />
              <div 
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)"
                }}
              />
              {/* Floating Red Accent Bar */}
              <div 
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  background: "rgba(10,10,10,0.85)",
                  backdropFilter: "blur(12px)",
                  borderLeft: "3px solid var(--red)",
                  padding: "16px 20px",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red)" }}>
                    AZIZHAYDAROV GYM
                  </span>
                  <div style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", marginTop: 2 }}>
                    {open ? dict.items[open as keyof typeof dict.items].title : ""}
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-40)" }}>
                  24/7 ACCESS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #facilities .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
