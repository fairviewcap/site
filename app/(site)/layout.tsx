import type { ReactNode } from "react";
import FirmJsonLd from "@/components/FirmJsonLd";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReviewDock from "@/components/review/ReviewDock";
import ReviewModal from "@/components/review/ReviewModal";
import { ReviewProvider } from "@/components/review/ReviewProvider";

/**
 * Sitewide shell — top bar on all sizes, then page + footer.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ReviewProvider>
      <div className="fv-shell--rail">
        <FirmJsonLd />
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
        <ReviewDock />
        <ReviewModal />
      </div>
    </ReviewProvider>
  );
}
