"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

interface ContactDict {
  badge: string;
  headline: string;
  headline2: string;
  sub: string;
  form: {
    name: string;
    phone: string;
    program: string;
    message: string;
    submit: string;
    success: string;
  };
  info: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  social: string;
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Contact({ dict }: { dict: ContactDict }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", program: "", message: "" });
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", phone: "", program: "", message: "" });
  };

  const INFO_ITEMS = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      text: dict.info.address,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      text: dict.info.phone,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      text: dict.info.email,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      text: dict.info.hours,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: "var(--gap-section) 0",
        background: "var(--surface)",
        borderTop: "1px solid var(--line)",
        position: "relative"
      }}
      aria-label="Contact us"
    >
      {/* Grid background */}
      <div 
        aria-hidden="true" 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        {/* Headline CTA */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.8s ease",
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
              fontSize: "clamp(36px, 6vw, 72px)",
              color: "var(--ink)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              textTransform: "uppercase"
            }}
          >
            {dict.headline} <span style={{ color: "var(--red)" }}>{dict.headline2}</span>
          </h2>
          <p style={{ color: "var(--ink-40)", fontSize: 14.5, maxWidth: 480, margin: "16px auto 0", lineHeight: 1.65 }}>
            {dict.sub}
          </p>
        </div>

        {/* Main Grid */}
        <div
          className="grid-responsive-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: 64,
            alignItems: "start",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {/* Left: Info Cards & Map */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            
            {/* Info Items List */}
            <div
              className="glass-card"
              style={{
                borderRadius: 16,
                padding: "32px 28px",
              }}
            >
              <ul
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
                aria-label="Contact information"
              >
                {INFO_ITEMS.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        background: "rgba(200, 55, 45, 0.08)",
                        border: "1px solid rgba(200, 55, 45, 0.15)",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--red)",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--ink-60)",
                        lineHeight: 1.6,
                        paddingTop: 6,
                      }}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Maps Box (Titan Gym look with google maps placeholder/clean design) */}
            <div
              style={{
                border: "1px solid var(--line)",
                borderRadius: 8,
                overflow: "hidden",
                height: 240,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
                background: "linear-gradient(135deg, #0d0d0d 0%, #111 100%)",
                position: "relative",
              }}
              aria-label="Map — Tashkent, Chilonzor, Bunyodkor street 12"
            >
              {/* Subtle visual grid inside map */}
              <div 
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--red)",
                  color: "var(--ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(200, 55, 45, 0.4)",
                  zIndex: 2,
                }}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: "var(--ink-40)",
                  textTransform: "uppercase",
                  textAlign: "center",
                  padding: "0 20px",
                  zIndex: 2,
                  lineHeight: 1.5
                }}
              >
                Tashkent, Chilonzor
                <br />
                <span style={{ fontSize: 11, fontWeight: 400, color: "var(--ink-25)" }}>Bunyodkor str. 12</span>
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="glass-card"
            style={{
              borderRadius: 16,
              padding: "48px 36px",
            }}
          >
            {submitted ? (
              <div
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  animation: "fadeIn 0.3s ease",
                }}
                role="alert"
                aria-live="polite"
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(200, 55, 45, 0.1)",
                    color: "var(--red)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    color: "var(--ink)",
                    fontWeight: 700,
                  }}
                >
                  {dict.form.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--ink-40)",
                        marginBottom: 8,
                      }}
                    >
                      {dict.form.name} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Ismingizni kiriting"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{
                        width: "100%",
                        background: "var(--surface)",
                        border: "1px solid var(--line)",
                        borderRadius: 6,
                        padding: "12px 16px",
                        color: "var(--ink)",
                        outline: "none",
                        transition: "border-color 0.25s",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--red)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--line)"}
                      aria-required="true"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--ink-40)",
                        marginBottom: 8,
                      }}
                    >
                      {dict.form.phone} *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={{
                        width: "100%",
                        background: "var(--surface)",
                        border: "1px solid var(--line)",
                        borderRadius: 6,
                        padding: "12px 16px",
                        color: "var(--ink)",
                        outline: "none",
                        transition: "border-color 0.25s",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--red)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--line)"}
                      aria-required="true"
                    />
                  </div>

                  {/* Program selection */}
                  <div>
                    <label
                      htmlFor="contact-program"
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--ink-40)",
                        marginBottom: 8,
                      }}
                    >
                      {dict.form.program}
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="contact-program"
                        value={form.program}
                        onChange={(e) => setForm({ ...form, program: e.target.value })}
                        style={{
                          width: "100%",
                          background: "var(--surface)",
                          border: "1px solid var(--line)",
                          borderRadius: 6,
                          padding: "12px 16px",
                          color: "var(--ink)",
                          outline: "none",
                          appearance: "none",
                          cursor: "pointer",
                        }}
                        aria-label={dict.form.program}
                      >
                        <option value="" style={{ background: "#111" }}>Dasturni tanlang</option>
                        <option value="strength" style={{ background: "#111" }}>Kuch Mashqlari</option>
                        <option value="bodybuilding" style={{ background: "#111" }}>Bodibilding</option>
                        <option value="weightloss" style={{ background: "#111" }}>Vazn Yo'qotish</option>
                        <option value="functional" style={{ background: "#111" }}>Funksional Fitnes</option>
                        <option value="crossfit" style={{ background: "#111" }}>Kross Trening</option>
                        <option value="personal" style={{ background: "#111" }}>Shaxsiy Trening</option>
                      </select>
                      <div 
                        style={{
                          position: "absolute",
                          right: 16,
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          color: "var(--ink-40)"
                        }}
                      >
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--ink-40)",
                        marginBottom: 8,
                      }}
                    >
                      {dict.form.message}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Xabaringizni yozing..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{
                        width: "100%",
                        background: "var(--surface)",
                        border: "1px solid var(--line)",
                        borderRadius: 6,
                        padding: "12px 16px",
                        color: "var(--ink)",
                        outline: "none",
                        resize: "vertical",
                        minHeight: 100,
                        transition: "border-color 0.25s",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--red)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--line)"}
                      aria-label={dict.form.message}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="contact-submit-btn"
                    style={{ 
                      width: "100%", 
                      justifyContent: "center", 
                      borderRadius: 6,
                      padding: "16px 24px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      boxShadow: "0 4px 12px rgba(200, 55, 45, 0.25)"
                    }}
                    aria-label={dict.form.submit}
                  >
                    {dict.form.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
