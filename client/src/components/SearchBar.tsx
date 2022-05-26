import { FC, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { userState } from "../state";
import { useAtom } from "jotai";

export interface SearchBarProps {}

export const SearchBar: FC = (props: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user] = useAtom(userState);

  const search = async () => {
    const res: Response = await fetch(
      `http://localhost:8080/search?q=${searchTerm}`,
      {
        method: "GET",
      }
    );

    console.log(res);
  };

  return (
    <>
      {user &&
      (
        <Form>
          <Form.Label htmlFor="search-term">Search</Form.Label>
          <Form.Control
            type="text"
            id="search-term"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary" onClick={search}>
            Search
          </Button>
        </Form>
      )}
    </>
  );
};
