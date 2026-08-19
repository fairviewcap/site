import type { Metadata } from "next";
import Link from "next/link";
import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import WhyFigures from "@/components/WhyFigures";
import WhyKnowDots from "@/components/WhyKnowDots";
import WhyOneFee from "@/components/WhyOneFee";
import WhyCrisisRail from "@/components/WhyCrisisRail";
import WhyOpener from "@/components/WhyOpener";
import WhyTheme from "@/components/WhyTheme";
import {
  FIRM,
  FIRM_ENTITY,
  firmYearsLabel,
  yearsSinceFoundedWords,
} from "@/lib/firm";
import type { HeroId } from "@/lib/heroes";
import { whyTimeline } from "@/lib/why-fairview";

export function generateMetadata(): Metadata {
  return {
    title: FIRM_ENTITY.whyTitle,
    description: FIRM_ENTITY.blurb,
  };
}

type MediaRatio = "wide" | "tall" | "square" | "bleed" | "full";

function WhyMedia({
  hero,
  label,
  ratio = "wide",
}: {
  hero: HeroId;
  label?: string;
  ratio?: MediaRatio;
}) {
  return (
    <figure className={`fv-why__media fv-why__media--${ratio}`}>
      <div className="fv-why__media-plane">
        <HeroPhoto
          id={hero}
          variant={ratio === "tall" ? "tall" : "wide"}
          imgClassName="fv-hero-photo"
        />
      </div>
      {label ? (
        <figcaption className="fv-why__media-cap">
          <span className="fv-why__media-label">{label}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function WhyFairviewPage() {
  const tenure = `${firmYearsLabel()} years of earning it.`;
  const timeline = whyTimeline();

  return (
    <main className="fv-why-page pt-0">
      <WhyTheme />
      <WhyOpener
        title={tenure}
        lede={
          <>
            We&apos;ve never hired a salesperson, made a cold call, or sold out
            to private equity. The families at Fairview tend to arrive the same
            way: another client sent them—building a $2.14 billion firm owned
            entirely by the advisors who pick up when you call.
          </>
        }
      >
        <div className="fv-why-cine__letter-pair">
          <figure className="fv-why-cine__letter-photo">
            <img
              src="/photography/founder/founder.avif"
              alt="Andrew F. Mathieson, Founder"
              width={228}
              height={286}
              className="fv-hero-photo"
            />
          </figure>
          <div className="fv-why__prose">
            <p>
              In March 1995, with young children, a big mortgage, and a
              belief in a better way, I started Fairview Capital. The
              premise was simple: do our own deep research, give honest
              advice, and put clients first.
            </p>
            <p>
              Over {yearsSinceFoundedWords()} years, as Fairview grew, the
              offers came—private equity firms and aggregators wanting to
              buy us out. We turned those offers down. And just
              last year, rather than cashing out to an outside buyer, we
              helped our long-time team members become partners and buy
              equity in the firm.
            </p>
            <p>
              Fairview is 100% independent and advisor-owned — and we
              intend to keep it that way.
            </p>
            <p className="fv-why__signoff">
              — Andrew F. Mathieson, Founder
            </p>
          </div>
        </div>
      </WhyOpener>

      <article className="fv-why">
        <WhyOneFee />

        <section
          id="research"
          className="fv-why__section fv-why__section--know"
          aria-labelledby="why-research"
        >
          <h2 id="why-research" className="fv-why__h2">
            Most wealth managers
            <br />
            don&apos;t know what they own.
            <br />
            We can name what we own.
          </h2>

          <WhyKnowDots />

          <div className="fv-why__prose">
            <p>
              Most wealth managers are middlemen. They collect a fee to hand
              your capital over to third-party fund managers or computer
              algorithms. We built an in-house research team to do the work
              the old-fashioned way instead.
            </p>
            <p>
              Before we commit a single dollar of your capital, someone in
              this building studies the underlying business: its balance
              sheet, its competitive moat, its management, and what it&apos;s
              actually worth compared to its ticker price. We often track a
              company for years, waiting for the price to make sense.
            </p>
            <p>
              It&apos;s a much slower way to operate than chasing whatever is
              fashionable on Wall Street, but it&apos;s the only way we know
              how to be sure of what we own.
            </p>
            <p>
              We take the same approach to our client list. We limit the
              number of families we work with so we can actually know
              them—not just bill them.
            </p>
          </div>
        </section>

        <WhyFigures />

        <section
          id="timeline"
          className="fv-why__section fv-why__section--timeline"
          aria-labelledby="why-timeline"
        >
          <h2 id="why-timeline" className="fv-why__h2">
            Crises come and go.
            <br />
            We don&apos;t.
          </h2>
          <p className="fv-why__timeline-lede">
            Markets move, headlines change, and Wall Street invents new ways to
            charge fees. Our principles have stayed the same through the
            cycles we have lived.
          </p>

          <WhyCrisisRail timeline={timeline} />
        </section>

        <section
          id="close"
          className="fv-why__section fv-why__section--close"
          aria-labelledby="why-close"
        >
          <h2 id="why-close" className="fv-why__h2">
            We aren&apos;t the right firm for everyone.
          </h2>

          <WhyMedia hero="acceptance" ratio="full" />

          <div className="fv-why__prose">
            <p>
              If you want market predictions, exotic products, or a firm that
              might belong to someone else in five years—there are plenty of
              places for that. We aren&apos;t one of them.
            </p>
          </div>
          <Link href={FIRM.contactHref} className="fv-why__cta">
            Let&apos;s talk
          </Link>
        </section>

        <ContinueBar
          items={[
            {
              href: "/firm/fees",
              prompt: "Want the fee schedule in plain numbers?",
            },
            {
              href: "/team",
              prompt: "Curious who answers when the phone rings?",
            },
            {
              href: "/answers",
              prompt: "Still have questions before you sit down?",
            },
          ]}
        />
      </article>
    </main>
  );
}
