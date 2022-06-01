import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/esm/Spinner";
import { Navigate } from "react-router-dom";
import Game from "../../interfaces/Game";
import GameCardData from "../../interfaces/GameCardData";
import { lastSearchQueryState, userState } from "../../state";
import GameCardGallery from "../games/GameCardGallery";
import SearchBar from "../games/SearchBar";


const Home: FC = () => {
  const [user] = useAtom(userState);
  const [lastSearchQuery, setLeastSearchQuery] = useAtom(lastSearchQueryState);
  const [data, setData] = useState<GameCardData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  interface SearchRes {
    count: number;
    next?: string;
    previous?: string;
    results: Game[];
  }

  // Turns game data into game data with favorite state
  const parseGameData = async (res: SearchRes): Promise<GameCardData[]> => {
    const games: GameCardData[] = [];
    for (const game of res.results) {
      const isFavorited: boolean = await (await fetch(`http://localhost:8080/games/favorite?id=${game.id}`, { credentials: "include" })).json();
      games.push({ game, favorited: isFavorited });
    }
    return games;
  };

  const search = async (q: string): Promise<void> => {
    setIsSearching(true);
    const res: SearchRes = await (
      await fetch(`http://localhost:8080/games/search?q=${q}`, { credentials: "include" })
    ).json();

    const data = await parseGameData(res);
    setData(data);
    setLeastSearchQuery(q);
    setIsSearching(false);
  };

  // Search last query on init
  useEffect(() => {
    if (!user || !lastSearchQuery) return;
    search(lastSearchQuery);
  }, []);

  return (<>
    {user ? <>
      <Container fluid>
        <h1>Home</h1>
        <SearchBar onSubmit={(searchTerm) => search(searchTerm)} />
        {isSearching ? <Spinner animation="border" className="m-2" /> : <>{data.length > 0 ? <GameCardGallery data={data} /> : <p>No results found</p>}</>}
      </Container>
      {/* Redirect to login if no user in session */}
    </> : <Navigate to="/login" replace={true} />}
  </>);
};

export default Home;
