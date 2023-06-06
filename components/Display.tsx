"use client";
import { useMusic } from "context/MusicProvider";
import React, { useEffect, useState } from "react";
import { RiMusicFill } from "react-icons/ri";

export const Display = () => {
  const { currentMusic } = useMusic();
  const [musicTime, setMusicTime] = useState<number>(
    currentMusic?.file.currentTime || 0
  );

  useEffect(() => {
    setMusicTime(currentMusic?.file.currentTime || 0);
  }, [currentMusic?.file.currentTime]);

  return (
    <>
      <div className="row-span-2 row-start-1 col-span-1 col-start-1 text-3xl w-full h-2/3 rounded-lg bg-[linear-gradient(135deg,#1CD8D2_0%,#93EDC7_100%)] p-2 grid place-items-center">
        <RiMusicFill className="text-black "></RiMusicFill>
      </div>
      <h2 className="text-center">{currentMusic?.title}</h2>
      <input
        type="range"
        className="w-full h-1"
        value={musicTime}
        max={currentMusic?.file.duration}
        min={0}
        onChange={(e) => {
          //@ts-ignore
          currentMusic.file.currentTime = parseFloat(e.currentTarget.value);
          setMusicTime(currentMusic?.file.currentTime || 0);
        }}
        onMouseDown={() => {
          //@ts-ignore
          currentMusic?.file.volume = 0;
        }}
        onMouseUp={() => {
          //@ts-ignore
          currentMusic?.file.volume = 1;
        }}
      />
    </>
  );
};
