"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  const routeSlugs: Record<string, { id: string; en: string }> = {
    programs: { id: "program", en: "programs" },
    about: { id: "tentang", en: "about" },
    pricing: { id: "harga", en: "pricing" },
    faq: { id: "faq", en: "faq" },
    register: { id: "daftar", en: "register" },
  };

  const getLocalizedHref = (key: string) => {
    if (key === "home") return `/${locale}`;
    const slug = routeSlugs[key]?.[locale as "id" | "en"] || key;
    return `/${locale}/${slug}`;
  };

  const navLinks = [
    { name: t("home"), href: getLocalizedHref("home") },
    { name: t("programs"), href: getLocalizedHref("programs") },
    { name: t("about"), href: getLocalizedHref("about") },
    { name: t("pricing"), href: getLocalizedHref("pricing") },
    { name: t("faq"), href: getLocalizedHref("faq") },
  ];

  const switchLanguage = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    const currentPath = pathname || "/";
    const segments = currentPath.split("/").filter(Boolean);

    let routeKey = "";
    if (segments.length > 1) {
      const currentSlug = segments[1];
      for (const [key, mapping] of Object.entries(routeSlugs)) {
        if (mapping.id === currentSlug || mapping.en === currentSlug) {
          routeKey = key;
          break;
        }
      }
    }

    if (routeKey) {
      const targetSlug = routeSlugs[routeKey][newLocale as "id" | "en"];
      window.location.href = `/${newLocale}/${targetSlug}`;
    } else {
      segments[0] = newLocale;
      window.location.href = `/${segments.join("/")}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-secondary">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo SVG with EDU text */}
        <Link href={`/${locale}`} className="flex items-center gap-3.5 transition-opacity hover:opacity-80">
          <Image
            src="/webind.svg"
            alt="webind mark"
            width={48}
            height={48}
            priority
            className="h-11 w-auto object-contain"
          />
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="webind logo"
                width={120}
                height={38}
                priority
                className="h-7 w-auto object-contain object-left"
              />
              <span className="px-2.5 py-1 rounded-md text-xs sm:text-sm font-black uppercase tracking-wider bg-accent text-primary leading-none shadow-sm">
                EDU
              </span>
            </div>
            <span className="text-[9px] font-medium tracking-wider text-text-muted uppercase leading-none mt-0.5">
              Personal Learning Platform
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-primary font-bold border-b-2 border-primary py-1" : "text-text-muted hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 text-xs font-bold">
            <button
              onClick={() => switchLanguage("id")}
              className={`px-2 py-1 rounded transition-colors ${locale === "id" ? "bg-accent text-primary" : "text-text-muted hover:text-primary"}`}
            >
              ID
            </button>
            <button
              onClick={() => switchLanguage("en")}
              className={`px-2 py-1 rounded transition-colors ${locale === "en" ? "bg-accent text-primary" : "text-text-muted hover:text-primary"}`}
            >
              EN
            </button>
          </div>

          <Link
            href={getLocalizedHref("register")}
            className="px-5 py-2.5 rounded-lg bg-accent text-primary font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            {tCommon("startLearning")} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 text-xs font-bold">
            <button
              onClick={() => switchLanguage("id")}
              className={`px-2 py-1 rounded ${locale === "id" ? "bg-accent text-primary" : "text-text-muted"}`}
            >
              ID
            </button>
            <button
              onClick={() => switchLanguage("en")}
              className={`px-2 py-1 rounded ${locale === "en" ? "bg-accent text-primary" : "text-text-muted"}`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary p-2 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-secondary px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-primary hover:text-text-muted"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={getLocalizedHref("register")}
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-5 py-3 rounded-lg bg-accent text-primary font-semibold text-sm"
          >
            {tCommon("startLearning")}
          </Link>
        </div>
      )}
    </header>
  );
}
