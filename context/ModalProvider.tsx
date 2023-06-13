import { Dropdown, DropdownItem } from "components/Dropdown";
import { Modal } from "components/Modal";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  HTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiCloseFill } from "react-icons/ri";

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
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

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
                <form className="flex flex-col gap-4 items-center justify-center">
                  <input
                    disabled={loading}
                    type="text"
                    id="title"
                    placeholder="Song title"
                    className="appearance-none text-base px-4 py-2 bg-white bg-opacity-[0.18] border-b-2 border-b-white focus:bg-opacity-30 transition-all"
                  />
                  <div
                    id="platform"
                    onClick={() => {
                      if (!loading) setDropdown((x) => !x);
                    }}
                    className="w-4/5 text-base z-10 relative text-opacity-50 px-4 py-2 bg-white bg-opacity-[0.18] border-b-2 border-b-white"
                  >
                    {platform ? platform : "Select Platform"}
                    <AnimatePresence>
                      {dropdown && (
                        <Dropdown className="absolute w-full top-full left-0 min-h-fit">
                          <DropdownItem className="bg-brand-light hover:bg-brand-base transition-all divide-y-2 divide-slate-500">
                            <span
                              onClick={() => {
                                setPlatform("Spotify");
                              }}
                            >
                              Spotify
                            </span>
                          </DropdownItem>
                          <DropdownItem className="bg-brand-light hover:bg-brand-base transition-all divide-y-2 divide-slate-500">
                            <span
                              onClick={() => {
                                setPlatform("Apple Music");
                              }}
                            >
                              Apple Music
                            </span>
                          </DropdownItem>
                          <DropdownItem className="bg-brand-light hover:bg-brand-base transition-all divide-y-2 divide-slate-500">
                            <span
                              onClick={() => {
                                setPlatform("SoundCloud");
                              }}
                            >
                              SoundCloud
                            </span>
                          </DropdownItem>
                          <DropdownItem className="bg-brand-light hover:bg-brand-base transition-all divide-y-2 divide-slate-500">
                            <span
                              onClick={() => {
                                setPlatform("YouTube");
                              }}
                            >
                              YouTube
                            </span>
                          </DropdownItem>
                        </Dropdown>
                      )}
                    </AnimatePresence>
                  </div>

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
                <form action="" className="flex justify-center">
                  <input
                    type="text"
                    className="appearance-none text-base px-4 py-2 bg-white bg-opacity-[0.18] border-b-2 border-b-white focus:bg-opacity-30 transition-all"
                    id="url"
                    placeholder="Enter URL"
                    disabled={loading}
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
