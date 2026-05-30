import { Router, type IRouter } from "express";
import healthRouter from "./health";
import auditRouter from "./audit";
import customersRouter from "./customers";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(auditRouter);
router.use(customersRouter);
router.use(contactRouter);

export default router;
