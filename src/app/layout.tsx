import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./app.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SoundToggle from "@/components/SoundToggle";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import ToastContainer from "@/components/ToastContainer";
import BackToTop from "@/components/BackToTop";
import CookieBanner from "@/components/CookieBanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import ComparisonSection from "@/components/ComparisonSection";
import FlavorQuiz from "@/components/FlavorQuiz";
import InstagramSection from "@/components/InstagramSection";
import FAQSection from "@/components/FAQSection";

const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={alpino.variable}>
      <body className="overflow-x-hidden bg-yellow-300 dark:bg-sky-950">
        {/* Global UX */}
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <CartDrawer />
        <ToastContainer />
        <SoundToggle />
        <BackToTop />
        <CookieBanner />

        <Header />
        <main>
          {children}
          <ViewCanvas />
        </main>

        {/* Extra sections */}
        <TestimonialsSection />
        <ComparisonSection />
        <FlavorQuiz />
        <InstagramSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
