import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  getJobs,
  getJob,
  addRegisteredUser,
  deleteRegisteredUser,
} from "../controllers/servicesController";

router.get("/get-all-Jobs", getAllJobs);
router.get("/getJobs", getJobs);
router.post("/getJob", getJob);
router.post("/create-job", createJob);
router.delete("/:id", deleteJob);
router.delete("/:jobId/:userId", deleteRegisteredUser);
router.post("/addRegisteredUser/:jobId/:userId", addRegisteredUser);

// router.route('/stats').get(showStats);

export default router;
