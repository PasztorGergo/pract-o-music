import { Modal } from "components/Modal";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

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
  const [open, setOpen] = useState<boolean>(false);

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
              onClick={() => setOpen(false)}
              className="backdrop-blur-md grid bg-black z-30 absolute top-0 left-0 w-full h-screen"
            ></motion.div>
            <div className="grid fixed top-0 left-0 w-full h-screen z-40">
              <Modal className="bg-brand-light rounded-lg p-4 flex flex-col gap-4">
                <h2 className="uppercase text-sm font-bold text-center text-white">
                  Search music
                </h2>
                <form className="flex flex-col gap-4 items-center justify-center">
                  <input
                    type="text"
                    id="title"
                    placeholder="Song title"
                    className="appearance-none text-base px-4 py-2 bg-white bg-opacity-[0.18] border-b-2 border-b-white"
                  />
                  <select
                    id="platform"
                    placeholder="Select Platform"
                    className="appearance-none text-base px-4 py-2 bg-white bg-opacity-[0.18] border-b-2 border-b-white"
                  >
                    <option
                      className="bg-white bg-opacity-[0.18] divide-y-2 divide-slate-500"
                      value="spotify"
                    >
                      Spotify
                    </option>
                    <option
                      className="bg-white bg-opacity-[0.18] divide-y-2 divide-slate-500"
                      value="applemusic"
                    >
                      Apple Music
                    </option>
                    <option
                      className="bg-white bg-opacity-[0.18] divide-y-2 divide-slate-500"
                      value="soundCloud"
                    >
                      SoundCloud
                    </option>
                    <option
                      className="bg-white bg-opacity-[0.18] divide-y-2 divide-slate-500"
                      value="youtube"
                    >
                      YouTube
                    </option>
                  </select>
                  <button
                    type="submit"
                    className="rounded-lg transition-all bg-white text-brand-light border-2 border-white text-center uppercase text-sm font-bold px-4 py-2 hover:bg-transparent hover:text-white"
                  >
                    Search
                  </button>
                </form>
                <p className="uppercase text-2xl text-white font-normal text-center">
                  or
                </p>
                <form action="" className="flex justify-center">
                  <input
                    type="text"
                    className="appearance-none text-base px-4 py-2 bg-white bg-opacity-[0.18] border-b-2 border-b-white"
                    id="url"
                    placeholder="Enter URL"
                  />
                  <button
                    className="rounded-r-lg px-4 hover:bg-slate-200 bg-white uppercase text-sm font-bold rounded-l-none text-center text-brand-light"
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
