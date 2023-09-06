import mongoose from "mongoose";
import { JobsSchema } from "./Jobs";

import dotenv from "dotenv";
dotenv.config();

//firstName ,lastName,email , ImageSource ,status
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      // required: [true, 'Please provide firstName'],
      // min: 2,
      // max: 15,
      // trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      // required: [true, 'Please provide lastName'],
      // min:2,
      // max: 15,
      // trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      trim: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: 'Please provide a valid email',
      // },
    },
    cellphoneNumber: {
      type: String,
      trim: true,
      // required: [true, 'Please provide email'],
    },
    password: {
      type: String,
      trim: true,
      // required: [true, 'Please provide password'],
      // min: 8,
    },

    gender: {
      type: String,
      default: "Unknown",
    },
    DateOfBirth: {
      type: String,
      default: "01/01/2007",
    },
    location: {
      type: String,
      trim: true,
      default: "my city",
    },
    ImageSource: {
      type: String,
      default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status: {
      type: String,
      default: "",
      
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    temporaryPassword: {
      type: String,
    },
    temporaryPasswordExpiration: {
      type: Date,
    },

    jobs: [JobsSchema],

    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'User',
    //   required: [true, 'Please provide user'],
    // },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
