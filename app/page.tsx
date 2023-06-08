"use client";
import { Metadata } from "next";
import React, { useRef } from "react";
import { Display, MusicCard } from "components";
import { useMusic } from "context/MusicProvider";
import { RiAddCircleFill, RiMusicFill, RiRepeatFill } from "react-icons/ri";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

const HomePage = () => {
  const { musicArray, currentMusic, pushMusic } = useMusic();

  const uploadMusic = (src: string, title: string) => {
    const file = new Audio(src);
    //@ts-ignore
    pushMusic({
      title,
      id: musicArray ? musicArray?.length : 0,
      img: "",
      file,
    });
    console.log(musicArray);
  };

  return (
    <>
      <aside className="flex w-full flex-col justify-start gap-8 md:w-1/3 bg-white bg-opacity-[0.18] border border-white border-opacity-[0.19] backdrop-blur rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base uppercase grow-[0.7]">playlist</h2>
          <div className="grid w-[26.67px] aspect-square rounded-full place-items-center bg-white text-black mix-blend-multiply">
            <RiRepeatFill className="text-base"></RiRepeatFill>
          </div>
          <label className="cursor-pointer grow-[0.15]" htmlFor="file">
            <RiAddCircleFill className="text-white text-[32px] "></RiAddCircleFill>
          </label>
          <input
            onChange={(e) => {
              uploadMusic(
                URL.createObjectURL(e.target.files![0]),
                e.target.files![0].name.replace(".mp3", "")
              );
            }}
            type="file"
            id="file"
            className="hidden"
            accept=".mp3"
          />
        </div>
        {musicArray && musicArray?.length > 0 ? (
          <>
            <AnimatePresence>
              {musicArray?.map((music) => (
                <MusicCard key={music.id} music={music}></MusicCard>
              ))}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex flex-col h-full items-center gap-4 justify-center">
            <p className="font-thin uppercase text-opacity-50 text-center">
              Add your own music by clicking on the plus button
            </p>
          </div>
        )}
      </aside>
      <main className="md:w-2/3 w-full min-h-full max-h-screen flex flex-col gap-4 items-center">
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
            <h2 className="text-slate-800 text-opacity-50 uppercase font-bold text-center text-sm">
              No music is playing
            </h2>
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;
