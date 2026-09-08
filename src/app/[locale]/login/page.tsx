"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Users, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import GsapReveal from "@/components/shared/GsapReveal";
import { useTranslations, useLocale } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const locale = useLocale();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"student" | "tutor">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "student") {
      router.push(`/${locale}/dashboard`);
    } else {
      router.push(`/${locale}/tutor`);
    }
  };

  const handleDemoStudent = () => {
    router.push(`/${locale}/dashboard`);
  };

  const handleDemoTutor = () => {
    router.push(`/${locale}/tutor`);
  };

  const registerSlug = locale === "en" ? "register" : "daftar";

  return (
    <main className="min-h-screen bg-background text-primary pt-28">
      <Navbar />

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="max-w-md mx-auto space-y-8">
          <GsapReveal direction="up" className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase border-l-2 border-accent pl-3 inline-block mb-2">
              {t("badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              {t("title")} <span className="bg-accent px-2 py-0.5 rounded-md inline-block">{t("highlight")}</span>
            </h1>
            <p className="text-xs text-text-muted">{t("subtitle")}</p>
          </GsapReveal>

          <GsapReveal direction="up" delay={0.1} className="bg-secondary p-6 sm:p-8 rounded-2xl border border-secondary space-y-6">
            {/* Role Switch Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-background p-1.5 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("student")}
                className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === "student"
                    ? "bg-primary text-background shadow-md"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                <GraduationCap className="w-4 h-4" /> {t("studentTab")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tutor")}
                className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === "tutor"
                    ? "bg-primary text-background shadow-md"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" /> {t("tutorTab")}
              </button>
            </div>

            <p className="text-xs text-text-muted text-center italic">
              {activeTab === "student" ? t("studentDesc") : t("tutorDesc")}
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-2">{t("emailLabel")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === "student" ? "andi.pratama@gmail.com" : "ahmad.fauzi@webind.edu"}
                  className="w-full px-4 py-3 bg-background rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-2">{t("passwordLabel")}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-background rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-text-muted">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-secondary" />
                  <span>{t("rememberMe")}</span>
                </label>
                <a href="#" className="hover:underline">{t("forgotPassword")}</a>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-primary text-background font-bold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
              >
                {activeTab === "student" ? t("btnStudentLogin") : t("btnTutorLogin")} <ArrowRight className="w-4 h-4 text-accent" />
              </button>
            </form>

            {/* Quick 1-click Demo buttons */}
            <div className="pt-4 border-t border-neutral-300/50 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted block text-center">
                Fast Demo Access:
              </span>
              <button
                onClick={handleDemoStudent}
                className="w-full py-2.5 rounded-lg bg-accent text-primary font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> {t("demoStudent")}
              </button>
              <button
                onClick={handleDemoTutor}
                className="w-full py-2.5 rounded-lg bg-background hover:bg-neutral-200 text-primary font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> {t("demoTutor")}
              </button>
            </div>
          </GsapReveal>

          <p className="text-center text-xs text-text-muted">
            {t("noAccount")}{" "}
            <Link href={`/${locale}/${registerSlug}`} className="font-bold text-primary underline">
              {t("registerNow")}
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
