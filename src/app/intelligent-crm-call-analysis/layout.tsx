import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentInsightS - Intelligent Call Analysis CRM",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
