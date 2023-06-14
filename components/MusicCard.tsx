import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import {
  RiPlayCircleFill,
  RiCloseCircleFill,
  RiMusicFill,
  RiPauseCircleFill,
} from "react-icons/ri";
import { Music } from "models";
import { useMusic } from "context/MusicProvider";
import { motion } from "framer-motion";

export const MusicCard = ({ music }: { music: Music }) => {
  const { currentMusic, setCurrentMusic, removeFromArray } = useMusic()!;
  const [paused, setPaused] = useState<boolean>(
    currentMusic?.file.paused || true
  );

  useEffect(() => {
    if (currentMusic?.id !== music.id) {
      setPaused(true);
    }

    if (music.file.paused || music.file.paused === undefined) {
      setPaused(true);
    } else {
      setPaused(false);
    }
  }, [currentMusic?.file]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transformOrigin: "center",
        transition: { type: "spring", stiffness: 60, bounce: 0 },
      }}
      exit={{
        opacity: 0,
        transformOrigin: "center",
        transition: { type: "spring", stiffness: 60, bounce: 0 },
      }}
      className={`rounded-lg p-4 ${
        currentMusic?.id === music.id ? "shadow-md" : "shadow-sm"
      }  text-white w-full bg-brand-base grid gap-x-4 [grid-template-columns:1fr_3fr] grid-rows-2 transition-all`}
    >
      {music.img && music.img !== "" ? (
        <Image
          alt={music.title}
          src={music.img}
          className="rounded-lg aspect-square row-span-2 row-start-1 col-span-1 col-start-1 object-cover"
          width={72}
          height={72}
        />
      ) : (
        <div className="row-span-2 row-start-1 col-span-1 col-start-1 text-3xl w-[4.5rem] h-[4.5rem] aspect-square rounded-lg bg-brand-light p-2 grid place-items-center">
          <RiMusicFill className="text-white "> </RiMusicFill>
        </div>
      )}
      <h2 className="font-bold col-span-1 row-span-1 row-start-1 col-start-2 text-white">
        {music.title}
      </h2>
      <div className="flex justify-start items-center gap-4">
        <RiCloseCircleFill
          onClick={() => {
            if (currentMusic?.id === music.id) {
              currentMusic?.file.pause();
              setCurrentMusic!(undefined);
            }
            removeFromArray(music.id);
          }}
          className="cursor-pointer text-white h-8 w-8"
        ></RiCloseCircleFill>
        {paused ? (
          <RiPlayCircleFill
            onClick={() => {
              if (currentMusic?.id !== music.id) {
                currentMusic?.file.pause();
                //@ts-ignore
                currentMusic?.file.currentTime = 0;
                setCurrentMusic(music);
              }
              music.file.play();
              setPaused(false);
            }}
            className="cursor-pointer text-white h-8 w-8"
          ></RiPlayCircleFill>
        ) : (
          <RiPauseCircleFill
            className="cursor-pointer text-white h-8 w-8"
            onClick={() => {
              music.file.pause();
              setPaused(true);
            }}
          ></RiPauseCircleFill>
        )}
      </div>
    </motion.div>
  );
};
