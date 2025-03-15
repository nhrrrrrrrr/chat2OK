import express from "express";
import {
  login,
  logout,
  signup,
  creategroup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/creategroup", creategroup);

export default router;
