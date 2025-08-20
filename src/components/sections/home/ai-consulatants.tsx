"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Atropos from "atropos/react";
import "atropos/css";
import { UserRound } from "lucide-react";

const AiConsultants = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, {
    margin: "-50px",
  });

  const mentors = [
    {
      name: "Alex Chen",
      role: "Tech Startups",
      description: "Former Silicon Valley CTO with 10+ years experience",
      avatar: "/avatars/alex.png",
    },
    {
      name: "Sarah Johnson",
      role: "Marketing & Growth",
      description: "She scaled 5 startups to $10M+ revenue",
      avatar: "/avatars/sarah.png",
    },
    {
      name: "Michael Rodriguez",
      role: "Fundraising",
      description: "Investment banker turned startup advisor",
      avatar: "/avatars/michael.png",
    },
    {
      name: "Emma Thompson",
      role: "Product Strategy",
      description: "Product manager at top unicorn startups",
      avatar: "/avatars/emma.png",
    },
  ];

  return (
    <section className="">
      <div className="first-wrapper pt-48 ">
        <div className="second-wrapper">
          <h3 className="heading-3 text-center mb-5">Ai Consultant Team</h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 max-w-3xl text-1 mx-auto text-center mb-16"
          >
            Get personalized advice from AI versions of industry experts who've
            built and scaled successful companies
          </motion.p>

          <div
            ref={containerRef}
            className="grid justify-center max-[560px]:grid-cols-[repeat(1,minmax(0,300px))] grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-7 "
          >
            {mentors.map((mentor, idx) => (
              <div  key={idx}>
                <Atropos
                  shadow={false}
                  highlight={false}
                  rotateXMax={8}
                  rotateYMax={8}
                  activeOffset={40}
                  innerClassName="!overflow-visible"
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 40,
                      transition: { duration: 0, delay: 0 },
                    }}
                    animate={
                      inView
                        ? {
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: idx * 0.15,
                              duration: 0.3,
                              ease: "easeOut",
                            },
                          }
                        : {}
                    }
                    data-atropos-offset="-5"
                    className=" p-5 rounded-xl border border-gray-800 hover:bg-electricBlue/10 flex flex-col items-center text-center "
                  >
                    <div className="relative w-20 h-20 mb-5">
                      {/* <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-20 h-20 rounded-full border border-gray-700"
                      data-atropos-offset="5"
                    /> */}
                      <div
                        className="rounded-full bg-gray-600 flex justify-center items-center size-20"
                        data-atropos-offset="7"
                      >
                        <UserRound className="size-16" strokeWidth="1px" />
                      </div>
                      <span
                        className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border border-black"
                        data-atropos-offset="-10"
                      />
                    </div>
                    <h3
                      className="text-xl font-medium text-white"
                      data-atropos-offset="5"
                    >
                      {mentor.name}
                    </h3>
                    <p
                      className="text-electricBlue text-lg font-light"
                      data-atropos-offset="4"
                    >
                      {mentor.role}
                    </p>
                    <p className="text-1 text-sm mt-5" data-atropos-offset="6">
                      {mentor.description}
                    </p>
                  </motion.div>
                </Atropos>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiConsultants;
