import { useState } from "react";
import { useAtom } from "jotai";
import Spinner from "react-bootstrap/Spinner";
import Game from "../../interfaces/Game";
import { userState } from "../../state";
import SearchBar from "./SearchBar";
import GameCardGallery from "./GameCardGallery";

export default () => {
  const [user] = useAtom(userState);
  const [games, setGames] = useState<Game[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  interface SearchRes {
    count: number;
    next: string;
    previous: string;
    results: Game[];
  }

  const search = async (q: string) => {
    setIsSearching(true);
    const res: SearchRes = await (
      await fetch(`http://localhost:8080/search?q=${q}`)
    ).json();
    setIsSearching(false);
    setGames(res.results);
  };

  return (
    <>
    {user && (
      <div className="align-items-center">
        <SearchBar onSubmit={(searchTerm) => search(searchTerm)} />
          {isSearching && <Spinner animation="border" />}
          <GameCardGallery games={games} />
      </div>
    )}
    </>
  );
};
