import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/navigation/TopBar";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingWhatsApp } from "@/components/contact/FloatingWhatsApp";
import {
  BUSINESS_NAME,
  BUSINESS_TYPE,
  LOCATION,
  BRAND_COLORS,
} from "@/config/business";
import { cleanPlaceholder } from "@/lib/placeholders";

const businessName = cleanPlaceholder(BUSINESS_NAME, "Our House");
const businessType = cleanPlaceholder(BUSINESS_TYPE, "Restaurant");
const location = cleanPlaceholder(LOCATION, "Your City");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${businessName} - ${businessType}`,
  description: `Reserve, order, and discover ${businessName} in ${location}. Thoughtful service, refined design, and elevated ${businessType.toLowerCase()} experiences.`,
  metadataBase: new URL("https://agentic-42604388.vercel.app"),
  openGraph: {
    title: `${businessName} - ${businessType}`,
    description: `Book or order from ${businessName} in ${location}.`,
    url: "https://agentic-42604388.vercel.app",
    siteName: businessName,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: `radial-gradient(circle at top, rgba(255,255,255,0.95) 0%, ${BRAND_COLORS.background} 55%)`,
        }}
      >
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-28 pt-6 sm:px-6 lg:px-12">
          <TopBar />
          <main className="flex-1 pt-24">{children}</main>
          <BottomNav />
          <FloatingWhatsApp />
        </div>
      </body>
    </html>
  );
}
