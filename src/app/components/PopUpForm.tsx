import React, { useState } from "react";
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

function PopUpForm({ onClose }: any) {
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

  const validateForm = () => {
    const newErrors = {
      name: !formData.name,
      phoneNumber: !formData.phoneNumber,
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
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/submit_demo_page_details`,
          {
            name: formData.name,
            phone_number: formData.phoneNumber,
            company_name: formData.companyName,
          }
        );

        if (response.status === 200) {
          console.log("User details successfully submitted");
          Cookies.set("formSubmitted", "true", { expires: 7 });
          onClose();
          toast({
            title: "Success",
            description: "Your details have been successfully submitted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error submitting form", error);
        toast({
          title: "Error",
          description:
            "There was an error submitting your details. Please try again.",
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
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent mx={4} maxW={isSmallerThan768 ? "90vw" : "md"}>
        <ModalHeader fontSize="lg" fontWeight="bold">
          Submit Your Details
        </ModalHeader>
        <ModalBody pb={6}>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isInvalid={errors.phoneNumber}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <FormErrorMessage>Phone Number is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isInvalid={errors.companyName}>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            {errors.companyName && (
              <FormErrorMessage>Company Name is required.</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <button
            className={`text-white font-bold p-2 rounded-md ${
              isSubmitting ? "bg-blue-400" : "bg-blue-500"
            } ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
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
