import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "../../api/user";

exports.post = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate("local", (err: any, user: User) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
      return;
    }

    req.login(user, (_err: any): void => {
      if (_err) {
        console.error(_err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send("Successfully logged in");
    });
  })(req, res, next);
};
