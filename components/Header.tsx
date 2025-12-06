"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-soft-mist/95 backdrop-blur-xl border-b border-accent-clay/30 shadow-sm">
      <nav className="container mx-auto px-4 py-5 flex justify-between items-center max-w-6xl">
        {/* Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="text-xl font-light text-charcoal-dark tracking-wide group-hover:text-accent-rose transition-colors duration-300">
            半山輕語
          </span>
          <span className="text-xs text-charcoal-light font-serif italic">
            Midway Spark
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-base font-light">
          {["首頁", "生活誌", "思維室", "關於我"].map((item, index) => {
            const href =
              index === 0
                ? "/"
                : `/${["journal", "thinking", "about"][index - 1]}`;
            return (
              <Link
                key={item}
                href={href}
                className="text-charcoal-dark hover:text-accent-rose transition-colors relative group py-1"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-glow-warm to-glow-gentle group-hover:w-full transition-all duration-300"></span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-charcoal hover:text-accent-rose transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="選單"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-soft-mist/95 backdrop-blur-xl border-t border-accent-clay/30 shadow-lg"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4 font-light">
              {[
                { name: "首頁", href: "/" },
                { name: "生活誌", href: "/journal" },
                { name: "思維室", href: "/thinking" },
                { name: "關於我", href: "/about" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-charcoal hover:text-accent-rose transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
