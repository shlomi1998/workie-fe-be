import { StatusCodes } from "http-status-codes";
import UserModel from "../models/User";
import bcrypt from "bcrypt";

export const isAdmin = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password);
    const userDB: any = await UserModel.findOne({ email });
    if (!userDB) throw new Error("Email does not exist");

    const passwordDB: any = userDB.password;

    const isValid = await bcrypt.compare(password, passwordDB);
  

    req.isAdmin = userDB.isAdmin;
    // console.log(isAdmin);
    

   
    next();
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export default isAdmin;

// const isAdmin= async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     throw new UnAuthenticatedError('Authentication Invalid');
//   }
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const testUser = payload.userId === '63628d5d178e918562ef9ce8';
//     req.user = { userId: payload.userId, testUser };
//     next();
//   } catch (error) {
//     throw new UnAuthenticatedError('Authentication Invalid');
//   }
// };
