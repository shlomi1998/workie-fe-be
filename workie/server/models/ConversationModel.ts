import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema.Types
const ConversationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Conversation is required "],
    trim: true,
  },
  isGroup: {
    type: Boolean,
    required:true,
    default:false
  },
  picture: {
    type: String,
    required: true,
    default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
  },
  users:[
    {
      type:ObjectId,
      ref:"User"
    },
  ],
  latestMessage:{
   type:ObjectId,
   ref:"MessageModel"
  },
  admin:{
    type:ObjectId,
    ref:"User"
  },
  
},{
    collection:'conversation',
    timestamps:true
}
);

const ConversationModel  = mongoose.model("ConversationModel", ConversationSchema);
export default ConversationModel;


