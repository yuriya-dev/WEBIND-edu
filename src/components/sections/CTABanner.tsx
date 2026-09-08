"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import GsapReveal from "@/components/shared/GsapReveal";

export default function CTABanner() {
  const t = useTranslations("CTA");
  const locale = useLocale();
  const registerSlug = locale === "en" ? "register" : "daftar";

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <GsapReveal direction="up">
        <div className="bg-primary text-background p-8 sm:p-12 rounded-xl text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8 text-sm">{t("description")}</p>
          <Link
            href={`/${locale}/${registerSlug}`}
            className="inline-block px-8 py-4 rounded-lg bg-accent text-primary font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {t("button")}
          </Link>
        </div>
      </GsapReveal>
    </section>
  );
}
