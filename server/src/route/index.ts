import { Router } from "express";
import authRouter from "./authRouter";
import gameRouter from "./gameRouter";

const router: Router = Router();

router.use('/', authRouter);
router.use('/', gameRouter);

export default router;
