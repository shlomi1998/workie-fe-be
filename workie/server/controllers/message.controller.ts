import logger from "../configs/logger.config";
import { updateLatestMessage } from "../services/conversation.service";
import { createMessage, getConvoMessages, populateMessage } from "../services/message.service";

export const sendMessage = async (req: any, res: any, next: any) => {
  try {
    const user_id = req.user.userId;
    const { message, convo_id, files } = req.body;
    console.log(convo_id);

    if (!convo_id || (!message && !files)) {
      logger.error("Please provider a conversation id and a message body");
      return res.sendStatus(400);
    }
    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };
    let newMessage: any = await createMessage(msgData);
    let populatedMessage: any = await populateMessage(newMessage._id);
    await updateLatestMessage(convo_id, newMessage);
    res.json(populatedMessage);
  } catch (error) {
    res.json(error);
  }
};
export const getMessages = async (req: any, res: any, next: any) => {
  try {
    const convo_id = req.params.convo_id;
    console.log(convo_id)
    if(!convo_id){
        logger.error("Please add a conversation id in params.");
        res.sendStatus(400);
    }
    const messages = await getConvoMessages(convo_id);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
