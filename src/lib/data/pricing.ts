export interface ProgramPricing {
  slug: string;
  name: {
    id: string;
    en: string;
  };
  sessions: number;
  perSession: number; // base rate for home private (90 min)
  validWeeks: number;
  portfolioOutput: {
    id: string;
    en: string;
  };
}

export const pricingPrograms: Record<string, ProgramPricing> = {
  "digital-starter": {
    slug: "digital-starter",
    name: {
      id: "Digital Starter",
      en: "Digital Starter",
    },
    sessions: 8,
    perSession: 140000,
    validWeeks: 12,
    portfolioOutput: {
      id: "Paket portofolio dokumen laporan, spreadsheet nilai, dan slide presentasi",
      en: "Complete portfolio package of report documents, spreadsheets, and slides",
    },
  },
  "coding-starter": {
    slug: "coding-starter",
    name: {
      id: "Coding Starter",
      en: "Coding Starter",
    },
    sessions: 10,
    perSession: 160000,
    validWeeks: 14,
    portfolioOutput: {
      id: "Game tebak angka interaktif atau aplikasi kalkulator mandiri (Python / Scratch)",
      en: "Interactive guessing game or standalone calculator app (Python / Scratch)",
    },
  },
  "ai-starter": {
    slug: "ai-starter",
    name: {
      id: "AI Starter",
      en: "AI Starter",
    },
    sessions: 6,
    perSession: 175000,
    validWeeks: 10,
    portfolioOutput: {
      id: "Buku saku panduan etika & prompt toolkit AI untuk belajar mandiri",
      en: "AI ethics handbook & structured prompt toolkit for school study",
    },
  },
  "web-developer": {
    slug: "web-developer",
    name: {
      id: "Web Developer",
      en: "Web Developer",
    },
    sessions: 12,
    perSession: 200000,
    validWeeks: 16,
    portfolioOutput: {
      id: "Website portofolio pribadi responsif yang live online di internet",
      en: "Responsive personal portfolio website deployed live to the web",
    },
  },
  "ai-developer": {
    slug: "ai-developer",
    name: {
      id: "AI Developer",
      en: "AI Developer",
    },
    sessions: 12,
    perSession: 225000,
    validWeeks: 16,
    portfolioOutput: {
      id: "Model Machine Learning terlatih + Web Demo interaktif (Streamlit)",
      en: "Trained Machine Learning model with interactive web demo (Streamlit)",
    },
  },
};

export const PRICING_CONSTANTS = {
  duoDiscount: 0.25, // 25% discount per student for duo classes
  elementaryMultiplier: 0.75, // 60 min session instead of 90 min (75% rate)
  singleSessionMarkup: 15000, // markup for pay-as-you-go single sessions
  monthlySessions: 4,
  monthlyValidWeeks: 6,
};

export type PackageType = "full" | "monthly" | "single";
export type StudentCount = 1 | 2;

export interface CalculationResult {
  program: ProgramPricing;
  packageType: PackageType;
  studentCount: StudentCount;
  isElementary: boolean;
  sessions: number;
  sessionDuration: string;
  perSessionRate: number;
  totalPerStudent: number;
  grandTotal: number;
  validWeeks: number;
}

export function calculatePrice(
  programSlug: string,
  packageType: PackageType,
  studentCount: StudentCount,
  isElementary: boolean
): CalculationResult {
  const program = pricingPrograms[programSlug] || pricingPrograms["coding-starter"];

  let basePerSession = program.perSession;

  // Apply elementary discount (60 min session)
  if (isElementary) {
    basePerSession = Math.round(basePerSession * PRICING_CONSTANTS.elementaryMultiplier);
  }

  // Apply duo discount per student if 2 students
  if (studentCount === 2) {
    basePerSession = Math.round(basePerSession * (1 - PRICING_CONSTANTS.duoDiscount));
  }

  let sessions = 1;
  let validWeeks = 2;
  let finalPerSession = basePerSession;

  if (packageType === "full") {
    sessions = program.sessions;
    validWeeks = program.validWeeks;
  } else if (packageType === "monthly") {
    sessions = PRICING_CONSTANTS.monthlySessions;
    validWeeks = PRICING_CONSTANTS.monthlyValidWeeks;
  } else if (packageType === "single") {
    sessions = 1;
    validWeeks = 2;
    finalPerSession += PRICING_CONSTANTS.singleSessionMarkup;
  }

  const totalPerStudent = finalPerSession * sessions;
  const grandTotal = totalPerStudent * studentCount;

  return {
    program,
    packageType,
    studentCount,
    isElementary,
    sessions,
    sessionDuration: isElementary ? "60 menit / sesi" : "90 menit / sesi",
    perSessionRate: finalPerSession,
    totalPerStudent,
    grandTotal,
    validWeeks,
  };
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppPricingUrl(calc: CalculationResult, locale: "id" | "en" = "id"): string {
  const pkgName =
    calc.packageType === "full"
      ? `Paket Tuntas (${calc.sessions} sesi)`
      : calc.packageType === "monthly"
      ? "Paket Bulanan (4 sesi)"
      : "Sesi Satuan (1 sesi)";

  const formatText =
    calc.studentCount === 2 ? "Duo Belajar Berdua (2 Siswa)" : "Privat 1 Siswa";

  const gradeText = calc.isElementary ? "SD (60 menit)" : "SMP / SMA (90 menit)";

  const message =
    locale === "en"
      ? `Hello Webind Edu, I am interested in registering for the *${calc.program.name.en}* program (${pkgName} - Home Tutoring for ${formatText}, ${gradeText}). Estimated total: ${formatRupiah(calc.grandTotal)}. Are there available tutor schedules in my area?`
      : `Halo Webind Edu, saya ingin konsultasi/daftar untuk program *${calc.program.name.id}* (${pkgName} - Les Datang ke Rumah untuk ${formatText}, ${gradeText}). Estimasi biaya: ${formatRupiah(calc.grandTotal)}. Apakah masih ada slot jadwal tutor di area saya?`;

  return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
}
