"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/dictionaries";

interface Props {
  currentLocale: Locale;
}

const FLAG: Record<Locale, string> = { uz: "🇺🇿", en: "🇬🇧", ru: "🇷🇺" };
const LABEL: Record<Locale, string> = { uz: "UZ", en: "EN", ru: "RU" };

export default function LanguageSwitcher({ currentLocale }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const switchLocale = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPath = segments.join("/") || "/";
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    router.push(newPath);
    setOpen(false);
  };

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onOutsideClick);
    return () => document.removeEventListener("click", onOutsideClick);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button
        onClick={() => setOpen(!open)}
        id="lang-switcher-btn"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Switch language"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          background: open ? "rgba(255,255,255,0.08)" : "transparent",
          border: "1px solid var(--line)",
          borderRadius: "4px",
          color: "var(--ink)",
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        <span aria-hidden="true">{FLAG[currentLocale]}</span>
        <span>{LABEL[currentLocale]}</span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
            opacity: 0.6,
          }}
        >
          <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language options"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: "rgba(10,10,10,0.95)",
            border: "1px solid var(--line)",
            borderRadius: "6px",
            overflow: "hidden",
            minWidth: "110px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            zIndex: 1100,
          }}
        >
          {locales.map((locale) => (
            <button
              key={locale}
              role="option"
              aria-selected={locale === currentLocale}
              onClick={() => switchLocale(locale)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "10px 14px",
                background: locale === currentLocale ? "rgba(200, 55, 45, 0.08)" : "transparent",
                border: "none",
                color: locale === currentLocale ? "var(--ink)" : "var(--ink-60)",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
                textAlign: "left",
                borderLeft: locale === currentLocale ? "2px solid var(--red)" : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (locale !== currentLocale) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--ink)";
                }
              }}
              onMouseLeave={(e) => {
                if (locale !== currentLocale) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--ink-60)";
                }
              }}
            >
              <span>{FLAG[locale]}</span>
              <span>{LABEL[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
