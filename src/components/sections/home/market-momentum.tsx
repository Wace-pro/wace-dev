"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const mockData = [
  {
    title: "Business Timeline",
    description: "12-month roadmap with key milestones",
  },
  {
    title: "Market Analysis",
    description: "TAM, SAM, SOM breakdown with competitors",
  },
  {
    title: "Execution Plan",
    description: "Step-by-step action items and priorities",
  },
  {
    title: "MVP Strategy",
    description: "Minimum viable product specifications",
  },
  {
    title: "Growth Strategy",
    description: "Customer acquisition and retention plan",
  },
  {
    title: "Branding Essentials",
    description: "AI-generated names, taglines & define your brand",
  },
];

const MarketMomentum = () => {
  //   const containerRef = useRef(null);
  //   const inView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className="">
      <div className="first-wrapper pt-48">
        <div className="second-wrapper">
          <h2 className="heading-2 graident-primary-for-text w-fit mx-auto text-center mb-9">
            Features
          </h2>
          <h3 className="heading-3 text-center mb-14">
            We focus on <br /> Market Momentum
          </h3>

          <div
            // ref={containerRef}
            className="grid grid-cols-[repeat(1,minmax(0,350px))] sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
          >
            {mockData.map((item, i) => (
              <Cards {...item} key={item.title + i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketMomentum;

const Cards = ({
  //   inView,
  title,
  description,
}: {
  //   inView: boolean;
  title: string;
  description: string;
}) => {
  {
    const containerRef = useRef<HTMLDivElement>(null);

    const inView = useInView(containerRef, {  margin: "-50px" });
    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover="hoverParent"
        className="relative rounded-lg border transition-colors border-white/10 p-6 group  bg-[#00070F] hover:bg-[#0b0f17] overflow-hidden"
      >
        {/* Glow line on hover */}
        <div className="absolute transition-all duration-200 group-hover:translate-y-1/4 group-hover:top-0 group-hover:opacity-100 opacity-0 top-full left-0  w-[1px] h-[50px] bg-gradient-to-t from-blue-500/0 via-blue-500 to-blue-500/0" />

        <h3 className="text-[20px] sm:text-[24px] lg:text-[26px] font-medium text-electricBlue mb-5">
          {title}
        </h3>
        <p className="text-2">{description}</p>
      </motion.div>
    );
  }
};
