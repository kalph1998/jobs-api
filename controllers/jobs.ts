import { Response, Request } from "express";
import Job from "../models/job";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index";
export const getAllJobs = async (req: Request | any, res: Response) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
export const getJob = async (req: Request | any, res: Response) => {
  const job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).json(job);
};
export const createJob = async (req: Request | any, res: Response) => {
  const job = await Job.create({ ...req.body, createdBy: req.user.userId });

  res.status(StatusCodes.CREATED).json(job);
};
export const updateJob = async (req: Request | any, res: Response) => {
  let { company, position } = req.body;

  if (company == "" || position == "") {
    throw new BadRequestError("Please enter valid details");
  }

  const job = await Job.findByIdAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user.userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.CREATED).json(job);
};
export const deleteJob = async (req: Request | any, res: Response) => {
  const job = await Job.findByIdAndRemove({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).json(job);
};
