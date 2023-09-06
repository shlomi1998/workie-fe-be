"use strict";
exports.__esModule = true;
exports.JobsSchema = void 0;
var mongoose_1 = require("mongoose");
exports.JobsSchema = new mongoose_1["default"].Schema({
    jobType: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    workHours: {
        type: String,
        trim: true
    },
    exactLocation: {
        type: String,
        trim: true
    },
    HourlyWage: {
        type: String,
        trim: true
    },
    AgeRestriction: {
        type: String,
        trim: true
    },
    jobDescription: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        // required: [true, 'Please provide user'],
        ref: 'User'
    }
});
var JobsModel = mongoose_1["default"].model("Job", exports.JobsSchema);
exports["default"] = JobsModel;
