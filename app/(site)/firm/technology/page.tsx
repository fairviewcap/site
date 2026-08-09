import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology | Fairview Capital",
  description:
    "Technology, used well. Relationships come first — tools sharpen the work, they don’t replace judgment.",
};

export default function TechnologyPage() {
  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <article className="fv-tech">
        <header className="fv-tech__intro">
          <p className="fv-tech__eyebrow">Technology</p>
          <h1 className="fv-tech__title">Human. First.</h1>
          <p className="fv-tech__lede">Technology, used well.</p>
        </header>

        {/* Placeholder for candid B&W — people in conversation, not gadgets */}
        <div className="fv-tech__plane" aria-hidden />

        <div className="fv-tech__body">
          <p>
            <strong>At Fairview, relationships come first.</strong> Families
            don&apos;t trust us for our algorithms — they trust us for our
            judgment, our independence, and our ability to listen. That will
            never change.
          </p>
          <p>
            But we also believe in using the best tools available. Technology,
            including AI, can help us run deeper analysis, stress-test more
            scenarios, and give you clearer insight into your financial world.
            It can save time, reduce friction, and make planning more
            transparent.
          </p>
          <p>
            What it cannot do — and what we will never let it do — is replace
            the human connection at the heart of our work. No piece of software
            can understand your values, weigh your trade-offs, or guide your
            family through life&apos;s most personal decisions.
          </p>
          <p>
            So we&apos;ll keep exploring and adopting technology where it adds
            real value. We&apos;ll use it to sharpen our research, strengthen our
            planning, and simplify your experience. But we&apos;ll always hold
            to the same principle we started with in 1995: trust over sales,
            counsel over hype, relationships over transactions.
          </p>
          <p className="fv-tech__close">
            Technology changes. Relationships endure.
          </p>
        </div>
      </article>
    </main>
  );
}
