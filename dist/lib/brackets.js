'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = wrap;
var BRACKETS = ['⧙', '⧘'];

exports.default = BRACKETS;
function wrap(text) {
  return BRACKETS[0] + text + BRACKETS[1];
}