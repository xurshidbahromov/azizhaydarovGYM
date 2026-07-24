"use client";

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

export default function Footer({ dict, nav, locale }: Props) {
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
        {/* Main 4-Column Grid (Titan Gym Footer style) */}
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
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--ink)",
                marginBottom: 20,
              }}
            >
              AH<span style={{ color: "var(--red)" }}>GYM</span>
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-40)",
                lineHeight: 1.7,
                maxWidth: 240,
                marginBottom: 24
              }}
            >
              {dict.tagline}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["instagram", "telegram", "youtube"].map((soc) => (
                <a
                  key={soc}
                  href={`https://${soc}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--ink-40)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--red)";
                    e.currentTarget.style.color = "var(--red)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--line)";
                    e.currentTarget.style.color = "var(--ink-40)";
                  }}
                >
                  <span style={{ fontSize: 11, textTransform: "capitalize" }}>{soc[0]}</span>
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
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--ink)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--ink-40)";
                      }}
                    >
                      <span style={{ color: "var(--red)" }}>•</span>
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
              LOCATION
            </div>
            <p style={{ fontSize: 13.5, color: "var(--ink-40)", lineHeight: 1.6, marginBottom: 16 }}>
              Bunyodkor street 12, Chilonzor district, Tashkent, Uzbekistan
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
              <a href="tel:+998901234567" style={{ color: "var(--red)", fontWeight: 600 }}>
                +998 90 123 45 67
              </a>
              <span style={{ color: "var(--ink-40)" }}>
                info@azizhaydarovgym.uz
              </span>
            </div>
          </div>

          {/* Column 4: Subscribe (Titan Gym style) */}
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
              SUBSCRIBE
            </div>
            <p style={{ fontSize: 13.5, color: "var(--ink-40)", lineHeight: 1.6, marginBottom: 16 }}>
              Get our latest training guides, nutrition tips and membership offers.
            </p>
            <form 
              onSubmit={(e) => e.preventDefault()} 
              style={{ 
                display: "flex", 
                alignItems: "center",
                borderBottom: "1px solid var(--line-md)",
                paddingBottom: 8
              }}
            >
              <input
                type="email"
                placeholder="Your Email Address"
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
                  color: "var(--red)", 
                  fontSize: 16,
                  cursor: "pointer"
                }}
                aria-label="Submit"
              >
                ➔
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 12,
            color: "var(--ink-25)",
          }}
        >
          <span>
            © {new Date().getFullYear()} AHGYM. {dict.rights}
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            <a href={`/${locale}/privacy`} style={{ transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"} onMouseLeave={e => e.currentTarget.style.color = "var(--ink-25)"}>
              {dict.privacy}
            </a>
            <a href={`/${locale}/terms`} style={{ transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"} onMouseLeave={e => e.currentTarget.style.color = "var(--ink-25)"}>
              {dict.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
