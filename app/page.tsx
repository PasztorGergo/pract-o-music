"use client";
import { Metadata } from "next";
import React, { useRef } from "react";
import { MusicCard } from "components";
import { useMusic } from "context/MusicProvider";
import { RiMusicFill } from "react-icons/ri";
import Image from "next/image";

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  title: "Pract-o-music",
};

const HomePage = () => {
  const { musicArray, currentMusic, pushMusic } = useMusic();

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
    <>
      <aside className="md:flex hidden flex-col justify-start gap-8 w-1/3">
        {musicArray && musicArray?.length > 0 ? (
          <>
            {musicArray?.map((music) => (
              <MusicCard key={music.id} music={music}></MusicCard>
            ))}
            <label
              className="self-center rounded-lg cursor-pointer uppercase font-bold text-sm transition-transform text-white hover:scale-105 bg-[linear-gradient(135deg,#1CD8D2_0%,#93EDC7_100%)] px-3 py-2"
              htmlFor="file"
            >
              Upload
            </label>
            <input
              onChange={(e) => {
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
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 justify-center">
            <p className="font-thin uppercase text-opacity-50">
              Add your own music
            </p>
            <label
              className="rounded-lg cursor-pointer uppercase font-bold text-sm transition-transform text-white hover:scale-105 bg-[linear-gradient(135deg,#1CD8D2_0%,#93EDC7_100%)] px-3 py-2"
              htmlFor="file"
            >
              Upload
            </label>
            <input
              onChange={(e) => {
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
        )}
      </aside>
      <main className="w-2/3 min-h-full max-h-screen flex flex-col justify-between items-center">
        {currentMusic ? (
          <>
            <div className="row-span-2 row-start-1 col-span-1 col-start-1 text-3xl w-full h-2/3 rounded-lg bg-[linear-gradient(135deg,#1CD8D2_0%,#93EDC7_100%)] p-2 grid place-items-center">
              <RiMusicFill className="text-black "></RiMusicFill>
            </div>
            <h2 className="text-center">{currentMusic?.title}</h2>
            <input
              type="range"
              className="w-full h-2"
              value={currentMusic.file.currentTime}
              max={currentMusic.file.duration}
              min={0}
              onChange={(e) => {
                currentMusic.file.currentTime = parseFloat(
                  e.currentTarget.value
                );
              }}
            />
          </>
        ) : (
          <>
            <Image
              src="https://media.tenor.com/rV2wuyhFea8AAAAC/there-is-no-music-bricky.gif"
              alt="no music is playing gif"
              width={300}
              height={456}
              className="rounded-lg"
            />
            <h2 className="text-slate-800 text-opacity-50 uppercase font-bold text-center text-sm">
              No music is playing
            </h2>
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;
