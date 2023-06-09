import { Music, Repeat } from "models";
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
  repeatMode?: Repeat;
  setRepeatMode?: React.Dispatch<React.SetStateAction<Repeat>>;
}>({});

export const useMusic = () => {
  return useContext(MusicContext);
};

const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [musicArray, setMusicArray] = useState<Array<Music>>(
    /*JSON.parse(global.localStorage.getItem("songs") || "[]") ||*/ []
  );
  const [repeatMode, setRepeatMode] = useState<Repeat>("no-repeat");

  const removeFromArray = useCallback((removeId: number) => {
    setMusicArray((prev) => prev?.filter(({ id }) => id !== removeId));
  }, []);

  const pushMusic = useCallback((music: Music) => {
    setMusicArray((prev) => [...prev, music]);
  }, []);
  const [currentMusic, setCurrentMusic] = useState<Music>();
  const [volume, setVolume] = useState<number>(0.45);

  useEffect(() => {
    if (currentMusic) {
      currentMusic!.file.volume = volume || 0.45;
      if (repeatMode === "repeat-all" && currentMusic.file.ended) {
        currentMusic.file.pause();
        currentMusic.id === musicArray.length - 1
          ? setCurrentMusic(musicArray[0])
          : setCurrentMusic(musicArray[currentMusic.id + 1]);
        currentMusic.file.play();
      } else if (repeatMode === "repeat-one" && currentMusic.file.ended) {
        currentMusic.file.currentTime = 0;
        currentMusic.file.play();
      } else if (currentMusic.file.ended) {
        currentMusic.file.pause();
      }
    }
  }, [
    volume,
    currentMusic?.id,
    currentMusic?.file.currentTime,
    currentMusic?.file.paused,
  ]);

  useEffect(() => {
    global.localStorage.setItem(
      "songs",
      JSON.stringify([
        ...musicArray.map((x) => ({ ...x, file: JSON.stringify(x.file) })),
      ])
    );
  }, [musicArray]);

  const value = {
    musicArray,
    removeFromArray,
    pushMusic,
    currentMusic,
    setCurrentMusic,
    volume,
    setVolume,
    repeatMode,
    setRepeatMode,
  };
  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

export default MusicProvider;
