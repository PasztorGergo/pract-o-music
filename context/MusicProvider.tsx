import { Music } from "models";
import React, { useContext, createContext, useState, useCallback } from "react";

const MusicContext = createContext<{
  musicArray?: Array<Music>;
  removeFromArray?: (removeId: number) => void;
  pushMusic?: (music: Music) => void;
  currentMusic?: Music;
  setCurrentMusic?: React.Dispatch<React.SetStateAction<Music | undefined>>;
}>({});

export const useMusic = () => {
  return useContext(MusicContext);
};

const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [musicArray, setMusicArray] = useState<Array<Music>>([]);

  const removeFromArray = useCallback((removeId: number) => {
    setMusicArray((prev) => prev?.filter(({ id }) => id !== removeId));
  }, []);

  const pushMusic = useCallback((music: Music) => {
    setMusicArray((prev) => [...prev, music]);
  }, []);
  const [currentMusic, setCurrentMusic] = useState<Music>();
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
