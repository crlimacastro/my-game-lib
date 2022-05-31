import { FC } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import GameCardData from "../../interfaces/GameCardData";
import GameCard from "./GameCard";

interface Props {
  className?: string;
  data: GameCardData[];
}

const GameCardGallery: FC<Props> = ({ className, data: games }) => {
  return (
    <CardGroup className={className + " grid align-items-center"}>
      {games.map((game, i) => (
        <div key={i} className="box col-xl-3 col-lg-4 col-md-4 col-sm-6 my-2 ">
          <GameCard data={game} className="mx-2" />
        </div>
      ))}
    </CardGroup>
  );
};

export default GameCardGallery;