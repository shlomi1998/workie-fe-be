"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Jobs_1 = require("./Jobs");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var UserSchema = new mongoose_1["default"].Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    cellphoneNumber: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        "default": 'Unknown'
    },
    DateOfBirth: {
        type: String,
        "default": '01/01/2007'
    },
    location: {
        type: String,
        trim: true,
        "default": 'my city'
    },
    ImageSource: {
        type: String,
        "default": 'ProfileImg.jpg'
    },
    status: {
        type: String,
        "default": ''
    },
    isAdmin: {
        type: Boolean,
        "default": false
    },
    jobs: [Jobs_1.JobsSchema]
});
var UserModel = mongoose_1["default"].model("User", UserSchema);
exports["default"] = UserModel;
