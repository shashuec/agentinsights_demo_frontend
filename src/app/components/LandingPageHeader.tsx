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
  Icon,
} from "@chakra-ui/react";

const LandingPageHeader = () => {
  return (
    <Box borderBottom="2px" borderColor="gray.200" p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          className="gap-0"
          color="blue.950"
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
                  <MenuItem color="blue.700" _hover={{ color: "blue.500" }}>
                    Product
                  </MenuItem>
                  <MenuItem color="blue.700" _hover={{ color: "blue.500" }}>
                    Solutions
                  </MenuItem>
                  <MenuItem color="blue.700" _hover={{ color: "blue.500" }}>
                    Resources
                  </MenuItem>
                  <MenuItem color="blue.700" _hover={{ color: "blue.500" }}>
                    Price
                  </MenuItem>
                  <MenuItem>
                    <Button
                      variant="outline"
                      borderColor="blue.700"
                      colorScheme="blue"
                      rightIcon={<Icon as={BiRightArrowAlt} w={6} h={6} />}
                    >
                      Demo
                    </Button>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>

        {/* Desktop Menu - visible only on medium and larger screens */}
        <Box display={{ base: "none", md: "flex" }}>
          <Box display="flex" className="space-x-4">
            <Box p={2} _hover={{ color: "blue.500" }}>
              Product
            </Box>
            <Box p={2} _hover={{ color: "blue.500" }}>
              Solutions
            </Box>
            <Box p={2} _hover={{ color: "blue.500" }}>
              Resources
            </Box>
            <Box p={2} _hover={{ color: "blue.500" }}>
              Price
            </Box>
          </Box>
        </Box>
        <Box display={{ base: "none", md: "flex" }} alignItems="center">
          <Button
            variant="outline"
            borderColor="blue.700"
            colorScheme="blue"
            rightIcon={<Icon as={BiRightArrowAlt} w={6} h={6} />}
          >
            Demo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPageHeader;
