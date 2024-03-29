"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import app_in_mobile from "../assets/app_in_mobile.png";
import ai_full_logo from "../assets/ai_full_logo.png";
import ai_logo_short from "../assets/ai_logo_short.png";
import app_frame from "../assets/app_frame.png";
import AppFooter from "../components/AppFooter";
import LandingPageHeader from "../components/LandingPageHeader";
import { GoDotFill } from "react-icons/go";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

const AppDownload = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [downloadLink, setDownloadLink] = useState("");
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        // Programmatically click the hidden link to start download
        const downloadLinkElement = document.getElementById("downloadLink");
        if (downloadLinkElement) {
          downloadLinkElement.click();
        }
      }, 5000); // 5000 ms = 5 seconds

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isOpen, onClose]);

  const handleDownloadClick = () => {
    onOpen(); // Open the modal
    setDownloadLink(
      "https://storage.googleapis.com/agentinsights.appspot.com/downloads/AICallRecording.apk"
    ); // Set the link to download
  };

  return (
    <div>
      <LandingPageHeader />
      <div className="flex gap-2 justify-center p-4 pt-16 pb-0 bg-gray-200">
        <div className="w-[20rem]">
          <Image
            className=" object-contain"
            src={app_in_mobile}
            alt="App in mobile"
          />
        </div>
        <div className="flex flex-col p-2 justify-center gap-2">
          <div className="font-bold text-blue-500 text-xs md:text-2xl break-for-md">
            Recording Perfection: Capture Every
            <span className="hidden md:inline px-1"> </span>Detail with Inbound
            and Outbound Call <span className="hidden md:inline px-1"> </span>{" "}
            Recording
          </div>
          <div className="w-[7rem] sm:w-[15rem] max-w-xs">
            <Image
              className=" object-contain"
              src={ai_full_logo}
              alt="AI Full Logo"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row p-2 gap-8 justify-center">
        <div className="flex  gap-4">
          <div className="w-[7rem] ">
            <Image
              className="p-4 rounded-md shadow-even object-contain"
              src={ai_logo_short}
              alt="AI Logo short"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl md:text-3xl font-bold">
              AI Call Recording
            </div>
            <div className="text-xs md:text-base text-gray-500 break-for-md">
              AgentInsights: Efficient call recording and analysis for smart{" "}
              <span className="hidden md:inline"> </span>
              business insights
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <a
            href={downloadLink}
            download
            id="downloadLink"
            style={{ display: "none" }}
          >
            Download
          </a>

          {/* Button to open modal and start download process */}
          <button
            onClick={handleDownloadClick}
            className="w-full md:w-auto rounded-md px-4 py-2 text-white bg-blue-600 font-semibold"
          >
            Download Now
          </button>
        </div>
        {/* <div className="flex flex-col justify-center">
          <button className="rounded-md px-4 py-2 text-white bg-blue-600 font-semibold">
            Download Now
          </button>
        </div> */}
      </div>
      <div className="flex flex-col gap-2 p-4 md:px-32">
        <div className="font-bold text-xl">Description : </div>
        <div className="text-gray-400">
          Based on the detailed overview of Agent Insights, a specialized app
          for efficient management of call recordings with a focus on business
          application for quality assurance, training, or compliance,
          here&apos;s an updated version incorporating the additional features
          you&apos;ve mentioned:
        </div>
        <div className="w-full ">
          <Image
            className=" object-contain"
            src={app_frame}
            alt="AI Score Image"
          />
        </div>
        <div className="font-bold text-xl">
          Agent Insights: Enhanced Call Recording & Management Solution
        </div>
        <div className="font-bold text-xl">Overview</div>
        <div className="text-gray-400">
          Agent Insights is your go-to solution for streamlined call recording
          and management, designed specifically for businesses aiming to
          optimize their communication processes. This app stands out by
          offering comprehensive call data capture and analysis tools, making it
          perfect for quality assurance, training, compliance, and boosting CRM
          strategies.
        </div>
        <div className="flex gap-2 flex-col">
          <div className="font-bold text-xl">Key Features:</div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold px-1">
              Automatic Call Recording:
            </span>
            Seamlessly records calls across selected SIM slots, capturing
            high-quality audio for detailed analysis.
          </div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold  px-1">
              Manual and Auto Upload Options:
            </span>
            Flexibility to choose between manual or automatic uploads to
            securely send recordings to your server.
          </div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold  px-1">
              Call Logs and Metadata:
            </span>
            Provides in-depth call logs and metadata for every interaction,
            enhancing data analysis capabilities.
          </div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold  px-1">
              Customizable Recording Settings:
            </span>
            Offers tailored recording preferences based on SIM slots, catering
            to specific business requirements.
          </div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold  px-1">
              Secure Data Transmission:
            </span>
            Guarantees encrypted uploading of call data, upholding the highest
            standards of confidentiality and compliance.
          </div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold  px-1">
              User-Friendly Interface:
            </span>
            Designed for easy navigation, granting full control over recording
            settings and upload preferences.
          </div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold  px-1">
              One-Way Call Recording:
            </span>
            Ensures compliance and privacy by supporting one-way call recording,
            capturing only the required side of the conversation.
          </div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold  px-1">
              WhatsApp Call Recording:
            </span>
            Expands recording capabilities to include WhatsApp calls, covering a
            wider range of communication channels.
          </div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold  px-1">
              Auto-Uploading Feature:
            </span>
            Streamlines the management process by enabling automatic uploading
            of recordings, ensuring timely and efficient data storage.
          </div>
          <div className="text-gray-400">
            <GoDotFill className="inline text-blue-500 mb-1" />
            <span className="text-black font-bold  px-1">CRM Integration:</span>
            Enhances customer relationship management by providing valuable
            insights and data for better decision-making and customer service.
          </div>
        </div>
        <div className="font-bold">Permission Usage Explanation:</div>
        <div className="text-gray-400">
          To manage and store call recordings efficiently, Agent Insights
          requires &quot;All files access&quot; permission. This enables the app
          to save recordings in shared storage securely, support both automatic
          and manual upload features, and provide users with full access to
          their recordings for analysis, playback, or backup, prioritizing user
          privacy and data security.
        </div>
        <div className="font-bold">Benefits for Businesses:</div>
        <div className="text-gray-400">
          Agent Insights offers an array of benefits, including efficient call
          management, versatile recording options, enhanced data security, and
          valuable insights for decision-making. It&apos;s the ideal tool for
          customer service centers, sales teams, compliance departments, and any
          business looking to improve their communication strategies and CRM.
        </div>
        <div className="font-bold">Ideal for Various Business Needs:</div>
        <div className="text-gray-400">
          Whether you&apos;re aiming to enhance customer service, boost sales
          performance, or ensure compliance, Agent Insights provides the tools
          and features necessary to meet your business objectives.
        </div>
        <div className="font-bold">Get Started:</div>
        <div className="text-gray-400">
          Elevate your business communication with Agent Insights. Experience
          efficient, secure, and flexible call recording management designed to
          support your business&apos;s growth and customer relationship
          management goals.
        </div>

        <div className="font-bold text-red-500 pt-4">Disclaimer:</div>
        <div className="text-gray-400 space-y-2">
          <div>
            If you encounter the error message{" "}
            <span className="text-red-500">
              &quot;App not installed as package conflict with an existing
              package&quot;
            </span>{" "}
            while attempting to install our app, please follow these steps:
          </div>
          <ol className="space-y-2 list-decimal pl-4">
            <li>
              <span className="text-red-500">Uninstall Previous Version:</span>{" "}
              Firstly, uninstall any existing versions of the app from your
              device.
            </li>
            <li>
              <span className="text-red-500">
                Download or Install Latest Version:
              </span>{" "}
              If you haven&apos;t already, visit our website and download the
              latest version of the app. If you have already downloaded it,
              simply install the newly downloaded version of the app on your
              device.
            </li>
            <li>
              <span className="text-red-500">Reinstall:</span> Install the newly
              downloaded version of the app on your device.
            </li>
          </ol>
          <div>
            If you continue to experience issues or need further assistance,
            please feel free to{" "}
            <a
              className="text-blue-500 underline cursor-pointer"
              href="mailto:connect@agentinsights.live"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact us
            </a>{" "}
            for support.
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center p-4 pb-8">
        <a
          href="https://storage.googleapis.com/agentinsights.appspot.com/downloads/AICallRecording.apk"
          download
          className="w-fit mx-auto text-center"
        >
          <button className="rounded-md px-4 py-2 text-white bg-blue-600 font-semibold">
            Download Now
          </button>
        </a>
      </div>
      {/* <div className="flex w-full flex-col justify-center p-4 pb-8">
        <button className=" w-fit mx-auto text-center rounded-md px-4 py-2 text-white bg-blue-600 font-semibold">
          Download Now
        </button>
      </div> */}
      <AppFooter />
      <Modal
        size="md"
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent mx={2} maxW={isSmallerThan768 ? "80vw" : "lg"}>
          <ModalHeader>Disclaimer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="text-gray-400 space-y-2">
              <div>
                If you encounter the error message{" "}
                <span className="text-red-500">
                  &quot;App not installed as package conflict with an existing
                  package&quot;
                </span>{" "}
                while attempting to install our app, please follow these steps:
              </div>
              <ol className="space-y-2 list-decimal pl-4">
                <li>
                  <span className="text-red-500">
                    Uninstall Previous Version:
                  </span>{" "}
                  Firstly, uninstall any existing versions of the app from your
                  device.
                </li>
                <li>
                  <span className="text-red-500">
                    Download or Install Latest Version:
                  </span>{" "}
                  If you haven&apos;t already, visit our website and download
                  the latest version of the app. If you have already downloaded
                  it, simply install the newly downloaded version of the app on
                  your device.
                </li>
                <li>
                  <span className="text-red-500">Reinstall:</span> Install the
                  newly downloaded version of the app on your device.
                </li>
              </ol>
              <div>
                If you continue to experience issues or need further assistance,
                please feel free to{" "}
                <a
                  href="mailto:connect@agentinsights.live"
                  className="text-blue-500 underline cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact us
                </a>{" "}
                for support.
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AppDownload;
