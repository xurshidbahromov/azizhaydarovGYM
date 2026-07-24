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
    uz: "AZIZ HAYDAROV GYM — Toshkentning Premium Sport Zali",
    en: "AZIZ HAYDAROV GYM — Toshkentning Premium Sport Zali",
    ru: "AZIZ HAYDAROV GYM — Toshkentning Premium Sport Zali",
  };

  const descriptions: Record<Locale, string> = {
    uz: "O'rta Osiyodagi eng yaxshi premium sport zali. Professional murabbiylar, zamonaviy jihozlar va individual yondashuv bilan o'zingizning eng kuchli versiyangizga erishing.",
    en: "O'rta Osiyodagi eng yaxshi premium sport zali. Professional murabbiylar, zamonaviy jihozlar va individual yondashuv bilan o'zingizning eng kuchli versiyangizga erishing.",
    ru: "O'rta Osiyodagi eng yaxshi premium sport zali. Professional murabbiylar, zamonaviy jihozlar va individual yondashuv bilan o'zingizning eng kuchli versiyangizga erishing.",
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
      siteName: "AZIZ HAYDAROV GYM",
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
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" }
      ],
      shortcut: "/icon.svg",
      apple: "/icon.svg",
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
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
