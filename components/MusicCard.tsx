import React from "react";
import Image from "next/image";
import { RiPlayFill } from "react-icons/ri";

export const MusicCard = ({
  isCurrent,
  title,
  img,
}: {
  isCurrent: boolean;
  title: string;
  img: string;
}) => {
  return (
    <div
      className={`rounded-lg p-4 ${
        isCurrent ? "shadow-md" : "shadow-none"
      } bg-white text-slate-800 w-full grid [grid-template-columns:1fr_3fr] grid-rows-2`}
    >
      <Image
        alt={title}
        src={img}
        className="rounded-lg aspect-square row-span-2 row-start-1 col-span-1 col-start-1"
        width={72}
        height={72}
      />
      <h2 className="font-bold col-span-1 row-span-1 row-start-1 col-start-2">
        {title}
      </h2>
      <div className="flex justify-center items-center gap-4"></div>
    </div>
  );
};
