import { Request, Response } from "express";

exports.get = (req: Request, res: Response): void => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(204).send();
  }
};
