"use client";

import { AnimatePresence } from "framer-motion";
import React from "react";
import { MusicCard } from "./MusicCard";
import { RiAddCircleFill, RiRepeatFill, RiRepeatOneFill } from "react-icons/ri";
import { useMusic } from "context/MusicProvider";

export const Sidebar = () => {
  const { musicArray, pushMusic, repeatMode, setRepeatMode } = useMusic();
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
    <aside className="flex w-full flex-col justify-start gap-8 md:w-1/3 bg-white bg-opacity-[0.18] border border-white border-opacity-[0.19] backdrop-blur rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base uppercase grow-[0.7]">playlist</h2>
        <div
          className={`grid w-[26.67px] cursor-pointer aspect-square rounded-full place-items-center ${
            repeatMode !== "no-repeat"
              ? "bg-white text-black"
              : "text-white bg-transparent"
          } mix-blend-multiply`}
        >
          {repeatMode === "no-repeat" ? (
            <RiRepeatFill
              className="text-base"
              onClick={() => {
                setRepeatMode!("repeat-all");
              }}
            ></RiRepeatFill>
          ) : repeatMode === "repeat-all" ? (
            <RiRepeatFill
              className="text-base"
              onClick={() => {
                setRepeatMode!("repeat-one");
              }}
            ></RiRepeatFill>
          ) : (
            <RiRepeatOneFill
              className="text-base"
              onClick={() => {
                setRepeatMode!("no-repeat");
              }}
            ></RiRepeatOneFill>
          )}
        </div>
        <label className="cursor-pointer" htmlFor="file">
          <RiAddCircleFill className="text-white text-[32px] "></RiAddCircleFill>
        </label>
        <input
          onChange={(e) => {
            e.target.files &&
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
  );
};
