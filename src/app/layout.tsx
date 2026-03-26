import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "ACIS Knowledge Base | Baseline Analytics",
  description: "Arm Care Intelligence System (ACIS) - AI-Powered Pitcher Injury Prevention. Interactive training portal for Baseline Analytics leadership.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface-base text-white">
        <Navigation />
        <main className="flex-1 pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
