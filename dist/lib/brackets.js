'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = wrap;

var _constants = require('./constants.json');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrap(text) {
  return _constants2.default.PREFIX_OPEN + text + _constants2.default.PREFIX_CLOSE;
}