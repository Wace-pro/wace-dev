"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import "atropos/css";
import Image from "next/image";
import Link from "next/link";
import { set } from "mongoose";

const StillHaveQuestions = () => {
  const containerRef = useRef(null);
  //   const inView = useInView(containerRef, {});

  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 1", "0 0.1"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.45) {
      setInView(true);
      //   inView(false);
    } else {
      setInView(false);
      //   inView(true);
    }
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["50%", "50%", "20%"]
  );
  const height = useSpring(heightTransform, {
    mass: 0.6,
    stiffness: 300,
    damping: 25,
  });

  return (
    <section ref={containerRef} className=" relative isolate">
      <motion.span
        initial={{ height: "50%" }}
        animate={{ height: inView ? "20%" : "50%" }}
        transition={{
          duration: 1,
          ease: [0.83, 0, 0.17, 1],
          //   type: "spring",
          //   damping: 22,
          //   stiffness: 100,
          //   mass: 0.5,
        }}
        // style={{ height }}
        className="absolute inset-x-0 top-0 bg-[#00070F] rounded-b-3xl"
      />
      <div className="absolute inset-0 -z-10">
        <Image src="/bg-questions.jpg" alt="bg-image" fill className="scale-y-90" />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="first-wrapper py-48 ">
        <div className="second-wrapper flex flex-col items-center">
          <h3 className="heading-2 text-center mb-4 ">Still Have Questions?</h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-xl text-1 mx-auto text-center mb-7"
          >
            Our support team is here to help you succeed. Get in touch for
            personalized assistance.
          </motion.p>
          <Link
            href="/dashboard"
            className="transition-colors text-1 bg-white hover:bg-white/80 focus:bg-white/80 text-black base-btn-padding inline-block"
          >
            Contact Support
          </Link>
        </div>
      </div>
      <motion.span
        initial={{ height: "50%" }}
        animate={{ height: inView ? "20%" : "50%" }}
        transition={{
          duration: 1,
          ease: [0.83, 0, 0.17, 1],
          //   type: "spring",
          //   damping: 22,
          //   stiffness: 100,
          //   mass: 0.5,
        }}
        className="absolute inset-x-0 bottom-0 bg-[#00070F] rounded-b-3xl rotate-180"
      />
    </section>
  );
};

export default StillHaveQuestions;
