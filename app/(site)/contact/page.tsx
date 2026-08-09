import type { Metadata } from "next";
import ContactForm from "@/app/(site)/contact/ContactForm";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Contact | Fairview Capital",
  description: "Get in touch with Fairview Capital.",
};

export default function ContactPage() {
  const bay = FIRM.offices.greenbrae;
  const pit = FIRM.offices.pittsburgh;

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <div className="fv-contact">
        <header className="fv-contact__intro">
          <h1 className="fv-contact__title">Let&apos;s talk.</h1>
          <p className="fv-contact__lede">
            Tell us where you are. We&apos;ll tell you if we can help — and if
            we can&apos;t, we&apos;ll say so.
          </p>
        </header>

        <div className="fv-contact__split">
          <aside className="fv-contact__aside">
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

            <a href={`mailto:${FIRM.email}`} className="fv-contact__email">
              {FIRM.email}
            </a>
          </aside>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
