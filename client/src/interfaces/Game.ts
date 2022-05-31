export default interface Game {
  id: number;
  name: string;
  background_image: string;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  released: string;
}
