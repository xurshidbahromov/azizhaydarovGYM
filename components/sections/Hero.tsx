"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { type Locale } from "@/dictionaries";

interface HeroDict {
  tagline: string;
  headline1: string;
  headline2: string;
  sub: string;
  cta1: string;
  cta2: string;
  scroll: string;
}

interface HeroProps {
  dict: HeroDict;
  locale: Locale;
}

const STATEMENTS: Record<Locale, string[]> = {
  uz: ["Sog'lomroq bo'ling.", "Kuchliroq bo'ling.", "Ishonchliroq bo'ling."],
  en: ["Be healthier.", "Be stronger.", "Be confident."],
  ru: ["Будь здоровее.", "Будь сильнее.", "Будь увереннее."],
};

const PROMO_TEXT: Record<Locale, { title: string; desc: string }> = {
  uz: { title: "14 kun bepul sinov", desc: "Shunchaki qo'ng'iroq qiling yoki bizga yozing" },
  en: { title: "Get 14 days for free", desc: "Just give us a call or message us in the chat" },
  ru: { title: "14 дней бесплатно", desc: "Просто позвоните или напишите нам в чат" },
};

const CLIENTS_TEXT: Record<Locale, { title: string; desc: string }> = {
  uz: { title: "5,000+ faol a'zolar", desc: "Turli maqsadlar bilan kelishadi, lekin hammasi natijaga erishadi." },
  en: { title: "5,000+ active members", desc: "They arrive with different goals, yet they all find success." },
  ru: { title: "5,000+ активных членов", desc: "Они приходят с разными целями, но все достигают успеха." },
};

const SLIDER_TIPS: Record<Locale, string[]> = {
  uz: [
    "Mushaklaringiz uyquda o'sadi. Maksimal natija uchun 7-9 soat uxlashni maqsad qiling.",
    "Mashg'ulotdan oldin to'g'ri isinish jarohatlar xavfini 80% gacha kamaytiradi.",
    "Natijaning 70 foizi oshxonada aniqlanadi. To'g'ri oziqlanishni unutmang."
  ],
  en: [
    "Your muscles grow while you sleep. Make 7-9 hours your secret weapon.",
    "Proper warm-up reduces injury risk by up to 80%. Don't skip it.",
    "70% of results are built in the kitchen. Plan your nutrition."
  ],
  ru: [
    "Мышцы растут во время сна. Сделайте 7-9 часов своим секретным оружием.",
    "Правильная разминка снижает риск травм до 80%. Не пропускайте её.",
    "70% результата строится на кухне. Планируйте своё питание."
  ]
};

export default function Hero({ dict, locale }: HeroProps) {
  const [activeTip, setActiveTip] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.style.opacity = "0";
    contentRef.current.style.transform = "translateY(32px)";
    setTimeout(() => {
      if (!contentRef.current) return;
      contentRef.current.style.transition = "opacity 1.2s var(--ease), transform 1.2s var(--ease)";
      contentRef.current.style.opacity = "1";
      contentRef.current.style.transform = "translateY(0)";
    }, 200);
  }, []);

  // Auto scroll for muscle tips
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % SLIDER_TIPS[locale].length);
    }, 6000);
    return () => clearInterval(timer);
  }, [locale]);

  const statements = STATEMENTS[locale] || STATEMENTS.uz;
  const promo = PROMO_TEXT[locale] || PROMO_TEXT.uz;
  const clientsText = CLIENTS_TEXT[locale] || CLIENTS_TEXT.uz;
  const tips = SLIDER_TIPS[locale] || SLIDER_TIPS.uz;

  return (
    <section 
      id="home" 
      className="hero" 
      aria-label="Hero"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto",
        minHeight: "100vh",
        paddingTop: 120,
        paddingBottom: 40,
        background: "var(--void)"
      }}
    >
      {/* Background visual */}
      <div className="hero__bg">
        <Image
          src="/hero-bg.jpg"
          alt="Athlete training"
          fill
          priority
          quality={90}
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
      </div>

      {/* Modern gradient overlay for clear contrast */}
      <div 
        className="hero__overlay" 
        aria-hidden="true" 
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%)"
        }}
      />

      {/* Main left-aligned Statement & CTAs */}
      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div ref={contentRef} style={{ maxWidth: 800 }}>
          
          {/* Be healthier / Be stronger bold statements (Titan design look) */}
          <h1 
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(48px, 8vw, 110px)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: "var(--ink)",
              marginBottom: 40,
              letterSpacing: "-0.02em"
            }}
          >
            {statements[0]}
            <br />
            {statements[1]}
            <br />
            <span style={{ color: "var(--red)" }}>{statements[2]}</span>
          </h1>

          {/* Pill Actions */}
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="#contact"
              className="btn btn-primary"
              style={{
                borderRadius: 50,
                padding: "14px 32px",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.1em",
                background: "var(--red)",
                borderColor: "var(--red)",
                boxShadow: "0 4px 15px rgba(200, 55, 45, 0.4)"
              }}
            >
              {dict.cta1} ↗
            </a>
            <a
              href="#about"
              className="btn btn-ghost"
              style={{
                borderRadius: 50,
                padding: "14px 32px",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.1em",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              {dict.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Card Widgets (Exact Titan style) */}
      <div 
        className="container" 
        style={{ 
          position: "relative", 
          zIndex: 2, 
          width: "100%", 
          marginTop: 80,
        }}
      >
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1.2fr 0.9fr",
            gap: 16,
          }}
          className="hero-widgets-grid"
        >
          {/* Card 1: Clients Info */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--ink)",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 140,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Avatars group */}
              <div style={{ display: "flex", marginLeft: 4 }}>
                {[1, 2, 3].map((num) => (
                  <div 
                    key={num}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--surface-3)",
                      border: "2px solid var(--red)",
                      marginLeft: -10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{clientsText.title}</span>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-60)", lineHeight: 1.5, marginTop: 12 }}>
              {clientsText.desc}
            </p>
          </div>

          {/* Card 2: Interactive Quote Slider */}
          <div
            style={{
              background: "rgba(18, 18, 18, 0.65)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "var(--ink)",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 140,
              position: "relative",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-40)" }}>
                TOSHKENT, O'ZBEKISTON
              </span>
              {/* Controls */}
              <div style={{ display: "flex", gap: 6 }}>
                <button 
                  onClick={() => setActiveTip((prev) => (prev - 1 + tips.length) % tips.length)}
                  style={{ color: "var(--ink-40)", fontSize: 14 }}
                >
                  ‹
                </button>
                <button 
                  onClick={() => setActiveTip((prev) => (prev + 1) % tips.length)}
                  style={{ color: "var(--ink-40)", fontSize: 14 }}
                >
                  ›
                </button>
              </div>
            </div>

            <p style={{ fontSize: 13, color: "var(--ink-80)", lineHeight: 1.5, marginTop: 12, flex: 1 }}>
              "{tips[activeTip]}"
            </p>

            <span style={{ fontSize: 9, color: "var(--red)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>
              MASLAHATLAR VA TADQIQOTLAR
            </span>
          </div>

          {/* Card 3: Red Glass Promo block */}
          <a
            href="#contact"
            style={{
              background: "rgba(200, 55, 45, 0.85)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 120, 110, 0.4)",
              color: "var(--ink)",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 140,
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(200, 55, 45, 0.35)",
              transition: "transform 0.3s var(--ease)",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div 
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12
                }}
              >
                ↗
              </div>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                {promo.title}
              </div>
              <p style={{ fontSize: 11.5, opacity: 0.85, marginTop: 6, lineHeight: 1.4 }}>
                {promo.desc}
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Custom responsive style */}
      <style>{`
        @media (max-width: 900px) {
          .hero-widgets-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
