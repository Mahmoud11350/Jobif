import { connect } from "mongoose";
import Job from "./models/Job.js";
import User from "./models/User.js";
import mockJobs from "./utils/mockData.js";
import * as dotenv from "dotenv";
dotenv.config();
const populateJobs = async () => {
  try {
    await connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: "demo@gmail.com" });
    const jobs = mockJobs.map((job) => {
      return { ...job, createdBy: user._id };
    });
    await Job.deleteMany({ createdBy: user._id });
    await Job.create(jobs);
  } catch (error) {
    console.log(error);
  }
};

populateJobs();
