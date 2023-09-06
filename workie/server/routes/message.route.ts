import express  from "express";
import authMiddleware from "../middleware/authMiddleware";
import {sendMessage,getMessages} from '../controllers/message.controller'
const router=express.Router();

router.route('/').post(authMiddleware,sendMessage);
router.route('/:convo_id').get(authMiddleware,getMessages);

export default router