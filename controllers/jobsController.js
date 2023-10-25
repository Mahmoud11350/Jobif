import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.js";
import { NOTFOUND } from "../errors/customErrors.js";
import { checkPermission } from "../utils/checkPermessions.js";
import { Types } from "mongoose";

export const createJob = async (req, res) => {
  const createdBy = req.user.userId;
  const job = await Job.create({ ...req.body, createdBy });
  res.status(StatusCodes.CREATED).json({ data: job });
};

export const getAllJobs = async (req, res) => {
  let { search, jobStatus, jobType, sort } = req.query;
  let jobs;
  if (req.user.role === "admin") {
    jobs = await Job.find().populate({
      path: "createdBy",
      select: "firstName lastName",
    });
    return res.status(StatusCodes.CREATED).json({ jobs });
  }

  let searchQuery = {
    createdBy: req.user.userId,
  };

  if (search) {
    searchQuery.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") {
    searchQuery.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    searchQuery.jobType = jobType;
  }
  const sortKey = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  sort = sortKey[sort] || sortKey.newest;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  jobs = await Job.find(searchQuery).sort(sort).limit(limit).skip(skip);
  const totalJobs = await Job.countDocuments(searchQuery);
  const numOfPages = Math.ceil(totalJobs / limit);
  const currentPage = page;

  return res
    .status(StatusCodes.CREATED)
    .json({ totalJobs, currentPage, numOfPages, jobs });
};

export const getSingleJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id });
  if (!job) {
    throw new NOTFOUND(`no job with id ${req.params.id}`);
  }
  checkPermission({ req, id: job.createdBy });

  return res.status(StatusCodes.CREATED).json({ data: job });
};

export const updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  });
  return res.status(StatusCodes.OK).json({ data: job });
};

export const deleteJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id });
  if (!job) {
    throw new NOTFOUND(`no job with id ${req.params.id}`);
  }
  await job.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: "job deleted successfully" });
};

export const getJobsStats = async (req, res) => {
  const result = await Job.aggregate([
    {
      $match: {
        createdBy: new Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$jobStatus",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const stats = result.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  res.status(StatusCodes.OK).json({ stats });
};
