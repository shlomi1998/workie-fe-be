"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getUserImage = exports.getUser = exports.updateUser = exports.login = exports.signUp = void 0;
var http_status_codes_1 = require("http-status-codes");
var User_1 = require("../models/User");
var Jobs_1 = require("../models/Jobs");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var secret = process.env.JWT_SECRET;
exports.signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, cellphoneNumber, password, gender, DateOfBirth, location, ImageSource, status, hash, job, User, token, oneDay, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, cellphoneNumber = _a.cellphoneNumber, password = _a.password, gender = _a.gender, DateOfBirth = _a.DateOfBirth, location = _a.location, ImageSource = _a.ImageSource, status = _a.status;
                console.log(req.body);
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 10)];
            case 1:
                hash = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                return [4 /*yield*/, Jobs_1["default"].find()];
            case 3:
                job = _b.sent();
                return [4 /*yield*/, User_1["default"].create({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        cellphoneNumber: cellphoneNumber,
                        password: hash,
                        gender: gender,
                        DateOfBirth: DateOfBirth,
                        location: location,
                        ImageSource: ImageSource,
                        status: status,
                        jobs: [job]
                    })];
            case 4:
                User = _b.sent();
                token = jsonwebtoken_1["default"].sign({ userId: User._id }, secret);
                oneDay = 1000 * 60 * 60 * 24;
                res.cookie("user", token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + oneDay)
                });
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    User: User
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    msg: error_1
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, isAdmin, userDB, passwordDB, isValid, token, oneDay, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                isAdmin = req.isAdmin;
                console.log(isAdmin);
                console.log("55555555555555555555555");
                return [4 /*yield*/, User_1["default"].findOne({ email: email })];
            case 1:
                userDB = _b.sent();
                passwordDB = userDB.password;
                if (!userDB)
                    throw new Error("Email does not exist");
                return [4 /*yield*/, bcrypt_1["default"].compare(password, passwordDB)];
            case 2:
                isValid = _b.sent();
                if (!isValid)
                    throw new Error("InCorrect password");
                token = jsonwebtoken_1["default"].sign({ userId: userDB._id, role: "public" }, secret);
                console.log(token);
                oneDay = 1000 * 60 * 60 * 24;
                res.cookie("user", token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + oneDay)
                });
                // res.cookie("token", token, {
                //   secure:true,
                // });
                res.status(http_status_codes_1.StatusCodes.OK).send(isAdmin);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).send({ error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, cellphoneNumber, email, DateOfBirth, gender, status, ImageSource, JWT_SECRET, user, userId, User, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, cellphoneNumber = _a.cellphoneNumber, email = _a.email, DateOfBirth = _a.DateOfBirth, gender = _a.gender, status = _a.status, ImageSource = _a.ImageSource;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                JWT_SECRET = process.env.JWT_SECRET;
                user = req.cookies.user;
                userId = jsonwebtoken_1["default"].verify(user, JWT_SECRET).userId;
                console.log(userId);
                return [4 /*yield*/, User_1["default"].findByIdAndUpdate(userId, {
                        firstName: firstName,
                        lastName: lastName,
                        cellphoneNumber: cellphoneNumber,
                        email: email,
                        DateOfBirth: DateOfBirth,
                        gender: gender,
                        status: status,
                        ImageSource: ImageSource
                    })];
            case 2:
                User = _b.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    userId: userId
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    msg: error_3
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var JWT_SECRET, user, userId, getUser_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                JWT_SECRET = process.env.JWT_SECRET;
                user = req.cookies.user;
                userId = jsonwebtoken_1["default"].verify(user, JWT_SECRET).userId;
                return [4 /*yield*/, User_1["default"].findById(userId)];
            case 1:
                getUser_1 = _a.sent();
                res.status(200).json(getUser_1);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(404).json({ msg: "Not found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ImageSource, i, UserId, UsersId_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ImageSource = [];
                i = 0;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                UserId = req.body;
                return [4 /*yield*/, User_1["default"].find({ _id: { $in: UserId } })];
            case 2:
                UsersId_1 = _a.sent();
                UsersId_1.forEach(function (element, index) {
                    var ImageSource = UsersId_1[index].ImageSource;
                    console.log(ImageSource);
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(404).json({ msg: "Not found" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     throw new BadRequestError('Please provide all values');
//   }
//   const user = await User.findOne({ email }).select('+password');
//   if (!user) {
//     throw new UnAuthenticatedError('Invalid Credentials');
//   }
//   const isPasswordCorrect = await user.comparePassword(password);
//   if (!isPasswordCorrect) {
//     throw new UnAuthenticatedError('Invalid Credentials');
//   }
//   const token = user.createJWT();
//   attachCookie({ res, token });
//   user.password = undefined;
//   res.status(StatusCodes.OK).json({ user, location: user.location });
// };
// res.cookie("user", token, { maxAge: 50000000, httpOnly: true });
// const attachCookie = ({ res, token }) => {
//   const oneDay = 1000 * 60 * 60 * 24;
//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//   });
// };
// const user = await User.findOne({ _id: req.body.Id });
// user.email = email;
// user.name = name;
// user.lastName = lastName;
// user.location = location;
// await user.save();
// const token = user.createJWT();
// attachCookie({ res, token });
//   res.status(StatusCodes.OK).json({});
// };
// const UserSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: [true, 'Please provide firstName'],
//     min: 2,
//     max: 15,
//     trim: true,
//   },
//   lastName: {
//     type: String,
//     required: [true, 'Please provide lastName'],
//     min:2,
//     max: 15,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Please provide email'],
//     unique: true,
//   },
//   cellphoneNumber: {
//     type: Number,
//     required: [true, 'Please provide email'],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Please provide password'],
//     min: 8,
//   },
//   gender: {
//     type: String,
//     default: 'Unknown',
//   },
//   DateOfBirth: {
//     type: String,
//     trim: true,
//     max_length: 9,
//     default: '01/01/2007',
//   },
//   location: {
//     type: String,
//     trim: true,
//     max_length: 20,
//     default: 'my city',
//   },
//   ImageSource:{
//     type:String,
//     default: 'ProfileImg.jpg',
//   },
//   status:{
//     type:String,
//     trim: true,
//     default:'',
//   }
