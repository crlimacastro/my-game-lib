import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface SearchBarProps {
  onSubmit: (search: string) => void;
}

export default ({ onSubmit }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (searchTerm.length <= 0) return;
        onSubmit(searchTerm);
      }}
    >
      <Form.Label htmlFor="search-term">Search</Form.Label>
      <Form.Control
        type="text"
        id="search-term"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="submit" variant="primary">
        Search
      </Button>
    </Form>
  );
};
