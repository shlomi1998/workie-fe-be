"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = require("../controllers/authController.js");

var _auth = _interopRequireDefault(require("../middleware/auth.js"));

var _testUser = _interopRequireDefault(require("../middleware/testUser.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/register').post(apiLimiter, _authController.register);
router.route('/login').post(apiLimiter, _authController.login);
router.get('/logout', _authController.logout);
router.route('/updateUser').patch(_auth["default"], _testUser["default"], _authController.updateUser);
router.route('/getCurrentUser').get(_auth["default"], _authController.getCurrentUser);
var _default = router;
exports["default"] = _default;