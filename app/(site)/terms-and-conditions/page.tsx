import type { Metadata } from "next";
import Link from "next/link";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Terms and Conditions | Fairview Capital",
  description:
    "Terms of Use for the Fairview Capital Investment Management, LLC website.",
};

const TOC = [
  { id: "agreement", label: "Agreement to Terms of Use" },
  { id: "other-agreements", label: "Other Agreements" },
  { id: "jurisdictional-limitations", label: "Jurisdictional Limitations" },
  { id: "personal-use", label: "Personal and Non-Commercial Use Limitation" },
  { id: "no-advice", label: "No Securities Offering or Investment Advice" },
  { id: "truthful", label: "Truthful Information" },
  { id: "disclaimers", label: "Disclaimers and Limitation of Liability" },
  { id: "ownership", label: "Ownership of Content" },
  { id: "privacy", label: "Privacy" },
  { id: "prohibited", label: "No Unlawful or Prohibited Use" },
  { id: "references", label: "References to Publications and Other Companies" },
  { id: "links", label: "Links to Third Party Websites" },
  { id: "modification", label: "Modification and Monitoring of Website" },
  { id: "termination", label: "Termination and Cancellation" },
  { id: "indemnity", label: "Indemnity" },
  { id: "applicable-law", label: "Jurisdictional Issues and Applicable Law" },
  { id: "general", label: "General" },
] as const;

export default function TermsAndConditionsPage() {
  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <article className="fv-policy">
        <header className="fv-policy__intro">
          <p className="fv-policy__eyebrow">Legal</p>
          <h1 className="fv-policy__title">Terms and Conditions</h1>
          <p className="fv-policy__effective">Effective June 30, 2021</p>
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

        <section id="agreement" className="fv-policy__section">
          <h2>Agreement to Terms of Use</h2>
          <p>
            Please read the following terms and conditions (“Terms of Use”)
            before using the {FIRM.legalName} (“Fairview Capital”) website (the
            “Site”). Your access to and use of the Site is subject to these
            Terms of Use and all applicable laws and regulations. The Terms of
            Use constitute a legal agreement between you and Fairview Capital.
            The Site is available only to, and may only be used by, individuals
            who can form legally binding contracts under applicable law.
            Without limiting the foregoing, the Site is not available to persons
            under the age of 18. By accessing and using the Site, you accept,
            without qualification, these Terms of Use. If you do not approve and
            accept these Terms of Use without qualification, you should exit the
            Site immediately.
          </p>
        </section>

        <section id="other-agreements" className="fv-policy__section">
          <h2>Other Agreements</h2>
          <p>
            The investment management and other services that Fairview Capital
            provides to our clients are governed by other agreements between
            Fairview Capital and our clients. These Terms of Use apply only to
            access and use of the Site and the information made available on the
            Site.
          </p>
        </section>

        <section id="jurisdictional-limitations" className="fv-policy__section">
          <h2>Jurisdictional Limitations</h2>
          <p>
            Fairview Capital is a U.S. federally registered investment adviser.
            Fairview Capital may only transact business or render personalized
            investment advice in those states and international jurisdictions
            where Fairview Capital is registered, has filed notice, or is
            otherwise excluded or exempted from notice or registration
            requirements. The purpose of the Site is for information only. Any
            communications with prospective clients residing in states or
            international jurisdictions where Fairview Capital is not registered
            or licensed shall be limited so as to not trigger registration or
            licensing requirements. Nothing on the Site should be construed as
            investment advice, which can be provided only in one-on-one
            communications.
          </p>
        </section>

        <section id="personal-use" className="fv-policy__section">
          <h2>Personal and Non-Commercial Use Limitation</h2>
          <p>
            The Site is for your personal and non-commercial use. Fairview
            Capital grants you a non-exclusive, non-transferable and limited
            personal license to access and use the Site, conditioned on your
            continued compliance with these Terms of Use. You may not modify,
            copy (except as set forth below), distribute, transmit, display,
            perform, reproduce, publish, license, create derivative works from,
            transfer, or sell any information, products or services obtained
            from the Site. You may not link other websites to the Site without
            Fairview Capital’s prior written permission. You may not allow
            others to use your user name or password to access or use any part
            of the Site. If your password has been compromised for any reason,
            you must contact Fairview Capital immediately. If you provide your
            password to any third party, you will be solely responsible for any
            actions taken by such third party using your password. All
            information on the non-public (i.e., password-restricted) areas of
            the Site is confidential and private and may not be disclosed or
            distributed by you to any other person for any purpose and is made
            available solely for your personal use in connection with your
            investment activities. You are prohibited from using the Site to
            advertise or perform any commercial solicitation. You also are
            prohibited from using any robot, spider, scraper or other automated
            means to access the Site for any purpose without Fairview Capital’s
            prior written permission. You may not take any action that imposes,
            or may impose, in Fairview Capital’s sole discretion, an
            unreasonable or disproportionately large load on Fairview Capital’s
            infrastructure, interfere or attempt to interfere with the proper
            working of the Site or any activities conducted on the Site, or
            bypass any measures Fairview Capital may use to prevent or restrict
            access to the Site. Any rights not expressly granted herein are
            reserved.
          </p>
        </section>

        <section id="no-advice" className="fv-policy__section">
          <h2>No Securities Offering or Investment Advice</h2>
          <p>
            The information on the Site is intended to enable investors to
            understand the nature of Fairview Capital’s investment advisory
            services. It is not intended as and does not constitute investment
            advice or legal or tax advice or an offer to sell any securities to
            any person or a solicitation of any person of any offer to purchase
            any securities. Investment management services are offered only
            pursuant to a written investment management agreement, which
            investors are urged to carefully read and consider in determining
            whether such agreement is suitable for their individual needs and
            circumstances. The information made available on the Site should not
            be construed as Fairview Capital’s endorsement, recommendation or
            sponsorship of any company or security. There are inherent risks in
            relying on, using or retrieving any information found on the Site,
            and Fairview Capital urges you to make sure you understand these
            risks before relying on, using or retrieving any information on the
            Site. You should evaluate the information made available through the
            Site, and you should seek the advice of professionals, as
            appropriate, to evaluate any opinion, advice, product, service or
            other information. You agree that Fairview Capital is not liable for
            any action you take or decision you make in reliance on any
            information on the Site.
          </p>
          <p>
            Fairview Capital’s services are designed to integrate with the
            services provided by our clients’ other financial, legal and tax
            advisers, not to replace their services. Fairview Capital advises
            our clients from time to time on non-investment related matters, but
            clients must rely on their other professional advisers for final
            approval and/or implementation of non-investment matters.
          </p>
          <p>
            You acknowledge that any requests for information are unsolicited
            and any information provided shall neither constitute nor be
            construed as investment advice by Fairview Capital to you or
            constitute the formation of an investment advisory relationship, or
            any other client relationship, between you and Fairview Capital. It
            is strongly recommended that you seek outside advice from a
            qualified securities professional. Fairview Capital does not
            guarantee the suitability or potential value of any particular
            investment or information source. Fairview Capital may invest or
            otherwise hold an interest in companies or securities that may be
            discussed on the Site.
          </p>
        </section>

        <section id="truthful" className="fv-policy__section">
          <h2>Truthful Information</h2>
          <p>
            As a condition to your use of the Site, you represent and warrant
            to, and agree with Fairview Capital that, all of the information
            that you provide is truthful, accurate and complete.
          </p>
        </section>

        <section id="disclaimers" className="fv-policy__section">
          <h2>Disclaimers and Limitation of Liability</h2>
          <p className="fv-policy__disclaimer">
            THE INFORMATION, SOFTWARE AND SERVICES PUBLISHED ON THIS WEBSITE MAY
            INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. DUE TO VARIOUS
            FACTORS, INCLUDING THE INHERENT POSSIBILITY OF HUMAN AND MECHANICAL
            ERROR, THE ACCURACY, COMPLETENESS, TIMELINESS AND CORRECT SEQUENCING
            OF SUCH INFORMATION, SOFTWARE AND SERVICES AND THE RESULTS OBTAINED
            FROM THEIR USE ARE NOT GUARANTEED BY FAIRVIEW CAPITAL OR ANY PERSONS
            CREATING OR TRANSMITTING SUCH INFORMATION, SOFTWARE AND SERVICES.
          </p>
          <p className="fv-policy__disclaimer">
            FAIRVIEW CAPITAL OR OUR SUPPLIERS MAY MAKE IMPROVEMENTS OR CHANGES
            IN THE CONTENT AND OPERATION OF THE SITE AT ANY TIME WITHOUT
            NOTICE. THE SITE MAY BE TEMPORARILY UNAVAILABLE FROM TIME TO TIME
            DUE TO REQUIRED MAINTENANCE, TELECOMMUNICATIONS INTERRUPTIONS OR
            OTHER REASONS.
          </p>
          <p className="fv-policy__disclaimer">
            FAIRVIEW CAPITAL AND EACH OF OUR SUPPLIERS MAKES NO REPRESENTATION
            ABOUT THE SUITABILITY OF THE INFORMATION, SOFTWARE, PRODUCTS AND
            SERVICES CONTAINED ON THIS WEBSITE FOR ANY PURPOSE. ALL SUCH
            INFORMATION, SOFTWARE, PRODUCTS AND SERVICES ARE PROVIDED “AS IS”
            WITHOUT WARRANTY OF ANY KIND. FAIRVIEW CAPITAL AND EACH OF OUR
            SUPPLIERS DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH REGARD TO
            THIS INFORMATION, SOFTWARE, PRODUCTS AND SERVICES, INCLUDING ALL
            IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT AND AVAILABILITY.
            BECAUSE SOME STATES OR JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF
            IMPLIED WARRANTIES, THIS EXCLUSION MAY NOT APPLY TO YOU.
          </p>
          <p className="fv-policy__disclaimer">
            YOUR USE OF THE SITE IS AT YOUR OWN RISK. YOU ARE SOLELY
            RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM, LOSS OF DATA OR
            ANY OTHER DAMAGE OR LOSS THAT RESULTS FROM THE DOWNLOAD OF ANY
            CONTENT FROM THE SITE. NONE OF FAIRVIEW CAPITAL OR ANY OF OUR
            SUPPLIERS SHALL BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE,
            INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN
            ANY WAY CONNECTED WITH OR RELATING TO THE USE OF OR ACCESS TO THE
            SITE OR WITH THE DELAY OR INABILITY TO USE THE SITE, OR FOR ANY
            INFORMATION, SOFTWARE, PRODUCTS OR SERVICES OBTAINED THROUGH THE
            SITE, WHETHER BASED ON CONTRACT, TORT, STRICT LIABILITY OR
            OTHERWISE, EVEN IF FAIRVIEW CAPITAL OR ANY OF OUR SUPPLIERS HAS BEEN
            ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES OR
            JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY
            FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THIS LIMITATION MAY NOT
            APPLY TO YOU.
          </p>
          <p className="fv-policy__disclaimer">
            FAIRVIEW CAPITAL AND ANY PERSON CREATING OR TRANSMITTING THE
            INFORMATION ON THE SITE SHALL NOT BE LIABLE FOR ANY INFECTION BY
            VIRUSES OF OR DAMAGE TO ANY COMPUTER THAT RESULTS FROM YOUR USE OF,
            ACCESS TO OR DOWNLOADING OF SUCH INFORMATION. IF YOU ARE
            DISSATISFIED WITH THE INFORMATION, PRODUCTS OR SERVICES OFFERED AT
            THE SITE OR WITH THE TERMS AND CONDITIONS OF THESE TERMS OF USE,
            YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF AND ACCESS
            TO THE SITE.
          </p>
        </section>

        <section id="ownership" className="fv-policy__section">
          <h2>Ownership of Content</h2>
          <p>
            The Site and all of its content, including but not limited to all
            text, graphics, charts, audio, logos, images, data compilations,
            icons, code and software (“Content”), are the property of Fairview
            Capital and are protected by U.S. and international copyright laws,
            with all rights reserved unless otherwise noted. All trademarks,
            service marks, trade names and other product and service names and
            logos displayed on the Site are proprietary to Fairview Capital,
            including all registered and unregistered trademarks and service
            marks of Fairview Capital. If the Site includes any trademarks,
            service marks, trade names or logos of any third parties, such items
            are the proprietary marks and names of their respective owners, and
            are protected by applicable trademark and intellectual property
            laws. Your use of any Content, whether owned by Fairview Capital, or
            any third party, without Fairview Capital’s express written
            permission, is strictly prohibited except as otherwise expressly
            permitted in these Terms of Use. Without limiting the foregoing, you
            are prohibited from using any of Fairview Capital’s copyrighted
            material or trademarks for any purpose, including, but not limited
            to, use as metatags, links or otherwise on any website, without
            Fairview Capital’s prior written permission.
          </p>
        </section>

        <section id="privacy" className="fv-policy__section">
          <h2>Privacy</h2>
          <p>
            You agree that Fairview Capital may collect, use and share personal
            information in connection with your use of the Site and that such
            information will be governed by Fairview Capital’s{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>, which is hereby
            incorporated by reference as if fully set forth herein.
          </p>
        </section>

        <section id="prohibited" className="fv-policy__section">
          <h2>No Unlawful or Prohibited Use</h2>
          <p>
            As a condition to your use of the Site, you represent and warrant
            to, and agree with, Fairview Capital that you will not use the Site
            for any purpose that is unlawful or prohibited by these Terms of
            Use.
          </p>
        </section>

        <section id="references" className="fv-policy__section">
          <h2>References to Publications and Other Companies</h2>
          <p>
            References to any publication or any other company in the Site are
            for reference and informational purposes only and are not intended
            to suggest that any of such companies endorse, recommend or approve
            of the services, analysis or recommendations of Fairview Capital or
            that Fairview Capital endorses, recommends or approves the services
            or products of such companies. News stories reflect only the
            author’s opinion and not necessarily that of Fairview Capital.
          </p>
        </section>

        <section id="links" className="fv-policy__section">
          <h2>Links to Third Party Websites</h2>
          <p>
            The Site may contain hyperlinks to websites operated by parties
            other than Fairview Capital, which may not have been screened or
            reviewed by Fairview Capital and which may contain inaccurate,
            inappropriate or offensive material, products or services. Fairview
            Capital does not control such websites, and Fairview Capital assumes
            no responsibility or liability with regard to the accuracy,
            reliability, legality or decency of such third-party websites,
            content, products or services. Such hyperlinks are provided for your
            convenience only. Fairview Capital’s inclusion of hyperlinks to such
            websites does not imply any endorsement of the material on such
            websites or any association with their operators.
          </p>
        </section>

        <section id="modification" className="fv-policy__section">
          <h2>Modification and Monitoring of Website</h2>
          <p>
            Fairview Capital may, at our discretion, change, modify, add or
            remove portions of these Terms of Use at any time without notice to
            you. We suggest that you check these Terms of Use periodically for
            changes. These Terms of Use can be accessed from the link at the
            bottom of each page of the Site. We may also announce any material
            changes to these Terms of Use through the Site and/or via email if
            we have your email address so it is important to keep your email
            address up to date. If you use the Site after we post changes to
            these Terms of Use, you accept the changed Terms of Use. If the
            modified Terms of Use are not acceptable to you, your only recourse
            is to cease using the Site. Notwithstanding the preceding sentences
            of this paragraph, no revisions to these Terms of Use will apply to
            any dispute between you and Fairview Capital that arose prior to the
            date of such revision. These Terms of Use may only be modified in
            writing as set forth in this paragraph, and may not be modified
            orally. Fairview Capital expressly reserves the right to monitor any
            and all use of the Site.
          </p>
        </section>

        <section id="termination" className="fv-policy__section">
          <h2>Termination and Cancellation</h2>
          <p>
            Fairview Capital reserves the right to modify or terminate the Site
            and to terminate your access to the Site, without notice at any time
            and for any reason.
          </p>
        </section>

        <section id="indemnity" className="fv-policy__section">
          <h2>Indemnity</h2>
          <p>
            You agree, at your own expense, to indemnify, defend and hold
            harmless Fairview Capital, our parents, subsidiaries and affiliates,
            and their officers, partners, managers, members, employees, agents,
            distributors and licensees, from and against any judgments, losses,
            deficiencies, damages, liabilities, costs, claims, demands, suits,
            settlements and expenses (including, without limitation, reasonable
            attorneys’ fees and expenses) incurred in, arising out of or in any
            way related to your breach of these Terms of Use or Fairview
            Capital’s Privacy Policy, your use of the Site or any product or
            service related thereto, or any of your other acts or omissions.
          </p>
        </section>

        <section id="applicable-law" className="fv-policy__section">
          <h2>Jurisdictional Issues and Applicable Law</h2>
          <p>
            Unless otherwise specified, Fairview Capital controls and operates
            the Site from our offices in the State of California, United States
            of America.
          </p>
          <p>
            Fairview Capital does not claim that materials in the Site are
            appropriate or available for use in locations other than California.
            If you choose to access the Site from other locations, you do so on
            your own initiative, and you are responsible for compliance with any
            applicable local laws. Software from the Site is further subject to
            United States export controls. Software from the Site may not be
            downloaded or otherwise exported or re-exported outside the United
            States. By downloading or using such software, you represent and
            warrant that you are not located in, under the control of, or a
            national or resident of any country or territory outside of the
            United States. These Terms of Use are governed by the laws of the
            State of California, without regard to its choice of law provisions.
            You hereby consent to the exclusive and personal jurisdiction and
            venue of courts in San Francisco, California, which shall have
            exclusive jurisdiction over any and all disputes arising out of or
            relating to these Terms of Use, the use of the Site or any product
            or service related thereto. Use of the Site is unauthorized in any
            jurisdiction that does not give effect to all provisions of these
            terms and conditions, including without limitation this paragraph.
          </p>
        </section>

        <section id="general" className="fv-policy__section">
          <h2>General</h2>
          <p>
            You agree that no joint venture, partnership, employment or agency
            relationship exists between you and Fairview Capital as a result of
            these Terms of Use or use of the Site. Fairview Capital’s
            performance of these Terms of Use is subject to existing laws and
            legal process, and nothing contained in these Terms of Use is in
            derogation of Fairview Capital’s right to comply with law
            enforcement requests or requirements relating to your use of the
            Site or information provided to or gathered by Fairview Capital with
            respect to such use.
          </p>
          <p>
            If any part of these Terms of Use is determined to be invalid or
            unenforceable pursuant to applicable law including, but not limited
            to, the warranty disclaimers and liability limitations set forth
            above, then the invalid or unenforceable provision shall be deemed
            superseded by a valid, enforceable provision that most closely
            matches the intent of the original provision and the remainder of
            these Terms of Use shall continue in effect. By reviewing or using
            the information on the Site after accessing the Site, you represent
            and warrant that (a) you have the authority to enter into these
            Terms of Use and create a binding contractual obligation, (b) you
            understand and intend these Terms of Use to be the legal equivalent
            of a signed, written contract equally binding, and (c) you will use
            the information on the Site in a manner consistent with applicable
            laws and regulations in accordance with these Terms of Use, as
            Fairview Capital may amend them online or otherwise from time to
            time. A printed version of these Terms of Use and any notice given
            in electronic form shall be admissible in judicial or administrative
            proceedings based on or relating to these Terms of Use to the same
            extent and subject to the same conditions as other business
            documents and records originally generated and maintained in printed
            form.
          </p>
          <p>
            These Terms of Use constitute the entire agreement between the user
            and Fairview Capital with respect to the Site and they supersede all
            prior or contemporaneous communications and proposals, whether
            electronic, oral or written, between the user and Fairview Capital
            with respect to the Site.
          </p>
        </section>
      </article>
    </main>
  );
}
