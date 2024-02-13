import Image from "next/image";
import React from "react";
import AI_logo from "../assets/AI_logo.jpeg";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";
import Link from "next/link";
import AILogo from "../assets/AgentInsightSLogo.png";

const AppFooter = () => {
  return (
    <footer className="px-6 pb-2 sm:px-10 bg-gray-950">
      <div className="pt-16">
        <div className="flex flex-row justify-between gap-10 md:flex-row flex-wrap md:mt-0">
          <div className="pr-16">
            <div className="text-2xl font-semibold">
              {/* <Image className="w-[10rem] ml-[-0.3rem]" src={AILogo} alt="" /> */}
              <Link href="/">
                <span className="text-white">Agent</span>
                <span className="text-blue-500">InsightS</span>
              </Link>
              <p className="text-sm text-white font-normal mt-4 sm:max-w-xs">
                AgentInsights transcribes and leverages AI to analyze all your
                calls, providing valuable insights into effective strategies and
                areas for improvement on calls.
              </p>
              <p className="text-sm text-white mt-4 font-medium">Email:</p>
              <a
                href="mailto:partnerships@agentinsights.live"
                className="text-sm text-white font-normal underline underline-offset-4"
                target="_blank"
              >
                partnerships@agentinsights.live
              </a>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="space-y-3">
              <h3 className="font-medium text-base text-white">Company</h3>
              <ul className="space-y-1">
                <li>
                  <Link className="text-gray-200" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#what-we-offer" className="text-gray-200">
                    What we offer
                  </Link>
                </li>
                <li>
                  <Link href="/#solutions" className="text-gray-200">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-200">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-base text-white pr-3">
                Solutions
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-gray-200"
                  >
                    Efficient Task Management
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-gray-200"
                  >
                    AI Call Analysis
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-gray-200"
                  >
                    Lead Management
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-gray-200"
                  >
                    Customer Insights
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-gray-200"
                  >
                    Insightful Analytics
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-center border-l border-white px-2">
            <div className="font-medium text-base text-white block">Social</div>
            <div className="flex justify-start flex-wrap gap-2 ml-[-4px]">
              <a
                rel="noopener noreferrer"
                href="#"
                title="Facebook"
                target="_blank"
                className="flex items-center p-1"
              >
                <ImFacebook className="text-white bg-gray-800 rounded-sm text-3xl p-2" />
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Twitter"
                target="_blank"
                className="flex items-center p-1"
              >
                <FaTwitter className="text-white bg-gray-800 rounded-sm text-3xl p-2" />
              </a>
              <a
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/agent-insights/"
                title="Linkedin"
                target="_blank"
                className="flex items-center p-1"
              >
                <FaLinkedinIn className="text-white bg-gray-800 rounded-sm text-3xl p-2" />
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Instagram"
                target="_blank"
                className="flex items-center p-1"
              >
                <FaInstagram className="text-white bg-gray-800 rounded-sm text-3xl p-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-3 pt-6 text-sm text-center text-white">
        © 2023 - AgentInsights
      </div>
    </footer>
    // <footer className="bg-gray-800 py-8 pb-24 px-4 md:px-20 text-white">
    //   <div className="flex flex-col md:flex-row justify-between gap-8 space-y-8 md:space-y-0">
    //     {/* Column 1 */}
    //     <div className=" flex-1 space-y-4">
    //       <div className="flex items-center space-x-2">
    //         <Image src={AI_logo} alt="AI Logo" width={36} height={36} />
    //         <h1 className="font-bold text-xl">AGENTINSIGHTS</h1>
    //       </div>
    //       <p>
    //         AgentInsights transcribes and leverages AI to analyze all your
    //         calls, providing valuable insights into effective strategies and
    //         areas for improvement on calls.
    //       </p>
    //       <div className="space-y-2">
    //         {/* <h2 className="font-bold">Phone</h2>
    //             <p>123-456-7890</p> */}
    //         <h2 className="font-bold">Email</h2>
    //         <a
    //           href="mailto:partnerships@agentinsights.live"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="hover:underline"
    //         >
    //           partnerships@agentinsights.live
    //         </a>
    //         <h2 className="font-bold">Social</h2>
    //         <div className="flex space-x-4">
    //           <a
    //             href="https://linkedin.com/company/agent-insights"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             <GrLinkedin color="#0077B5" size="1.5em" />{" "}
    //             {/* Blue color for LinkedIn and increased size */}
    //           </a>
    //           <a
    //             href="https://twitter.com/AgentInsights6"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             <FaTwitter color="#0077B5" size="1.5em" />{" "}
    //             {/* White color for Twitter and increased size */}
    //           </a>
    //           {/* Add the icons for the social media links here */}
    //           {/* <i className="icon-class-name"></i> */}
    //           {/* <i className="icon-class-name"></i> */}
    //           {/* ... Add more icons as needed */}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Column 2 */}
    //     {/* Column 2 */}
    //     <div className="flex-1 flex flex-col space-y-2">
    //       <h2 className="font-bold text-lg">Company</h2>
    //       <Link href="/about">About Us</Link>
    //       <Link href="/pricing">Pricing</Link>
    //       <p className="block">Request Demo</p>
    //     </div>

    //     {/* Column 3 */}
    //     <div className="flex-1 space-y-2">
    //       <h2 className="font-bold text-lg">Solutions</h2>
    //       <p className="block">Call Recording APP</p>
    //       <p className="block">AI Coaching</p>
    //       <p className="block">Call Analysis</p>
    //       <p className="block">Language Support</p>
    //       <p className="block">Omnichannel Contact Center</p>
    //     </div>
    //   </div>
    // </footer>
  );
};

export default AppFooter;
