import Link from "next/link";
import TeamRail from "@/components/TeamRail";
import { FIGURES, formatAsOf } from "@/lib/figures";
import { FIRM } from "@/lib/firm";

/**
 * Centered mast → wide plane → centered prose → team rail.
 */
export default function Home() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <section className="fv-hero">
        <div className="fv-hero__mast">
          <h1 className="fv-hero__title">Wealth, Originally.</h1>
          <p className="fv-hero__sub">
            Before it meant money, &ldquo;wealth&rdquo; meant well-being — from
            the Old English <em>weal</em>, the same root as commonwealth. We
            never redefined it.
          </p>
          <Link href={FIRM.contactHref} className="fv-hero__cta">
            Let&apos;s talk
          </Link>
        </div>

        <div className="fv-hero__media" aria-hidden />
      </section>

      <div className="fv-frame">
        <section className="fv-home-prose">
          <p>
            Independently owned since{" "}
            <span className="tabular-nums">{FIGURES.established.value}</span>{" "}
            — and, as of{" "}
            <span className="tabular-nums">{FIGURES.partnerOwned.value}</span>,
            owned outright by the partners who run it, not a buyer.{" "}
            <span className="tabular-nums">{FIGURES.aum.value}</span> under
            management
            {FIGURES.aum.asOf ? (
              <span className="fv-home-prose__meta">
                {" "}
                · {formatAsOf(FIGURES.aum.asOf)}
              </span>
            ) : null}
            .
          </p>

          <p>
            Learn about the{" "}
            <Link href="/firm/why-fairview">firm</Link>, how{" "}
            <Link href="/firm/fees">fees</Link> work, answers to{" "}
            <Link href="/firm/answers">common questions</Link>, and the{" "}
            <Link href="/team">people</Link> you&apos;ll work with. When
            you&apos;re ready, <Link href={FIRM.contactHref}>get in touch</Link>
            .
          </p>
        </section>

        <div className="mt-14 sm:mt-16 pb-20 sm:pb-28">
          <TeamRail />
        </div>
      </div>
    </main>
  );
}
