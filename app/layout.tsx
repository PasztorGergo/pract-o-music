"use client";
import React from "react";
import "../styles/globals.css";
import MusicProvider from "context/MusicProvider";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin-ext"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      className={`bg-brand-base bg-no-repeat bg-fixed ${inter.className} text-white`}
    >
      <head>
        <meta rel="viewport" content="width=device-width, initial-scale=1" />
        <title>Pract-o-Music</title>
      </head>
      <MusicProvider>
        <body className="flex px-8 md:px-24 py-8 gap-4 md:flex-row flex-col items-center md:items-stretch">
          {children}
        </body>
      </MusicProvider>
    </html>
  );
};

export default RootLayout;
