import UserModel from "../models/User";
import ServicesModel from "../models/Services";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { get } from "http";

const createJob = async (req: any, res: any) => {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  const { user } = req.cookies;
  const { userId }: any = jwt.verify(user, JWT_SECRET);

  const {
    jobType,
    date,
    workHours,
    exactLocation,
    HourlyWage,
    AgeRestriction,
    jobDescription,
  } = req.body;

  try {
    const Job = await ServicesModel.create({
      jobType,
      date,
      workHours,
      exactLocation,
      HourlyWage,
      AgeRestriction,
      jobDescription,
      createdBy: [userId],
    });

    res.status(StatusCodes.CREATED).json({
      Job,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({
      msg: error,
    });
  }
};

const getAllJobs = async (req: any, res: any) => {
  // let UsersImages:any|undefined=[];
  try {
    const getAllJobs = await ServicesModel.find({});
    const Users =ServicesModel.find({})
      .populate({
        path: "createdBy",
        select: "firstName  lastName ImageSource",
      })
      .exec((err, posts: any) => {
        if (err) {
          console.error(err);
          return;
        }

        const Users: any = posts;
        console.log(Users);
        res.status(StatusCodes.OK).json({ getAllJobs, Users });
      });

    // });
    // UsersImages.forEach((element: any, index: any) => {
    //   UsersImages[index] = posts[index];
    // });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
  }
};

const updateJob = async (req: any, res: any) => {};

const getJobs = async (req: any, res: any) => {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  const { user } = req.cookies;
  const { userId }: any = jwt.verify(user, JWT_SECRET);
  try {
    const getJobs = await ServicesModel.find({ createdBy: userId });
    const getImgProfile = await UserModel.findById(userId);
    res.status(StatusCodes.OK).json({ getJobs, getImgProfile });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
  }
};

const deleteJob = async (req: any, res: any) => {
  const jobId = req.params.id;
  console.log(jobId);
  try {
    const DeleteJob = await ServicesModel.findByIdAndDelete(jobId);
    res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No job with id ${jobId}` });
  }
};

const getJob = async (req: any, res: any) => {
  const { jobType } = req.body;
  // console.log(jobType)
  // if(!jobType) {
  //   throw new Error('jobType is required');
  // }
  try {
    const getJobDetails = await ServicesModel.findById(jobType);
    if (!getJobDetails) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: `Job not found` });
    } else {
      res.status(StatusCodes.OK).json(getJobDetails);
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: `An error occurred` });
  }
};

const showStats = async (req: any, res: any) => {
  res.send("show Stats");
};

const addRegisteredUser = async (req: any, res: any) => {
  const {jobId} = req.params;
  const JWT_SECRET: any = process.env.JWT_SECRET;
  const { user } = req.cookies;
  const { userId }: any = jwt.verify(user, JWT_SECRET);

  console.log(jobId);
  console.log(userId);
  try {
    const job: any = await ServicesModel.findById(jobId);
    if (!job.SignUp.includes(userId)) {
      job.SignUp.push(userId);
      await job.save();
      console.log(job.SignUp);
      res.status(200).json({ message: "User has successfully registered" });
    } else {
      console.log("User already registered");
      res.status(200).json({ message: "User already registered" });
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User registration failed" });
  }
};

const deleteRegisteredUser = async (req: any, res: any) => {
  const { jobId, userId } = req.params;
  try {
    const deleteUser = await ServicesModel.findById(jobId);
    if (deleteUser?.SignUp.includes(userId)) {
      const updatedSignUp = deleteUser.SignUp.filter(id => id !== userId);
      deleteUser.SignUp = updatedSignUp;
      await deleteUser.save();   
      res.status(StatusCodes.OK).json({ msg: "Success! User removed from SignUp" });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ msg: `User not found in SignUp` });
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No job with the provided ID` });
  }
};

export {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  getJobs,
  getJob,
  addRegisteredUser,
  deleteRegisteredUser,
};
