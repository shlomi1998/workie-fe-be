import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";

// import morgan from "morgan";
// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
// import compression from "compression";
// import fileUpload from "express-fileupload";

// hello
// db and authenticateUser
import connectDB from "./db/connect";
import SocketServer from "./SocketServer";
// routers
import authRouter from "./routes/authRoutes";
import jobsRouter from "./routes/jobsRoutes";
import servicesRouter from "./routes/servicesRoutes";
import ConversationRoutes from "./routes/conversation.route";
import MessageRoutes from "./routes/message.route";
import userRoutes from "./routes/user.route";

import { ConversationModel, UserModel } from "./models";
import MessageModel from "./models/MessageModel";
import logger from "./configs/logger.config";
// import { Server } from "http";

//  import a from './build/images'

app.use(bodyParser.json({ limit: "1000kb" }));

//  to deploy
app.use(express.static("./build"));

// app.use(cors({
//   credentials:true,
//   origin:"localhost:5000"
// }));

// app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use(cookieParser());

// app.use(helmet());

// app.use(express.urlencoded({ extended: true }));

// app.use(mongoSanitize());

// app.use(compression());

// app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/conversation", ConversationRoutes);
app.use("/api/v1/message", MessageRoutes);
app.use("/api/v1/user", userRoutes);

// Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const fileStorageEngine = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "../workie/public/images"); //important this is a direct path fron our current file to storage location
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// You can create multiple middleware each with a different storage engine config so save different files in different locations on server
const upload = multer({ storage: fileStorageEngine });

// Single File Route Handler
app.post("/single", upload.single("image"), (req: any, res: any) => {
  try {
    const { filename } = req.file;
    console.log(filename);
    res.status(200).json({ filename });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

   const server = app.listen(port, () => {

      console.log(`Server is listening on port ${port}...`);
      const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
          origin:"*",
        },
      });

      
      io.on("connection", (socket: any) => {
        console.log("Socket io connected successfully :-)");
        SocketServer(socket, io);
        // socket.on('sendMessage',(msg:any)=>{
        //   io.emit('receiveMessage',msg)
        // })
      });

    
    });
  } catch (error) {
    console.log(error);
  }
};



start();
