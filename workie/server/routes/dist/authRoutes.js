"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var authController_1 = require("../controllers/authController");
var isAdmin_1 = require("../middleware/isAdmin");
// import a from '../build/images'
router
    .post('/signUp', authController_1.signUp)
    .post('/login', isAdmin_1["default"], authController_1.login)
    .post('/getUserImage', authController_1.getUserImage)
    .patch('/update-profile', authController_1.updateUser)
    .get('/getUser', authController_1.getUser);
// Multiple Files Route Handler
// app.post("/multiple", upload.array("images", 3), (req, res) => {
//   console.log(req.files);
//   res.send("Multiple Files Upload Success");
// });
// router.route('/login').post(apiLimiter, login);
// router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
exports["default"] = router;
