"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import GsapReveal from "@/components/shared/GsapReveal";
import { useTranslations, useLocale } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations("RegisterPage");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waNumber = "6285877925025";
    const waMessage = encodeURIComponent(
      `Halo Webind Edu!\n\nNama: ${formData.name}\nEmail: ${formData.email}\nWhatsApp: ${formData.phone}\nProgram: ${formData.program}\nPesan: ${formData.message}`
    );
    window.open(`https://wa.me/${waNumber}?text=${waMessage}`, "_blank");
    setSubmitted(true);
  };

  const programOptions = [t("p1"), t("p2"), t("p3"), t("p4"), t("p5")];

  return (
    <main className="min-h-screen bg-background text-primary pt-28">
      <Navbar />

      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-secondary">
        <GsapReveal direction="up">
          <div className="text-xs font-mono font-bold tracking-widest text-primary uppercase border-l-2 border-accent pl-3 mb-6">
            {t("badge")}
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6 max-w-4xl">
            {t("title")} <span className="bg-accent px-2 py-0.5 rounded-md inline-block">{t("highlight")}</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            {t("description")}
          </p>
        </GsapReveal>
      </section>

      <section className="py-16 px-6 max-w-2xl mx-auto">
        <GsapReveal direction="up">
          {submitted ? (
            <div className="bg-accent/10 border border-accent rounded-xl p-12 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-primary mb-2">Registration Sent!</h2>
              <p className="text-sm text-text-muted">We&apos;ll contact you via WhatsApp shortly.</p>
            </div>
          ) : (
            <form className="bg-secondary p-8 rounded-xl space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-2">{t("labelName")}</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  required className="w-full px-4 py-3 bg-background rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-2">{t("labelEmail")}</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  required className="w-full px-4 py-3 bg-background rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-2">{t("labelPhone")}</label>
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  required className="w-full px-4 py-3 bg-background rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-2">{t("labelProgram")}</label>
                <select
                  name="program" value={formData.program} onChange={handleChange}
                  required className="w-full px-4 py-3 bg-background rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">{t("selectProgram")}</option>
                  {programOptions.map((p, idx) => (
                    <option key={idx} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-2">{t("labelMessage")}</label>
                <textarea
                  rows={4} name="message" value={formData.message} onChange={handleChange}
                  placeholder={t("placeholderMessage")}
                  className="w-full px-4 py-3 bg-background rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-accent text-primary font-bold text-sm hover:opacity-90 transition-opacity"
              >
                {t("btnSubmit")}
              </button>
            </form>
          )}
        </GsapReveal>
      </section>

      <Footer />
    </main>
  );
}
