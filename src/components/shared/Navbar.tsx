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
    login: { id: "masuk", en: "login" },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 md:h-20 flex items-center justify-between">
        {/* Logo SVG with EDU text */}
        <Link href={`/${locale}`} className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 transition-opacity hover:opacity-85 shrink-0">
          <Image
            src="/nav-logo.svg"
            alt="webind mark"
            width={36}
            height={36}
            priority
            className="h-5 sm:h-7 md:h-9 w-auto object-contain"
          />
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
              <Image
                src="/logo.svg"
                alt="webind logo"
                width={90}
                height={28}
                priority
                className="h-3.5 sm:h-4.5 md:h-6 w-auto object-contain object-left"
              />
              <span className="px-1 py-0.5 sm:px-1.5 sm:py-0.5 md:px-2 md:py-0.5 rounded text-[7.5px] sm:text-[9px] md:text-xs font-black uppercase tracking-wider bg-accent text-primary leading-none shadow-xs">
                EDU
              </span>
            </div>
            <span className="hidden sm:block text-[8px] md:text-[9px] font-medium tracking-wider text-text-muted uppercase leading-none mt-0.5">
              Personal Learning Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Desktop Right CTA & Lang */}
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
            href={getLocalizedHref("login")}
            className="text-sm font-semibold text-primary hover:text-text-muted transition-colors px-3 py-2"
          >
            {tCommon("login")}
          </Link>

          <Link
            href={getLocalizedHref("register")}
            className="px-5 py-2.5 rounded-lg bg-accent text-primary font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-1 shadow-sm"
          >
            {tCommon("startLearning")} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
          <div className="flex items-center bg-secondary/80 rounded-lg p-0.5 text-[10px] sm:text-[11px] font-bold">
            <button
              onClick={() => switchLanguage("id")}
              className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded transition-colors ${locale === "id" ? "bg-accent text-primary font-black" : "text-text-muted"}`}
            >
              ID
            </button>
            <button
              onClick={() => switchLanguage("en")}
              className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded transition-colors ${locale === "en" ? "bg-accent text-primary font-black" : "text-text-muted"}`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 sm:p-2 rounded-lg bg-secondary/60 hover:bg-secondary text-primary transition-colors focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-secondary px-5 py-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-primary font-bold"
                      : "text-text-muted hover:bg-secondary/50 hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-secondary space-y-2">
            <Link
              href={getLocalizedHref("login")}
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-xl bg-secondary text-primary font-semibold text-xs transition-colors hover:bg-neutral-300"
            >
              {tCommon("login")}
            </Link>
            <Link
              href={getLocalizedHref("register")}
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-xl bg-accent text-primary font-bold text-xs shadow-xs hover:opacity-90 transition-opacity"
            >
              {tCommon("startLearning")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
