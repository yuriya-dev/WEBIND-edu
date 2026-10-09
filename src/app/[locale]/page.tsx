"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/sections/Hero";
import Programs from "@/components/sections/Programs";
import LearningMethod from "@/components/sections/LearningMethod";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import GsapReveal from "@/components/shared/GsapReveal";
import { useTranslations } from "next-intl";

export default function Home() {
  const tStats = useTranslations("Stats");

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-primary">
      <Navbar />

      <main className="space-y-24 pb-20 pt-20">
        {/* Hero */}
        <Hero />

        {/* Stats Section */}
        <section className="py-16 bg-secondary px-6">
          <GsapReveal direction="up" className="max-w-7xl mx-auto text-center space-y-8">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{tStats("welcome")}</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-primary max-w-3xl mx-auto">
              {tStats("title")}
            </h2>

            <GsapReveal direction="up" stagger={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 max-w-4xl mx-auto">
              <div className="bg-background p-8 rounded-xl text-left space-y-3">
                <div className="text-4xl font-extrabold text-primary">{tStats("stat1_number")}</div>
                <h3 className="text-lg font-bold text-primary">{tStats("stat1_title")}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{tStats("stat1_desc")}</p>
              </div>
              <div className="bg-background p-8 rounded-xl text-left space-y-3">
                <div className="text-4xl font-extrabold text-primary">{tStats("stat2_number")}</div>
                <h3 className="text-lg font-bold text-primary">{tStats("stat2_title")}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{tStats("stat2_desc")}</p>
              </div>
            </GsapReveal>
          </GsapReveal>
        </section>

        {/* Programs (show 3 + view all) */}
        <Programs limit={3} showViewAll={true} showHeader={true} />

        {/* Learning Method */}
        <LearningMethod />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <FAQ limit={6} showViewAll={true} />

        {/* CTA */}
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
