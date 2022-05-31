import { Router, Request, Response } from "express";
import axios from "axios";
import Env from "../interfaces/Env";
import {
  favoriteGame,
  getFavorites,
  getGame,
  getIsFavorite,
  searchGame,
  unfavoriteGame,
} from "../api/game";
import { User } from "../api/user";

const router: Router = Router();

interface SearchRequestQuery {
  q: string;
}

router.get(
  "/search",
  async (
    req: Request<{}, {}, {}, SearchRequestQuery>,
    res: Response
  ): Promise<void> => {
    const { q: search } = req.query;
    try {
      res.send(await searchGame(search));
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/game/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    res.send(await getGame(id));
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

export interface FavoriteReq {
  id: string;
}

router.get(
  "/favorite",
  async (
    req: Request<{}, {}, {}, FavoriteReq>,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(400).send("No user in session");
      return;
    }

    const { username } = req.user as User;
    const { id: gameId } = req.query;

    try {
      res.send(await getIsFavorite(username, gameId));
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/favorites", async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(400).send("No user in session");
    return;
  }

  const { username } = req.user as User;

  try {
    res.send(await getFavorites(username));
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});
router.post(
  "/favorite",
  async (req: Request<{}, {}, FavoriteReq>, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(400).send("No user in session");
      return;
    }

    const { username } = req.user as User;
    const { id: gameId } = req.body;

    try {
      await favoriteGame(username, gameId);
      res.send("Successfully favorited game");
    } catch (err: any) {
      if (err.code === "23505") {
        res.status(400).send("Game already favorited");
        return;
      }
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);

router.delete(
  "/unfavorite",
  async (
    req: Request<{}, {}, {}, FavoriteReq>,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(400).send("No user in session");
      return;
    }

    const { username } = req.user as User;
    const { id: gameId } = req.query;

    try {
      await unfavoriteGame(username, gameId);
      res.send("Successfully unfavorited game");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);

export default router;
