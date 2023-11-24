import React, { useEffect, useState } from "react";
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
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
      <ModalContent mx={2} maxW={isSmallerThan768 ? "80vw" : "md"}>
        <ModalHeader
          fontSize={isSmallerThan768 ? "md" : "lg"}
          fontWeight="bold"
          className="text-center text-blue-500"
        >
          Access Demo
        </ModalHeader>
        <ModalBody pb={2}>
          <FormControl isInvalid={errors.name}>
            <FormLabel fontSize={isSmallerThan768 ? "sm" : "md"}>
              Name
            </FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Elon Musk"
              fontSize={isSmallerThan768 ? "sm" : "md"}
            />
            {errors.name && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isInvalid={errors.phoneNumber}>
            <FormLabel fontSize={isSmallerThan768 ? "sm" : "md"}>
              Phone Number
            </FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="1234567890"
              fontSize={isSmallerThan768 ? "sm" : "md"}
            />
            {errors.phoneNumber && (
              <FormErrorMessage>
                Please enter a valid phone number with at least 10 digits.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isInvalid={errors.companyName}>
            <FormLabel fontSize={isSmallerThan768 ? "sm" : "md"}>
              Company Name
            </FormLabel>
            <Input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Tesla"
              fontSize={isSmallerThan768 ? "sm" : "md"}
            />
            {errors.companyName && (
              <FormErrorMessage>Company Name is required.</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <button
            className={`text-white font-bold p-2 rounded-md ${
              isSmallerThan768 ? "text-sm" : "text-md"
            } ${isSubmitting ? "bg-blue-400" : "bg-blue-500"} ${
              isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PopUpForm;
