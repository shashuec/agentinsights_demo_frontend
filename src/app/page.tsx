"use client";

import React, { useEffect } from "react";
import LandingPageHeader from "./components/LandingPageHeader";
import Image from "next/image";
import AppFooter from "./components/AppFooter";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import { FaRegCreditCard } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { PiStarFourFill } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";

import Hero from "./assets/hero.png";
import AiScore from "./assets/aiScore.png";
import AICallHome from "./assets/AICallHome.png";
import CallAnalysis from "./assets/CallAnalysis.png";
import CustomerInsights from "./assets/CustomerInsights.png";
import CallToAction from "./assets/CallToAction.png";
import CallRecording from "./assets/CallRecording.png";
import DecisionMaker from "./assets/DecisionMaker.png";
import Managers from "./assets/Managers.png";
import Agents from "./assets/Agents.png";
import HowItWorksBg from "./assets/HowItWorksBack.jpg";
import Object1 from "./assets/Object1.png";
import Object2 from "./assets/Object2.png";
import { DEMO_UUID } from "@/utils/constants";

const LandingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // If no UTM parameters are present, set a cookie to indicate this
    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];
    utmKeys.forEach((key) => {
      if (searchParams.has(key)) {
        Cookies.set(key, searchParams.get(key) || "", { expires: 2 });
      }
    });

    // if (!hasUtmParams) {
    //   console.log("Not present utm");
    // } else {
    //   console.log("present");
    // }
  }, [searchParams]);

  const handleNavigation = (path: any) => {
    router.push(path);
  };

  return (
    <>
      <LandingPageHeader />
      <div className="">
        <div className="relative isolate bg-hero-gradient px-6 pt-14 lg:px-8 overflow-x-hidden">
          <div className="relative mx-auto">
            <div className="space-y-24">
              <div className="flex flex-col xl:flex-row justify-between items-center gap-x-10">
                <div className="">
                  <div className="flex flex-col items-center xl:items-start">
                    <div className="px-5 bg-gradient-to-r border max-w-sm mb-8 border-purple-500 text-purple-800 py-2 flex items-center justify-center gap-x-4 rounded-lg">
                      <FaRegCreditCard className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-xs inline-block -ml-2">
                        No Credit Card required
                      </span>
                      {/* <div className="h-5 w-px bg-purple-500"></div> Divider */}
                      <FaCog className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-xs inline-block -ml-2">
                        Quick Setup
                      </span>
                    </div>
                    <h1 className="text-4xl max-w-3xl text-center xl:text-left font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Elevate Call Operations with{" "}
                      <span className="text-blue-500">AI Excellence</span>
                    </h1>
                    <p className="mt-6 text-lg text-center xl:text-left leading-8 font-medium text-gray-600">
                      AI-Powered Call Operations: Data-Driven, Customer-Centric
                      Excellence
                    </p>
                    <div className="hidden md:flex md:mb-0 md:mx-0 md:shadow-none bg-transparent items-center justify-center gap-x-2 mt-8 relative">
                      <Link href={`/demo?uuid=${DEMO_UUID}`}>
                        <button
                          type="button"
                          className="rounded-md bg-blue-500 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Upload Your Audio and Witness the Transformation
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="relative mt-8 xl:mt-0 px-4 md:px-20 xl:px-20 flex justify-center items-end">
                  <Image
                    id="bg"
                    className="absolute -z-50 w-full"
                    src="/VideoBg.svg"
                    width={100}
                    height={100}
                    // layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt="Bg Image"
                  />
                  <iframe
                    src="https://www.youtube.com/embed/vEnXpKIKbTM?controls=0&rel=0&showinfo=0&modestbranding=1"
                    title="YouTube video player"
                    className="responsive-iframe border-2 rounded-t-xl border-purple-300"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="relative mx-auto max-w-2xl">
                <div className="-mt-10">
                  <Image
                    className="absolute z-[-10] -left-20 -top-96 xl:-top-8 w-28 h-28 md:-left-40 md:w-40 md:h-40"
                    src={Object1}
                    // layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt="Bg Image"
                  />
                  <Image
                    className="absolute z-[-10] right-[-5rem] md:-right-36 -top-96 xl:-top-10 w-28 h-28 md:w-40 md:h-40"
                    src={Object2}
                    // layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt="Bg Image"
                  />
                  <Image
                    className="w-full md:w-[80rem] object-contain"
                    src={Hero}
                    alt="Landing Agent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="relative h-fit" id="what-we-offer">
        <section className="isolate relative lg:px-8 pb-12"></section>
      </div> */}
      <div className="relative h-fit" id="what-we-offer">
        <Image
          id="bg"
          className="absolute z-[-500] w-full h-full"
          src={HowItWorksBg}
          // layout="fill"
          objectFit="cover"
          quality={100}
          alt="Bg Image"
        />

        <section className="isolate relative px-6 lg:px-8 pb-20">
          <div className="mb-20">
            <div className="flex flex-col gap-y-0">
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row-reverse">
                <div className="w-full max-w-lg md:max-w-md flex-shrink">
                  <Image
                    className="rounded-lg object-contain"
                    src={AICallHome}
                    alt="AI Score Image"
                  />
                </div>
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex font-semibold text-blue-500 mb-3 mt-5 md:mt-0">
                          <span>
                            <PiStarFourFill className="text-blue-500 inline text-md mr-2" />
                          </span>
                          <span className="text-2xl md:text-2xl lg:text-3xl">
                            Create voice based AI agents{" "}
                          </span>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          An end to end platform to build, deploy and monitor
                          voice-based AI agents.
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full flex-col justify-center py-4">
                      <button
                        onClick={() => handleNavigation("/ai-call")}
                        className=" w-fit cursor-pointer text-center rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold"
                        style={{ zIndex: 100 }}
                      >
                        Create your first agent{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-6xl">
                  <iframe
                    src="https://www.youtube.com/embed/_ZyhrF1FF6M?controls=0&rel=0&showinfo=0&modestbranding=1"
                    title="YouTube video player"
                    className="w-full h-72 md:h-96 xl:h-[410px] z-50 border-0 rounded-xl shadow-even shadow-slate-500"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="font-bold text-3xl mb-16">
            What we <span className="text-blue-500">Offer</span>
          </div>
          <div className="">
            <div className="flex flex-col gap-y-20">
              {/* AI Score */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row">
                <div className="w-full max-w-lg md:max-w-md flex-shrink">
                  <Image
                    className="rounded-lg object-contain"
                    src={AiScore}
                    alt="AI Score Image"
                  />
                </div>
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex font-semibold text-blue-500 mb-3 mt-5 md:mt-0">
                          <span>
                            <PiStarFourFill className="text-blue-500 inline text-md mr-2" />
                          </span>
                          <span className="text-2xl md:text-2xl lg:text-3xl">
                            AI Score
                          </span>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          Explore rich customer insights through advanced
                          analytics, guiding strategic decisions and fostering
                          continuous improvement.
                        </p>
                      </div>
                    </div>
                    <ul className="text-lg md:text-xl md:space-y-3">
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Precision Assessment with AI
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Efficient Feedback Mechanism
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Enhance Decision-Making
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Call anaylsis */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row-reverse">
                <div className="w-full max-w-lg md:max-w-md flex-shrink">
                  <Image
                    className="rounded-lg object-contain"
                    src={CallAnalysis}
                    alt="AI Score Image"
                  />
                </div>
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex font-semibold text-blue-500 mb-3 mt-5 md:mt-0">
                          <span>
                            <PiStarFourFill className="text-blue-500 inline text-md mr-2" />
                          </span>
                          <span className="text-2xl md:text-2xl lg:text-3xl">
                            Call Analysis
                          </span>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          Using call analysis, you&apos;ll obtain automated
                          feedback, AI scoring, and call transcriptions,
                          resulting in performance assessment and actionable
                          insights
                        </p>
                      </div>
                    </div>
                    <ul className="text-lg md:text-xl md:space-y-3">
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Call Transcriptions
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Performance Assessment
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Actionable Insights
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Customer insights */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row">
                <div className="w-full max-w-lg md:max-w-md flex-shrink">
                  <Image
                    className="rounded-lg object-contain"
                    src={CustomerInsights}
                    alt="AI Score Image"
                  />
                </div>
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex font-semibold text-blue-500 mb-3 mt-5 md:mt-0">
                          <span>
                            <PiStarFourFill className="text-blue-500 inline text-md mr-2" />
                          </span>
                          <span className="text-2xl md:text-2xl lg:text-3xl">
                            Customer Insights
                          </span>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          Explore rich customer insights through advanced
                          analytics, guiding strategic decisions and fostering
                          continuous improvement.
                        </p>
                      </div>
                    </div>
                    <ul className="text-lg md:text-xl md:space-y-3">
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Customer-Centric Analytics
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Precision in Decision-Making
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Continuous Improvement Pathway
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Call To Action */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row-reverse">
                <div className="w-full max-w-lg md:max-w-md flex-shrink">
                  <Image
                    className="rounded-lg object-contain"
                    src={CallToAction}
                    alt="AI Score Image"
                  />
                </div>
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex font-semibold text-blue-500 mb-3 mt-5 md:mt-0">
                          <span>
                            <PiStarFourFill className="text-blue-500 inline text-md mr-2" />
                          </span>
                          <span className="text-2xl md:text-2xl lg:text-3xl">
                            Call To Action
                          </span>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          Seize control of your customer experience! Click here
                          to gain valuable insights, enhance performance, and
                          elevate satisfaction.
                        </p>
                      </div>
                    </div>
                    <ul className="text-lg md:text-xl md:space-y-3">
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Elevate Your Experience
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Seamless Communication Awaits
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Transform Insights into Action
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Call Recording App */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row">
                <div className="w-full max-w-lg md:max-w-md flex-shrink">
                  <Image
                    className="rounded-lg object-contain"
                    src={CallRecording}
                    alt="AI Score Image"
                  />
                </div>
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex font-semibold text-blue-500 mb-3 mt-5 md:mt-0">
                          <span>
                            <PiStarFourFill className="text-blue-500 inline text-md mr-2" />
                          </span>
                          <span className="text-2xl md:text-2xl lg:text-3xl">
                            Call Recording App
                          </span>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          With our app, capture 100% of call details, ensuring
                          zero missed interactions and boosting audit & analysis
                          accuracy by up to 95%
                        </p>
                      </div>
                    </div>
                    <ul className="text-lg md:text-xl md:space-y-3">
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Comprehensive Call Capture
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Enhanced Audit Accuracy
                      </li>
                      <li>
                        <GoDotFill className="inline text-yellow-500 mr-2" />
                        Seamless Integration
                      </li>
                    </ul>
                    <div className="flex w-full flex-col justify-center pt-4">
                      <button
                        onClick={() => handleNavigation("/download-app")}
                        className=" w-fit cursor-pointer text-center rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold"
                        style={{ zIndex: 100 }}
                      >
                        Download Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section className="-z-10 flex flex-col bg-blue-50 items-center relative pt-14 lg:px-8 pb-8">
          <div className="font-bold text-3xl mb-10 px-4">
            Custom Solutions for{" "}
            <span className="text-blue-500">Each Team Member</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 text-center text-black">
            <div className="shadow-even rounded-md px-6 pt-6 pb-14 bg-blue-100 flex flex-col">
              <div className="mb-16">
                <Image
                  className="rounded-lg object-contain max-h-72"
                  src={DecisionMaker}
                  alt="AI Score Image"
                />
              </div>
              <div className="text-2xl pb-4 font-semibold text-left">
                Decision-Makers
              </div>
              <div className="text-left">
                Dive into a world of easy agent reviews. Use our AI Analytics
                Dashboard to quickly access call data, highlighting areas for
                praise and growth.
              </div>
            </div>
            <div className="shadow-even rounded-md px-6 pt-6 pb-14 bg-blue-100 flex flex-col">
              <div className="mb-16">
                <Image
                  className="rounded-lg object-contain max-h-72"
                  src={Managers}
                  alt="AI Score Image"
                />
              </div>
              <div className="text-2xl pb-4 font-semibold text-left">
                Managers
              </div>
              <div className="text-left">
                Enhance team results with a glance! Navigate through smart
                analytics and employ AI-driven strategies to uplift and guide
                your team to excellence in every customer interaction.
              </div>
            </div>
            <div className="shadow-even rounded-md px-6 pt-6 pb-14 bg-blue-100 flex flex-col">
              <div className="mb-16">
                <Image
                  className="rounded-lg object-contain max-h-72"
                  src={Agents}
                  alt="AI Score Image"
                />
              </div>
              <div className="text-2xl pb-4 font-semibold text-left">
                Agents
              </div>
              <div className="text-left">
                Amplify your customer service with real-time AI coaching,
                ensuring you deliver consistently exemplary interactions,
                nurturing customer satisfaction and loyalty with every call
              </div>
            </div>
          </div>
        </section>
      </div>

      <AppFooter />
      <div className="mb-3 mx-3 rounded-md shadow-xl shadow-slate-500 bg-blue-500 flex items-center justify-center gap-x-2 mt-8 fixed bottom-0 inset-x-0 z-[5000] md:hidden">
        <Link href={`/demo?uuid=${DEMO_UUID}`}>
          <button
            type="button"
            className="rounded-md bg-blue-500 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Upload Your Audio and Witness the Transformation
          </button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
