import React from "react";
import type { Metadata } from "next";
import AppFooter from "../components/AppFooter";
import Header from "../components/LandingPageHeader";

export const metadata: Metadata = {
  title: "Experience AI Call",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Header /> */}
      {children}
      {/* <AppFooter /> */}
    </>
  );
};

export default layout;
