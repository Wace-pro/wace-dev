import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import Providers from "@/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "WACE - Gamified Startup Building Platform",
  description: "Learn, build, and launch your startup with WACE",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
