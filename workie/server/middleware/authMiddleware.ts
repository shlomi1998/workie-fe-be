import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default async function (req: any, res: Response, next: NextFunction) {
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized("No authorization header found"));
  }

  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET!, (err:any, payload:any) => {
    if (err) {
      return next(createHttpError.Unauthorized("Invalid token"));
    }
    req.user = payload;
    next();
  });
}
