import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Canadian Realtor - Buy & Sell Homes in Canada",
  description: "Modern, AI-ready real estate website for buying and selling homes across Canada. Expert service, qualified leads, and transparent communication.",
  keywords: "real estate, Canada, Toronto, Vancouver, Calgary, homes for sale, realtor, property valuation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
