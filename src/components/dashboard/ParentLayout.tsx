"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  CreditCard,
  ArrowLeft,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function ParentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  const navItems = [
    { name: "Ringkasan Anak", href: `/${locale}/parent`, icon: LayoutDashboard },
    { name: "Laporan Sesi", href: `/${locale}/parent/reports`, icon: FileText },
    { name: "Jadwal Les", href: `/${locale}/parent/schedule`, icon: Calendar },
    { name: "Paket & Pembayaran", href: `/${locale}/parent/billing`, icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
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
                Portal Orang Tua
              </span>
            </div>
          </Link>

          {/* Child Quick Card */}
          <div className="bg-background p-4 rounded-xl border border-secondary flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-primary text-accent flex items-center justify-center font-bold text-sm shrink-0">
              AP
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-primary truncate">Andi Pratama</h4>
              <p className="text-[10px] text-text-muted truncate">Orang Tua: Ny. Diana</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
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
          <Link
            href={`/${locale}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-background hover:bg-secondary text-text-muted hover:text-primary border border-secondary text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-secondary px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image
              src="/nav-logo.svg"
              alt="webind mark"
              width={24}
              height={24}
              className="h-6 w-auto object-contain"
            />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-primary">
              Portal Orang Tua
            </span>
          </Link>
          <span className="text-xs font-bold text-primary font-mono px-2 py-0.5 rounded bg-secondary">
            Andi Pratama
          </span>
        </header>

        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
