import Image from "next/image";
import ContinueBar from "@/components/ContinueBar";
import TeamRail from "@/components/TeamRail";
import { FIGURES } from "@/lib/figures";
import { FIRM } from "@/lib/firm";

/**
 * Home — mast → plane → directory → team rail.
 */
export default function Home() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <section className="fv-hero">
        <div className="fv-hero__mast">
          <h1 className="fv-hero__title">
            Most firms answer to a board, a bank, or a buyer. Ours answers to
            the phone ringing.
          </h1>
          <p className="fv-hero__sub">
            When a firm serves outside owners, they have two mouths to feed:
            their shareholders and you. Guess who gets fed first. We built
            Fairview so we only have one boss. You.
          </p>
          <p className="fv-hero__proof">
            We started Fairview in{" "}
            <span className="fv-nums">{FIGURES.established.value}</span>.
            Thirty-one years later, the people who run the firm own all of it.{" "}
            <span className="fv-nums">{FIGURES.aum.value}</span> under
            management, as of March 2026.
          </p>
        </div>

        <div className="fv-hero__media">
          <Image
            src="/home/hero-grand-with-kids.jpg"
            alt="A grandmother sharing a quiet moment with children across a wooden ledge."
            fill
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 1099px) 92vw, 1200px"
            className="fv-hero__img"
          />
        </div>
      </section>

      <div className="fv-frame pb-20 sm:pb-28">
        <div className="fv-home-dir">
          <ContinueBar
            label="Start here"
            items={[
              {
                href: "/firm/why-fairview",
                prompt: "Why Fairview",
              },
              {
                href: "/firm/fees",
                prompt: "What you pay, in plain numbers",
              },
              {
                href: "/work/wealth-management",
                prompt: "How we actually manage your money",
              },
              {
                href: "/firm/answers",
                prompt: "Questions, answered straight",
              },
              {
                href: "/team",
                prompt: "Who picks up",
              },
              {
                href: FIRM.contactHref,
                prompt: "When you're ready, we're easy to reach",
              },
            ]}
          />
        </div>

        <div className="fv-home-rail">
          <TeamRail />
        </div>
      </div>
    </main>
  );
}
