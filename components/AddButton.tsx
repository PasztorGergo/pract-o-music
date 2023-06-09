import { Music } from "models";
import React, { useState } from "react";
import { RiAddCircleFill, RiGlobalFill, RiSaveFill } from "react-icons/ri";
import { Dropdown, DropdownItem } from "./Dropdown";
import { AnimatePresence } from "framer-motion";
import { useModal } from "context/ModalProvider";
import { toast } from "react-hot-toast";

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
    try {
      const file = new Audio(src);
      pushMusic({
        title,
        id: src,
        img: "",
        file,
      });
      toast.success("Song was added", {
        duration: 5000,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        duration: 5000,
      });
    }
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
                <RiSaveFill className="text-white text-opacity-80 text-2xl cursor-pointer"></RiSaveFill>
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
                <RiGlobalFill className="text-white text-opacity-80 text-2xl cursor-pointer"></RiGlobalFill>
              }
            >
              <label
                onClick={() => {
                  setOpen(true);
                }}
                className="text-white text-opacity-80 cursor-pointer"
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
