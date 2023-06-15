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

    if (audioRes.isRegionRestricted) {
      throw new Error("The song is region restricted");
    }

    const parsedUrl = new URL(
      audioRes.audios.items[0].url
        .replace("https://ymd.dlod.link/?u=", "")
        .replaceAll("%2F", "/")
        .replaceAll("%3D", "=")
        .replaceAll("%3A", ":")
        .replaceAll("%3F", "?")
        .replaceAll("%26", "&")
    ).toString();

    const music: Music = {
      file: new Audio(parsedUrl),
      id,
      title,
      img: thumbnails[0].url,
    };

    return music;
  } catch {
    throw new Error(
      "The song is either region restricted or couldn't be found"
    );
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

    if (res.isRegionRestricted) {
      throw new Error("The song is region restricted");
    }

    const { audios, thumbnails, id, title } = res;

    const parsedUrl = new URL(
      audios.items[0].url
        .replace("https://ymd.dlod.link/?u=", "")
        .replaceAll("%2F", "/")
        .replaceAll("%3D", "=")
        .replaceAll("%3A", ":")
        .replaceAll("%3F", "?")
        .replaceAll("%26", "&")
    ).toString();

    const music: Music = {
      file: new Audio(parsedUrl),
      id,
      title,
      img: thumbnails[0].url,
    };

    return music;
  } catch {
    throw new Error(
      "The song is either region restricted or couldn't be found"
    );
  }
};
