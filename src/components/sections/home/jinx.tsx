"use client";
import React, { useRef } from "react";
import { motion } from "motion/react";

import { RefreshCcwDot, UserRoundCog, Split } from "lucide-react";

const features = [
  {
    icon: <RefreshCcwDot className="size-6 text-current" />,
    title: "Realtime Monitoring",
    description: "Tracks your business metrics 24/7",
  },
  {
    icon: <UserRoundCog className="size-6 text-current" />,
    title: "Personalized Guidance",
    description: "Tailored advice based on your progress",
  },
  {
    icon: <Split className="size-6 text-current" />,
    title: "Decision Support",
    description: "Data-driven recommendations for critical choices",
  },
];

const Jinx = () => {
  //   const containerRef = useRef(null);
  //   const inView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className="">
      <div className="first-wrapper pt-48 ">
        <div className="second-wrapper">
          <div className="chip-1 text-1 mx-auto mb-4">Meet Jinx</div>
          <h3 className="heading-3 text-center mb-16">
            Your personal Ai powered
            <br /> Business Assistant
          </h3>

          <div
            // ref={containerRef}
            className="flex flex-col md:flex-row gap-5 max-w-xl md:max-w-full mx-auto"
          >
            <div
              className="flex-[60] aspect-[54/35] rounded-xl border border-white/10 bg-[#0b0f17] p-8 text-center text-white text-xl font-handwriting"
            >
              Your Jinx <br /> Ai agent <br /> Performance <br /> Image
            </div>

            <div className="flex-[40] flex flex-col gap-4 overflow-hidden">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.15 }}
                //   viewport={{ once: true }}
                  className=" flex items-start gap-5 rounded-lg border border-white/10 p-4 hover:border-blue-400/40 transition-colors"
                >
                  <div className="shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="heading-4 mb-2">{feature.title}</h4>
                    <p className="text-2">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jinx;
