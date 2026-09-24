import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyUs from "@/components/WhyUs";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import { getActiveChannels, getActiveProducts, getSiteInfo } from "@/lib/data";
import { siteUrl } from "@/lib/site";

// ดึงข้อมูลล่าสุดจากฐานข้อมูลทุกครั้ง — แก้ในหลังบ้านแล้วเห็นผลทันที
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo();
  const title = `${site.name} | ยากำจัดวัชพืช ปุ๋ย ฮอร์โมนพืช และอุปกรณ์การเกษตรครบวงจร`;
  return {
    title: { absolute: title },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    openGraph: {
      type: "website",
      locale: "th_TH",
      url: "/",
      siteName: site.name,
      title,
      description: site.description,
    },
    twitter: { card: "summary_large_image", title, description: site.description },
  };
}

export default async function Home() {
  const [site, products, channels] = await Promise.all([
    getSiteInfo(),
    getActiveProducts(),
    getActiveChannels(),
  ]);

  // Structured data ให้ Google เข้าใจว่าเป็นร้านค้าเกษตรในพื้นที่
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: site.name,
    description: site.description,
    url: siteUrl,
    telephone: site.phone,
    address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "TH" },
    sameAs: channels.map((c) => c.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "สินค้าแนะนำ",
      itemListElement: products.map((p) => ({
        "@type": "Offer",
        priceCurrency: "THB",
        price: p.price,
        itemOffered: {
          "@type": "Product",
          name: p.name,
          category: p.category,
          description: p.description,
          ...(p.image && { image: new URL(p.image, siteUrl).toString() }),
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // escape "<" กันข้อความจากหลังบ้านปิดแท็ก script ก่อนเวลา
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar siteName={site.name} phone={site.phone} />
      <main>
        <Hero hours={site.hours} />
        <FeaturedProducts products={products} channels={channels} />
        <WhyUs />
        <SocialLinks channels={channels} />
      </main>
      <Footer site={site} channels={channels} />
    </>
  );
}
