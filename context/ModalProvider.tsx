import { Dropdown, DropdownItem } from "components/Dropdown";
import { Modal } from "components/Modal";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { FieldValues, useForm } from "react-hook-form";
import { useMusic } from "./MusicProvider";
import { Music } from "models";
import { findByTitle, findByURL } from "utils/api";
import toast from "react-hot-toast";

const modalContext = React.createContext<
  | {
      open: boolean;
      setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const useModal = () => {
  return React.useContext(modalContext);
};

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { pushMusic } = useMusic()!;
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, resetField } = useForm();

  const getSongByTitle = (data: FieldValues) => {
    setLoading(true);
    let song: Music;

    toast
      .promise(findByTitle(data.title), {
        error: "The song is either region restricted\nor couldn't be found",
        loading: "Searching...",
        success: "Successfully added the song",
      })
      .then((x) => {
        if (x.id) {
          song = x;
          pushMusic(song);
        }
        setOpen(false);
      })
      .catch((x) => x)
      .finally(() => {
        setLoading(false);
        resetField("title");
      });
  };

  const getSongByUrl = (data: FieldValues) => {
    setLoading(true);
    let song: Music;

    toast
      .promise(findByURL(data.url), {
        error: "The song is either region restricted\nor couldn't be found",
        loading: "Searching...",
        success: "Successfully added the song",
      })
      .then((x) => {
        if (x.id) {
          song = x;
          pushMusic(song);
        }
        setOpen(false);
      })
      .catch((x) => x)
      .finally(() => {
        setLoading(false);
        resetField("url");
      });
  };

  const value = {
    open,
    setOpen,
  };
  return (
    <modalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.3,
                transition: { duration: 0.3, type: "tween" },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3, type: "tween" },
              }}
              className="backdrop-blur-md grid bg-black z-30 absolute top-0 left-0 w-full h-screen"
            ></motion.div>
            <div className="grid fixed top-0 left-0 w-full h-screen z-40">
              <Modal className="bg-brand-light rounded-lg p-4 flex flex-col gap-4">
                <RiCloseFill
                  className="absolute top-4 right-4 text-white text-xl"
                  onClick={() => {
                    if (!loading) {
                      setOpen(false);
                    }
                  }}
                ></RiCloseFill>
                <h2 className="uppercase text-sm font-bold text-center text-white">
                  Search music
                </h2>
                <form
                  className="flex flex-col gap-4 items-center justify-center"
                  onSubmit={handleSubmit(getSongByTitle)}
                >
                  <input
                    {...register("title")}
                    disabled={loading}
                    type="text"
                    id="title"
                    placeholder="Song title"
                    className="appearance-none text-base px-4 py-2 bg-white bg-opacity-[0.18] border-b-2 border-b-white focus:bg-opacity-30 transition-all"
                  />
                  <button
                    disabled={loading}
                    type="submit"
                    className="disabled:bg-slate-200 disabled:hover:bg-slate-200 disabled:hover:text-brand-light rounded-lg z-[9] transition-all bg-white text-brand-light border-2 border-white text-center uppercase text-sm font-bold px-4 py-2 hover:bg-transparent hover:text-white"
                  >
                    Search
                  </button>
                </form>
                <p className="uppercase text-2xl text-white font-normal text-center">
                  or
                </p>
                <form
                  action=""
                  className="flex justify-center"
                  onSubmit={handleSubmit(getSongByUrl)}
                >
                  <input
                    type="text"
                    className="appearance-none text-base px-4 py-2 bg-white bg-opacity-[0.18] border-b-2 border-b-white focus:bg-opacity-30 transition-all"
                    id="url"
                    placeholder="Enter URL"
                    disabled={loading}
                    {...register("url")}
                  />
                  <button
                    disabled={loading}
                    className="disabled:bg-slate-200 disabled:hover:bg-slate-200 disabled:hover:text-brand-light rounded-r-lg px-4 hover:bg-slate-200 bg-white uppercase text-sm font-bold rounded-l-none text-center text-brand-light"
                    type="submit"
                  >
                    add
                  </button>
                </form>
              </Modal>
            </div>
          </>
        )}
      </AnimatePresence>
    </modalContext.Provider>
  );
};

export default ModalProvider;
