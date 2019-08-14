"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// routes/index.js
var router = _express["default"].Router();
/* GET home page. */


router.get('/health-check', function (req, res) {
  return res.send('OK');
});
router.use('/auth', _auth["default"]);
var _default = router;
exports["default"] = _default;