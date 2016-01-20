'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = wrap;
var CONSTANTS = require('./constants.json');

function wrap(text) {
  return CONSTANTS.PREFIX_OPEN + text + CONSTANTS.PREFIX_CLOSE;
}