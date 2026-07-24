"use client";

import Link from "next/link";

interface FooterDict {
  tagline: string;
  links: string;
  legal: string;
  privacy: string;
  terms: string;
  rights: string;
}

interface NavDict {
  about: string;
  programs: string;
  coaches: string;
  facilities: string;
  membership: string;
  gallery: string;
  contact: string;
}

interface Props {
  dict: FooterDict;
  nav: NavDict;
  locale: string;
}

const NAV_LINKS = [
  { key: "about", href: "#about" },
  { key: "programs", href: "#programs" },
  { key: "coaches", href: "#coaches" },
  { key: "facilities", href: "#facilities" },
  { key: "membership", href: "#membership" },
  { key: "contact", href: "#contact" },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer({ dict, nav, locale }: Props) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "var(--void)",
        borderTop: "1px solid var(--line)",
        padding: "80px 0 40px",
        position: "relative"
      }}
      role="contentinfo"
    >
      {/* Subtle grid pattern in footer */}
      <div 
        aria-hidden="true" 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            marginBottom: 64,
            paddingBottom: 48,
            borderBottom: "1px solid var(--line)",
          }}
        >
          {/* Column 1: Brand Info */}
          <div>
            <Link
              href={`/${locale}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                marginBottom: 20,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M3 20L9.5 4L16 20" stroke="var(--red)" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
                <path d="M6 14H13" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="square" />
                <path d="M17 6V20M21 6V20M17 13H21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" />
              </svg>
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--ink)",
              }}>
                AZIZ HAYDAROV <span style={{ color: "var(--red)" }}>GYM</span>
              </span>
            </Link>

            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-40)",
                lineHeight: 1.7,
                maxWidth: 260,
                marginBottom: 24
              }}
            >
              {dict.tagline}
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid var(--line)",
                    background: "rgba(255, 255, 255, 0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--ink-60)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--red)";
                    e.currentTarget.style.color = "var(--red)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--line)";
                    e.currentTarget.style.color = "var(--ink-60)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink)",
                marginBottom: 20,
              }}
            >
              {dict.links}
            </div>
            <nav aria-label="Footer navigation">
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: 13.5,
                        color: "var(--ink-40)",
                        transition: "color 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--ink)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--ink-40)";
                      }}
                    >
                      <span style={{ color: "var(--red)", fontSize: 10 }}>►</span>
                      {nav[link.key as keyof NavDict]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Location Details */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink)",
                marginBottom: 20,
              }}
            >
              MANZIL
            </div>
            <p style={{ fontSize: 13.5, color: "var(--ink-40)", lineHeight: 1.6, marginBottom: 16 }}>
              Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi 12
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
              <a href="tel:+998901234567" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "none" }}>
                +998 90 123 45 67
              </a>
              <span style={{ color: "var(--ink-40)" }}>
                info@azizhaydarovgym.uz
              </span>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink)",
                marginBottom: 20,
              }}
            >
              YANGILIKLAR
            </div>
            <p style={{ fontSize: 13.5, color: "var(--ink-40)", lineHeight: 1.6, marginBottom: 16 }}>
              Eng so'nggi mashg'ulot bo'yicha maslahatlar va a'zolik takliflarini birinchilardan bo'lib oling.
            </p>
            <form 
              onSubmit={(e) => e.preventDefault()} 
              style={{ 
                display: "flex", 
                alignItems: "center",
                borderBottom: "1px solid var(--line)",
                paddingBottom: 8
              }}
            >
              <input
                type="email"
                placeholder="Elektron pochtangiz"
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  color: "var(--ink)",
                  flex: 1,
                  paddingRight: 8
                }}
              />
              <button 
                type="submit" 
                style={{ 
                  background: "none",
                  border: "none",
                  color: "var(--red)", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4
                }}
                aria-label="Submit"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & Scroll to top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 12,
            color: "var(--ink-40)",
          }}
        >
          <span>
            © {new Date().getFullYear()} AZIZ HAYDAROV GYM. {dict.rights}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href={`/${locale}/privacy`} style={{ transition: "color 0.2s", color: "var(--ink-40)", textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"} onMouseLeave={e => e.currentTarget.style.color = "var(--ink-40)"}>
              {dict.privacy}
            </a>
            <a href={`/${locale}/terms`} style={{ transition: "color 0.2s", color: "var(--ink-40)", textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"} onMouseLeave={e => e.currentTarget.style.color = "var(--ink-40)"}>
              {dict.terms}
            </a>
            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--red)";
                e.currentTarget.style.borderColor = "var(--red)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
