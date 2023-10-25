import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authControllers.js";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
