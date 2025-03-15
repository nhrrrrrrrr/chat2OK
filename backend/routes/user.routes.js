import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  restrictTo,
  updateProfilePicture,
} from "../controllers/auth.controller.js";
import {
  DeleteUser,
  getUsersForSidebar,
  getGroup,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure 'public/images' directory exists
const imagesDir = path.join(__dirname, "../../frontend", "public/images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Created directory: ${imagesDir}`);
}

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

// Configure file filter for multer
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.get("/", protectRoute, getUsersForSidebar);
router.delete("/:id", protectRoute, restrictTo("ADMIN"), DeleteUser);
router.get("/group", protectRoute, getGroup);
router.patch(
  "/updateProfile",
  protectRoute,
  upload.single("profilePicture"),
  updateProfilePicture
);

export default router;
