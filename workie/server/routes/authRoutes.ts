import express from 'express';
const router = express.Router();
import {
  login,
  signUp,
  updateUser,
  getUser,
  getUserImage,
  getUserDetails,
  forgotPassword,
  reportOnWork,
  getToken,
  deleteToken
} from '../controllers/authController';
import isAdmin from '../middleware/isAdmin'
import path from "path";
import multer from 'multer'

// import a from '../build/images'






router
.post('/signUp',signUp)
.post('/login',isAdmin,login)
.post('/forgotPassword',forgotPassword)
.post('/reportOnWork',reportOnWork)
.post('/getUserImage',getUserImage)
.post('/getUserDetails',getUserDetails)
.patch('/update-profile',updateUser)
.get('/getUser',getUser)
.get('/getToken',getToken)
.post('/deleteToken',deleteToken);







// Multiple Files Route Handler
// app.post("/multiple", upload.array("images", 3), (req, res) => {
//   console.log(req.files);
//   res.send("Multiple Files Upload Success");
// });


// router.route('/login').post(apiLimiter, login);

// router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router;
