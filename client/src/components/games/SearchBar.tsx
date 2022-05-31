import { FC, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface Props {
  className?: string;
  onSubmit: (search: string) => void;
}

const SearchBar: FC<Props> = ({ className, onSubmit }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Form className={className}
      onSubmit={(e) => {
        e.preventDefault();
        if (searchTerm.length <= 0) return;
        onSubmit(searchTerm);
      }}
    >
      <Form.Label htmlFor="search-term">Search for your favorite games</Form.Label>
      <Form.Control
        type="text"
        id="search-term"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="submit" variant="primary" className="my-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;