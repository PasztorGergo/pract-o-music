"use client";

import { useMusic } from "context/MusicProvider";
import { Music } from "models";
import React, { useEffect, useState } from "react";
import {
  RiPauseFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from "react-icons/ri";

export const Controlls = ({ currentMusic }: { currentMusic: Music }) => {
  const { setCurrentMusic, musicArray } = useMusic()!;
  const [paused, setPaused] = useState<boolean>(
    currentMusic?.file.paused || true
  );

  useEffect(() => {
    if (
      currentMusic.file.paused ||
      currentMusic.file.paused === undefined ||
      currentMusic.file.ended
    ) {
      setPaused(true);
    } else {
      setPaused(false);
    }
  }, [
    currentMusic.file.paused,
    currentMusic.file.currentTime,
    currentMusic.file.ended,
  ]);

  return (
    <div className="bg-white bg-opacity-[0.18] border border-white border-opacity-[0.19] backdrop-blur rounded-lg p-4 flex justify-between items-center text-[32px] text-white">
      <RiSkipBackFill
        className="cursor-pointer"
        onClick={() => {
          if (currentMusic.id === 0) {
            setCurrentMusic(musicArray.at(-1));
          } else {
            setCurrentMusic(musicArray[currentMusic.id - 1]);
          }
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
          if (currentMusic.id === musicArray.at(-1)?.id) {
            setCurrentMusic(musicArray[0]);
          } else {
            setCurrentMusic(musicArray[currentMusic.id + 1]);
          }
        }}
      ></RiSkipForwardFill>
    </div>
  );
};
