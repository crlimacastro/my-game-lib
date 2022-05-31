import { Router } from "express";
import authRouter from "./user";
import gameRouter from "./games";

const router: Router = Router();

router.use("/user", authRouter);
router.use("/games", gameRouter);

export default router;
