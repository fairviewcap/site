import type { Metadata } from "next";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Privacy Policy | Fairview Capital",
  description:
    "How Fairview Capital Investment Management, LLC collects, uses, and shares personal information.",
};

const TOC = [
  { id: "collect", label: "Personal Information We Collect" },
  { id: "use", label: "How We Use Your Personal Information" },
  { id: "share", label: "How We Share Your Personal Information" },
  { id: "choices", label: "Your Choices" },
  { id: "other-sites", label: "Other Sites, Mobile Applications, and Services" },
  { id: "security", label: "Security Practices" },
  { id: "transfers", label: "International Data Transfers" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes to this Privacy Policy" },
  { id: "financial", label: "Financial Privacy Notice" },
  { id: "contact", label: "How to Contact Us" },
] as const;

export default function PrivacyPolicyPage() {
  const bay = FIRM.offices.greenbrae;

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <article className="fv-policy">
        <header className="fv-policy__intro">
          <p className="fv-policy__eyebrow">Legal</p>
          <h1 className="fv-policy__title">Privacy Policy</h1>
          <p className="fv-policy__effective">
            Effective as of June 30, 2021.
          </p>
          <p className="fv-policy__lede">
            This Privacy Policy describes how {FIRM.legalName} (“Fairview
            Capital”, “we”, “us”, or “our”) collects, uses, and shares your
            personal information if you visit fairviewcap.com or our other
            websites or services that link to this Privacy Policy (collectively,
            the “Services”), contact us, receive our communications or attend
            our events.
          </p>
          <p className="fv-policy__callout">
            This Privacy Policy does not address the personal financial
            information that we receive from our clients. See our{" "}
            <a
              href={FIRM.disclosures.formAdv}
              target="_blank"
              rel="noopener noreferrer"
            >
              Form ADV
            </a>{" "}
            for our privacy
            policy with respect to client information. You can learn more about
            how we use and protect your personal financial information by
            contacting us at{" "}
            <a href={bay.phoneHref}>{bay.phone}</a>.
          </p>
        </header>

        <nav className="fv-policy__toc" aria-label="Table of contents">
          <p className="fv-policy__toc-label">Table of Contents</p>
          <ol className="fv-policy__toc-list">
            {TOC.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="collect" className="fv-policy__section">
          <h2>Personal Information We Collect</h2>

          <h3>Information you provide to us</h3>
          <p>
            Personal information you provide to us through the Services may
            include:
          </p>
          <ul>
            <li>
              <strong>Contact information</strong>, such as your first and last
              name, email address, phone number, and any information you give us
              through the contact us function on the website.
            </li>
            <li>
              <strong>Profile information</strong>, such as your username and
              password and any account preferences for the Services.
            </li>
            <li>
              <strong>Feedback or correspondence</strong>, such as information
              you provide when you contact us with questions, feedback, or
              otherwise correspond with us.
            </li>
            <li>
              <strong>Usage information</strong>, such as information about how
              you use the Services and interact with us, including information
              you provide when you use any interactive features of the Services.
            </li>
            <li>
              <strong>Marketing information</strong>, such as your preferences
              for receiving communications about our products, activities, and
              publications, and details about how you engage with our
              communications.
            </li>
            <li>
              <strong>Other information</strong> that we may collect which is
              not specifically listed here, but which we will use in accordance
              with this Privacy Policy or as otherwise disclosed at the time of
              collection.
            </li>
          </ul>

          <h3>Information we obtain from social media platforms</h3>
          <p>
            We maintain a LinkedIn page. When you visit or interact with our
            page on LinkedIn, the platform provider’s privacy policy will apply
            to your interactions and their collection, use, and processing of
            your personal information. You or LinkedIn may provide us with
            information through the platform, and we will treat such information
            in accordance with this Privacy Policy.
          </p>
          <p>
            You can read more about your privacy choices for social media
            networks and other third‐party platforms below.
          </p>

          <h3>Information we obtain from other third parties</h3>
          <p>
            We may receive personal information about you from third‐party
            sources, such as marketing partners, publicly‐available sources, and
            data providers.
          </p>

          <h3 id="cookies">Cookies and Other Information Collected by Automated Means</h3>
          <p>
            We, our service providers (such as WordPress and Google), and our
            business partners may automatically log information about you, your
            computer or mobile device, and activity occurring on or through the
            Services. The information that may be collected automatically
            includes your computer or mobile device operating system type and
            version number, manufacturer and model; device identifier; browser
            type; screen resolution; IP address; the website you visited before
            browsing to our website; general location information such as city,
            state or geographic area; and information about your use of and
            actions on the Services, such as pages or screens you viewed, how
            long you spent on a page or screen, navigation paths between pages
            or screens, information about your activity on a page or screen,
            access times, and length of access. Our service providers and
            business partners may collect this type of information over time and
            across third-party websites and mobile applications.
          </p>
          <p>
            See{" "}
            <a href="#choices">Your Choices</a> for information about
            controlling cookies and similar technologies.
          </p>
        </section>

        <section id="use" className="fv-policy__section">
          <h2>How We Use Your Personal Information</h2>
          <p>
            We use your personal information for the following purposes and as
            otherwise described in this Privacy Policy or at the time of
            collection:
          </p>

          <h3>To operate the Services</h3>
          <p>We use your personal information to:</p>
          <ul>
            <li>provide, operate, and improve the Services;</li>
            <li>establish and maintain your user profile on the Services;</li>
            <li>
              communicate with you about the Services, including by sending you
              announcements, updates, security alerts, and support and
              administrative messages;
            </li>
            <li>
              understand your interests and personalize your experience with the
              Services;
            </li>
            <li>provide support and maintenance for the Services; and</li>
            <li>respond to your requests, questions and feedback.</li>
          </ul>

          <h3>For research and development</h3>
          <p>
            We analyze use of the Services to improve the Services and to develop
            new products and services.
          </p>

          <h3>To send you marketing and promotional communications</h3>
          <p>
            We may send you marketing communications as permitted by law. You
            can opt out of our marketing and promotional communications as
            described below.
          </p>

          <h3>To comply with law</h3>
          <p>
            We use your personal information as we believe necessary or
            appropriate to comply with applicable laws, lawful requests, and
            legal process, such as to respond to subpoenas or requests from
            government authorities.
          </p>

          <h3>For compliance, fraud prevention, and safety</h3>
          <p>
            We may use your personal information and disclose it to law
            enforcement, government authorities, and private parties as we
            believe necessary or appropriate to: (a) protect our, your, or
            others’ rights, privacy, safety, or property (including by making
            and defending legal claims); (b) enforce the terms and conditions
            that govern the Services; and (c) protect, investigate, and deter
            against fraudulent, harmful, unauthorized, unethical, or illegal
            activity.
          </p>

          <h3>With your consent</h3>
          <p>
            In some cases we may specifically ask for your consent to collect,
            use, or share your personal information, such as when required by
            law.
          </p>

          <h3>To create anonymous data</h3>
          <p>
            We may create aggregated and other anonymous data from your personal
            information and other individuals whose personal information we
            collect. We make personal information into anonymous data by
            removing information that makes the data personally identifiable to
            you. We may use this anonymous data and share it with third parties
            for our lawful business purposes, including to analyze and improve
            the Services and promote our business.
          </p>
        </section>

        <section id="share" className="fv-policy__section">
          <h2>How We Share Your Personal Information</h2>
          <p>
            We do not share your personal information with third parties without
            your consent, except in the following circumstances or as otherwise
            described in this Privacy Policy:
          </p>

          <h3>Service providers</h3>
          <p>
            We may share your personal information with third‐party companies
            and individuals that provide services on our behalf or help us
            operate the Services (such as customer support, hosting providers
            such as WordPress, analytics providers such as Google&apos;s Tag
            Manager, email delivery, marketing, and database management
            services). These third parties may use your personal information
            only as authorized by their contracts with us.
          </p>

          <h3>Partners</h3>
          <p>
            We may sometimes share your personal information with business
            partners or enable them to collect information directly via our
            Services. See{" "}
            <a href="#cookies">
              Cookies and Other Information Collected by Automated Means
            </a>{" "}
            for more information about third parties that collect information
            through our Services with cookies and similar technologies.
          </p>

          <h3>Professional advisors</h3>
          <p>
            We may disclose your personal information to professional advisors,
            such as lawyers, bankers, auditors, and insurers, where necessary in
            the course of the professional services that they render to us.
          </p>

          <h3>For compliance, fraud prevention and safety</h3>
          <p>
            We may share your personal information for the compliance, fraud
            prevention and safety purposes described above.
          </p>

          <h3>Business transfers</h3>
          <p>
            We may sell, transfer, or otherwise share some or all of our
            business or assets, including your personal information, in
            connection with a (potential) business transaction such as a
            corporate divestiture, merger, consolidation, acquisition,
            reorganization or sale of assets, or in the event of bankruptcy or
            dissolution.
          </p>
        </section>

        <section id="choices" className="fv-policy__section">
          <h2>Your Choices</h2>
          <p>
            In this section, we describe the rights and choices available to all
            users.
          </p>

          <h3>Access or update your information</h3>
          <p>
            If you have registered for an account with us, you may review and
            update certain personal information in your account profile by
            logging into your account.
          </p>

          <h3>Opt out of marketing communications</h3>
          <p>
            You may opt out of marketing emails by following the unsubscribe
            instructions at the bottom of the email. You may continue to receive
            service-related and other non-marketing emails.
          </p>

          <h3>Cookies &amp; browser web storage</h3>
          <p>
            You can typically disable cookies through your browser settings.
            Doing so may affect certain features of the Services. See also{" "}
            <a href="#cookies">
              Cookies and Other Information Collected by Automated Means
            </a>
            .
          </p>

          <h3>Do Not Track</h3>
          <p>
            Some Internet browsers may be configured to send “Do Not Track”
            signals to the online services that you visit. We currently do not
            respond to “Do Not Track” or similar signals. To find out more about
            “Do Not Track,” please visit{" "}
            <a
              href="https://www.allaboutdnt.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.allaboutdnt.com
            </a>
            .
          </p>

          <h3>Choosing not to share your personal information</h3>
          <p>
            Where we are required by law to collect your personal information,
            or where we need your personal information to provide the Services
            to you, if you do not provide this information when requested (or
            you later ask to delete it), we may not be able to provide you with
            the Services. We will tell you what information you must provide to
            receive the Services by designating it as required at the time of
            collection or through other appropriate means.
          </p>
        </section>

        <section id="other-sites" className="fv-policy__section">
          <h2>Other Sites, Mobile Applications, and Services</h2>
          <p>
            The Services may contain links to, or content or features from,
            other websites and online services operated by third parties. These
            links are not an endorsement of, or representation that we are
            affiliated with, any third party. In addition, our content may be
            included on web pages or in mobile applications or online services
            that are not associated with us. We do not control third-party
            websites, mobile applications, or online services, and we are not
            responsible for their actions. Other websites and services follow
            different rules regarding the collection, use, and sharing of your
            personal information. We encourage you to read the privacy policies
            of the other websites and mobile applications and online services
            you use.
          </p>
        </section>

        <section id="security" className="fv-policy__section">
          <h2>Security Practices</h2>
          <p>
            The security of your personal information is important to us. We
            employ a number of organizational, technical and physical safeguards
            designed to protect the personal information we collect. However,
            security risk is inherent in all internet and information
            technologies and we cannot guarantee the security of your personal
            information.
          </p>
        </section>

        <section id="transfers" className="fv-policy__section">
          <h2>International Data Transfers</h2>
          <p>
            We are headquartered in the United States and may have service
            providers in other countries, and your personal information may be
            transferred outside of your state, province, or country to the
            United States or other locations where privacy laws may not be as
            protective as those in your state, province, or country.
          </p>
        </section>

        <section id="children" className="fv-policy__section">
          <h2>Children</h2>
          <p>
            The Services are not directed to, and we do not knowingly collect
            personal information from, anyone under the age of 16. If we learn
            that we have collected personal information of a child without the
            consent of the child’s parent or guardian, we will delete it. We
            encourage parents with concerns to contact us.
          </p>
        </section>

        <section id="changes" className="fv-policy__section">
          <h2>Changes to this Privacy Policy</h2>
          <p>
            We may amend this Privacy Policy at any time by posting the amended
            version on the Services and indicating the effective date of the
            amended version. We may announce any material changes to this
            Privacy Policy through the Service and/or via email if we have your
            email address. In all cases, your continued use of the Services
            after the posting of any modified Privacy Policy indicates your
            assent to the amended Privacy Policy.
          </p>
        </section>

        <section id="financial" className="fv-policy__section">
          <h2>Financial Privacy Notice</h2>
          <p>
            Financial companies choose how they share your nonpublic personal
            information. Federal law gives our clients the right to limit some
            but not all sharing, and it requires us to tell you how we collect,
            share, and protect your personal information. Please read this
            notice carefully to understand what we do.
          </p>
          <p>
            It is our policy not to disclose nonpublic personal information
            about our clients or former clients to third parties other than as
            described below.
          </p>

          <h3>Personal information we collect</h3>
          <p>
            We collect personal information about you in connection with our
            providing advisory services to you. This information may include
            your social security number, date of birth and residential address,
            and may also include other information such as your:
          </p>
          <ul>
            <li>Assets and income;</li>
            <li>Financial account information and balances;</li>
            <li>Investment experience;</li>
            <li>Transaction history; and</li>
            <li>Wire transfer instructions.</li>
          </ul>

          <h3>How we collect this information</h3>
          <p>
            We collect this information from you through various means,
            including, but not limited to, when you give us your contact
            information and you complete our client questionnaire and other
            forms you give to us, enter into an investment advisory contract
            with us, tell us where to send money, or make a wire transfer.
          </p>

          <h3>How we use this information</h3>
          <p>
            All financial companies need to share clients’ personal information
            to run their everyday business and we use the personal information
            we collect from you for our everyday business purposes. These
            purposes may include for example:
          </p>
          <ul>
            <li>To provide advisory services to you.</li>
            <li>To open an account for you.</li>
            <li>To process a transaction for your account.</li>
            <li>To market products and services to you.</li>
            <li>To respond to court orders and legal investigations.</li>
          </ul>

          <h3>Disclosure to others</h3>
          <p>
            We may provide your personal information to firms that assist us in
            servicing your account and have a need for such information, such as
            brokers, custodians, our client relationship management (CRM) and
            other software vendors and data storage providers, and otherwise as
            required or permitted by law. We may also disclose such information
            to any service providers and financial institutions with whom we may
            have joint marketing arrangements (i.e., a formal agreement between
            nonaffiliated financial companies that together market financial
            products or services to you, such as solicitors). We require any
            such third-party service providers and financial institutions with
            which we may have joint marketing arrangements to protect the
            confidentiality of your information and to use the information only
            for the purposes for which we disclose the information to them.
            These sharing practices are consistent with Federal privacy and
            related laws, and you may not limit our use of your personal
            information for these purposes under such laws. Federal privacy laws
            only give you the right to limit the certain types of information
            sharing that we do not engage in (e.g., sharing with our affiliates
            certain information relating to your transaction history or
            creditworthiness for their use in marketing to you, or sharing any
            personal information with nonaffiliates for them to market to you).
          </p>

          <h3>How we protect your personal information</h3>
          <p>
            To protect your personal information from unauthorized access and
            use, we use security measures that comply with Federal law.
          </p>
          <p>
            These measures include computer safeguards and secured files and
            premises.
          </p>
          <p>
            In addition, we restrict access to non-public personal information
            about clients to our employees who need to know that information to
            provide services to clients.
          </p>
        </section>

        <section id="contact" className="fv-policy__section">
          <h2>How to Contact Us</h2>
          <p>
            If you have any questions or comments about this Policy or Fairview
            Capital’s privacy practices, email us at{" "}
            <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>. You may also
            write to us via postal mail at, or call us at{" "}
            <a href={bay.phoneHref}>{bay.phone}</a>:
          </p>
          <address className="fv-policy__address">
            {FIRM.legalName}
            <br />
            {bay.lines[0]}
            <br />
            {bay.lines[1]}
            <br />
            Attn: Legal – Privacy
          </address>
        </section>
      </article>
    </main>
  );
}
