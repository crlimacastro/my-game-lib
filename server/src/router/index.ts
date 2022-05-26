import { Router } from "express";
import { initAuthRoutes } from "./authRoutes";
import { initGameRoutes } from "./gameRoutes";

const router: Router = Router();

initAuthRoutes(router);
initGameRoutes(router);

export default router;
