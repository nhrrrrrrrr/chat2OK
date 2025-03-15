import express from "express";
import {
  getMessages,
  sendMessage,
  SendGroupMessage,
  getGroupMessages,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.get("/group/:id", protectRoute, getGroupMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/sendgroup/:id", protectRoute, SendGroupMessage);
export default router;
