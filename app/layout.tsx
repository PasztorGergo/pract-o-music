"use client";
import React from "react";
import "../styles/globals.css";
import MusicProvider from "context/MusicProvider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className="bg-[linear-gradient(#ffffff_0%,#dff0ff_100%)] bg-no-repeat bg-fixed">
      <MusicProvider>
        <body className="flex px-24 py-8 gap-8">{children}</body>
      </MusicProvider>
    </html>
  );
};

export default RootLayout;
