import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const keywordsArray = t("keywords")
    .split(",")
    .map((k) => k.trim());

  return {
    metadataBase: new URL("https://edu.webind.id"),
    title: {
      default: t("title"),
      template: "%s | Webind Edu",
    },
    description: t("description"),
    keywords: keywordsArray,
    authors: [{ name: "Webind Edu", url: "https://edu.webind.id" }],
    creator: "Webind Edu",
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      url: "https://edu.webind.id",
      title: t("ogTitle"),
      description: t("ogDescription"),
      siteName: "Webind Edu",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/webind.svg",
      shortcut: "/webind.svg",
      apple: "/webind.svg",
    },
    alternates: {
      canonical: "https://edu.webind.id",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!['en', 'id'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Webind Edu",
    "url": "https://edu.webind.id",
    "description": t("jsonLdDesc"),
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressLocality": "Indonesia"
    },
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-primary`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LoadingScreen />
          {children}
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
