"use client";

import Image from "next/image";
import React from "react";
import logo_end from "../assets/logo_end.svg";
import { BiRightArrowAlt } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LandingPageHeader = () => {
  const router = useRouter();

  const handleNavigation = (path: any) => {
    router.push(path);
  };
  return (
    <Box
      borderBottom="2px"
      borderColor="gray.200"
      p={4}
      className="sticky top-0 left-0 bg-white shadow-md z-10"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className="cursor-pointer"
      >
        <Box
          display="flex"
          alignItems="center"
          className="gap-0"
          color="blue.950"
          onClick={() => handleNavigation("/")}
        >
          <Box fontWeight="bold" className="md:text-[2rem] text-[1.4rem]">
            AgentInsight
          </Box>
          <Image
            className="w-[1.5rem] md:w-[2rem] pb-[0.5rem] ml-[-0.3rem]"
            src={logo_end}
            alt=""
          />
        </Box>

        {/* Mobile Menu - visible only on small screens */}
        <Box display={{ base: "block", md: "none" }}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  variant="outline"
                  borderColor="blue.800"
                  colorScheme="blue"
                  rightIcon={isOpen ? <RxCross2 /> : <AiOutlineMenu />}
                >
                  {isOpen ? "Close" : "Menu"}
                </MenuButton>
                <MenuList>
                  <Link href="/about">
                    <MenuItem color="blue.700" _hover={{ color: "blue.500" }}>
                      About Us
                    </MenuItem>
                  </Link>
                  <Link href="/pricing">
                    <MenuItem color="blue.700" _hover={{ color: "blue.500" }}>
                      Pricing
                    </MenuItem>
                  </Link>
                  <Link href="/demo?uuid=mH1kAN4rNDciWTYBWWh5">
                    <MenuItem color="blue.700" _hover={{ color: "blue.500" }}>
                      Demo
                    </MenuItem>
                  </Link>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>

        {/* Desktop Menu - visible only on medium and larger screens */}
        <Box display={{ base: "none", md: "flex" }}>
          <Box display="flex" className="space-x-4">
            <Link href="/about">
              <Box p={2} _hover={{ color: "blue.500" }} className="font-bold">
                About Us
              </Box>
            </Link>
            <Link href="/pricing">
              <Box p={2} _hover={{ color: "blue.500" }} className="font-bold">
                Pricing
              </Box>
            </Link>
            <Link href="/demo?uuid=mH1kAN4rNDciWTYBWWh5">
              <Box className="p-2  bg-blue-500 text-white text-center rounded transition duration-300 ease-in-out">
                Demo
              </Box>
            </Link>
          </Box>
        </Box>
        {/* <Box display={{ base: "none", md: "flex" }} alignItems="center">
          <Link onClick={() => handleNavigation("/demo")}>
            <Button
              variant="outline"
              borderColor="blue.700"
              colorScheme="blue"
              rightIcon={<Icon as={BiRightArrowAlt} w={6} h={6} />}
            >
              Demo
            </Button>
          </Link>
        </Box> */}
      </Box>
    </Box>
  );
};

export default LandingPageHeader;