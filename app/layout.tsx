import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navmenu from "@/components/home/Navmenu";
import Footer from "@/components/home/Footer";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/home/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eato - Food Delivery Platform",
  description: "This is a project made as a part of a challenge to demonstrate my skills in Next.js, this does not represent any real product.",
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
      >
        <Toaster position="top-center" richColors theme="light" />
        <main className="min-h-screen pb-16 md:pb-0 lg:px-80">
          {children}
          {/* <Footer /> */}
        </main>

        <Navmenu />
        <Footer />
      </body>
    </html>
  );
}
