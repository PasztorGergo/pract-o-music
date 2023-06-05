import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  RiPlayCircleFill,
  RiCloseCircleFill,
  RiMusicFill,
  RiPauseCircleFill,
} from "react-icons/ri";
import { Music } from "models";
import { useMusic } from "context/MusicProvider";

export const MusicCard = ({ music }: { music: Music }) => {
  const { currentMusic, setCurrentMusic, removeFromArray } = useMusic();
  const [paused, setPaused] = useState<boolean>(true);

  useEffect(() => {
    if (currentMusic?.id !== music.id) {
      setPaused(true);
    }
  }, [currentMusic]);

  return (
    <div
      className={`rounded-lg p-4 ${
        currentMusic?.id === music.id
          ? "shadow-md bg-slate-300"
          : "shadow-sm bg-slate-200"
      }  text-slate-800 w-full grid [grid-template-columns:1fr_3fr] grid-rows-2`}
    >
      {music.img && music.img !== "" ? (
        <Image
          alt={music.title}
          src={music.img}
          className="rounded-lg aspect-square row-span-2 row-start-1 col-span-1 col-start-1"
          width={72}
          height={72}
        />
      ) : (
        <div className="text-3xl w-[4.5rem] h-[4.5rem] aspect-square rounded-lg bg-[linear-gradient(135deg,#1CD8D2_0%,#93EDC7_100%)] p-2 grid place-items-center">
          <RiMusicFill className="text-black "> </RiMusicFill>
        </div>
      )}
      <h2 className="font-bold col-span-1 row-span-1 row-start-1 col-start-2 text-slate-800">
        {music.title}
      </h2>
      <div className="flex justify-center items-center gap-4">
        <RiCloseCircleFill
          onClick={() => {
            if (currentMusic?.id === music.id) {
              currentMusic?.file.pause();
              setCurrentMusic!(undefined);
            }
            removeFromArray!(music.id);
          }}
          className="cursor-pointer fill-slate-800 h-8 w-8"
        ></RiCloseCircleFill>
        {paused ? (
          <RiPlayCircleFill
            onClick={() => {
              if (currentMusic?.id !== music.id) {
                currentMusic?.file.pause();
                //@ts-ignore
                currentMusic?.file.currentTime = 0;
                setCurrentMusic!(music);
              }
              music.file.play();
              setPaused(false);
            }}
            className="cursor-pointer fill-slate-800 h-8 w-8"
          ></RiPlayCircleFill>
        ) : (
          <RiPauseCircleFill
            className="cursor-pointer fill-slate-800 h-8 w-8"
            onClick={() => {
              music.file.pause();
              setPaused(true);
            }}
          ></RiPauseCircleFill>
        )}
      </div>
    </div>
  );
};
