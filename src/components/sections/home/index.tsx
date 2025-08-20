import React from "react";
import Hero from "./hero";
import MarketMomentum from "./market-momentum";
import Jinx from "./jinx";
import AiConsultants from "./ai-consulatants";
import FAQS from "./faqs";
import Footer from "./footer";
import StillHaveQuestions from "./still-questions";
import Journaling from "./journaling";

const HomeTemplate = () => {
  return (
    <div className="bg-[#00070F] text-[#C9C9C9]">
      <Hero />
      <MarketMomentum />
      <Jinx />
      <AiConsultants />

      <Journaling />
      <FAQS />
      <StillHaveQuestions />
      <Footer />
    </div>
  );
};

export default HomeTemplate;
