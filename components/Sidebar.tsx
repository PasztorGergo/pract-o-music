"use client";

import { AnimatePresence } from "framer-motion";
import React from "react";
import { MusicCard } from "./MusicCard";
import { RiRepeatFill, RiRepeatOneFill } from "react-icons/ri";
import { useMusic } from "context/MusicProvider";
import { AddButton } from "./AddButton";
import { useModal } from "context/ModalProvider";

export const Sidebar = () => {
  const { musicArray, repeatMode, setRepeatMode, pushMusic } = useMusic()!;
  const { setOpen } = useModal()!;

  return (
    <aside className="flex h-[calc(100vh-4rem)] z-30 w-full flex-col justify-start gap-8 xl:w-1/3 bg-white bg-opacity-[0.18] border border-white border-opacity-[0.19] backdrop-blur rounded-lg p-4">
      <div className="flex items-center justify-between relative">
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
        <AddButton pushMusic={pushMusic} musicArray={musicArray}></AddButton>
      </div>
      <div className="overflow-x-hidden overflow-y-scroll flex flex-col p-2 gap-4 h-full">
        {musicArray && musicArray?.length > 0 ? (
          <>
            <AnimatePresence>
              {musicArray?.map((music) => (
                <MusicCard key={music.id} music={music}></MusicCard>
              ))}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 justify-center">
            <p className="font-thin uppercase text-opacity-50 text-center">
              Add your own music by clicking on the plus button
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
