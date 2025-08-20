"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Jinx", href: "#jinx" },
  { label: "Jounaling", href: "#journal" },
  { label: "FAQs", href: "#faqs" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full relative z-50 bg-[#00070F]">
      <nav className="flex items-center justify-between px-4  py-4">
        <div className="flex items-center gap-x-4">
          <Image src="/logo.png" alt="WACE Logo" width={32} height={32} className="object-contain" />
          <div className=" font-bold text-xl text-white">WACE</div>
        </div>

        {/* Animated hamburger */}
        <button
          className="md:hidden flex flex-col gap-[6px] justify-center items-center w-8 h-8 relative"
          onClick={() => setOpen(!open)}
          title={open ? "Close menu" : "Open menu"}
          aria-label="Toggle navigation menu"
        >
          {/* Top line */}
          <motion.span
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-[2px] bg-white rounded"
          />
          {/* Middle line */}
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-[2px] bg-white rounded"
          />
          {/* Bottom line */}
          <motion.span
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-[2px] bg-white rounded"
          />
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-x-5 ">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                title={link.label}
                href={link.href}
                className="hover:text-white focus:outline focus:outline-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-5 items-center">
          <Link href="/signin" className="text-white/70 hover:text-white">
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors bg-white hover:bg-white/80 focus:bg-white/80 text-black base-btn-padding inline-block"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* overlay */}
      <div
        className={`absolute h-svh backdrop-blur-sm  inset-x-0 bg-black/30 transition-opacity duration-300 ${
          open ? "block md:hidden" : "hidden pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile dropdown with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobileMenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="md:hidden bg-[#00070F]  overflow-hidden absolute top-full left-0 w-full shadow-lg"
          >
            <motion.div
              className="px-4 py-4 space-y-2"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.05 },
                },
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    className="block w-full py-2 hover:underline hover:text-white focus:outline focus:outline-white"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <hr className="border-white/10 my-2" />
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href="/signin"
                  className="block py-2 hover:text-white focus:outline focus:outline-white"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href="/dashboard"
                  className="block transition-colors bg-white hover:bg-white/80 focus:bg-white/80 text-black base-btn-padding"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
