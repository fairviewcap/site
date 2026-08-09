import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Fairview Capital",
  description:
    "We don’t discuss who our clients are without explicit permission. Your privacy is always protected.",
};

function FingerprintMark() {
  return (
    <svg
      className="fv-privacy__mark"
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M32 10c-9.4 0-17 7.6-17 17v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 6c-11.6 0-21 9.4-21 21v14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 14c-7.2 0-13 5.8-13 13v18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 18c-5 0-9 4-9 9v22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 22c-2.8 0-5 2.2-5 5v28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 22c2.8 0 5 2.2 5 5v20c0 6 3.5 9 8 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M41 27c0-5-4-9-9-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M45 31c0-7.2-5.8-13-13-13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M49 35c0-9.4-7.6-17-17-17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M53 41c0-11.6-9.4-21-21-21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 42c0 12 6 22 14 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 48c1.5 9 6.5 16.5 13 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M23 52c2 7 6 12.5 9 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M45 48c-1 8-5 15-10 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M49 44c-1.5 11-7 20-14 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PrivacyPage() {
  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <div className="fv-privacy">
        <div className="fv-privacy__statement">
          <p className="fv-privacy__eyebrow">Privacy</p>
          <FingerprintMark />
          <h1 className="fv-privacy__title">
            Privacy is not
            <br />
            optional.
          </h1>
        </div>

        <div className="fv-privacy__body">
          <p>
            We don&apos;t discuss who our clients are without explicit
            permission. Even when we work with multiple generations of the same
            family, each relationship is treated as its own — information is
            never shared unless you ask us to.
          </p>
          <p>
            We understand that financial matters are inherently sensitive.
            That&apos;s why we safeguard your personal and financial information
            with the same rigor we safeguard your wealth.
          </p>
          <p className="fv-privacy__close">
            Simple, discreet, and unwavering: your privacy is always protected.
          </p>
        </div>
      </div>
    </main>
  );
}
