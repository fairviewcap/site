import { FIRM, FIRM_ENTITY, FIRM_FOUNDED } from "@/lib/firm";

/**
 * Organization + two offices. Search and answer engines read this;
 * the H1 stays the voice.
 */
export default function FirmJsonLd() {
  const bay = FIRM.offices.greenbrae;
  const pit = FIRM.offices.pittsburgh;
  const orgId = `${FIRM.siteUrl}/#organization`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: FIRM.shortName,
        legalName: FIRM.legalName,
        url: FIRM.siteUrl,
        email: FIRM.email,
        foundingDate: String(FIRM_FOUNDED.year),
        description: FIRM_ENTITY.blurb,
        telephone: bay.phoneHref.replace("tel:", ""),
        identifier: [
          { "@type": "PropertyValue", name: "CRD", value: FIRM.crd },
          { "@type": "PropertyValue", name: "SEC", value: FIRM.sec },
        ],
      },
      {
        "@type": ["LocalBusiness", "FinancialService"],
        "@id": `${FIRM.siteUrl}/#greenbrae`,
        name: `${FIRM.shortName} — ${bay.label}`,
        parentOrganization: { "@id": orgId },
        url: `${FIRM.siteUrl}/contact`,
        telephone: bay.phoneHref.replace("tel:", ""),
        email: FIRM.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: bay.lines[0],
          addressLocality: "Greenbrae",
          addressRegion: "CA",
          postalCode: "94904",
          addressCountry: "US",
        },
      },
      {
        "@type": ["LocalBusiness", "FinancialService"],
        "@id": `${FIRM.siteUrl}/#pittsburgh`,
        name: `${FIRM.shortName} — ${pit.label}`,
        parentOrganization: { "@id": orgId },
        url: `${FIRM.siteUrl}/contact`,
        telephone: pit.phoneHref.replace("tel:", ""),
        email: FIRM.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: pit.lines[0],
          addressLocality: "Pittsburgh",
          addressRegion: "PA",
          postalCode: "15215",
          addressCountry: "US",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
