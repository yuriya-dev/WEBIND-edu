"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import ParentLayout from "@/components/dashboard/ParentLayout";
import { mockParentChild } from "@/lib/data/parent";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Receipt,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function ParentBillingPage() {
  const locale = useLocale();
  const child = mockParentChild;

  const paymentHistory = [
    {
      id: "INV-2026-0901",
      date: "01 Sep 2026",
      item: "Paket Tuntas Program (Coding Starter - 12 Sesi)",
      amount: "Rp2.700.000",
      status: "Lunas",
      method: "BCA Virtual Account",
    },
    {
      id: "INV-2026-0815",
      date: "15 Agu 2026",
      item: "Sesi Percobaan & Asesmen Level Awal (Gratis)",
      amount: "Rp0",
      status: "Selesai",
      method: "Free Trial Promo",
    },
  ];

  return (
    <ParentLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-background font-bold">
                Paket & Pembayaran
              </span>
              <span className="text-xs font-mono text-text-muted">
                Transparan Tanpa Biaya Tersembunyi
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
              Status Paket Belajar {child.nickname}
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
              Kelola paket les privat, sisa kuota pertemuan, masa berlaku, dan riwayat faktur resmi.
            </p>
          </div>

          <Link
            href={`/${locale}/harga`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <span>Perpanjang / Tambah Paket</span>
            <ChevronRight className="w-4 h-4 text-accent" />
          </Link>
        </div>

        {/* Current Active Package Card */}
        <div className="bg-background rounded-3xl border border-secondary p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> Paket Aktif
            </span>
            <span className="text-xs font-mono text-text-muted">
              ID Murid: {child.id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-text-muted uppercase">Jenis Paket</span>
              <h3 className="text-xl font-bold text-primary">{child.packageType}</h3>
              <p className="text-xs text-text-muted">
                Total {child.totalPackageSessions} sesi tatap muka langsung ke rumah.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-text-muted uppercase">Sisa Kuota Belajar</span>
              <h3 className="text-xl font-bold text-primary">
                {child.remainingSessions} dari {child.totalPackageSessions} Sesi
              </h3>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${((child.totalPackageSessions - child.remainingSessions) / child.totalPackageSessions) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-text-muted uppercase">Masa Berlaku</span>
              <h3 className="text-xl font-bold text-primary">{child.validUntil}</h3>
              <p className="text-xs text-text-muted">
                Sesi dapat dijadwalkan ulang secara fleksibel sebelum masa berlaku habis.
              </p>
            </div>
          </div>

          {/* Pricing Policy Highlights */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-secondary grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Biaya Transportasi Rp0 (All-In)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garansi Reschedule &gt;24 Jam</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Diskon Duo 25% (Belajar Berdua)</span>
            </div>
          </div>
        </div>

        {/* Invoice and Payment History Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-muted">
            Riwayat Pembayaran & Faktur
          </h3>

          <div className="bg-background rounded-3xl border border-secondary overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/40 border-b border-secondary font-mono text-text-muted uppercase text-[10px]">
                  <tr>
                    <th className="p-4">No. Faktur</th>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Rincian Paket</th>
                    <th className="p-4">Metode Bayar</th>
                    <th className="p-4">Total</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary">
                  {paymentHistory.map((inv) => (
                    <tr key={inv.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono font-bold text-primary">{inv.id}</td>
                      <td className="p-4 font-mono text-text-muted">{inv.date}</td>
                      <td className="p-4 font-semibold text-primary">{inv.item}</td>
                      <td className="p-4 font-mono text-text-muted">{inv.method}</td>
                      <td className="p-4 font-mono font-bold text-primary">{inv.amount}</td>
                      <td className="p-4 text-right font-mono">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
}
