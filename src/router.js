import express from "express";
import kbRoutes from "./routes/kb.js";

const router = express.Router();

router.use(
  "/api",
  kbRoutes
);

export default router;
