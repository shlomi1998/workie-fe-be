"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    min: 3,
    max: 20,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8
  },
  lastName: {
    type: String,
    trim: true,
    max_length: 20,
    "default": 'lastName'
  },
  location: {
    type: String,
    trim: true,
    max_length: 20,
    "default": 'my city'
  }
});

var _default = _mongoose["default"].model('User', UserSchema);

exports["default"] = _default;