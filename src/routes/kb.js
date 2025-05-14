import express from "express";
// import { verifyAdminAccess } from "../middleware/admin-access.js";
import { addBulkCommands, addCommand, getAllCommands } from "../controllers/kb-controller.js";

const router = express.Router();

router.get("/commands", getAllCommands);
router.post("/commnd", addCommand); // TODO: add token verification
router.post("/commnds-bulk", addBulkCommands); // TODO: add token verification

export default router;
