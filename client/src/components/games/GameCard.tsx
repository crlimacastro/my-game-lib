import { FC, useState } from "react";
import Card from "react-bootstrap/Card";
import GameCardData from "../../interfaces/GameCardData";
import FavoriteButton from "./FavoriteButton";

interface Props {
  className?: string;
  data: GameCardData;
}

const GameCard: FC<Props> = ({ data, className }) => {
  const [isFavorite, setIsFavorite] = useState(data.favorited);

  const toggleFavorite = async (): Promise<void> => {
    const { id } = data.game;

    if (isFavorite) {
      await fetch(`http://localhost:8080/games/unfavorite?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    }
    else {
      await fetch(`http://localhost:8080/games/favorite`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id
        }),
      });
    }

    setIsFavorite(prev => {
      return !prev;
    });
  };

  const { background_image, name, released } = data.game;

  return (
    <Card className={className}>
      <Card.Img variant="top" height={256} src={background_image} />
      <Card.Body>
        <Card.Title>{name} < FavoriteButton isFavorite={isFavorite} handleClick={async () => await toggleFavorite()} style={{ float: 'right', }} /></Card.Title>
        <Card.Text><b>Genres:</b> {data.game.genres.map(g => g.name).join(", ")}</Card.Text>
        <Card.Text><b>Platforms:</b> {data.game.platforms.map(p => p.platform.name).join(", ")}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Release Date: {released}</small>
      </Card.Footer>
    </Card >
  );
};

export default GameCard;