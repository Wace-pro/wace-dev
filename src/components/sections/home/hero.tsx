"use client";
import { motion } from "motion/react";
import { BackgroundGrid } from "@/components/background-grid";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const features = ["Validated features", "Community Driven", "AI Integrated"];

 const Hero = () => {
  return (
    <section className="relative isolate min-h-svh">
      {/* // className="relative isolate z-10 min-h-screen bg-black text-white"> */}
      <Navbar />
      <BackgroundGrid />

      <div className=" first-wrapper pt-24">
        <div className="second-wrapper flex flex-col items-center justify-center text-center ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[38px] md:text-[48px] lg:text-[64px] text-white font-light font-poppins max-w-3xl leading-[1.25]"
          >
            {/* text-3xl sm:text-4xl */}
            The fastest way to go <br className="hidden sm:hidden" /> from{" "}
            <span className="graident-primary-for-text font-bold">
              Idea
            </span> to{" "}
            <span className="graident-primary-for-text font-bold">
              Execution
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 max-w-3xl text-1"
          >
            Wace is an AI powered platform that gives entrepreneurs everything
            they need for their business to launch from initial research to
            final execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-6 group"
          >
            <Link href="/signup">
              <button className="min-w-[220px] base-btn-padding graident-primary-dark text-xl flex items-center justify-center gap-3 border-white border-[1px]">
                Sign up
                <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-14 flex flex-wrap gap-4 text-sm text-white/70 justify-center"
          >
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-1">
                <span>✔</span>
                <span>{feature}</span>
              </li>
            ))}
          </motion.ul>

          <div className="border-white border-[1px] bg-[#00070F] aspect-[524/295] w-full rounded-3xl mt-6"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;