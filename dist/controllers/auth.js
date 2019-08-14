"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = exports.getUser = exports.updateUser = exports.deleteUser = exports.signup = exports.verifyToken = void 0;

var _httpStatus = _interopRequireDefault(require("http-status"));

var _admin = _interopRequireDefault(require("../firebase-admin/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var idToken, decodedToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            idToken = req.headers.authorization;
            _context.prev = 1;
            _context.next = 4;
            return _admin["default"].auth().verifyToken(idToken);

          case 4:
            decodedToken = _context.sent;

            if (!decodedToken) {
              _context.next = 10;
              break;
            }

            req.body.uid = decodedToken.uid;
            return _context.abrupt("return", next());

          case 10:
            return _context.abrupt("return", res.status(_httpStatus["default"].UNAUTHORIZED).send('You are not authorized!'));

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(_httpStatus["default"].UNAUTHORIZED).send('You are not authorized!'));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var signup =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, email, password, username, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, username = _req$body.username;
            _context2.prev = 1;
            _context2.next = 4;
            return _admin["default"].auth().createUser({
              email: email,
              password: password,
              disabled: false,
              emailVerified: true,
              displayName: username
            });

          case 4:
            user = _context2.sent;
            return _context2.abrupt("return", res.send({
              user: user.toJSON()
            }));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.info('error signup', _context2.t0);
            return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              error: _context2.t0
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function signup(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signup = signup;

var deleteUser =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _admin["default"].auth().deleteUser(req.params.uid);

          case 3:
            result = _context3.sent;
            return _context3.abrupt("return", res.send({
              success: true,
              msg: 'Successfully deleted user'
            }));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              error: _context3.t0
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function deleteUser(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;

var updateUser =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, email, password, username, updatedUser, user;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, username = _req$body2.username;
            updatedUser = {};

            if (email) {
              updatedUser.email = email;
            }

            if (password) {
              updatedUser.password = password;
            }

            if (username) {
              updatedUser.displayName = username;
            }

            _context4.prev = 5;
            _context4.next = 8;
            return _admin["default"].auth().updateUser(req.params.uid, updatedUser);

          case 8:
            user = _context4.sent;
            return _context4.abrupt("return", res.send({
              user: user.toJSON()
            }));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](5);
            return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              error: _context4.t0
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[5, 12]]);
  }));

  return function updateUser(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var getUser =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var userRecord;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _admin["default"].auth().getUser(req.params.uid);

          case 3:
            userRecord = _context5.sent;
            return _context5.abrupt("return", res.send({
              user: userRecord.toJSON()
            }));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              error: _context5.t0
            }));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function getUser(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var getAllUsers =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var users, result, i;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            users = [];
            _context6.next = 4;
            return _admin["default"].auth().listUsers(1000, req.params.nextPageToken);

          case 4:
            result = _context6.sent;

            for (i = 0; i < result.users.length; i += 1) {
              users.push(result.users[i].toJSON());
            }

            return _context6.abrupt("return", res.send({
              users: users,
              nextPageToken: result.pageToken
            }));

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              error: _context6.t0
            }));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function getAllUsers(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAllUsers = getAllUsers;