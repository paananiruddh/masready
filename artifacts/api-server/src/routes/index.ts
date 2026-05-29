import { Router, type IRouter } from "express";
import healthRouter from "./health";
import auditRouter from "./audit";
import customersRouter from "./customers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(auditRouter);
router.use(customersRouter);

export default router;
