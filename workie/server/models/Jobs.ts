import mongoose from 'mongoose'


export const JobsSchema=new mongoose.Schema({
    jobType:{
      type: String,
      trim: true,
     
    },
    date:{
      type: String,
      trim: true,
      
    },
    workHours:{
      type: String,
      trim: true,
      
    },
    exactLocation:{
      type: String,
      trim: true,
      
    },
    HourlyWage:{
      type: String,
      trim: true,
      
    },
    AgeRestriction:{
      type: String,
      trim: true,
     
    },
    jobDescription:{
      type: String,
      trim: true,
      
    },
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      // required: [true, 'Please provide user'],
      ref: 'User'
      
    },

    SignUp:[String],

  
  })

  
 

const JobsModel = mongoose.model("Job", JobsSchema);
export default JobsModel