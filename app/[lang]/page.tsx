import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import Coaches from "@/components/sections/Coaches";
import Facilities from "@/components/sections/Facilities";
import Transformations from "@/components/sections/Transformations";
import Membership from "@/components/sections/Membership";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict.hero} locale={locale} />
      <Stats dict={dict.stats} />
      <About dict={dict.about} />
      <Programs dict={dict.programs} />
      <Coaches dict={dict.coaches} />
      <Facilities dict={dict.facilities} />
      <Transformations dict={dict.transformations} />
      <Membership dict={dict.membership} />
      <Gallery dict={dict.gallery} />
      <Contact dict={dict.contact} />
      <Footer dict={dict.footer} nav={dict.nav} locale={locale} />
    </>
  );
}
