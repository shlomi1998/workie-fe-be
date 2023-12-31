"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var jobsController_1 = require("../controllers/jobsController");
router.get('/get-all-Jobs', jobsController_1.getAllJobs);
router.get('/getJobs', jobsController_1.getJobs);
router.post('/create-job', jobsController_1.createJob);
router["delete"]('/:id', jobsController_1.deleteJob);
// router.route('/stats').get(showStats);
exports["default"] = router;
