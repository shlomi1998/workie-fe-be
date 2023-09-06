import express from "express";
// import authMiddleware from "../middleware/authMiddleware";
import {
  // createGroup,
  create_open_conversation,
   getConversations,
  // getConversations,
} from "../controllers/conversation.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(authMiddleware, create_open_conversation)
router.route("/").get( authMiddleware, getConversations);

// router.route("/")
//   .post( authMiddleware, createGroup);

export default router;
