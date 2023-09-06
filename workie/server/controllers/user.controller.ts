import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import logger from '../configs/logger.config';
import { searchUsers as searchUsersService } from '../services/user.service';

export const searchUsers = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
   
    const keyword = req.query.search as string;
    console.log(keyword)
    if (!keyword) {
      logger.error('Please add a search query first');
      throw createHttpError.BadRequest('Please add a search term first');
    }
    
    const users = await searchUsersService(keyword,req.user.userId);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
