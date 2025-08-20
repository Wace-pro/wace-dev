"use client";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion, Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <footer>
      <motion.div
        className="first-wrapper pb-48"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20 mx-auto second-wrapper">
          {/* Left Section */}
          <motion.div variants={item} className="flex-1 max-w-xs">
            <div className="flex items-center gap-x-3 mb-4">
              <Image
                src="/logo.png"
                alt="WACE Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <div className=" font-bold text-xl text-white">WACE</div>
            </div>
            <p className="text-2 mb-6">
              Wace is an Ai powered platform that gives entrepreneurs everything
              they need for their business to launch from initial research to
              final execution.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[Twitter, Facebook, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5, color: "#fff" }}
                  whileTap={{ scale: 0.9 }}
                  className="transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            variants={container}
            className="flex flex-wrap md:flex-nowrap gap-10 flex-1 justify-between"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Company */}
            <motion.div variants={item}>
              <h4 className="text-electricBlue  text-2 font-semibold mb-7">
                COMPANY
              </h4>
              <ul className="space-y-5 text-sm">
                {["About", "Features", "Works", "Career"].map((link) => (
                  <motion.li
                    whileHover={{ x: 3, color: "#fff" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    key={link}
                    variants={item}
                  >
                    <Link href="#">{link}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Help */}
            <motion.div variants={item}>
              <h4 className="text-electricBlue  text-2 font-semibold mb-7">
                HELP
              </h4>
              <ul className="space-y-5 text-sm">
                {[
                  "Customer Support",
                  "Terms & Conditions",
                  "Privacy Policy",
                ].map((link) => (
                  <motion.li
                    whileHover={{ x: 3, color: "#fff" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    key={link}
                    variants={item}
                  >
                    <Link href="#">{link}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={item}>
              <h4 className="text-electricBlue  text-2 font-semibold mb-7">
                RESOURCES
              </h4>
              <ul className="space-y-5 text-sm">
                {["Courses 1", "Courses-Courses", "Courses 3", "Courses 4"].map(
                  (link) => (
                    <motion.li
                      whileHover={{ x: 3, color: "#fff" }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      key={link}
                      variants={item}
                    >
                      <Link href="#">{link}</Link>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
