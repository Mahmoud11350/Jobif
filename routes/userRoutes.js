import { Router } from "express";
import {
  getAllUsers,
  userProfile,
  deleteUser,
  updateUser,
  currentUser,
} from "../controllers/userControllers.js";
import demoUserMiddleware from "../middleware/demoUserMiddleware.js";

const router = Router();

router.route("/").get(getAllUsers).get(currentUser);
router.route("/current-user").get(currentUser);
router
  .route("/:id")
  .get(userProfile)
  .patch(demoUserMiddleware, updateUser)
  .delete(demoUserMiddleware, deleteUser);

export default router;
