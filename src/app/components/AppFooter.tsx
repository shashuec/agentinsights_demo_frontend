import Image from "next/image";
import React from "react";
import AI_logo from "../assets/AI_logo.jpeg";
import { GrLinkedin } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";

const AppFooter = () => {
  return (
    <footer className="bg-gray-800 py-8 pb-24 px-4 md:px-20 text-white">
      <div className="flex flex-col md:flex-row justify-between gap-8 space-y-8 md:space-y-0">
        {/* Column 1 */}
        <div className=" flex-1 space-y-4">
          <div className="flex items-center space-x-2">
            <Image src={AI_logo} alt="AI Logo" width={36} height={36} />
            <h1 className="font-bold text-xl">AGENTINSIGHTS</h1>
          </div>
          <p>
            AgentInsights transcribes and leverages AI to analyze all your
            calls, providing valuable insights into effective strategies and
            areas for improvement on calls.
          </p>
          <div className="space-y-2">
            {/* <h2 className="font-bold">Phone</h2>
                <p>123-456-7890</p> */}
            <h2 className="font-bold">Email</h2>
            <a
              href="mailto:partnerships@agentinsights.live"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              partnerships@agentinsights.live
            </a>
            <h2 className="font-bold">Social</h2>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/agent-insights"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GrLinkedin color="#0077B5" size="1.5em" />{" "}
                {/* Blue color for LinkedIn and increased size */}
              </a>
              <a
                href="https://twitter.com/AgentInsights6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter color="#0077B5" size="1.5em" />{" "}
                {/* White color for Twitter and increased size */}
              </a>
              {/* Add the icons for the social media links here */}
              {/* <i className="icon-class-name"></i> */}
              {/* <i className="icon-class-name"></i> */}
              {/* ... Add more icons as needed */}
            </div>
          </div>
        </div>

        {/* Column 2 */}
        {/* Column 2 */}
        <div className="flex-1 flex flex-col space-y-2">
          <h2 className="font-bold text-lg">Company</h2>
          <Link href="/about">About Us</Link>
          <Link href="/pricing">Pricing</Link>
          <p className="block">Request Demo</p>
        </div>

        {/* Column 3 */}
        <div className="flex-1 space-y-2">
          <h2 className="font-bold text-lg">Solutions</h2>
          <p className="block">Call Recording APP</p>
          <p className="block">AI Coaching</p>
          <p className="block">Call Analysis</p>
          <p className="block">Language Support</p>
          <p className="block">Omnichannel Contact Center</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
