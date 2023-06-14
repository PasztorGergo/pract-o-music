import { Music } from "models";

export const findByTitle = async (songTitle: string) => {
  try {
    const res = await (
      await fetch(
        `https://youtube-media-downloader.p.rapidapi.com/v2/search/videos?keyword=${songTitle}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.RAPID_KEY || "",
            "X-RapidAPI-Host": process.env.RAPID_URL || "",
          },
        }
      )
    ).json();
    const { id, title, thumbnails } = res.items[0];

    const audioRes = await (
      await fetch(
        `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${id}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.RAPID_KEY || "",
            "X-RapidAPI-Host": process.env.RAPID_URL || "",
          },
        }
      )
    ).json();

    const music: Music = {
      file: new Audio(new URL(audioRes.audios.items[0].url).toString()),
      id,
      title,
      img: thumbnails[0].url,
    };

    return music;
  } catch {
    throw new Error("Couldn't find song by title");
  }
};
export const findByURL = async (url: string) => {
  try {
    const res = await (
      await fetch(
        `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${
          url.split("?v=")[1].split("&")[0]
        }`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.RAPID_KEY || "",
            "X-RapidAPI-Host": process.env.RAPID_URL || "",
          },
        }
      )
    ).json();

    const { audios, thumbnails, id, title } = res;

    const music: Music = {
      file: new Audio(audios.items[0].url),
      id,
      title,
      img: thumbnails[0].url,
    };

    return music;
  } catch {
    throw new Error(
      "Couldn't find song by URL please check whether it is correct"
    );
  }
};
