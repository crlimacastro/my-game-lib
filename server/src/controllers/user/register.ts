import { Request, Response } from "express";
import { createUser, getUserByUsername, User } from "../../api/user";

interface RegisterReqBody {
  username: string;
  password: string;
}

export const post = async (
  req: Request<{}, {}, RegisterReqBody>,
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
};
