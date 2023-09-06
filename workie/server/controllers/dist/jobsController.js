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
exports.getJobs = exports.showStats = exports.updateJob = exports.getAllJobs = exports.deleteJob = exports.createJob = void 0;
var User_1 = require("../models/User");
var Jobs_1 = require("../models/Jobs");
var http_status_codes_1 = require("http-status-codes");
var jsonwebtoken_1 = require("jsonwebtoken");
var createJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var JWT_SECRET, user, userId, _a, jobType, date, workHours, exactLocation, HourlyWage, AgeRestriction, jobDescription, Job, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                JWT_SECRET = process.env.JWT_SECRET;
                user = req.cookies.user;
                userId = jsonwebtoken_1["default"].verify(user, JWT_SECRET).userId;
                _a = req.body, jobType = _a.jobType, date = _a.date, workHours = _a.workHours, exactLocation = _a.exactLocation, HourlyWage = _a.HourlyWage, AgeRestriction = _a.AgeRestriction, jobDescription = _a.jobDescription;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Jobs_1["default"].create({
                        jobType: jobType,
                        date: date,
                        workHours: workHours,
                        exactLocation: exactLocation,
                        HourlyWage: HourlyWage,
                        AgeRestriction: AgeRestriction,
                        jobDescription: jobDescription,
                        createdBy: [userId]
                    })];
            case 2:
                Job = _b.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    Job: Job
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({
                    msg: error_1
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createJob = createJob;
var getAllJobs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getAllJobs_1, UsersImages, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Jobs_1["default"].find({})];
            case 1:
                getAllJobs_1 = _a.sent();
                UsersImages = Jobs_1["default"].find({})
                    .populate("createdBy", "ImageSource")
                    .exec(function (err, posts) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    var UsersImages = posts;
                    console.log(UsersImages);
                    res.status(http_status_codes_1.StatusCodes.OK).json({ getAllJobs: getAllJobs_1, UsersImages: UsersImages });
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: "Not found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllJobs = getAllJobs;
var updateJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.updateJob = updateJob;
var getJobs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var JWT_SECRET, user, userId, getJobs_1, getImgProfile, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                JWT_SECRET = process.env.JWT_SECRET;
                user = req.cookies.user;
                userId = jsonwebtoken_1["default"].verify(user, JWT_SECRET).userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Jobs_1["default"].find({ createdBy: userId })];
            case 2:
                getJobs_1 = _a.sent();
                return [4 /*yield*/, User_1["default"].findById(userId)];
            case 3:
                getImgProfile = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ getJobs: getJobs_1, getImgProfile: getImgProfile });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: "Not found" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getJobs = getJobs;
var deleteJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, DeleteJob, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jobId = req.params.id;
                console.log(jobId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Jobs_1["default"].findByIdAndDelete(jobId)];
            case 2:
                DeleteJob = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Job removed" });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: "No job with id " + jobId });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteJob = deleteJob;
var showStats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("show Stats");
        return [2 /*return*/];
    });
}); };
exports.showStats = showStats;
