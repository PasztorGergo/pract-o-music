import { Music } from "models";
import React, { useState } from "react";
import { RiAddCircleFill, RiGlobalFill, RiSaveFill } from "react-icons/ri";
import { Dropdown, DropdownItem } from "./Dropdown";
import { AnimatePresence } from "framer-motion";
import { useModal } from "context/ModalProvider";

export const AddButton = ({
  musicArray,
  pushMusic,
}: {
  musicArray: Array<Music>;
  pushMusic: (music: Music) => void;
}) => {
  const { setOpen } = useModal()!;
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const uploadMusic = (src: string, title: string) => {
    const file = new Audio(src);
    pushMusic({
      title,
      id: src,
      img: "",
      file,
    });
    console.log(musicArray);
  };
  return (
    <>
      <RiAddCircleFill
        className={`text-[32px] duration-500 text-white transition-transform ${
          dropOpen ? "rotate-45" : "rotate-0"
        }`}
        onClick={() => {
          setDropOpen((x) => !x);
        }}
      ></RiAddCircleFill>
      <AnimatePresence>
        {dropOpen && (
          <Dropdown className="absolute lg:top-0 lg:-right-48 top-full right-0 w-fit h-fit flex flex-col bg-brand-light rounded-lg">
            <DropdownItem
              icon={
                <RiSaveFill className="text-white text-opacity-80 text-2xl"></RiSaveFill>
              }
            >
              <label
                className="cursor-pointer text-white text-opacity-80"
                htmlFor="file"
              >
                Upload from disk
              </label>
              <input
                onChange={(e) => {
                  e.target.files &&
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
            </DropdownItem>
            <DropdownItem
              icon={
                <RiGlobalFill className="text-white text-opacity-80 text-2xl"></RiGlobalFill>
              }
            >
              <label
                onClick={() => {
                  setOpen(true);
                }}
                className="text-white text-opacity-80"
              >
                Search by title
              </label>
            </DropdownItem>
          </Dropdown>
        )}
      </AnimatePresence>
    </>
  );
};
