"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  createUser: {
    body: {
      email: _joi["default"].string().email().required(),
      password: _joi["default"].string().required(),
      username: _joi["default"].string().alphanum().required()
    }
  }
};
exports["default"] = _default;