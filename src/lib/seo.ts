import type { Metadata } from "next";
import { site } from "@/content/site";
import { plans } from "@/content/plans";

export const baseUrl = site.url;

/** Page metadata helper so every route gets consistent OG and Twitter tags. */
export function pageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = new URL(path, baseUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images: ["/og.png"],
    },
  };
}

/**
 * LocalBusiness schema. Aruba is the location, and the maintenance plans
 * are exposed as offers so they can show up as products in search.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#studio`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: baseUrl,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    foundingDate: site.founded,
    image: `${baseUrl}/og.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { "@type": "Country", name: "Aruba" },
      { "@type": "Country", name: "Curacao" },
      { "@type": "Country", name: "Bonaire" },
      { "@type": "Place", name: "Remote, worldwide" },
    ],
    availableLanguage: site.languages,
    knowsLanguage: site.languages,
    openingHours: "Mo-Fr 08:00-17:00",
    makesOffer: plans.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} maintenance plan`,
      description: plan.pitch,
      price: plan.price,
      priceCurrency: plan.currency,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price,
        priceCurrency: plan.currency,
        unitCode: "MON",
        billingDuration: 1,
      },
    })),
  };
}
