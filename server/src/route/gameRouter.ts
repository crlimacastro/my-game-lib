import { Router, Request, Response } from "express";
import axios from 'axios';
import Env from "../interfaces/Env";

const router: Router = Router();

interface SearchRequestQuery {
  q: string;
}

router.get("/search", async (req: Request<{}, {}, {}, SearchRequestQuery>, res: Response) => {
  const { q: search } = req.query;
  const { RAWG_API_KEY } = process.env as Env;
  const { data } = await axios.get(`https://api.rawg.io/api/games?search=${search}&key=${RAWG_API_KEY}`);
  res.send(data);
});

export default router;
