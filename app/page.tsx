"use client";
import { Metadata } from "next";
import React from "react";
import { MusicCard } from "components";
import { useMusic } from "context/MusicProvider";

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
      <main></main>
    </>
  );
};

export default HomePage;
