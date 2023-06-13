import { Music } from "models";

export const findByTitle = async (title: string, platform: string) => {
  try {
    const res = await (
      await fetch("https://musicapi13.p.rapidapi.com/public/search", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_KEY || "",
          "X-RapidAPI-Host": process.env.RAPID_URL || "",
        },
        body: JSON.stringify({
          track: title,
          type: "track",
          sources: [platform.toLowerCase().replace(" ", "")],
        }),
      })
    ).json();
    const { externalId, name, imageUrl, url } = res.tracks[0].data;

    const music: Music = {
      file: new Audio(url),
      id: externalId,
      title: name,
      img: imageUrl,
    };

    return music;
  } catch {
    return new Error("Couldn't find song by title");
  }
};
export const findByURL = async (url: string) => {
  try {
    const res = await (
      await fetch("https://musicapi13.p.rapidapi.com/public/inspect/url", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_KEY || "",
          "X-RapidAPI-Host": process.env.RAPID_URL || "",
        },
        body: JSON.stringify({
          url,
        }),
      })
    ).json();

    const { externalId, name, imageUrl, fileUrl } = res.data;

    const music: Music = {
      file: new Audio(fileUrl),
      id: externalId,
      title: name,
      img: imageUrl,
    };

    return music;
  } catch {
    return new Error(
      "Couldn't find song by URL please check whether it is correct"
    );
  }
};
