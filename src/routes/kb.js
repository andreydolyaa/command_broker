import express from "express";
// import { verifyAdminAccess } from "../middleware/admin-access.js";
import { getAllCommands } from "../controllers/kb-controller.js";

const router = express.Router();

router.get("/commands", getAllCommands);

export default router;
