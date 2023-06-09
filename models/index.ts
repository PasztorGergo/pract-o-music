export interface Music {
  title: string;
  file: HTMLAudioElement;
  img?: string;
  id: number;
}
export type Repeat = "no-repeat" | "repeat-all" | "repeat-one";
