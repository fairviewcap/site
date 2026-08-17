import type { Metadata } from "next";
import ContactForm from "@/app/(site)/contact/ContactForm";
import ContinueBar from "@/components/ContinueBar";
import PageEnter from "@/components/PageEnter";
import { FIRM } from "@/lib/firm";
import { HEROES } from "@/lib/heroes";

export const metadata: Metadata = {
  title: "Contact | Fairview Capital",
  description: "Get in touch with Fairview Capital.",
};

export default function ContactPage() {
  const bay = FIRM.offices.greenbrae;
  const pit = FIRM.offices.pittsburgh;

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <PageEnter>
        <div className="fv-contact">
          <header className="fv-contact__intro" data-enter="0">
            <p className="fv-contact__eyebrow">Contact</p>
            <h1 className="fv-contact__title">Let&apos;s talk.</h1>
            <p className="fv-contact__lede">
              Tell us where you are. We&apos;ll tell you if we can help — and
              if we can&apos;t, we&apos;ll say so.
            </p>
          </header>

          <div data-enter="1">
            <ContactForm />
          </div>

          <aside
            className="fv-contact__aside"
            aria-label="Offices"
            data-enter="2"
          >
            <a href={`mailto:${FIRM.email}`} className="fv-contact__email">
              {FIRM.email}
            </a>

            <div className="fv-contact__office">
              <h2 className="fv-contact__office-name">
                San Francisco Bay Area
              </h2>
              <p className="fv-contact__address">
                {bay.lines[0]}
                <br />
                {bay.lines[1]}
              </p>
              <a href={bay.phoneHref} className="fv-contact__phone">
                {bay.phone}
              </a>
            </div>

            <div className="fv-contact__office">
              <h2 className="fv-contact__office-name">{pit.label}</h2>
              <p className="fv-contact__address">
                {pit.lines[0]}
                <br />
                {pit.lines[1]}
              </p>
              <a href={pit.phoneHref} className="fv-contact__phone">
                {pit.phone}
              </a>
            </div>
          </aside>

          <figure className="fv-contact__media" data-enter="3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HEROES.community.desktop}
              alt={HEROES.community.alt}
              width={2400}
              height={1200}
              className="fv-contact__img"
              decoding="async"
            />
          </figure>

          <div data-enter="4">
            <ContinueBar
              items={[
                {
                  href: "/firm/why-fairview",
                  prompt: "Want the longer story of how we work?",
                },
                {
                  href: "/firm/fees",
                  prompt: "Prefer to see the fee schedule first?",
                },
                {
                  href: "/team",
                  prompt: "Curious who you'd be talking to?",
                },
              ]}
            />
          </div>
        </div>
      </PageEnter>
    </main>
  );
}
