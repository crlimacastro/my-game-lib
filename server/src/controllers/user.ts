import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { User, getUserByUsername, createUser } from "../api/user";

const router: Router = Router();

router.get("/session", (req: Request, res: Response): void => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(204).send();
  }
});

export interface AuthRequestBody {
  username: string;
  password: string;
}

router.post(
  "/register",
  async (
    req: Request<{}, {}, AuthRequestBody>,
    res: Response
  ): Promise<void> => {
    const { username, password } = req.body;

    try {
      const user: User | undefined = await getUserByUsername(username);
      if (user) {
        res.status(400).send("User with that username already exists");
      } else {
        await createUser(username, password);
        res.redirect(307, "/login");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
);

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response): void => {
    req.login(req.user!, (_err: any): void => {
      if (_err) {
        console.error(_err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send("Successfully logged in");
    });
  }
);

router.post(
  "/logout",
  (req: Request, res: Response, next: NextFunction): void => {
    (req as any).logout((err: Error): void => {
      if (err) {
        console.error(err);
        next(err);
      }
      res.send("Successfully logged out");
    });
  }
);

export default router;
