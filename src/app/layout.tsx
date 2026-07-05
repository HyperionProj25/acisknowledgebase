import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "ACIS Knowledge Base | Baseline Analytics",
  description:
    "Internal knowledge base for the Arm Care Intelligence System (ACIS) by Baseline Analytics: methodology, validation, data definitions, and GTM reference.",
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
