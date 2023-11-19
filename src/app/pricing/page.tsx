import Head from "next/head";
import LandingPageHeader from "../components/LandingPageHeader";
import AppFooter from "../components/AppFooter";
import React from "react";
import { Menu, X, Check } from "lucide-react";
import { PiPackageDuotone, PiRocketLaunch } from "react-icons/pi";
import { IoMdArrowForward } from "react-icons/io";

const plans = [
  {
    name: "Starter Plan",
    price: "Free",
    features: [
      "1 Agent",
      "Up to 30hrs per month",
      "Comprehensive Call Recording: Capture 100% of call details, ensuring zero missed interactions.",
      "In-depth Agent Evaluation: Analyze performance meticulously, from individual calls to batch analyses of 300 calls.",
      "Consistent Analysis: Benefit from a system that ensures up to 98% consistency in call evaluation and analysis.",
      "Data-Driven Decision Making: Transform conversations into actionable insights and drive informed decision-making across your organization.",
    ],
  },
  {
    name: "Business Plan",
    price: "$100",
    features: [
      "Up to 60 hrs per month",
      "Comprehensive Call Recording: Capture 100% of call details, ensuring zero missed interactions.",
      "In-depth Agent Evaluation: Analyze performance meticulously, from individual calls to batch analyses of 300 calls.",
      "Consistent Analysis: Benefit from a system that ensures up to 98% consistency in call evaluation and analysis.",
      "Data-Driven Decision Making: Transform conversations into actionable insights and drive informed decision-making across your organization.",
    ],
  },
  {
    name: "Enterpise Plan",
    price: "Custom",
    features: [
      "Comprehensive Call Recording: Capture 100% of call details, ensuring zero missed interactions.",
      "In-depth Agent Evaluation: Analyze performance meticulously, from individual calls to batch analyses of 300 calls.",
      "Consistent Analysis: Benefit from a system that ensures up to 98% consistency in call evaluation and analysis.",
      "Data-Driven Decision Making: Transform conversations into actionable insights and drive informed decision-making across your organization.",
    ],
  },
];

export default function Pricing() {
  return (
    <>
      <LandingPageHeader />
      <div className="bg-pricing-gradient h-screen -skew-y-3 w-full absolute top-[-5vh] z-[-100] overflow-x-hidden"></div>
      <div className="mx-auto max-w-7xl px-2 md:px-4 ">
        {/* Hero Section */}
        <div className="flex flex-col space-y-8 pb-10 pt-12 text-center md:pt-24 ">
          <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-snug">
            Transparent Pricing for{" "}
            <span className="text-blue-500">Unparalleled Insights</span>
          </p>
          <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-xl">
            At Agentinsights, we believe in transparent, straightforward pricing
            that delivers exceptional value and transformative insights for your
            business. Explore our plans and find the one that aligns with your
            business needs.
          </p>
        </div>
        <div className="mt-8 w-full space-y-4 md:mt-12">
          <div className="grid space-y-8 lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            {/* Starter plan */}
            <div
              key={plans[0].name}
              className="rounded-2xl border border-t-4 border-t-green-600 border-gray-200 bg-white shadow"
            >
              <div className="flex w-full flex-col justify-start space-y-4 px-8 pt-10">
                <p className="text-4xl font-bold leading-10 flex justify-between items-center">
                  <span>
                    <PiPackageDuotone className="inline bg-green-50 text-green-500 rounded p-2 text-6xl" />
                  </span>{" "}
                  <span className="text-green-500">{plans[0].price}</span>
                </p>

                <div className="flex w-full flex-col items-start justify-start space-y-1">
                  <p className="w-full text-xl font-semibold leading-loose text-gray-900">
                    {plans[0].name}
                  </p>
                  <p className="w-full text-base leading-normal text-gray-600">
                    Ideal for small teams and startup ventures
                  </p>
                </div>
                <button className="text-blue-500 font-bold py-2 px-4 rounded border border-blue-700 shadow w-fit">
                  Get Started{" "}
                  <IoMdArrowForward className="inline text-blue-500 text-xl mb-[1px]" />
                </button>
                <hr className="my-8" />
              </div>
              <div className="flex w-full flex-col items-start justify-start px-8 pb-10 pt-8">
                <div className="flex w-full flex-col space-y-4">
                  {plans[0].features.map((feature) => (
                    <div
                      key={feature}
                      className="inline-flex w-full space-x-3 items-start"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-700" />
                      </div>
                      <p className="flex-1 w-full text-base leading-normal text-gray-600">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Business plan */}
            <div
              key={plans[1].name}
              className="rounded-2xl border border-t-4 border-t-blue-500 border-gray-200 bg-white shadow"
            >
              <div className="flex w-full flex-col justify-start space-y-4 px-8 pt-10">
                <p className="text-4xl font-bold leading-10 flex justify-between items-center">
                  <span>
                    <PiPackageDuotone className="inline bg-blue-50 text-blue-500 rounded p-2 text-6xl" />
                  </span>{" "}
                  <span>
                    <span className="text-blue-500">{plans[1].price}</span>
                    <span className="block text-xs font-semibold text-gray-400">
                      /Agent/Month
                    </span>
                  </span>
                </p>
                <div className="flex w-full flex-col items-start justify-start space-y-1">
                  <p className="w-full text-xl font-semibold leading-loose text-gray-900">
                    {plans[1].name}
                  </p>
                  <p className="w-full text-base leading-normal text-gray-600">
                    Ideal for SMEs and expanding teams
                  </p>
                </div>
                <button className="text-blue-500 font-bold py-2 px-4 rounded border border-blue-700 shadow w-fit">
                  Get Started{" "}
                  <IoMdArrowForward className="inline text-blue-500 text-xl mb-[1px]" />
                </button>
                <hr className="my-8" />
              </div>
              <div className="flex w-full flex-col items-start justify-start px-8 pb-10 pt-8">
                <div className="flex w-full flex-col space-y-4">
                  {plans[1].features.map((feature) => (
                    <div
                      key={feature}
                      className="inline-flex w-full space-x-3 items-start"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-700" />
                      </div>
                      <p className="flex-1 w-full text-base leading-normal text-gray-600">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Custom */}
            <div
              key={plans[2].name}
              className="rounded-2xl border border-t-4 border-t-red-600 border-gray-200 bg-white shadow"
            >
              <div className="flex w-full flex-col justify-start space-y-4 px-8 pt-10">
                <p className="text-4xl font-bold leading-10 flex justify-between items-center">
                  <span>
                    <PiRocketLaunch className="inline bg-red-50 text-red-500 rounded p-2 text-6xl" />
                  </span>{" "}
                  <span className="text-red-500">{plans[2].price}</span>
                </p>
                <div className="flex w-full flex-col items-start justify-start space-y-1">
                  <p className="w-full text-xl font-semibold leading-loose text-gray-900">
                    {plans[2].name}
                  </p>
                  <p className="w-full text-base leading-normal text-gray-600">
                    Custom-fit for large organizations
                  </p>
                </div>
                <button className="text-blue-500 font-bold py-2 px-4 rounded border border-blue-700 shadow w-fit">
                  Get Started{" "}
                  <IoMdArrowForward className="inline text-blue-500 text-xl mb-[1px]" />
                </button>
                <hr className="my-8" />
              </div>
              <div className="flex w-full flex-col items-start justify-start px-8 pb-10 pt-8">
                <div className="flex w-full flex-col space-y-4">
                  {plans[2].features.map((feature) => (
                    <div
                      key={feature}
                      className="inline-flex w-full space-x-3 items-start"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-700" />
                      </div>
                      <p className="flex-1 w-full text-base leading-normal text-gray-600">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FAQs */}
        <div className="space-y-16 bg-white py-12">
          <div>
            <div className="mt-10">
              <div className="rounded-md bg-gray-50 p-4 md:flex-row md:items-center md:p-8 lg:space-x-8">
                <div className="space-y-2">
                  <p className="text-xl font-medium leading-loose text-black">
                    Note:
                  </p>
                  <p>
                    • All prices are billed annually. Monthly billing is
                    available at a different rate.
                  </p>
                  <p>• Custom plans and features are available upon request.</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="rounded-md bg-gray-50 p-4 md:flex-row md:items-center md:p-8 lg:space-x-8">
                <div className="space-y-2">
                  <p className="text-xl font-medium leading-loose text-black">
                    FAQs
                  </p>
                  <p className="font-medium">How is user defined?</p>
                  <p className="text-gray-600">
                    A user is defined as an individual who has access to the
                    Agentinsights platform, regardless of their role or usage
                    frequency.
                  </p>
                  <p className="font-medium">
                    What happens if I exceed my call recording limit?
                  </p>
                  <p className="text-gray-600">
                    If you exceed your call recording limit, additional charges
                    may apply. Alternatively, you can upgrade your plan to
                    accommodate your needs.
                  </p>
                  <p className="font-medium">Can I change my plan later?</p>
                  <p className="text-gray-600">
                    Absolutely! You can upgrade or downgrade your plan at any
                    time through your account settings.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="rounded-md bg-blue-500 p-4 md:flex-row md:items-center md:p-8 lg:space-x-8">
                <div className="space-y-2">
                  <p className="text-xl font-bold text-white text-center leading-6">
                    Join Us in Transforming Customer Interactions into Strategic
                    Assets
                  </p>
                  <p className="text-base font-medium text-gray-50 md:text-lg md:leading-7 text-center">
                    Get in touch with our sales team to explore how
                    Agentinsights can be your partner in harnessing the
                    unparalleled value of every customer interaction. Let’s
                    build a future where every conversation drives your business
                    forward.
                  </p>
                </div>
                {/* <button
                  type="button"
                  className="mt-4 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:mt-0"
                >
                  Get in Touch
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppFooter />
    </>
  );
}
