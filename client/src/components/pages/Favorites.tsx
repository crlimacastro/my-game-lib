import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/esm/Spinner";
import { Navigate } from "react-router-dom";
import Game from "../../interfaces/Game";
import GameCardData from "../../interfaces/GameCardData";
import { userState } from "../../state";
import GameCardGallery from "../games/GameCardGallery";

const Favorites: FC = () => {
  const [user] = useAtom(userState);
  const [data, setData] = useState<GameCardData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  interface FavoritesRes extends Array<{ game_id: string }> { }

  const getFavorites = async (): Promise<GameCardData[]> => {
    try {
      const gameIds: FavoritesRes = await (
        await fetch(`http://localhost:8080/games/favorites`, { credentials: "include" })
      ).json();
      const games: Game[] = await Promise.all(gameIds.map(async ({ game_id }) => {
        const res = await fetch(`http://localhost:8080/games/game/${game_id}`)
        return await res.json();
      }));
      return games.map(game => ({ game, favorited: true }));
    } catch (err) {
      console.log(err);
    }
    return [];
  };

  useEffect(() => {
    if (!user) return;
    setIsSearching(true);
    getFavorites().then(games => {
      setIsSearching(false);
      setData(games);
    })
  }, []);

  return (
    <>
      {user ? <>
        <Container fluid>
          <h1>Favorites</h1>
          {isSearching ? <Spinner animation="border" className="m-2" /> : <>{data.length > 0 ? <GameCardGallery data={data} /> : <p>
            You currently have no favorites. <Heart /> -{'>'} <HeartFill style={{ color: 'red' }} /> some games to see them here.
          </p>}</>}
        </Container>
      </> : <Navigate to="/login" replace={true} />}
    </>
  );
};

export default Favorites;
