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
var cors_1 = require("cors");
var express_1 = require("express");
var app = express_1["default"]();
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var cookie_parser_1 = require("cookie-parser");
var body_parser_1 = require("body-parser");
var multer_1 = require("multer");
// hello
// db and authenticateUser
var connect_1 = require("./db/connect");
// routers
var authRoutes_1 = require("./routes/authRoutes");
var jobsRoutes_1 = require("./routes/jobsRoutes");
//  import a from './build/images'
app.use(body_parser_1["default"].json({ limit: '1000kb' }));
//  to deploy
app.use(express_1["default"].static('./build'));
// app.use(cors({
//   credentials:true,
//   origin:"localhost:5000"
// }));
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use(cookie_parser_1["default"]());
app.use('/api/v1/auth', authRoutes_1["default"]);
app.use('/api/v1/jobs', jobsRoutes_1["default"]);
// Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
var fileStorageEngine = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../workie/public/images'); //important this is a direct path fron our current file to storage location
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
});
// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// You can create multiple middleware each with a different storage engine config so save different files in different locations on server
var upload = multer_1["default"]({ storage: fileStorageEngine });
// Single File Route Handler
app.post('/single', upload.single("image"), function (req, res) {
    try {
        var filename = req.file.filename;
        console.log(filename);
        res.status(200).json({ filename: filename });
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
});
var port = process.env.PORT || 5000;
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, connect_1["default"](process.env.MONGODB_URI)];
            case 1:
                _a.sent();
                app.listen(port, function () {
                    console.log("Server is listening on port " + port + "...");
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
start();
