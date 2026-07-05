import type { Metadata } from "next";
import ArchiveBanner from "@/components/archive/ArchiveBanner";

export const metadata: Metadata = {
  title: "Archive | ACIS Knowledge Base",
  description:
    "Preserved March 2026 proof-of-concept pages. Not the current system.",
};

export default function ArchiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ArchiveBanner />
      {children}
    </>
  );
}
