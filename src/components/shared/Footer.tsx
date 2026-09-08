"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  const routeSlugs: Record<string, { id: string; en: string }> = {
    programs: { id: "program", en: "programs" },
    about: { id: "tentang", en: "about" },
    pricing: { id: "harga", en: "pricing" },
    faq: { id: "faq", en: "faq" },
    register: { id: "daftar", en: "register" },
  };

  const getLocalizedHref = (key: string) => {
    const slug = routeSlugs[key]?.[locale as "id" | "en"] || key;
    return `/${locale}/${slug}`;
  };

  return (
    <footer className="border-t border-secondary py-12 px-6 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <Image
              src="/nav-logo.svg"
              alt="webind mark"
              width={32}
              height={32}
              className="h-7 w-auto object-contain"
            />
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/logo.svg"
                  alt="webind logo"
                  width={95}
                  height={30}
                  className="h-5 w-auto object-contain object-left"
                />
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-accent text-primary leading-none shadow-sm">
                  EDU
                </span>
              </div>
              <span className="text-[8px] font-medium tracking-wider text-text-muted uppercase leading-none mt-0.5">
                Personal Learning Platform
              </span>
            </div>
          </Link>
          <span className="text-xs text-text-muted">© {new Date().getFullYear()}. {tCommon("rights")}</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-text-muted">
          <Link href={getLocalizedHref("programs")} className="hover:text-primary transition-colors">{tNav("programs")}</Link>
          <Link href={getLocalizedHref("about")} className="hover:text-primary transition-colors">{tNav("about")}</Link>
          <Link href={getLocalizedHref("pricing")} className="hover:text-primary transition-colors">{tNav("pricing")}</Link>
          <Link href={getLocalizedHref("register")} className="hover:text-primary transition-colors">{tNav("register")}</Link>
        </div>
      </div>
    </footer>
  );
}
