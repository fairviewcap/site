import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/**
 * Sitewide shell — top bar on all sizes, then page + footer.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fv-shell--rail">
      <a href="#main" className="fv-skip">
        Skip to content
      </a>
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
