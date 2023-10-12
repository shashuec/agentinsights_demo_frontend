import React from "react";
import LandingPageHeader from "./components/LandingPageHeader";
import Image from "next/image";
import landing_agent from "./assets/landing_agent.png";
import { FcCheckmark } from "react-icons/fc";
import how_AI_works_1 from "./assets/how_AI_works_1.png";
import how_AI_works_2 from "./assets/how_AI_works_2.png";
import how_AI_works_3 from "./assets/how_AI_works_3.png";

const LandingPage = () => {
  return (
    <div className="relative">
      <LandingPageHeader />
      <main>
        <section className="flex flex-col-reverse md:flex-row p-2 md:p-4 md:px-[5rem] align-middle justify-center gap-4 pt-4 md:pt-8">
          <div className="flex flex-col my-auto align-middle">
            <div className="text-2xl md:text-4xl text-center md:text-left font-bold">
              Empower Your Call Operations with Smart, Accessible AI Solutions
            </div>

            <div className="pt-2 md:pt-4 text-base md:text-xl text-center md:text-left">
              Seamlessly integrate innovative AI technology to elevate your call
              operations, ensuring every interaction is data-driven, insightful,
              and customer-centric.
            </div>
            <div className="flex pt-4 md:pt-4">
              <button className="font-bold px-2 py-1 md:px-4 md:py-2 border-2 border-blue-700 bg-white text-blue-700 hover:bg-blue-700 hover:text-white rounded-full ">
                Upload Your Audio and Witness the Transformation
              </button>
            </div>
            <div className="flex align-middle pt-4 md:pt-8 gap-2 md:gap-4 font-bold">
              <div className="flex align-middle gap-1 md:gap-2">
                <FcCheckmark size="1.5rem" />
                <span>No Credit Card required</span>
              </div>
              <div className="flex align-middle gap-1 md:gap-2">
                <FcCheckmark size="1.5rem" />
                <span>Quick setup</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center align-middle">
            <Image
              className="w-full md:w-[80rem] object-contain"
              src={landing_agent}
              alt="Landing Agent"
            />
          </div>
        </section>

        <section className="bg-blue-200 p-2 md:p-4">
          <div className="text-center text-xl font-bold md:text-3xl p-4">
            How AgentInsightS Works
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 text-center">
            <div className="shadow-md rounded-md p-4 bg-white flex justify-center flex-col">
              <div className="flex justify-center">
                <Image className="w-[15rem]" src={how_AI_works_1} alt="" />
              </div>
              <div className="text-3xl pb-8 font-bold">Call Recording App</div>
              <div>
                With our app, capture 100% of call details, ensuring zero missed
                interactions and boosting audit & analysis accuracy by up to 95%
              </div>
            </div>
            <div className="shadow-md rounded-md p-4 bg-white flex justify-center flex-col">
              <div className="flex justify-center">
                <Image className="w-[15rem] " src={how_AI_works_2} alt="" />
              </div>
              <div className="text-3xl pb-8 pt-4  font-bold">Call Analysis</div>
              <div>
                Using call analysis, you&apos;ll obtain automated feedback, AI
                scoring, and call transcriptions, resulting in performance
                assessment and actionable insights
              </div>
            </div>
            <div className="shadow-md rounded-md p-4 bg-white flex justify-center flex-col">
              <div className="flex justify-center">
                <Image className="w-[15rem]" src={how_AI_works_3} alt="" />
              </div>
              <div className="text-3xl pb-8 font-bold">AI Coaching</div>
              <div>
                Using AI-driven guidance, enhance agent performance. and elevate
                customer interaction quality by up to 40%
              </div>
            </div>
          </div>
        </section>
        <section>
          <div>
            <div>Call Recording App</div>
            <div>
              Our Call Recording Android App delivers a 99.8% hassle-free
              solution, ensuring 100% clarity, top-tier data security, and 95%
              seamless recording rates, addressing the technical challenges that
              have historically plagued such features
            </div>
            <div>Download the App</div>
          </div>
          <div className="flex justify-center">
            <Image className="w-[15rem]" src={how_AI_works_3} alt="" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
