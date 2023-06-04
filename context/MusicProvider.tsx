import React, { useContext, createContext, useState, useCallback } from "react";

const MusicContext = createContext<{
  musicArray?: Array<{ title: string; img: string; id: number }>;
  removeFromArray?: (removeId: number) => void;
  pushMusic?: ({
    title,
    img,
    id,
  }: {
    title: string;
    img: string;
    id: number;
  }) => void;
  currentMusic?: { title: string; img: string; id: number };
  setCurrentMusic?: React.Dispatch<
    React.SetStateAction<{ title: string; img: string; id: number } | undefined>
  >;
}>({});

export const useMusic = () => {
  return useContext(MusicContext);
};

const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [musicArray, setMusicArray] = useState<
    Array<{ title: string; img: string; id: number }>
  >([]);

  const removeFromArray = useCallback((removeId: number) => {
    setMusicArray((prev) => prev?.filter(({ id }) => id !== removeId));
  }, []);

  const pushMusic = useCallback(
    ({ title, img, id }: { title: string; img: string; id: number }) => {
      setMusicArray((prev) => [...prev, { title, img, id }]);
    },
    []
  );
  const [currentMusic, setCurrentMusic] = useState<{
    title: string;
    img: string;
    id: number;
  }>();
  const value = {
    musicArray,
    removeFromArray,
    pushMusic,
    currentMusic,
    setCurrentMusic,
  };
  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

export default MusicProvider;
