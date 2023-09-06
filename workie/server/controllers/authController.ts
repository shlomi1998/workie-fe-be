import { StatusCodes } from "http-status-codes";
import UserModel from "../models/User";
import JobsModel from "../models/Jobs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const myEmail = process.env.MY_EMAIL;
const myPassword = process.env.MY_PASSWORD;
const secret: any = process.env.JWT_SECRET;

export const signUp = async (req: any, res: any) => {
  const {
    firstName,
    lastName,
    email,
    cellphoneNumber,
    password,
    gender,
    DateOfBirth,
    location,
    ImageSource,
    status,
  } = req.body;

  if (
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    cellphoneNumber !== "" &&
    password !== "" &&
    gender !== "" &&
    DateOfBirth !== "" &&
    location !== "" &&
    ImageSource !== "" &&
    status !== ""
  ) {
    const hash = await bcrypt.hash(password, 10);
    // const b=req.data

    try {
      // if (!firstName || !lastName || !email || !cellphoneNumber || !password) {
      //   const error =  new Error("please provide all values");
      // }

      // const userAlreadyExists = await UserModel.findOne({ email });

      // if (userAlreadyExists) {
      //   throw new Error("Email already in use");
      // }
      // const job1=await JobsModel.findById(_JobId1)
      // const job2=await JobsModel.findById(_JobId2)

      // const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync(password , salt)
      // console.log(hash)

      const job = await JobsModel.find();
      const User = await UserModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        cellphoneNumber: cellphoneNumber,
        password: hash,
        gender: gender,
        DateOfBirth: DateOfBirth,
        location: location,
        ImageSource: ImageSource,
        status: status,
        jobs: [job],
      });

      // //s token
      // // const token = jwt.encode({ userId: User._id, role: "public" }, secret);

      const token = jwt.sign({ userId: User._id }, secret);

      // res.cookie("user", token, {
      //   maxAge: 5000000000,
      //    httpOnly: true
      // });

      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie("user", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
      });

      res.status(StatusCodes.CREATED).json({
        User,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: error,
      });
    }
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const { isAdmin } = req;

    const userDB: any = await UserModel.findOne({ email });
    const passwordDB: any = userDB.password;
    const temporaryPassword: any = userDB.temporaryPassword;
    // console.log(password)
    // console.log("--------------------------------------------------------------------------------------------------------------")
    // console.log(temporaryPassword);

    const isValid = await bcrypt.compare(password, passwordDB);
    const currentTime: any = new Date();
    const pastTime = currentTime.getTime();
    const temporaryPasswordExpiration: any = new Date(
      userDB.temporaryPasswordExpiration
    );

    const timeDifference = pastTime - temporaryPasswordExpiration;
    const minutesDifference = timeDifference / (1000 * 60);
    console.log(minutesDifference);

    console.log(password);
    console.log(temporaryPassword);
    console.log(isValid);

    if (
      (password !== temporaryPassword || minutesDifference >= 10) &&
      isValid === false
    ) {
      throw new Error(
        `Invalid temporary password or incorrect current password the temporary is : ${minutesDifference}`
      );
    }

    // if (!secret) throw new Error("Missing jwt secret");
    // const token = JWT.encode({ userId: userDB._id, role: "public" }, secret);

    const token = jwt.sign({ userId: userDB._id, role: "public" }, secret);
    console.log(token);

    // res.cookie("user", token, {
    //   maxAge: 5000,
    //    httpOnly: true
    // });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("user", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
    });
    // res.cookie("token", token, {

    //   secure:true,

    // });

    res.status(StatusCodes.OK).send(isAdmin);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const forgotPassword = async (req: any, res: any) => {
  const { userEmail } = req.body;

  try {
    // מציאת משתמש לפי האימייל
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const temporaryPassword = Math.random().toString(36).slice(-8);
    const newTemporaryPasswordExpiration = new Date();
    const currentTime = newTemporaryPasswordExpiration.getTime();

    const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, 10);
    const truncatedTemporaryPassword = hashedTemporaryPassword.substring(0, 35);

    await UserModel.findOneAndUpdate(
      user._id,
      {
        temporaryPassword: truncatedTemporaryPassword,
        temporaryPasswordExpiration: currentTime,
      },
      { new: true }
    );

    const html = `
    <img src="cid:unique" style="width:100vw;
    border: none;
    max-width: 500px;
    
    "
    >
    <h2 style="color: rgba(0, 99, 54, 1); 
    font-weight: bold;" >Your temporary password is : </h2>
    <h4>${truncatedTemporaryPassword}</h4>
    <p style="color: rgb(181, 0, 0); " >This password is available for 10 minutes only 🕘  </p>
    `;

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false,
      auth: {
        user: myEmail, // כתובת המייל שלך
        pass: myPassword, // סיסמת המייל שלך
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `workie <${myEmail}>`, // sender address
      to: `${userEmail}`, // list of receivers
      subject: `Hello 👋 ${user.firstName} ${user.lastName}`,
      html: html, // html body
      attachments: [
        {
          filename: "Logo.jpg",
          path: "./Logo.jpg",
          cid: "unique",
        },
      ],
    });
    console.log(info);

    res.status(StatusCodes.CREATED).json({
      msg: "work",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error,
    });
  }
};
export const reportOnWork = async (req: any, res: any) => {
  const { firstName, lastName, jobType } = req.body;
  const MyEmail = "shlomiazn27@gmail.com";
  try {
    const html = `
    <img src="cid:unique" style="width:100vw;
    border: none;
    max-width: 500px;
    
    "
    >
    <h2 style="color: rgba(0, 99, 54, 1); 
    font-weight: bold;" > named customer ${firstName} ${lastName} </h2>
    <h4>Adversely reporting work on an id card</h4>
    <h4>${jobType}</h4>
    <p style="color: rgb(181, 0, 0); " > Send a development team to test 👨‍💻
    </p>
    `;

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false,
      auth: {
        user: myEmail, // כתובת המייל שלך
        pass: myPassword, // סיסמת המייל שלך
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `workie <${myEmail}>`, // sender address
      to: `${MyEmail}`, // אימייל שלי האמיתי
      subject: `Hello 👋, boss this is a negative report about a job `,
      html: html, // html body
      attachments: [
        {
          filename: "Logo.jpg",
          path: "./Logo.jpg",
          cid: "unique",
        },
      ],
    });
    console.log(info);

    res.status(StatusCodes.CREATED).json({
      msg: "work",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error,
    });
  }
};

export const updateUser = async (req: any, res: any) => {
  const {
    firstName,
    lastName,
    cellphoneNumber,
    email,
    DateOfBirth,
    gender,
    status,
    ImageSource,
  } = req.body;

  try {
    const JWT_SECRET: any = process.env.JWT_SECRET;
    const { user } = req.cookies;
    const { userId }: any = jwt.verify(user, JWT_SECRET);

    console.log(userId);
    const User = await UserModel.findByIdAndUpdate(userId, {
      firstName: firstName,
      lastName: lastName,
      cellphoneNumber: cellphoneNumber,
      email: email,
      DateOfBirth: DateOfBirth,
      gender: gender,
      status: status,
      ImageSource: ImageSource,
    });

    res.status(StatusCodes.CREATED).json({
      userId,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error,
    });
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const JWT_SECRET: any = process.env.JWT_SECRET;
    const { user } = req.cookies;
    const { userId }: any = jwt.verify(user, JWT_SECRET);
    const getUser: any = await UserModel.findById(userId);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(404).json({ msg: "Not found" });
  }
};

export const getToken = async (req: any, res: any) => {
  try {
    const JWT_SECRET: any = process.env.JWT_SECRET;
    const { user } = req.cookies;
    const { userId }: any = jwt.verify(user, JWT_SECRET);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: "Not found" });
  }
};
export const getUserDetails = async (req: any, res: any) => {
  try {
    const { userId } = req.body;
    const getUser = await UserModel.findById(userId);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(404).json({ msg: "Not found" });
  }
};

export const deleteToken = async (req: any, res: any) => {
  try {
    res.cookie("user", "", { expires: new Date(0) });
    res.status(400).send("Cookie deleted");
  } catch (error) {
    console.log(error)
  }
};

export const getUserImage = async (req: any, res: any) => {
  let ImageSource: any = [];
  let i: any = 0;
  try {
    // const userImage:any=[]
    const UserId = req.body;
    // const UsersId = await UserModel.find(
    //   { _id: { $in: UserId } },
    //   (err: any, documents: any) => {
    //     if (err) {
    //       console.error(err);
    //     }

    //     documents.forEach((document:any) => {
    //        ImageSource[i] = document.ImageSource;
    //        console.log( ImageSource[i] )

    //        i++;

    //     });

    //   //   for (let i in documents ) {
    //   //     ImageSource = documents.ImageSource;
    //   //     console.log( ImageSource )
    //   // }
    // }
    // );
    const UsersId = await UserModel.find({ _id: { $in: UserId } });

    UsersId.forEach((element: any, index: any) => {
      const { ImageSource } = UsersId[index];
      // console.log(ImageSource);
    });
  } catch (error) {
    res.status(404).json({ msg: "Not found" });
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     throw new BadRequestError('Please provide all values');
//   }
//   const user = await User.findOne({ email }).select('+password');
//   if (!user) {
//     throw new UnAuthenticatedError('Invalid Credentials');
//   }

//   const isPasswordCorrect = await user.comparePassword(password);
//   if (!isPasswordCorrect) {
//     throw new UnAuthenticatedError('Invalid Credentials');
//   }
//   const token = user.createJWT();
//   attachCookie({ res, token });
//   user.password = undefined;

//   res.status(StatusCodes.OK).json({ user, location: user.location });
// };

// res.cookie("user", token, { maxAge: 50000000, httpOnly: true });

// const attachCookie = ({ res, token }) => {
//   const oneDay = 1000 * 60 * 60 * 24;

//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//   });
// };
// const user = await User.findOne({ _id: req.body.Id });

// user.email = email;
// user.name = name;
// user.lastName = lastName;
// user.location = location;

// await user.save();

// const token = user.createJWT();
// attachCookie({ res, token });

//   res.status(StatusCodes.OK).json({});
// };

// const UserSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: [true, 'Please provide firstName'],
//     min: 2,
//     max: 15,
//     trim: true,
//   },
//   lastName: {
//     type: String,
//     required: [true, 'Please provide lastName'],
//     min:2,
//     max: 15,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Please provide email'],
//     unique: true,
//   },
//   cellphoneNumber: {
//     type: Number,
//     required: [true, 'Please provide email'],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Please provide password'],
//     min: 8,

//   },

//   gender: {
//     type: String,
//     default: 'Unknown',
//   },
//   DateOfBirth: {
//     type: String,
//     trim: true,
//     max_length: 9,
//     default: '01/01/2007',
//   },
//   location: {
//     type: String,
//     trim: true,
//     max_length: 20,
//     default: 'my city',
//   },
//   ImageSource:{
//     type:String,
//     default: 'ProfileImg.jpg',
//   },
//   status:{
//     type:String,
//     trim: true,
//     default:'',
//   }
