import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";

/**
 * Sitewide ledger shell — server SideNav on desktop, Navbar on small screens.
 * No client pathname switch.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fv-shell--rail">
      <a href="#main" className="fv-skip">
        Skip to content
      </a>
      <SideNav />
      <div className="fv-shell__main">
        <div className="fv-mobile-nav">
          <Navbar />
        </div>
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
