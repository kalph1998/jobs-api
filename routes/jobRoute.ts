import Express from "express";
const router = Express.Router();
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobs";

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

export default router;
