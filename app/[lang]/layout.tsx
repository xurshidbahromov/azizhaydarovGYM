import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales, type Locale } from "@/dictionaries";
import "../globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/layout/Navbar";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? (lang as Locale) : ("uz" as Locale);
  const dict = await getDictionary(locale);

  const titles: Record<Locale, string> = {
    uz: "AzizHaydarov GYM — Toshkentning Premium Sport Zali",
    en: "AzizHaydarov GYM — Tashkent's Premium Fitness Center",
    ru: "AzizHaydarov GYM — Премиальный Фитнес-Центр в Ташкенте",
  };

  const descriptions: Record<Locale, string> = {
    uz: "O'rta Osiyodagi eng yaxshi premium sport zali. Professional murabbiylar, zamonaviy jihozlar va individual yondashuv bilan o'zingizning eng kuchli versiyangizga erishing.",
    en: "Central Asia's premier fitness facility. Achieve your strongest version with professional coaches, modern equipment, and a personalized approach.",
    ru: "Ведущий фитнес-центр Центральной Азии. Достигни своей сильнейшей версии с профессиональными тренерами, современным оборудованием и персональным подходом.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    metadataBase: new URL("https://azizhaydarovgym.uz"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "uz": "/uz",
        "en": "/en",
        "ru": "/ru",
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
      locale: locale,
      siteName: "AzizHaydarov GYM",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} style={{ scrollBehavior: "smooth" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollProgress />
        <SmoothScroll />
        <Navbar dict={dict.nav} locale={locale} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
