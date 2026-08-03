"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AboutDict {
  badge: string;
  headline1: string;
  headline2: string;
  body: string;
  mission: string;
  missionText: string;
  vision: string;
  visionText: string;
  values: string;
  valuesText: string;
}

export default function About({ dict }: { dict: AboutDict }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      title: dict.mission,
      desc: dict.missionText,
      image: "/about-athlete.jpg",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    {
      title: dict.vision,
      desc: dict.visionText,
      image: "/images/facility-strength.jpg",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    },
    {
      title: dict.values,
      desc: dict.valuesText,
      image: "/images/facility-cardio.jpg",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    }
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="section"
      style={{
        background: "var(--bg)",
        position: "relative",
        borderTop: "1px solid var(--line)"
      }}
      aria-label="About us"
    >
      {/* Subtle Dotted Background (Titan Gym style) */}
      <div 
        aria-hidden="true" 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        {/* Intro Header */}
        <div 
          style={{
            textAlign: "center",
            maxWidth: 800,
            margin: "0 auto 64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 1s var(--ease), transform 1s var(--ease)"
          }}
        >
          <span 
            className="label label--accent" 
            style={{ 
              marginBottom: 16, 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 8,
              justifyContent: "center"
            }}
          >
            <span style={{ width: 12, height: 1, background: "var(--red)" }} />
            {dict.badge}
          </span>
          
          <h2 
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(36px, 5.5vw, 64px)",
              textTransform: "uppercase",
              lineHeight: 1.05,
              color: "var(--ink)",
              marginBottom: 24,
              letterSpacing: "-0.01em",
            }}
          >
            {dict.headline1} <span style={{ color: "var(--red)" }}>{dict.headline2}</span>
          </h2>
          
          <p 
            style={{
              fontSize: 15,
              color: "var(--ink-60)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            {dict.body}
          </p>
        </div>

        {/* 3-Column Clean Card Grid (Titan Gym Feature Cards style) */}
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(32px)",
            transition: "opacity 1s var(--ease) 0.2s, transform 1s var(--ease) 0.2s"
          }}
        >
          {cards.map((card, i) => (
            <div 
              key={i}
              className="glass-card"
              style={{
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "var(--red)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            >
              {/* Card top half: text */}
              <div style={{ padding: "32px 24px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ color: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {card.icon}
                  </div>
                  <h3 
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 20,
                      textTransform: "uppercase",
                      color: "var(--ink)",
                      margin: 0,
                      letterSpacing: "0.02em"
                    }}
                  >
                    {card.title}
                  </h3>
                </div>
                <p style={{ fontSize: 13.5, color: "var(--ink-60)", lineHeight: 1.6 }}>
                  {card.desc}
                </p>
              </div>

              {/* Red down arrow indicator overlapping the image (Titan Gym style) */}
              <div 
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 2,
                  marginBottom: -20
                }}
              >
                <div 
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--red)",
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(200, 55, 45, 0.4)"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Card bottom half: image visual */}
              <div style={{ position: "relative", height: 180, width: "100%", overflow: "hidden" }}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="cinematic-photo"
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div 
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
