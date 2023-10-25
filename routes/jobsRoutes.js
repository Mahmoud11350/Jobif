import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  getJobsStats,
} from "../controllers/jobsController.js";
import demoUserMiddleware from "../middleware/demoUserMiddleware.js";

const router = Router();

router.route("/").get(getAllJobs).post(demoUserMiddleware, createJob);
router.route("/show-stats").get(getJobsStats);
router
  .route("/:id")
  .get(getSingleJob)
  .patch(demoUserMiddleware, updateJob)
  .delete(demoUserMiddleware, deleteJob);

export default router;
