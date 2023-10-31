import React from "react";
import LandingPageHeader from "./components/LandingPageHeader";
import Image from "next/image";
import landing_agent from "./assets/landing_agent.png";
import { FcCheckmark } from "react-icons/fc";
import how_AI_works_1 from "./assets/how_AI_works_1.png";
import how_AI_works_2 from "./assets/how_AI_works_2.png";
import how_AI_works_3 from "./assets/how_AI_works_3.png";
import floating_demo from "./assets/floating_demo.png";
import android_app from "./assets/android_app.png";
import analytics_dash from "./assets/analytics_dash.png";
import AppFooter from "./components/AppFooter";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen">
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
              <Link href="/demo?uuid=mH1kAN4rNDciWTYBWWh5">
                <button className="font-bold px-2 py-1 md:px-4 md:py-2 border-2 border-blue-700 bg-white text-blue-700 hover:bg-blue-700 hover:text-white rounded-full ">
                  Upload Your Audio and Witness the Transformation
                </button>
              </Link>
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

        <section className="bg-gradient-to-r from-indigo-600 to-pink-500 p-2 md:p-4">
          <div className="text-center text-white text-xl font-bold md:text-3xl p-4">
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
              <div className="text-3xl pb-8 pt-5  font-bold">Call Analysis</div>
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
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 py-8">
          <div className="flex flex-col align-middle p-4">
            <div className="text-3xl font-bold">Call Recording App</div>
            <div className="h-full flex flex-col   ">
              <div className="py-4 text-xl">
                Our Call Recording Android App delivers a 99.8% hassle-free
                solution, ensuring 100% clarity, top-tier data security, and 95%
                seamless recording rates, addressing the technical challenges
                that have historically plagued such features
              </div>
              <div className="flex pt-4 md:pt-4">
                <a
                  href="mailto:partnerships@agentinsights.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline w-full md:w-fit"
                >
                  <button className="font-bold px-2 py-1 md:px-4 md:py-2 w-full md:w-fit border-2 border-blue-700 hover:bg-white hover:text-blue-700 bg-blue-700 text-white rounded-full ">
                    Contact Us
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center align-middle p-4">
            <Image className="w-[30rem]" src={android_app} alt="" />
          </div>
        </section>
        <section className="bg-gradient-to-r from-indigo-600 to-pink-500  md:p-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 py-8">
          <div className="h-full flex flex-col p-4 space-y-4 text-center md:text-left ">
            <div className="text-3xl font-bold text-white">
              ANALYTICS DASHBOARD
            </div>
            <div className="pb-4 text-xl text-white">
              Get a custom view of important numbers, offering clear insights
              for every job role. Make twice as smart decisions using
              easy-tounderstand data just for you. Plus, our user-friendly
              dashboard means anyone can quickly find and use key information,
              helping your whole team make better choices with data.
            </div>
          </div>
          <div className="flex justify-center align-middle p-4">
            <Image className="w-[20rem]" src={analytics_dash} alt="" />
          </div>
        </section>
        <section className="bg-white p-2 md:p-4">
          <div className="text-center text-xl font-bold md:text-3xl p-4">
            Custom Solutions for Each Team Member
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 text-center text-white">
            <div className="shadow-md rounded-md p-4 bg-gradient-to-b from-indigo-600 to-pink-500 flex  flex-col">
              <div className="text-3xl pb-8 font-bold">Decision-Makers</div>
              <div>
                Dive into a world of easy agent reviews. Use our AI Analytics
                Dashboard to quickly access call data, highlighting areas for
                praise and growth.
              </div>
            </div>
            <div className="shadow-md rounded-md bg-gradient-to-b from-indigo-600 to-pink-500 p-4  flex  flex-col">
              <div className="text-3xl pb-8   font-bold">Managers</div>
              <div>
                Enhance team results with a glance! Navigate through smart
                analytics and employ AI-driven strategies to uplift and guide
                your team to excellence in every customer interaction.
              </div>
            </div>
            <div className="shadow-md rounded-md bg-gradient-to-b from-indigo-600 to-pink-500 p-4  flex  flex-col">
              <div className="text-3xl pb-8 font-bold">Agents</div>
              <div>
                Amplify your customer service with real-time AI coaching,
                ensuring you deliver consistently exemplary interactions,
                nurturing customer satisfaction and loyalty with every call
              </div>
            </div>
          </div>
        </section>
        <AppFooter />
      </main>
      <Link href="/demo?uuid=mH1kAN4rNDciWTYBWWh5">
        <div className="fixed bottom-0 right-0 mr-[-1rem] mb-[-0.5rem] md:hidden  flex items-center justify-center ">
          <Image
            src={floating_demo}
            className="w-36"
            alt="floating demo button"
          />
        </div>
      </Link>
    </div>
  );
};

export default LandingPage;
