"use client";
import React from "react";
import "../styles/globals.css";
import MusicProvider from "context/MusicProvider";
import { Inter } from "@next/font/google";
import ModalProvider from "context/ModalProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin-ext"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      className={`bg-brand-base bg-no-repeat bg-fixed ${inter.className} text-white`}
    >
      <head>
        <meta rel="viewport" content="width=device-width, initial-scale=1" />
        <title>Pract-o-Music</title>
        <meta name="title" content="Pract-o-Music" />
        <meta
          name="description"
          content="Add your favorite songs from YouTube or import them from you device and play them everywhere with Pract-o-music!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pract-o-music.vercel.app/" />
        <meta property="og:title" content="Pract-o-Music" />
        <meta
          property="og:description"
          content="Add your favorite songs from YouTube or import them from you device and play them everywhere with Pract-o-music!"
        />
        <meta
          property="og:image"
          content="https://pract-o-music.vercel.app/practomusicCover.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://pract-o-music.vercel.app/"
        />
        <meta property="twitter:title" content="Pract-o-Music" />
        <meta
          property="twitter:description"
          content="Add your favorite songs from YouTube or import them from you device and play them everywhere with Pract-o-music!"
        />
        <meta
          property="twitter:image"
          content="https://pract-o-music.vercel.app/practomusicCover.png"
        />
      </head>
      <MusicProvider>
        <body className="flex lg:flex-row px-8 md:px-24 py-8 gap-4 flex-col items-center md:items-stretch">
          <ModalProvider>{children}</ModalProvider>
          <Toaster></Toaster>
        </body>
      </MusicProvider>
    </html>
  );
};

export default RootLayout;
