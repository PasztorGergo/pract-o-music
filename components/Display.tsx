"use client";
import { useMusic } from "context/MusicProvider";
import React, { useCallback, useEffect, useState } from "react";
import {
  RiMusicFill,
  RiVolumeDownFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "react-icons/ri";

export const Display = () => {
  const { currentMusic, setVolume, volume } = useMusic();
  const [musicTime, setMusicTime] = useState<number>(
    currentMusic?.file.currentTime || 0
  );
  const interval = setInterval(() => {
    setMusicTime(currentMusic!.file.currentTime);
  }, 1000);

  useEffect(() => {
    setMusicTime(currentMusic!.file.currentTime);
    interval;

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    clearInterval(interval);
  }, [currentMusic?.id]);

  return (
    <>
      <div className="row-span-2 row-start-1 col-span-1 col-start-1 text-3xl w-full h-2/3 rounded-lg bg-[linear-gradient(135deg,#1CD8D2_0%,#93EDC7_100%)] p-2 grid place-items-center">
        <RiMusicFill className="text-black "></RiMusicFill>
      </div>
      <h2 className="text-center">{currentMusic?.title}</h2>
      <div className="flex w-full gap-4 items-center">
        <input
          type="range"
          className="grow-[0.7] h-1 appearance-none bg-[#93EDC7] rounded-lg accent-[#1CD8D2]"
          value={currentMusic!.file.currentTime}
          max={currentMusic?.file.duration}
          min={0}
          onChange={(e) => {
            //@ts-ignore
            currentMusic.file.currentTime = parseFloat(e.currentTarget.value);
            setMusicTime(currentMusic?.file.currentTime!);
            setVolume!(volume!);
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
        <div className="flex items-center justify-end gap-4 grow-[0.3]">
          {volume === 0 ? (
            <RiVolumeMuteFill className="text-2xl text-slate-800"></RiVolumeMuteFill>
          ) : volume! < 0.5 ? (
            <RiVolumeDownFill className="text-2xl text-slate-800"></RiVolumeDownFill>
          ) : (
            <RiVolumeUpFill className="text-2xl text-slate-800"></RiVolumeUpFill>
          )}
          <input
            type="range"
            className="h-1 appearance-none bg-[#93EDC7] rounded-lg accent-[#1CD8D2]"
            min={0}
            max={1}
            step={0.01}
            onChange={(e) => {
              setVolume!(parseFloat(e.currentTarget.value));
              currentMusic!.file.volume = parseFloat(e.currentTarget.value);
            }}
            value={volume}
          />
        </div>
      </div>
    </>
  );
};
