import { AnimatePresence } from "framer-motion";
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
      <AnimatePresence>{children}</AnimatePresence>
    </modalContext.Provider>
  );
};

export default ModalProvider;
