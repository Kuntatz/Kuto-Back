"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidation = _interopRequireDefault(require("express-validation"));

var authCtrl = _interopRequireWildcard(require("../controllers/auth"));

var _paramValidation = _interopRequireDefault(require("../config/param-validation"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/signup').post((0, _expressValidation["default"])(_paramValidation["default"].createUser), authCtrl.signup);
router.route('/delete/:uid')["delete"](authCtrl.deleteUser);
router.route('/update/:uid').put(authCtrl.updateUser);
router.route('/:uid').get(authCtrl.getUser);
router.route('/all/:nextPageToken').get(authCtrl.getAllUsers);
var _default = router;
exports["default"] = _default;