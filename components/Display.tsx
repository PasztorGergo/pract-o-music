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

export const Display = () => {
  const { currentMusic, setVolume, volume } = useMusic()!;
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
      <div className="row-span-2 row-start-1 col-span-1 col-start-1 w-full h-2/3 bg-white bg-opacity-[0.18] border border-white border-opacity-[0.19] backdrop-blur rounded-lg p-4 grid place-items-center">
        <RiMusicFill className="text-white text-[64px]"></RiMusicFill>
        <h2 className="text-center font-bold">{currentMusic?.title}</h2>
      </div>
      {currentMusic && <Controlls currentMusic={currentMusic}></Controlls>}
      <div className="flex w-full gap-4 items-center p-4 bg-white bg-opacity-[0.18] border border-white border-opacity-[0.19] backdrop-blur rounded-lg">
        <input
          type="range"
          className="grow-[0.7] h-1 appearance-none bg-white bg-opacity-80 rounded-lg accent-white"
          value={currentMusic?.file.currentTime}
          max={currentMusic?.file.duration}
          min={0}
          onChange={(e) => {
            //@ts-ignore
            currentMusic.file.currentTime = parseFloat(e.currentTarget.value);
            setMusicTime(currentMusic?.file.currentTime || musicTime);
            //@ts-ignore
            currentMusic.file.volume = volume;
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
          {currentMusic?.file.volume === 0 ? (
            <RiVolumeMuteFill
              className="text-2xl text-white cursor-pointer"
              onClick={() => {
                //@ts-ignore
                currentMusic?.file.volume = volume === 0 ? 0.45 : volume;
              }}
            ></RiVolumeMuteFill>
          ) : volume! < 0.5 ? (
            <RiVolumeDownFill
              className="text-2xl text-white cursor-pointer"
              onClick={() => {
                if (currentMusic) currentMusic.file.volume = 0;
              }}
            ></RiVolumeDownFill>
          ) : (
            <RiVolumeUpFill
              className="text-2xl text-white cursor-pointer"
              onClick={() => {
                if (currentMusic) currentMusic.file.volume = 0;
              }}
            ></RiVolumeUpFill>
          )}
          <input
            type="range"
            className="h-1 appearance-none bg-white bg-opacity-80 rounded-lg accent-white"
            min={0}
            max={1}
            step={0.01}
            onChange={(e) => {
              setVolume(parseFloat(e.currentTarget.value));
              if (currentMusic)
                currentMusic.file.volume = parseFloat(e.currentTarget.value);
            }}
            value={volume}
          />
        </div>
      </div>
    </>
  );
};
