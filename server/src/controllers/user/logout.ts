import { Request, Response } from "express";

export const post = (req: Request, res: Response): void => {
    req.logout();
    res.send("Successfully logged out");
};
