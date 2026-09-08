"use client";

import { ReactNode } from "react";
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
  User,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { mockStudent } from "@/lib/data/student";

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("StudentPortal");

  const navItems = [
    { name: t("nav.dashboard"), href: `/${locale}/dashboard`, icon: LayoutDashboard },
    { name: t("nav.myLearning"), href: `/${locale}/dashboard/learning`, icon: BookOpen },
    { name: t("nav.schedule"), href: `/${locale}/dashboard/schedule`, icon: Calendar },
    { name: t("nav.materials"), href: `/${locale}/dashboard/materials`, icon: FolderArchive },
    { name: t("nav.progress"), href: `/${locale}/dashboard/progress`, icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-secondary/40 border-r border-secondary p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Image
              src="/webind.svg"
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
          <div className="bg-background p-4 rounded-xl border border-secondary flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center font-bold text-sm text-primary">
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
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-background shadow-sm"
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

        {/* Footer info & Logout */}
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

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-background overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
