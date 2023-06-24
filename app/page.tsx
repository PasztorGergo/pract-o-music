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
      <div className="fixed bg-[radial-gradient(77.62%_77.62%_at_19.93%_28.44%,rgba(28,216,210,0.50)_0%,rgba(147,237,199,0.00)_100%)] -top-[3rem] right-0 rotate-[-60deg] w-[clamp(13rem,20vw,27rem)] h-[clamp(13rem,20vw,27rem)] rounded-full" />
      <div className="fixed bg-[radial-gradient(77.62%_77.62%_at_19.93%_28.44%,rgba(28,216,210,0.50)_0%,rgba(147,237,199,0.00)_100%)] top-[13rem] -left-1/3 rotate-[75deg] w-[clamp(29rem,60vw,45rem)] h-[clamp(29rem,60vw,45rem)] rounded-full" />
      <div className="fixed bg-[radial-gradient(77.62%_77.62%_at_19.93%_28.44%,rgba(28,216,210,0.50)_0%,rgba(147,237,199,0.00)_100%)] -bottom-1/4 left-[45%] rotate-[30deg] w-[clamp(19rem,35vw,35rem)] h-[clamp(19rem,35vw,35rem)] rounded-full" />
      <Sidebar />
      <main className="z-10 xl:w-2/3 w-full h-[50vh] flex flex-col gap-4 items-center lg:order-2 order-first">
        {currentMusic ? (
          <Display />
        ) : (
          <>
            <Image
              src="https://media.tenor.com/rV2wuyhFea8AAAAC/there-is-no-music-bricky.gif"
              alt="no music is playing gif"
              width={300}
              height={456}
              className="rounded-lg w-auto h-auto"
              priority
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
