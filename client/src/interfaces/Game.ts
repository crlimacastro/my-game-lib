export default interface Game {
    slug: string;
    id: number;
    name: string;
    released: string;
    background_image: string;
    short_screenshots: { id: number; image: string }[];
  }