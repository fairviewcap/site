import type { Metadata } from "next";
import Link from "next/link";
import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import LinkArrow from "@/components/LinkArrow";
import OwnershipDiagram from "@/components/OwnershipDiagram";
import WhyResearchBook from "@/components/WhyResearchBook";
import { FIGURES, formatAsOf } from "@/lib/figures";
import { FIRM } from "@/lib/firm";
import type { HeroId } from "@/lib/heroes";
import { WHY_FIGURES, WHY_TIMELINE } from "@/lib/why-fairview";

export const metadata: Metadata = {
  title: "Why Fairview | Fairview Capital",
  description:
    "Thirty years of doing it the long way. We've never hired a salesperson, made a cold call, or sold out to private equity.",
};

type MediaRatio = "wide" | "tall" | "square";

function WhyMedia({
  hero,
  label,
  ratio = "wide",
}: {
  hero: HeroId;
  label: string;
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
      <figcaption className="fv-why__media-cap">
        <span className="fv-why__media-label">{label}</span>
      </figcaption>
    </figure>
  );
}

export default function WhyFairviewPage() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <header className="fv-why-hero">
        <div className="fv-why-hero__mast">
          <p className="fv-why__eyebrow">Why Fairview</p>
          <h1 className="fv-why__title">
            Thirty years of doing it the long way.
          </h1>
          <p className="fv-why__lede">
            We&apos;ve never hired a salesperson, made a cold call, or sold out
            to private equity. Every family at Fairview came because another
            client sent them—building a $2.14 billion firm owned entirely by the
            advisors who pick up when you call.
          </p>
          <a className="fv-why__readon" href="#letter">
            Read on
            <LinkArrow direction="down" size={14} />
          </a>
        </div>

        <figure className="fv-why-hero__media">
          <div className="fv-why-hero__plane">
            <HeroPhoto id="acceptance" priority imgClassName="fv-hero-photo" />
          </div>
        </figure>
      </header>

      <div className="fv-frame pt-12 pb-20 sm:pt-16 sm:pb-28">
        <article className="fv-why">
          <section
            id="letter"
            className="fv-why__section fv-why__section--first"
            aria-labelledby="why-letter"
          >
          <h2 id="why-letter" className="fv-why__h2">
            Every firm has a founding story. Most of them are marketing.
          </h2>

          <div className="fv-why__letter">
            <WhyMedia hero="firsthome" label="Starting out" ratio="tall" />
            <div className="fv-why__prose">
              <p>
                In March 1995, with young children, a big mortgage, and a
                conviction that Wall Street was charging too much for bad
                advice, I started Fairview Capital in Marin County.
              </p>
              <p>
                We&apos;ve never hired a salesperson, and we&apos;ve never made
                a cold call. Every family at Fairview came because another
                client sent them. Thirty years of doing things that way got us
                to $2.14 billion.
              </p>
              <p>
                A few years ago, as large conglomerates began buying up
                independent advisory firms across the country, we faced a
                choice. We could have sold out for a large check and let a
                remote board decide how to treat our clients. Instead, I did
                the opposite. I handed ownership of the firm over to the
                advisors working right here in our office—the same people who
                answer your calls and know your family&apos;s goals.
              </p>
              <p>
                The sign on the door didn&apos;t change, and neither did the
                way we manage money. That was the whole point.
              </p>
              <p className="fv-why__signoff">
                — Andrew F. Mathieson, Founder
              </p>
            </div>
          </div>
        </section>

        <section
          id="ownership"
          className="fv-why__section"
          aria-labelledby="why-ownership"
        >
          <h2 id="why-ownership" className="fv-why__h2">
            One fee.
            <br />
            One boss.
          </h2>
          <div className="fv-why__prose">
            <p>
              We charge one fee based on the assets we manage for you. No
              commissions for steering you into specific investments, no
              shareholders asking why margins weren&apos;t higher this quarter.
            </p>
            <p>
              That&apos;s not corporate altruism—it&apos;s simple arithmetic.
              When the people managing your money own the firm, they don&apos;t
              need to squeeze the client to hit a quarterly target.
            </p>
          </div>

          <OwnershipDiagram />

          <div className="fv-why__prose">
            <p>
              It also means the advisor who builds your portfolio today is
              often the same one reviewing it with your kids fifteen years from
              now — and that your whole family&apos;s assets sit under one fee,
              not billed account by account like six separate relationships.
            </p>
          </div>
        </section>

        <section
          id="research"
          className="fv-why__section"
          aria-labelledby="why-research"
        >
          <h2 id="why-research" className="fv-why__h2">
            Most wealth managers don&apos;t know what they own. We do.
          </h2>

          <WhyMedia
            hero="sellbusiness"
            label="The underlying business"
            ratio="wide"
          />

          <div className="fv-why__research">
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
            <WhyResearchBook />
          </div>
        </section>

        <section
          id="numbers"
          className="fv-why__section fv-why__section--figures"
          aria-labelledby="why-numbers"
        >
          <header className="fv-why__figures-mast">
            <p className="fv-why__figures-eyebrow">The record</p>
            <h2 id="why-numbers" className="fv-why__h2">
              The numbers, not the adjectives.
            </h2>
            {FIGURES.aum.asOf ? (
              <p className="fv-why__figures-asof">
                {formatAsOf(FIGURES.aum.asOf)}
              </p>
            ) : null}
          </header>
          <dl className="fv-why__figures">
            {WHY_FIGURES.map((fig, i) => (
              <div key={fig.label} className="fv-why__figure">
                <span className="fv-why__figure-idx" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="fv-why__figure-value fv-nums">{fig.value}</dt>
                <dd className="fv-why__figure-label">{fig.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="timeline"
          className="fv-why__section fv-why__section--timeline"
          aria-labelledby="why-timeline"
        >
          <h2 id="why-timeline" className="fv-why__h2">
            Crises come and go. We don&apos;t.
          </h2>
          <p className="fv-why__timeline-lede">
            Markets move, headlines change, and Wall Street invents new ways to
            charge fees. Our principles have remained identical through every
            cycle.
          </p>

          <ol className="fv-why__rail">
            {WHY_TIMELINE.map((entry) => (
              <li key={entry.when} className="fv-why__card">
                <figure className="fv-why__card-figure">
                  <div className="fv-why__card-plate">
                    <img
                      src={entry.photo}
                      alt=""
                      width={1600}
                      height={2000}
                      className="fv-why__card-art"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="fv-why__card-copy">
                    <p className="fv-why__card-when">
                      <span className="fv-why__card-year fv-nums">
                        {entry.when}
                      </span>
                      {entry.era ? (
                        <span className="fv-why__card-era">{entry.era}</span>
                      ) : null}
                    </p>
                    <p className="fv-why__card-what">{entry.what}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="close"
          className="fv-why__section fv-why__section--close"
          aria-labelledby="why-close"
        >
          <h2 id="why-close" className="fv-why__h2">
            We aren&apos;t the right firm for everyone.
          </h2>

          <div className="fv-why__prose">
            <p>
              If you want market predictions, exotic products, or a firm that
              might belong to someone else in five years—there are plenty of
              places for that. We aren&apos;t one of them.
            </p>
            <p>
              If you want one fee, one boss, and an advisor who plans to still
              answer when your children inherit the account—we&apos;re easy to
              reach.
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
      </div>
    </main>
  );
}
