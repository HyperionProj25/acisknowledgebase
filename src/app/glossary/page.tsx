"use client";

import { motion } from "framer-motion";
import GlossarySearch from "@/components/GlossarySearch";

export default function GlossaryPage() {
  return (
    <>
      {/* Header */}
      <section className="relative bg-surface-base text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 gold-lines-texture" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Glossary
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Key terms and concepts used throughout the Arm Care Intelligence System (ACIS) knowledge base.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Glossary */}
      <section className="py-12 sm:py-16 bg-surface-card">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <GlossarySearch />
        </div>
      </section>
    </>
  );
}
