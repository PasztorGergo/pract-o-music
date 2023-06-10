"use client";
import React from "react";
import { Display } from "components";
import { useMusic } from "context/MusicProvider";
import Image from "next/image";
import { Sidebar } from "components/Sidebar";

const HomePage = () => {
  const { currentMusic } = useMusic()!;

  return (
    <>
      <Sidebar />
      <main className="md:w-2/3 w-full h-[50vh] flex flex-col gap-4 items-center">
        {currentMusic ? (
          <Display />
        ) : (
          <>
            <Image
              src="https://media.tenor.com/rV2wuyhFea8AAAAC/there-is-no-music-bricky.gif"
              alt="no music is playing gif"
              width={300}
              height={456}
              className="rounded-lg"
            />
            <h2 className="text-white text-opacity-80 uppercase font-bold text-center text-sm">
              No music is playing
            </h2>
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;
