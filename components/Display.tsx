"use client";
import { useMusic } from "context/MusicProvider";
import React, { useEffect, useState } from "react";
import {
  RiMusicFill,
  RiVolumeDownFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "react-icons/ri";
import { Controlls } from "./Controlls";
import { Playback } from "./Playback";

export const Display = () => {
  const { currentMusic } = useMusic()!;

  return (
    <>
      <div className="row-span-2 row-start-1 col-span-1 col-start-1 w-full h-2/3 bg-white bg-opacity-[0.18] border border-white border-opacity-[0.19] backdrop-blur rounded-lg p-4 grid place-items-center">
        <RiMusicFill className="text-white text-[64px]"></RiMusicFill>
        <h2 className="text-center font-bold">{currentMusic?.title}</h2>
      </div>
      {currentMusic && (
        <>
          <Controlls currentMusic={currentMusic}></Controlls>{" "}
          <Playback currentMusic={currentMusic}></Playback>
        </>
      )}
    </>
  );
};
