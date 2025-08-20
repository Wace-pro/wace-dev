"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef } from "react";




const tasks = [
  { text: "Complete market research", points: "+50 WCP", done: true },
  { text: "Draft business model canvas", points: "+70 WCP", done: true },
  { text: "Conduct 5 customer interviews", points: "+100 WCP", done: true },
  { text: "Create MVP wireframes", points: "+40 WCP", done: false },
  { text: "Write product requirements document", points: "+60 WCP", done: false },
];

const Journaling = () => {
  //   const containerRef = useRef(null);
  //   const inView = useInView(containerRef, { once: true, margin: "-50px" });

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Floating decorators: move outward + rotate on scroll
  const moveX = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const moveY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Track motion value changes (optional debugging)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // console.log("scroll progress:", v);
  });


  return (
    <section ref={containerRef} className="relative">
      <div className="first-wrapper pt-48 ">
        <div className="second-wrapper">
          <div className="chip-1 text-1 mx-auto mb-4">Smart Journaling</div>
          <h3 className="heading-3 text-center mb-4">
            Journaling & WCP Points
          </h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-xl text-1 mx-auto text-center mb-16"
          >
            Track your daily progress, complete tasks, and earn Work Completion
            Points to unlock premium features
          </motion.p>

          <div className="flex flex-col gap-4 mt-8">
            {tasks.map((task, i) => (
              <motion.div
                key={task.text + i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                // viewport={{ once: true }}
                className={`flex items-center justify-between px-6 py-4 rounded-lg border ${
                  task.done
                    ? "bg-gradient-to-r from-indigo-900/60 to-blue-900/40 border-indigo-500/40"
                    : "bg-gray-800/40 border-gray-600/40"
                }`}
              >
                <span
                  className={`${
                    task.done ? "line-through text-indigo-300" : "text-gray-300"
                  }`}
                >
                  {task.text}
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-md ${
                    task.done
                      ? "bg-blue-600/60 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {task.points}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Floating decorators */}
          {/* <motion.div
            className="absolute top-10 left-10 w-16 h-16 rounded-full bg-blue-500/30 backdrop-blur-lg"
            style={{ x: moveX, y: moveY, rotate }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-indigo-400/30 backdrop-blur-lg"
            style={{ x: moveY, y: moveX, rotate }}
          />
          <motion.div
            className="absolute top-1/3 right-16 w-14 h-14 rounded-full bg-purple-500/30 backdrop-blur-lg"
            style={{ x: moveX, y: moveY, rotate }}
          />
          <motion.div
            className="absolute bottom-10 right-1/3 w-24 h-24 rounded-full bg-sky-400/30 backdrop-blur-lg"
            style={{ x: moveY, y: moveX, rotate }}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Journaling;
