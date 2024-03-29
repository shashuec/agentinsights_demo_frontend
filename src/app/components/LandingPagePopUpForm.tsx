import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useMediaQuery,
  useToast,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import key_lock from "../assets/key_lock.png";
import crm from "../assets/crm.png";

function LandingPagePopUpForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const searchParams = useSearchParams();
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

  const validateEmail = (email: any) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

  useEffect(() => {
    // Automatically open the dialog when the component mounts if the user hasn't seen it yet
    setTimeout(() => {
      if (!Cookies.get("formSubmitted")) {
        onOpen();
      }
    }, 5000);
  }, [onOpen]);

  const handleClose = () => {
    Cookies.set("formSubmitted", "true", { expires: 2 }); // Set a cookie for 2 days
    onClose();
  };

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
              event_callback: () => {
                console.log("Conversion event tracked!");
              },
            });

            // window.gtag("event", "conversion", {
            //   send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ANALYTICS_ID}'}/VvgeCJ6fuvIYEL6kjbkq`,
            //   event_callback: () => {
            //     console.log("Analytics event tracked!");
            //   },
            // });
          }

          fbq("track", "Lead", {
            value: 1,
            currency: "INR",
          });

          console.log("User details successfully submitted");
          Cookies.set("formSubmitted", "true", { expires: 2 });
          onClose();
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
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      size="md"
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(0.6px)" />
      <ModalContent
        mx={2}
        maxW={isSmallerThan768 ? "80vw" : "lg"}
        position="relative"
      >
        <ModalHeader px={2} pt={5} className="text-center text-2xl font-medium">
          {/* Unlock the Full Potential of Your Calls with{" "}
          <span className="font-extrabold">Agent</span>
          <span className="text-blue-500 font-extrabold">Insights</span> */}
          <div className="grid grid-cols-5 gap-2">
            <div className="md:flex items-end hidden">
              <Image className="h-full" alt="Logo" src={key_lock} />
            </div>
            <div className="col-span-5 md:col-span-3  space-y-2">
              <div className="font-bold text-xl">
                Unlock the Future of{" "}
                <span className="text-blue-500">Customer Relations</span> with{" "}
                <span className="text-blue-500">AI</span>
              </div>
              <div className="text-xs text-gray-500">
                Elevate Your Business with AI-Powered Analysis & Intelligent CRM
                Solutions
              </div>
            </div>
            <div className="hidden md:flex items-start pb-4">
              <Image className="h-full" alt="Logo" src={crm} />
            </div>
          </div>
        </ModalHeader>
        {/* <ModalCloseButton
          onClick={handleClose}
          position="absolute"
          right="0px"
          top="-2px"
          zIndex="2"
          _focus={{
            outline: "none",
            boxShadow: "none",
          }}
        /> */}
        <ModalBody pb={2} px={isSmallerThan768 ? 5 : 10}>
          <FormControl isInvalid={errors.name}>
            <FormLabel fontSize="sm" className="font-semibold text-gray-600">
              Name
            </FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter name"
              fontSize={isSmallerThan768 ? "sm" : "md"}
              paddingY={5}
            />
            {errors.name && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isInvalid={errors.phoneNumber}>
            <FormLabel fontSize="sm" className="font-semibold text-gray-600">
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
                Please enter a valid phone number with at least 10 digits.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isInvalid={errors.companyEmail}>
            <FormLabel fontSize="sm" className="font-semibold text-gray-600">
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
                Please enter a valid email address.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isInvalid={errors.companyName}>
            <FormLabel fontSize="sm" className="font-semibold text-gray-600">
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
              <FormErrorMessage>Company Name is required.</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter px={isSmallerThan768 ? 5 : 10}>
          <button
            className={`text-white font-semibold p-2 rounded-sm ${
              isSmallerThan768 ? "text-sm" : "text-md"
            } ${isSubmitting ? "bg-blue-400" : "bg-blue-500"} ${
              isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
            } w-full`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Start your free trial now..."
              : "Start your free trial now"}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LandingPagePopUpForm;
