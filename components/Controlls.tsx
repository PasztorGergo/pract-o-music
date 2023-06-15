"use client";

import { useMusic } from "context/MusicProvider";
import { Music } from "models";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  RiPauseFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from "react-icons/ri";

export const Controlls = ({ currentMusic }: { currentMusic: Music }) => {
  const { setCurrentMusic, musicArray, paused, setPaused } = useMusic()!;

  useEffect(() => {
    if (paused) {
      currentMusic.file.play().then(() => setPaused(false));
    }
  }, [currentMusic.id]);

  return (
    <div className="bg-white bg-opacity-[0.18] border border-white border-opacity-[0.19] backdrop-blur rounded-lg p-4 flex justify-between items-center text-[32px] text-white">
      <RiSkipBackFill
        className="cursor-pointer"
        onClick={() => {
          setPaused(true);
          currentMusic.file.pause();
          currentMusic.file.currentTime = 0;
          if (musicArray.findIndex((y) => currentMusic.id === y.id) == 0) {
            setCurrentMusic(musicArray.at(-1));
          } else {
            setCurrentMusic(
              (x) => musicArray[musicArray.findIndex((y) => x?.id === y.id) - 1]
            );
          }
          console.log(currentMusic.id);
        }}
      ></RiSkipBackFill>
      {paused ? (
        <RiPlayFill
          className="cursor-pointer"
          onClick={() => {
            setPaused(false);
            currentMusic.file.play();
          }}
        ></RiPlayFill>
      ) : (
        <RiPauseFill
          className="cursor-pointer"
          onClick={() => {
            setPaused(true);
            currentMusic.file.pause();
          }}
        ></RiPauseFill>
      )}
      <RiSkipForwardFill
        className="cursor-pointer"
        onClick={() => {
          setPaused(true);
          currentMusic.file.pause();
          currentMusic.file.currentTime = 0;
          console.log(currentMusic.file.paused);
          if (currentMusic.id == musicArray.at(-1)?.id) {
            setCurrentMusic(musicArray[0]);
          } else {
            setCurrentMusic(
              (x) => musicArray[musicArray.findIndex((y) => x?.id === y.id) + 1]
            );
          }
          console.log(currentMusic.id);
        }}
      ></RiSkipForwardFill>
    </div>
  );
};
