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
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

function PopUpForm({ onClose }: any) {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    companyName: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    phoneNumber: false,
    companyName: false,
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
            // console.log("Sending conversion tracking event to Google Ads");
            // console.log(window.gtag);

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
          Cookies.set("formSubmitted", "true", { expires: 7 });
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
      isOpen={true}
      onClose={() => {}}
      size="md"
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(0.6px)" />
      <ModalContent mx={2} maxW={isSmallerThan768 ? "80vw" : "md"}>
        <ModalHeader className="text-center text-2xl font-medium">
          Unlock the Full Potential of Your Calls with{" "}
          <span className="font-extrabold">Agent</span>
          <span className="text-blue-500 font-extrabold">Insights</span>
          <div className="flex justify-center pt-2">
            <Image
              className="h-12 w-12 p-2"
              height={150}
              width={150}
              alt="Logo"
              src="/CallIcon.svg"
            />
            <Image
              className="w-12 sm:w-24"
              height={150}
              width={150}
              alt="Logo"
              src="/LineIcon.svg"
            />
            <Image
              className="h-12 w-12 p-2"
              height={150}
              width={150}
              alt="Logo"
              src="/ChartIcon.svg"
            />
            <Image
              className="w-12 sm:w-24"
              height={150}
              width={150}
              alt="Logo"
              src="/LineIcon.svg"
            />
            <Image
              className="h-12 w-12 p-2"
              height={150}
              width={150}
              alt="Logo"
              src="/DataIcon.svg"
            />
          </div>
        </ModalHeader>
        <ModalBody pb={2} px={5}>
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
        <ModalFooter px={5}>
          <button
            className={`text-white font-semibold p-2 rounded-sm ${
              isSmallerThan768 ? "text-sm" : "text-md"
            } ${isSubmitting ? "bg-blue-400" : "bg-blue-500"} ${
              isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
            } w-full`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Experience the Demo..." : "Experience the Demo"}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PopUpForm;
