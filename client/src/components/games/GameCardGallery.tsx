import CardGroup from "react-bootstrap/CardGroup";
import Game from "../../interfaces/Game";
import GameCard from "./GameCard";

interface GameCardGalleryProps {
  games: Game[];
}

export default ({ games }: GameCardGalleryProps) => {
  return (
    <CardGroup className="grid align-items-center">
      {games.map((game, i) => (
        <div key={i} className="box col-lg-4 mb-3 d-flex align-items-stretch">
          <GameCard game={game} />
        </div>
      ))}
    </CardGroup>
  );
};
