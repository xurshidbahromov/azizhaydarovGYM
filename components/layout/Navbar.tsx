"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/dictionaries";

interface NavDict {
  home: string; about: string; programs: string; coaches: string;
  facilities: string; membership: string; gallery: string;
  contact: string; joinNow: string;
}

const LINKS = [
  { key: "about",      href: "#about" },
  { key: "programs",   href: "#programs" },
  { key: "coaches",    href: "#coaches" },
  { key: "membership", href: "#membership" },
  { key: "contact",    href: "#contact" },
];

export default function Navbar({ dict, locale }: { dict: NavDict; locale: Locale }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]    = useState(false);
  const [activeKey, setActiveKey]  = useState<string>("about");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`navbar${scrolled ? " scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          {/* Logo Island */}
          <Link
            href={`/${locale}`}
            aria-label="AzizHaydarov GYM — Home"
            className="nav-island"
            style={{ 
              padding: "10px 24px", 
              display: "flex", 
              alignItems: "center", 
              gap: 12, 
              textDecoration: "none",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              {/* Sharp minimal A */}
              <path d="M3 20L9.5 4L16 20" stroke="var(--red)" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
              <path d="M6 14H13" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="square" />
              {/* Sharp minimal H */}
              <path d="M17 6V20M21 6V20M17 13H21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" />
            </svg>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--ink)",
            }}>
              AZIZ HAYDAROV <span style={{ color: "var(--red)" }}>GYM</span>
            </span>
          </Link>

          {/* Desktop Links Island */}
          <div
            className="nav-island hide-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 8px",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
            }}
            role="menubar"
          >
            {LINKS.map(l => {
              const isActive = activeKey === l.key;
              return (
                <a
                  key={l.key}
                  href={l.href}
                  role="menuitem"
                  onClick={() => setActiveKey(l.key)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: isActive ? 700 : 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: isActive ? "#ffffff" : "var(--ink-40)",
                    background: isActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
                    padding: "8px 20px",
                    borderRadius: 30,
                    transition: "all 0.25s var(--ease)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--ink)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--ink-40)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {dict[l.key as keyof NavDict]}
                </a>
              );
            })}
          </div>

          {/* Right Action Island */}
          <div 
            className="nav-island"
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 10, 
              padding: "5px 6px",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
            }}
          >
            <a
              href="#contact"
              className="btn btn-primary hide-mobile"
              style={{ 
                fontSize: 11, 
                padding: "10px 24px", 
                borderRadius: 50,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--red)",
                border: "1px solid var(--red)"
              }}
              aria-label={dict.joinNow}
            >
              {dict.joinNow}
              <span style={{ fontSize: 13, lineHeight: 1 }}>→</span>
            </a>

            {/* Hamburger / Animated Close Toggle */}
            <button
              className="hide-desktop"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{ 
                width: 38, 
                height: 38, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                background: "none", 
                border: "none",
                cursor: "pointer",
                padding: 0,
                position: "relative",
              }}
            >
              <div style={{ position: "relative", width: 20, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Top line */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 20,
                    height: 1.5,
                    background: "var(--ink)",
                    borderRadius: 1,
                    top: menuOpen ? "8.25px" : "1px",
                    transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                {/* Middle line */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 20,
                    height: 1.5,
                    background: "var(--ink)",
                    borderRadius: 1,
                    top: "8.25px",
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                {/* Bottom line */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 20,
                    height: 1.5,
                    background: "var(--ink)",
                    borderRadius: 1,
                    top: menuOpen ? "8.25px" : "15.5px",
                    transform: menuOpen ? "rotate(-45deg)" : "rotate(0deg)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(10, 10, 10, 0.92)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 32,
            padding: "80px 24px 40px",
            animation: "fadeIn 0.25s ease",
          }}
        >
          {LINKS.map(l => (
            <a
              key={l.key}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 36,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "var(--ink)",
                transition: "color 0.2s, transform 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "var(--red)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.transform = "none";
              }}
            >
              {dict[l.key as keyof NavDict]}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary"
            style={{
              marginTop: 16,
              fontSize: 12,
              padding: "16px 40px",
              borderRadius: 50,
              background: "var(--red)",
              boxShadow: "0 8px 30px rgba(200, 55, 45, 0.4)",
            }}
          >
            {dict.joinNow} →
          </a>
        </div>
      )}
    </>
  );
}
