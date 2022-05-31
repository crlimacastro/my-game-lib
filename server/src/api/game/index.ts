import axios from "axios";
import client from "../../db/client";
import Env from "../../interfaces/Env";
import Game from "./interfaces/Game";

export { default as Game } from "./interfaces/Game";

interface SearchRes {
  count: number;
  next?: string;
  previous?: string;
  results: Game[];
}

export const searchGame = async (query: string): Promise<SearchRes> => {
  const { RAWG_API_KEY } = process.env as Env;
  const { data } = await axios.get(
    `https://api.rawg.io/api/games?search=${query}&key=${RAWG_API_KEY}&page_size=10`
  );
  return data;
};

export const getGame = async (id: string): Promise<Game> => {
  const { RAWG_API_KEY } = process.env as Env;
  const { data } = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`
  );
  return data;
};

export const getIsFavorite = async (
  username: string,
  gameId: string
): Promise<boolean> => {
  const { rows: games }: { rows: Game[] } = await client.query(
    "SELECT * FROM favorite_games WHERE user_username = $1 AND game_id =$2",
    [username, gameId]
  );
  return games.length > 0;
};

export const getFavorites = async (username: string): Promise<Game[]> => {
  const { rows: games }: { rows: Game[] } = await client.query(
    "SELECT game_id FROM favorite_games WHERE user_username = $1",
    [username]
  );
  return games;
};

export const favoriteGame = async (
  username: string,
  gameId: string
): Promise<void> => {
  await client.query(
    "INSERT INTO favorite_games (user_username, game_id) VALUES ($1, $2)",
    [username, gameId]
  );
};

export const unfavoriteGame = async (
  username: string,
  gameId: string
): Promise<void> => {
  await client.query(
    "DELETE FROM favorite_games WHERE user_username = $1 AND game_id = $2",
    [username, gameId]
  );
};
