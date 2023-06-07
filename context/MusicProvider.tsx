import { Music } from "models";
import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const MusicContext = createContext<{
  musicArray?: Array<Music>;
  removeFromArray?: (removeId: number) => void;
  pushMusic?: (music: Music) => void;
  currentMusic?: Music;
  setCurrentMusic?: React.Dispatch<React.SetStateAction<Music | undefined>>;
  volume?: number;
  setVolume?: React.Dispatch<React.SetStateAction<number>>;
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
  const [volume, setVolume] = useState<number>(
    currentMusic?.file.volume || 0.45
  );

  useEffect(() => {
    musicArray.forEach((x) => (x.file.volume = volume));
  }, [, volume, currentMusic?.id]);

  const value = {
    musicArray,
    removeFromArray,
    pushMusic,
    currentMusic,
    setCurrentMusic,
    volume,
    setVolume,
  };
  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

export default MusicProvider;
