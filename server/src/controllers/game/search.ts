import { Request, Response } from "express";

interface SearchRequestQuery {
  q: string;
}

export const get = (req: Request<{}, {}, {}, SearchRequestQuery>, res: Response): void => {
  const { q: search } = req.query;
  res.send(`Searching for ${search}`);
};
