import { Music, Repeat } from "models";
import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const MusicContext = createContext<
  | {
      musicArray: Array<Music>;
      removeFromArray: (removeId: string) => void;
      pushMusic: (music: Music) => void;
      currentMusic?: Music;
      setCurrentMusic: React.Dispatch<React.SetStateAction<Music | undefined>>;
      volume: number;
      setVolume: React.Dispatch<React.SetStateAction<number>>;
      repeatMode: Repeat;
      setRepeatMode: React.Dispatch<React.SetStateAction<Repeat>>;
      paused: boolean;
      setPaused: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const useMusic = () => {
  return useContext(MusicContext);
};

const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [musicArray, setMusicArray] = useState<Array<Music>>(
    /*JSON.parse(global.localStorage.getItem("songs") || "[]") ||*/ []
  );
  const [repeatMode, setRepeatMode] = useState<Repeat>("no-repeat");

  const removeFromArray = useCallback((removeId: string) => {
    setMusicArray((prev) => prev?.filter(({ id }) => id !== removeId));
  }, []);

  const pushMusic = useCallback((music: Music) => {
    setMusicArray((prev) => [...prev, music]);
  }, []);
  const [currentMusic, setCurrentMusic] = useState<Music>();
  const [paused, setPaused] = useState<boolean>(
    currentMusic?.file.paused ?? true
  );
  const [volume, setVolume] = useState<number>(0.45);

  useEffect(() => {
    if (currentMusic) {
      currentMusic.file.volume = volume;
    }
  }, [
    volume,
    currentMusic?.id,
    currentMusic?.file.currentTime,
    currentMusic?.file.paused,
  ]);

  if (currentMusic && repeatMode === "repeat-all") {
    currentMusic.file.onended = (e) => {
      if (currentMusic.id === musicArray.at(-1)?.id) {
        musicArray[0].file.play();
        setCurrentMusic(musicArray[0]);
      } else {
        musicArray[
          musicArray.findIndex((x) => x.id === currentMusic.id) + 1
        ].file.play();
        setCurrentMusic(
          (x) => musicArray[musicArray.findIndex((y) => y.id === x?.id) + 1]
        );
      }
    };
  }

  useEffect(() => {
    if (currentMusic) {
      if (paused) {
        currentMusic.file.pause();
      } else {
        currentMusic.file.play();
      }
    }
  }, [paused]);

  useEffect(() => {
    console.log(currentMusic?.file.ended);
    if (currentMusic) {
      currentMusic.file.volume = volume;
      if (repeatMode === "repeat-all" && currentMusic.file.ended) {
        if (currentMusic.id === musicArray.at(-1)?.id) {
          musicArray[0].file.play();
          setCurrentMusic(musicArray[0]);
        } else {
          musicArray[
            musicArray.findIndex((x) => x.id === currentMusic.id) + 1
          ].file.play();
          setCurrentMusic(
            (x) => musicArray[musicArray.findIndex((y) => y.id === x?.id) + 1]
          );
        }
      } else if (repeatMode === "repeat-one") {
        currentMusic.file.loop = true;
      } else {
        currentMusic.file.loop = false;
      }
    }
  }, [currentMusic?.file.ended, repeatMode, currentMusic?.id]);

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
    paused,
    setPaused,
  };
  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

export default MusicProvider;
