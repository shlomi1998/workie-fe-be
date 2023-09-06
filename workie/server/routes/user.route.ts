import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { sendMessage, getMessages } from "../controllers/message.controller";
import {searchUsers} from "../controllers/user.controller"
const router = express.Router();

router.route("/").get(authMiddleware, searchUsers);

export default router;
