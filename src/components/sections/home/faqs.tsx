"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How does Jinx work?",
    answer:
      "Jinx is an advanced AI assistant trained on thousands of successful business cases and strategies. It analyzes your specific situation, industry, and goals to provide personalized recommendations. Jinx can help with business planning, market research, strategy development, and day-to-day operational decisions. The AI continuously learns from your interactions to provide increasingly relevant and valuable insights.",
  },
  {
    question: "What are WCP points and how do I earn them?",
    answer:
      "WCP (Work Completion Points) are our gamified reward system that encourages consistent progress on your business goals. You earn points by completing tasks, achieving milestones, participating in community discussions, and following AI recommendations. Points can be redeemed for premium features, consultant sessions, exclusive content, and advanced tools. The system is designed to keep you motivated and focused on what matters most for your business success.",
  },
  {
    question: "Is my business data secure?",
    answer:
      "Absolutely. Every piece of your business information is protected with enterprise-grade AES-256 encryption both in transit and at rest. It remains under your complete control — never shared, sold, or used without your consent. We operate under strict SOC 2 Type II standards and follow GDPR guidelines, ensuring your data is handled with the same care trusted by leading financial institutions. At any moment, you can export or permanently delete it — your data, your rules.",
  },
  {
    question: "What makes this different from other business tools?",
    answer:
      "Our platform uniquely combines AI-powered business planning, expert consultant access, gamified progress tracking, and a supportive community all in one place. Unlike fragmented solutions, we provide an end-to-end entrepreneurial journey from idea validation to scaling. Our AI is specifically trained for business contexts, and our consultant network includes verified industry experts with proven track records.",
  },
  {
    question: "How accurate are the AI business plan recommendations?",
    answer:
      "Our AI uses a multi-layered approach — blending insights from thousands of verified business successes, real-time market data, and advanced filtering techniques to remove bias and noise. This ensures the recommendations you receive are not only relevant but strategically precise. Many entrepreneurs describe the results as “spot-on” because the system adapts to your unique goals and industry context, giving you a plan that feels custom-crafted for your success.",
  },
  {
    question: "What if I'm not technical? Can I still use the platform?",
    answer:
      "Absolutely! Our platform is designed for entrepreneurs of all technical backgrounds. The interface is intuitive, and our AI guides you through setup and daily usage with simple, clear explanations.",
  },
];

const FAQS = () => {
  //   const containerRef = useRef(null);
  //   const inView = useInView(containerRef, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="">
      <div className="first-wrapper pt-48">
        <div className="second-wrapper">
          <h2 className="heading-2 graident-primary-for-text w-fit mx-auto text-center mb-9">
            FAQ's
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl text-1 mx-auto text-center mb-16"
          >
            Get personalized advice from AI versions of industry experts who've
            built and scaled successful companies
          </motion.p>

          <div
            // ref={containerRef}
            className=""
          >
            {faqData.map((item, i) => (
              <FAQsList
                {...item}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
                index={i}
                key={item.question + i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQS;

function FAQsList({
  index,
  question,
  answer,
  setOpenIndex,
  openIndex,
}: {
  index: number;
  question: string;
  answer: string;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  openIndex: number | null;
}) {
  return (
    <div
      className={`mb-4 rounded-lg overflow-hidden border ${openIndex === index ? "border-electricBlue" : "border-white/20"} bg-[#00070F]`}
    >
      <button
        className={` w-full text-left text-2 px-5 py-4 ${openIndex === index ? "text-electricBlue" : "text-white"} font-medium flex justify-between items-center `}
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
      >
        {question}
        <motion.span
          animate={{ rotate: openIndex === index ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="size-6 text-white" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {openIndex === index && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="overflow-hidden"
          >
            {/* Curtain Reveal Effect */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className=""
            >
              <div className="px-5 py-4 text-1 leading-relaxed">{answer}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
