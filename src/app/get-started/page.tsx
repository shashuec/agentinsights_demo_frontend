"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState } from "react";
import { PiStarFourFill } from "react-icons/pi";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";

const COMMON_EMAIL_DOMAIN = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "zoho.com",
  "protonmail.com",
  "mail.com",
  "yandex.com",
  "gmx.com",
  "tutanota.com",
  "fastmail.com",
  "hushmail.com",
  "runbox.com",
  "mailfence.com",
  "kolabnow.com",
  "posteo.de",
  "mailbox.org",
  "disroot.org",
  "riseup.net",
  "autistici.org",
  "tuta.io",
  "keemail.me",
  "elude.in",
  "ctemplar.com",
  "scryptmail.com",
  "countermail.com",
  "privatemail.com",
  "startmail",
];

const GetStarted = () => {
  const router = useRouter();
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

  const toast = useToast();
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const isCommonEmailDomain = (email: string) => {
    const domain = email.split("@")[1].toLowerCase();
    return !COMMON_EMAIL_DOMAIN.includes(domain);
  };

  const validateEmail = (email: any) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && isCommonEmailDomain(email);
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
            phone_number: formData.phoneNumber,
            company_name: formData.companyName,
            company_email: formData.companyEmail,
            utmParams: utmParams,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_COMPANY_TOKEN}`,
            },
          }
        );

        if (response.status === 200) {
          if (typeof window.gtag === "function") {
            // Fire Google Ads conversion tracking
            window.gtag("event", "conversion", {
              send_to: `AW-11394044478/VvgeCJ6fuvIYEL6kjbkq`,
              event_callback: () => {},
            });
          }

          fbq("track", "Lead", {
            value: 1,
            currency: "INR",
          });

          Cookies.set("formSubmitted", "true", { expires: 2 });
          toast({
            title: "Welcome to the Demo!",
            description:
              "You're all set! Proceed to explore the demo right ahead.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          router.push("demo?uuid=f5190b3f-4606-4eac-b32e-7a8cfa66023f");
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
    <>
      <div className="min-h-screen bg-get-started-gradient relative pb-10 md:pb-20">
        <Image
          className="absolute object-contain w-28 md:w-48"
          alt=""
          width={200}
          height={200}
          src="/Star.png"
        />
        <Image
          className="absolute object-contain right-0 w-28 md:w-48"
          alt=""
          width={200}
          height={200}
          src="/Polygon.png"
        />
        {/* <Image
          className="absolute object-contain left-1/2"
          alt=""
          width={200}
          height={200}
          src="/Ellipse.png"
        />
        <Image
          className="absolute object-contain bottom-0 left-1/2"
          alt=""
          width={200}
          height={200}
          src="/Rectangle.png"
        /> */}

        <div className="">
          <div className="mx-auto pt-5 md:pt-20 flex flex-col md:flex-row items-center lg:px-8 justify-center gap-5">
            <div className="flex flex-1 flex-col justify-center lg:max-w-3xl px-4 py-2 md:py-8 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-0">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Revolutionize Your Customer Experience with AI-Powered CRM
              </h1>
              <p className="my-8 text-2xl text-white font-medium">
                Unlock unparalleled insights and efficiency with our AI Call
                Analysis and CRM Integration—transforming every interaction into
                an opportunity for growth.
              </p>
              <p className="uppercase text-2xl font-bold text-white mb-6">
                Key features
              </p>
              <ul className="space-y-3">
                <li className="uppercase text-white text-sm font-medium">
                  <span>
                    <PiStarFourFill className="inline text-white text-md mb-[2px] mr-3.5" />
                  </span>
                  Analytics Dashboard
                </li>
                <li className="uppercase text-white text-sm font-medium">
                  <span>
                    <PiStarFourFill className="inline text-white text-md mb-[2px] mr-3.5" />
                  </span>
                  Agent Performance
                </li>
                <li className="uppercase text-white text-sm font-medium">
                  <span>
                    <PiStarFourFill className="inline text-white text-md mb-[2px] mr-3.5" />
                  </span>
                  QA Score
                </li>
                <li className="uppercase text-white text-sm font-medium">
                  <span>
                    <PiStarFourFill className="inline text-white text-md mb-[2px] mr-3.5" />
                  </span>
                  Customer Insights
                </li>
                <li className="uppercase text-white text-sm font-medium">
                  <span>
                    <PiStarFourFill className="inline text-white text-md mb-[2px] mr-3.5" />
                  </span>
                  Task Management
                </li>
              </ul>
            </div>
            <div className="px-4">
              <div className="flex flex-1 h-fit w-[85vw] md:max-w-sm lg:max-w-md rounded-lg py-10 flex-col bg-white justify-center px-4 lg:px-14">
                <div className="text-center font-semibold text-xl md:text-2xl xl:text-4xl mb-8">
                  Get a demo
                  <p className="text-base font-normal mt-4">
                    We&apos;re here to answer all your questions!
                  </p>
                </div>
                <div>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel
                      fontSize="sm"
                      className="font-semibold text-gray-600"
                    >
                      Full Name
                    </FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter Full Name"
                      fontSize={isSmallerThan768 ? "sm" : "md"}
                      paddingY={5}
                    />
                    {errors.name && (
                      <FormErrorMessage>Name is required.</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={errors.phoneNumber}>
                    <FormLabel
                      fontSize="sm"
                      className="font-semibold text-gray-600"
                    >
                      Phone Number
                    </FormLabel>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      placeholder="9876543210"
                      fontSize={isSmallerThan768 ? "sm" : "md"}
                    />
                    {errors.phoneNumber && (
                      <FormErrorMessage>
                        Please enter a valid phone number.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={errors.companyEmail}>
                    <FormLabel
                      fontSize="sm"
                      className="font-semibold text-gray-600"
                    >
                      Company Email
                    </FormLabel>
                    <Input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      required
                      placeholder="john@companydomain.com"
                      fontSize={isSmallerThan768 ? "sm" : "md"}
                    />
                    {errors.companyEmail && (
                      <FormErrorMessage>
                        Please enter a valid email address that matches your
                        company domain.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={errors.companyName}>
                    <FormLabel
                      fontSize="sm"
                      className="font-semibold text-gray-600"
                    >
                      Company Name
                    </FormLabel>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Your company name"
                      fontSize={isSmallerThan768 ? "sm" : "md"}
                    />
                    {errors.companyName && (
                      <FormErrorMessage>
                        Company Name is required.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <button
                    className={`text-white font-semibold p-2 rounded-sm mt-4 ${
                      isSmallerThan768 ? "text-sm" : "text-md"
                    } ${isSubmitting ? "bg-blue-400" : "bg-blue-500"} ${
                      isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                    } w-full`}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Start 1 month free trial..."
                      : "Start 1 month free trial"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
