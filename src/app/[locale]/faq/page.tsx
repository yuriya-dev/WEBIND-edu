"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background text-primary pt-28">
      <Navbar />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
