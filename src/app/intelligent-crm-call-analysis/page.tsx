"use client";

import React, { useEffect } from "react";
import LandingPageHeader from "../components/LandingPageHeader";
import Image from "next/image";
import AppFooter from "../components/AppFooter";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import { FaRegCreditCard } from "react-icons/fa6";
import { FaCog, FaStar } from "react-icons/fa";
import { WiStars } from "react-icons/wi";
import { PiStarFourFill } from "react-icons/pi";

import manager_dashboard from "../assets/manager_dashboard.png";
import efficient_task_management from "../assets/efficient_task_management.png";
import ai_call_analysis from "../assets/ai_call_analysis.png";
import lead_management from "../assets/lead_management.png";
import agent_performance from "../assets/agent_performance.png";
import customer_insights from "../assets/customer_insights.png";
import insightful_analytics from "../assets/insightful_analytics.png";
import { DEMO_UUID } from "@/utils/constants";

const LandingPage = () => {
  //   const searchParams = useSearchParams();
  //   useEffect(() => {
  //     // If no UTM parameters are present, set a cookie to indicate this
  //     const utmKeys = [
  //       "utm_source",
  //       "utm_medium",
  //       "utm_campaign",
  //       "utm_term",
  //       "utm_content",
  //     ];
  //     utmKeys.forEach((key) => {
  //       if (searchParams.has(key)) {
  //         Cookies.set(key, searchParams.get(key) || "", { expires: 7 });
  //       }
  //     });

  //     // if (!hasUtmParams) {
  //     //   console.log("Not present utm");
  //     // } else {
  //     //   console.log("present");
  //     // }
  //   }, [searchParams]);

  return (
    <>
      <LandingPageHeader />
      <div className="">
        <div className="relative isolate  px-6 pt-14 lg:px-8 overflow-x-hidden">
          <div className="relative mx-auto">
            <div className="space-y-24">
              <div className="flex flex-col xl:flex-row justify-between items-center pb- gap-x-10">
                <div className="">
                  <div className="flex flex-col items-center xl:items-start">
                    {/* <div className="px-5 bg-gradient-to-r border max-w-sm mb-8 border-purple-500 text-purple-800 py-2 flex items-center justify-center gap-x-4 rounded-lg">
                      <FaRegCreditCard className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-xs inline-block -ml-2">
                        No Credit Card required
                      </span>
                      <div className="h-5 w-px bg-purple-500"></div> Divider
                      <FaCog className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-xs inline-block -ml-2">
                        Quick Setup
                      </span>
                    </div> */}
                    <h1 className="text-4xl  max-w-3xl text-center xl:text-left font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Transform Your{" "}
                      <span className="text-blue-500">Customer Relations</span>{" "}
                      with{" "}
                      <span className="text-blue-500 ">
                        AI-Powered Call Analysis & CRM{" "}
                        <span className="relative">
                          Intelligence
                          <div className="flex -top-2 -right-7 absolute">
                            <WiStars className="text-blue-600" />
                          </div>
                        </span>
                      </span>
                    </h1>
                    <p className="mt-6  text-sm text-center xl:text-left font-medium text-gray-500">
                      Unlock the full potential of your customer interactions
                      and team performance with our cutting-edge solution.
                      Designed to empower businesses with deep insights and
                      streamlined processes, our platform ensures you&apos;re
                      always a step ahead. Discover how our features redefine
                      the way you connect with customers and manage your team.
                    </p>
                    <div className="mb-3 mx-3 rounded-md shadow-xl shadow-slate-500 md:mx-0 md:mb-0 md:shadow-none bg-blue-500 md:bg-transparent flex items-center justify-center gap-x-2 mt-8 fixed bottom-0 inset-x-0 z-[5000] md:relative">
                      <Link href={`/demo?uuid=${DEMO_UUID}`}>
                        <button
                          type="button"
                          className="rounded-md bg-blue-500 px-6 py-2 text-base font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Get Started
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-8 xl:mt-0 px-4 md:px-20 xl:px-20 flex justify-center items-end">
                  <Image
                    id="bg"
                    className="w-full"
                    src={manager_dashboard}
                    quality={100}
                    alt="Bg Image"
                  />
                  {/* <iframe
                    src="https://www.youtube.com/embed/vEnXpKIKbTM?controls=0&rel=0&showinfo=0&modestbranding=1"
                    title="YouTube video player"
                    className="responsive-iframe border-2 rounded-t-xl border-purple-300"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe> */}
                </div>
              </div>
              {/* <div className="relative mx-auto max-w-2xl">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className=" z-[-10] relative h-fit" id="what-we-offer">
        {/* <Image
          id="bg"
          className="absolute z-[-500] w-full h-full"
          src={HowItWorksBg}
          // layout="fill"
          objectFit="cover"
          quality={100}
          alt="Bg Image"
        /> */}
        <section className="isolate px-6 pt-14 lg:px-8 pb-20">
          {/* <div className="font-bold text-3xl mb-16">
            What we <span className="text-blue-500">Offer</span>
          </div> */}
          <div className="">
            <div className="flex flex-col gap-y-7">
              {/* AI Score */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row">
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex items-start w-fit gap-1 font-semibold mb-3 mt-5 md:mt-0 text-2xl md:text-2xl lg:text-3xl relative">
                          <div className="flex -top-6 -left-4 absolute">
                            <FaStar className="text-yellow-400 rotate-45" />
                          </div>
                          <span>Efficient</span>
                          <span className="text-yellow-400">
                            Task Management
                          </span>
                          <div className="flex -top-5 -right-5 absolute">
                            <WiStars className="text-yellow-400" />
                          </div>
                        </h2>
                        <p className="text-gray-700 text-lg md:text-xl">
                          Organize, prioritize, and track every task. Our
                          intuitive dashboard ensures that your team stays
                          productive and on track.
                        </p>
                      </div>
                    </div>
                    {/* <ul className="text-lg md:text-xl md:space-y-3">
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
                    </ul> */}
                  </div>
                </div>
                <div className="w-full max-w-xl">
                  <Image
                    className="rounded-lg object-contain"
                    src={efficient_task_management}
                    alt="AI Score Image"
                  />
                </div>
              </div>
              {/* Call anaylsis */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row-reverse ">
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex gap-1 w-fit font-semibold  mb-3 mt-5 md:mt-0 text-2xl  md:text-2xl lg:text-3xl relative">
                          <div className="flex -top-6 -left-4 absolute">
                            <FaStar className="text-blue-600 rotate-45" />
                          </div>
                          <span>AI</span>
                          <span className="text-blue-600">Call Analysis</span>
                          <div className="flex -top-5 -right-5 absolute">
                            <WiStars className="text-blue-600" />
                          </div>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          Leverage advanced AI to analyze every call, extracting
                          key sentiments, trends, and customer feedback.
                          Transform conversations into valuable insights to
                          enhance decision-making and personalize customer
                          interactions.
                        </p>
                      </div>
                    </div>
                    {/* <ul className="text-lg md:text-xl md:space-y-3">
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
                    </ul> */}
                  </div>
                </div>
                <div className="w-full max-w-xl">
                  <Image
                    className="rounded-lg object-contain"
                    src={ai_call_analysis}
                    alt="AI Score Image"
                  />
                </div>
              </div>
              {/* Lead Management */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row">
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex gap-1 w-fit font-semibold  mb-3 mt-5 md:mt-0 text-2xl  md:text-2xl lg:text-3xl relative">
                          <div className="flex -top-6 -left-4 absolute">
                            <FaStar className="text-indigo-600 rotate-45" />
                          </div>
                          <span>Lead</span>
                          <span className="text-indigo-600"> Management</span>
                          <div className="flex -top-5 -right-5 absolute">
                            <WiStars className="text-indigo-600" />
                          </div>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          Automatically capture leads from various channels and
                          store them in a centralized database for easy access
                          and management.
                        </p>
                      </div>
                    </div>
                    {/* <ul className="text-lg md:text-xl md:space-y-3">
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
                    </ul> */}
                  </div>
                </div>
                <div className="w-full max-w-xl">
                  <Image
                    className="rounded-lg object-contain"
                    src={lead_management}
                    alt="Lead Management"
                  />
                </div>
              </div>
              {/* Agent Performance */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row-reverse">
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex gap-1 w-fit font-semibold  mb-3 mt-5 md:mt-0 text-2xl  md:text-2xl lg:text-3xl relative">
                          <div className="flex -top-6 -left-4 absolute">
                            <FaStar className="text-purple-600 rotate-45" />
                          </div>
                          <span>Agent</span>
                          <span className="text-purple-600">Performance</span>
                          <div className="flex -top-5 -right-5 absolute">
                            <WiStars className="text-purple-600" />
                          </div>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          Elevate your team with real-time analytics on call
                          quality and customer satisfaction.
                        </p>
                      </div>
                    </div>
                    {/* <ul className="text-lg md:text-xl md:space-y-3">
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
                    </ul> */}
                  </div>
                </div>
                <div className="w-full max-w-xl">
                  <Image
                    className="rounded-lg object-contain"
                    src={agent_performance}
                    alt="Agent Performance"
                  />
                </div>
              </div>
              {/* Customer Insights */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row">
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex gap-1 w-fit font-semibold  mb-3 mt-5 md:mt-0 text-2xl  md:text-2xl lg:text-3xl relative">
                          <div className="flex -top-6 -left-4 absolute">
                            <FaStar className="text-teal-600 rotate-45" />
                          </div>
                          <span>Customer</span>
                          <span className="text-teal-600">Insights</span>
                          <div className="flex -top-5 -right-5 absolute">
                            <WiStars className="text-teal-600" />
                          </div>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          Unlock actionable insights from every call to deeply
                          understand and serve your customers better.
                        </p>
                      </div>
                    </div>
                    {/* <ul className="text-lg md:text-xl md:space-y-3">
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
                    </ul> */}
                  </div>
                </div>
                <div className="w-full max-w-xl">
                  <Image
                    className="rounded-lg object-contain"
                    src={customer_insights}
                    alt="AI Score Image"
                  />
                </div>
              </div>
              {/* Insightful Analytics */}
              <div className="flex relative mx-auto flex-col gap-x-10 items-center md:items-center md:flex-row-reverse">
                <div className="flex-grow">
                  <div className="">
                    <div className="flex mb-4 max-w-3xl">
                      <div>
                        <h2 className="flex gap-1 w-fit font-semibold  mb-3 mt-5 md:mt-0 text-2xl  md:text-2xl lg:text-3xl relative">
                          <div className="flex -top-6 -left-4 absolute">
                            <FaStar className="text-lime-400 rotate-45" />
                          </div>
                          <span>Insightful</span>
                          <span className="text-lime-400">Analytics</span>
                          <div className="flex -top-5 -right-5 absolute">
                            <WiStars className="text-lime-400" />
                          </div>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl">
                          Gain deep insights into your sales processes, customer
                          behavior, and team performance with comprehensive
                          reporting tools.
                        </p>
                      </div>
                    </div>
                    {/* <ul className="text-lg md:text-xl md:space-y-3">
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
                    </ul> */}
                  </div>
                </div>
                <div className="w-full max-w-xl">
                  <Image
                    className="rounded-lg object-contain"
                    src={insightful_analytics}
                    alt="AI Score Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <div>
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
      </div> */}

      <AppFooter />
    </>
  );
};

export default LandingPage;
