"use client";

import { useRef, useState, useEffect } from "react";

interface PlanData {
  name: string;
  price: string;
  currency: string;
  features: string[];
}

interface MembershipDict {
  badge: string;
  headline: string;
  sub: string;
  monthly: string;
  popular: string;
  getStarted: string;
  contactSales: string;
  plans: {
    basic: PlanData;
    pro: PlanData;
    elite: PlanData;
  };
}

export default function Membership({ dict }: { dict: MembershipDict }) {
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

  const plans = [
    { ...dict.plans.basic, id: "basic", featured: false },
    { ...dict.plans.pro,   id: "pro",   featured: true  },
    { ...dict.plans.elite, id: "elite", featured: false },
  ];

  return (
    <section
      id="membership"
      ref={ref}
      className="section"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
        position: "relative",
      }}
      aria-label="Membership plans"
    >
      {/* Subtle Grid overlay for pricing section (Titan Gym style) */}
      <div 
        aria-hidden="true" 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        {/* Header */}
        <div 
          style={{ 
            textAlign: "center", 
            maxWidth: 800, 
            margin: "0 auto 64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.8s var(--ease), transform 0.8s var(--ease)"
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
              maxWidth: 520, 
              margin: "0 auto" 
            }}
          >
            {dict.sub}
          </p>
        </div>

        {/* 3-Column Pricing Grid */}
        <div
          className="plan-grid"
          role="list"
          aria-label="Membership plans"
          style={{ 
            opacity: visible ? 1 : 0, 
            transform: visible ? "none" : "translateY(32px)",
            transition: "opacity 0.8s var(--ease) 0.1s, transform 0.8s var(--ease) 0.1s",
            background: "transparent",
            border: "none",
            gap: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {plans.map((plan) => {
            const isPro = plan.featured;
            return (
              <article
                key={plan.id}
                id={`plan-${plan.id}`}
                className={`plan-card ${isPro ? "glass-card-featured" : "glass-card"}`}
                role="listitem"
                aria-label={`${plan.name} — ${plan.price} ${plan.currency} per ${dict.monthly}`}
                style={{
                  borderRadius: 16,
                  padding: "48px 36px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "transform 0.4s var(--ease)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  if (!isPro) e.currentTarget.style.borderColor = "var(--red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  if (!isPro) e.currentTarget.style.borderColor = "var(--line)";
                }}
              >
                {/* Popular Badge */}
                {isPro && (
                  <div 
                    style={{
                      position: "absolute",
                      top: 24,
                      right: 24,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--ink)",
                      background: "rgba(0, 0, 0, 0.25)",
                      padding: "6px 12px",
                      borderRadius: 4,
                    }}
                  >
                    {dict.popular}
                  </div>
                )}

                <div 
                  style={{ 
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 16,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isPro ? "var(--ink)" : "var(--ink-40)",
                    marginBottom: 16
                  }}
                >
                  {plan.name}
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 8 }}>
                  <span 
                    style={{ 
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(56px, 6vw, 76px)",
                      lineHeight: 1,
                      color: "var(--ink)"
                    }}
                  >
                    {plan.price}
                  </span>
                  <span 
                    style={{ 
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 600,
                      color: isPro ? "var(--ink)" : "var(--ink-60)"
                    }}
                  >
                    {plan.currency.replace("000 ", "")}k
                  </span>
                </div>
                <div 
                  style={{ 
                    fontSize: 12, 
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isPro ? "rgba(255,255,255,0.7)" : "var(--ink-40)",
                    marginTop: 4
                  }}
                >
                  / {dict.monthly}
                </div>

                <div 
                  style={{ 
                    height: 1, 
                    background: isPro ? "rgba(255,255,255,0.2)" : "var(--line)", 
                    margin: "32px 0" 
                  }} 
                />

                <ul 
                  aria-label={`${plan.name} plan features`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    flex: 1,
                    marginBottom: 40
                  }}
                >
                  {plan.features.map((f, fi) => (
                    <li 
                      key={fi} 
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontSize: 14,
                        color: isPro ? "var(--ink)" : "var(--ink-60)",
                      }}
                    >
                      <span 
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: isPro ? "var(--ink)" : "rgba(200, 55, 45, 0.1)",
                          color: isPro ? "var(--red)" : "var(--red)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 700,
                          flexShrink: 0
                        }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div>
                  <a
                    href="#contact"
                    className="btn"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      borderRadius: 6,
                      padding: "16px 24px",
                      background: isPro ? "var(--void)" : "var(--red)",
                      border: isPro ? "1px solid var(--void)" : "1px solid var(--red)",
                      color: "var(--ink)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (isPro) {
                        e.currentTarget.style.background = "var(--ink)";
                        e.currentTarget.style.color = "var(--red)";
                      } else {
                        e.currentTarget.style.background = "#a8291f";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPro) {
                        e.currentTarget.style.background = "var(--void)";
                        e.currentTarget.style.color = "var(--ink)";
                      } else {
                        e.currentTarget.style.background = "var(--red)";
                      }
                    }}
                  >
                    {dict.getStarted}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
