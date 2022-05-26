import Card from "react-bootstrap/Card";
import Game from "../../interfaces/Game";

interface GameCardProps {
  game: Game;
}

export default ({ game }: GameCardProps) => {
  return (
    <Card>
      <Card.Img variant="top" height={256} src={game.background_image} />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>Sit velit ea ex sit id.</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{game.released}</small>
      </Card.Footer>
    </Card>
  );
};
