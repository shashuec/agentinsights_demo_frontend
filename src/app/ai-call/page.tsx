"use client";

import { Divider, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DottedSVG from "../../../public/DottedArrow.svg";
import { validateEmail } from "../../utils/util";
import Cookies from "js-cookie";
import axios from "axios";
import { RetellWebClient } from "retell-client-js-sdk";
import { FaPhoneAlt } from "react-icons/fa";
import ParticlesBackground from "../components/ParticlesBackground";

const agentId =
  process.env.NEXT_PUBLIC_CALL_AGENT_ID || "72161b1e6512585653e9c1c17d94be53";

const BASE_URL = "https://agentinsights-robocall-5yfk5r5eya-uc.a.run.app";
// const BASE_URL = "https://0cd2-2409-40d6-2-a878-4ee6-9e30-995d-f17d.ngrok-free.app";

interface RegisterCallResponse {
  callId?: string;
  sampleRate: number;
}

const webClient = new RetellWebClient();

const INTERVAL_TIME = 15000;

const FormPage = ({ setIsSubmitted }: any) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    companyName: "",
    companyEmail: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    phoneNumber: false,
    companyName: false,
    companyEmail: false,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.length >= 10;
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name,
      phoneNumber: !isValidPhoneNumber(formData.phoneNumber),
      companyName: !formData.companyName,
      companyEmail: !validateEmail(formData.companyEmail),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const utmParams = {
          utmSource: Cookies.get("utm_source") || "",
          utmMedium: Cookies.get("utm_medium") || "",
          utmCampaign: Cookies.get("utm_campaign") || "",
          utmTerm: Cookies.get("utm_term") || "",
          utmContent: Cookies.get("utm_content") || "",
        };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/submit_demo_page_details`,
          {
            name: formData.name,
            company_email: formData.companyEmail,
            utmParams: utmParams,
            phone_number: "-",
            company_name: "AI-Call",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_COMPANY_TOKEN}`,
            },
          }
        );

        if (response.status === 200) {
          if (typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
              send_to: `AW-11394044478/VvgeCJ6fuvIYEL6kjbkq`,
              event_callback: () => {
                console.log("Conversion event tracked!");
              },
            });
          }

          fbq("track", "Lead", {
            value: 1,
            currency: "INR",
          });

          setIsSubmitted(true);
          Cookies.set("formSubmittedAICall", "true", { expires: 2 });
          toast({
            title: "Welcome to the Demo!",
            description:
              "You're all set! Proceed to explore the demo right ahead.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error submitting form", error);
        toast({
          title: "Error",
          description: "There was an error please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex bg-black flex-col md:flex-row min-h-[180vh] pt-20 md:pt-0 md:min-h-screen px-2">
      <div className="flex items-center flex-1 justify-center md:justify-end mx-2">
        <ParticlesBackground id="particles" />
        <div className="md:shadow-even h-72 text-4xl flex flex-col gap-7 justify-center rounded-md max-w-xl">
          {/* <Image
            className="absolute top-4 -z-50 w-36"
            src="/Aeroplane.png"
            width={200}
            height={120}
            alt="Hello from AgentInsightS"
          /> */}
          <p className="text-white font-semibold">
            See <span className="text-blue-500">A Live Demo</span> With A Flight
            Booking <span className="text-blue-500">Front Desk</span>
          </p>
          {/* <Image
            className="absolute bottom-4 right-4 -z-50"
            src="/AICallHello.png"
            width={120}
            height={120}
            alt="Hello from AgentInsightS"
          /> */}
          <div className="flex flex-col items-center">
            <p className="text-center text-3xl mb-4 text-white font-extralight">
              See an example
            </p>
            <iframe
              src="https://www.youtube.com/embed/_ZyhrF1FF6M?controls=0&rel=0&showinfo=0&modestbranding=1"
              title="YouTube video player"
              className="z-50 border-0 w-full max-w-xl h-52 sm:h-96 md:h-72 lg:h-96 rounded-xl shadow-even shadow-slate-500"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="flex-1 mx-2 mb-2 md:mb-0 md:min-h-screen flex flex-col items-center justify-center">
        <div className="border-2 rounded-md border-black w-full shadow-even shadow-slate-300 max-w-[500px] px-4 py-10 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <h2 className="text-center inline-block text-xl font-semibold border-[1px] border-b-0 px-2 py-1 rounded-t-lg leading-tight text-white">
            Try Web Call
          </h2>
          <Divider className="border-white" />
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <div className="mt-2">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="flex text-white h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Name"
                    ></input>
                    {errors.name && (
                      <p className="text-red-500 text-xs text-left">
                        Name is required.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="mt-1">
                    <input
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      required
                      className="flex text-white h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                    ></input>
                    {errors.companyEmail && (
                      <p className="text-red-500 text-xs text-left">
                        Please enter a valid email address.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="mt-1">
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="flex text-white h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Company name"
                    ></input>
                    {errors.companyName && (
                      <p className="text-red-500 text-xs text-left">
                        Please enter a company name.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="mt-1">
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="flex text-white h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="tel"
                      placeholder="Phone number"
                    ></input>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs text-left">
                        Please enter a valid phone number.
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  type="button"
                  className="border-white shadow-md shadow-slate-500 border-2 inline-flex w-full items-center justify-center rounded-md  bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  <span className="mr-2">
                    <FaPhoneAlt />
                  </span>
                  Dial Now{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const StartCall = ({ isSubmitted }: any) => {
  const [isCalling, setIsCalling] = useState(true);
  const toast = useToast();

  const trackUsage = async () => {
    try {
      const validateUsageResponse = await axios.post(
        `${BASE_URL}/validate-usage`,
        { minute: INTERVAL_TIME / (1000 * 60) },
        {
          headers: {
            "X-CALL-API-KEY": process.env.NEXT_PUBLIC_X_CALL_API_KEY,
          },
        }
      );

      return validateUsageResponse.status === 200;
    } catch (error: any) {
      console.error("Error tracking usage", error);
      throw new Error(error);
    }
  };

  const toggleConversation = async () => {
    if (!isCalling) {
      webClient.stopConversation();
    } else {
      const registerCallResponse = await registerCall(agentId);
      if (registerCallResponse.callId) {
        webClient
          .startConversation({
            callId: registerCallResponse.callId,
            sampleRate: registerCallResponse.sampleRate,
            enableUpdate: true,
          })
          .catch(console.error);
        // setIsCalling(true); // Update button to "Stop" when conversation starts
      }
    }
  };

  async function registerCall(agentId: string): Promise<RegisterCallResponse> {
    try {
      // Replace with your server url
      const response = await axios.post(
        `${BASE_URL}/register-call`,
        {
          agentId: agentId,
        },
        {
          headers: {
            "X-CALL-API-KEY": process.env.NEXT_PUBLIC_X_CALL_API_KEY,
          },
        }
      );

      const data: RegisterCallResponse = await response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      toast({
        title: err.response.data.error,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsCalling(false);
      throw new Error(err);
    }
  }

  useEffect(() => {
    // Setup event listeners
    (async function () {
      await toggleConversation();
    })();

    webClient.on("conversationStarted", () => {
      console.log("conversationStarted");
    });

    webClient.on("audio", (audio: Uint8Array) => {
      console.log("There is audio");
    });

    webClient.on("conversationEnded", ({ code, reason }) => {
      console.log("Closed with code:", code, ", reason:", reason);
      setIsCalling(false); // Update button to "Start" when conversation ends
    });

    webClient.on("error", (error) => {
      console.error("An error occurred:", error);
      setIsCalling(false); // Update button to "Start" in case of error
    });

    webClient.on("update", (update) => {
      // Print live transcript as needed
      console.log("update", update);
    });

    const usageTrackerInterval = setInterval(async () => {
      if (!isCalling) {
        clearInterval(usageTrackerInterval);
        return;
      }

      const isOkay = await trackUsage();
      if (!isOkay) {
        setIsCalling(false);
        toast({
          title: "Call Ended",
          description: "Your free quota has been exhausted.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        clearTimeout(endCallTimeout);
      }
    }, INTERVAL_TIME);

    const endCallTimeout = setTimeout(() => {
      if (!isCalling) return;
      clearInterval(usageTrackerInterval);
      setIsCalling(false);
      trackUsage();
      toast({
        title: "Call Ended",
        description: "Call Automatically ends after 1 minute.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }, 60000);

    return () => {
      clearTimeout(endCallTimeout);
      clearInterval(usageTrackerInterval);
      webClient.stopConversation();
    };
  }, [isCalling]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-9">
      <div className="border-[1px] border-blue-400 rounded-xl h-52 w-60 flex items-center shadow-even shadow-blue-300">
        <Image
          className="w-64"
          src="/Aeroplane.png"
          width={100}
          height={100}
          alt="Aeroplane"
        />
      </div>
      <div>
        <p className="text-4xl font-semibold">
          Flight Booking <span className="text-blue-500">Front Desk</span>
        </p>
      </div>
      <button
        onClick={() => {
          setIsCalling((prev) => !prev);
        }}
      >
        {isCalling ? (
          <div className="w-80 h-10 rounded-lg flex items-center justify-center bg-orange-600 text-white font-semibold">
            Hang Up
          </div>
        ) : (
          <div className="w-80 h-10 rounded-lg flex items-center justify-center bg-green-500 text-white font-semibold">
            Start a AI Call
          </div>
        )}
      </button>
    </div>
  );
};

const AICall = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // useEffect(() => {
  //   const formSubmitted = Cookies.get("formSubmittedAICall");
  //   if (formSubmitted) {
  //     setIsSubmitted(false);
  //   }
  // }, []);

  return (
    <>
      {!isSubmitted ? (
        <FormPage setIsSubmitted={setIsSubmitted} />
      ) : (
        <StartCall />
      )}
    </>
  );
};

export default AICall;
