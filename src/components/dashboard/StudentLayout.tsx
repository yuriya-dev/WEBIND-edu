"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FolderArchive,
  BarChart3,
  ArrowLeft,
  Flame,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { mockStudent } from "@/lib/data/student";

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("StudentPortal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: t("nav.dashboard"), href: `/${locale}/dashboard`, icon: LayoutDashboard },
    { name: t("nav.myLearning"), href: `/${locale}/dashboard/learning`, icon: BookOpen },
    { name: t("nav.schedule"), href: `/${locale}/dashboard/schedule`, icon: Calendar },
    { name: t("nav.materials"), href: `/${locale}/dashboard/materials`, icon: FolderArchive },
    { name: t("nav.progress"), href: `/${locale}/dashboard/progress`, icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col md:flex-row">
      {/* ========================================================= */}
      {/* 1. DESKTOP SIDEBAR (STICKY / FIXED VIEWPORT HEIGHT)       */}
      {/* ========================================================= */}
      <aside className="hidden md:flex md:sticky md:top-0 md:h-screen md:w-64 bg-secondary/40 border-r border-secondary p-6 flex-col justify-between shrink-0 overflow-y-auto z-30">
        <div className="space-y-6">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Image
              src="/nav-logo.svg"
              alt="webind mark"
              width={36}
              height={36}
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/logo.svg"
                  alt="webind logo"
                  width={90}
                  height={28}
                  className="h-5 w-auto object-contain object-left"
                />
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-accent text-primary leading-none">
                  EDU
                </span>
              </div>
              <span className="text-[8px] font-mono text-text-muted uppercase mt-0.5">
                Student Portal
              </span>
            </div>
          </Link>

          {/* Student Profile Quick Card */}
          <div className="bg-background p-4 rounded-xl border border-secondary flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center font-bold text-sm text-primary shrink-0">
              {mockStudent.avatar}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-primary truncate">{mockStudent.name}</h4>
              <p className="text-[10px] text-text-muted truncate">{mockStudent.currentProgram}</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-background shadow-sm font-bold"
                      : "text-text-muted hover:bg-secondary hover:text-primary"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-text-muted"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Back to Home */}
        <div className="pt-6 border-t border-secondary space-y-3">
          <div className="flex items-center justify-between px-2 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1 text-primary font-bold">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> {mockStudent.streakDays}d Streak
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-primary font-bold">
              {mockStudent.progressPercent}% Done
            </span>
          </div>

          <Link
            href={`/${locale}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-background hover:bg-secondary text-text-muted hover:text-primary border border-secondary text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("nav.backToHome")}</span>
          </Link>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MOBILE TOP HEADER (STICKY)                             */}
      {/* ========================================================= */}
      <header className="md:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-secondary px-4 py-2.5 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-1.5 sm:gap-2">
          <Image
            src="/nav-logo.svg"
            alt="webind mark"
            width={28}
            height={28}
            className="h-5 sm:h-6 w-auto object-contain"
          />
          <div className="flex items-center gap-1">
            <Image
              src="/logo.svg"
              alt="webind logo"
              width={68}
              height={20}
              className="h-3.5 sm:h-4 w-auto object-contain"
            />
            <span className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider bg-accent text-primary leading-none">
              EDU
            </span>
          </div>
        </Link>

        {/* Mobile Quick Actions & Menu Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 font-mono text-[11px] font-bold">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{mockStudent.streakDays}d</span>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="p-2 rounded-lg bg-secondary/80 hover:bg-secondary text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 3. MOBILE SLIDE-OVER DRAWER (FULL MENU & PROFILE)         */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-background border-r border-secondary p-5 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              {/* Drawer Header with Close Button */}
              <div className="flex items-center justify-between pb-3 border-b border-secondary">
                <div className="flex items-center gap-2">
                  <Image
                    src="/nav-logo.svg"
                    alt="webind mark"
                    width={28}
                    height={28}
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-primary">
                    Student Menu
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1.5 rounded-lg bg-secondary hover:bg-neutral-300 text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Card inside Drawer */}
              <div className="bg-secondary/40 p-3.5 rounded-xl border border-secondary flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/30 border border-accent flex items-center justify-center font-bold text-sm text-primary shrink-0">
                  {mockStudent.avatar}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-primary truncate">{mockStudent.name}</h4>
                  <p className="text-[10px] text-text-muted truncate">{mockStudent.currentProgram}</p>
                </div>
              </div>

              {/* Navigation Links inside Drawer */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-primary text-background font-bold shadow-xs"
                          : "text-text-muted hover:bg-secondary hover:text-primary"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-text-muted"}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-5 border-t border-secondary space-y-3">
              <div className="flex items-center justify-between px-2 text-xs font-mono text-text-muted">
                <span className="flex items-center gap-1 text-primary font-bold">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> {mockStudent.streakDays}d Streak
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-primary font-bold">
                  {mockStudent.progressPercent}% Done
                </span>
              </div>

              <Link
                href={`/${locale}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-secondary hover:bg-neutral-300 text-primary border border-secondary text-xs font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t("nav.backToHome")}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. MAIN CONTENT AREA                                      */}
      {/* ========================================================= */}
      <main className="flex-1 min-w-0 bg-background pb-20 md:pb-6 overflow-y-auto">
        {children}
      </main>

      {/* ========================================================= */}
      {/* 5. MOBILE BOTTOM NAVIGATION (QUICK THUMB ACTIONS)         */}
      {/* ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-t border-secondary px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] ${
                isActive
                  ? "text-primary font-bold"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-primary text-background" : ""}`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-text-muted"}`} />
              </div>
              <span className={`text-[9px] mt-0.5 truncate max-w-[64px] ${isActive ? "font-bold text-primary" : "text-text-muted"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
