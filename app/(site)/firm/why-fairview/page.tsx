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
  const timeline = whyTimeline();

  return (
    <main className="fv-why-page pt-0">
      <WhyTheme />
      <WhyOpener
        title="Over thirty years of earning trust."
        lede={
          <>
            We&apos;ve always believed our services should be bought, not sold.
            Families find us in a few familiar ways: through a client, a trusted
            professional like their attorney or CPA, or someone on our team. And
            the firm is still owned by the people who run it.
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
              offers came. Private equity firms and aggregators wanting to
              buy us out. We turned those offers down. And just
              last year, rather than cashing out to an outside buyer, we
              helped our long-time team members become partners and buy
              equity in the firm.
            </p>
            <p>
              Fairview is 100% independent and advisor-owned. And we
              intend to keep it that way.
            </p>
            <p className="fv-why__signoff">
              Andrew F. Mathieson, Founder
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
            A portfolio you can
            <br />
            actually understand.
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
              them. Not just bill them.
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
              And we&apos;d rather tell you that up front. Tell us what
              you&apos;re looking for. If we&apos;re not the right fit,
              we&apos;ll say so, and help you find someone who is.
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
