import React from "react";
import WCPProvider from "./wcp-provider";
import ConnectionStatusHandler from "./connection-status";
import { Toaster } from "@/components/ui/toaster";
const Providers = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <>
      <WCPProvider>
        {children}
        <ConnectionStatusHandler />
        <Toaster />
      </WCPProvider>
    </>
  );
};

export default Providers;
