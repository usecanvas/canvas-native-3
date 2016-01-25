'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _markdownItCheckbox = require('markdown-it-checkbox');

var _markdownItCheckbox2 = _interopRequireDefault(_markdownItCheckbox);

var _markdown = require('./markdown');

var _markdown2 = _interopRequireDefault(_markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A module that exposes a single function for formatting an array of
 * CanvasNative line objects as HTML
 *
 * @module
 */

var renderer = new _markdownIt2.default({
  linkify: true
}).use(_markdownItCheckbox2.default);

/**
 * Format an array of CanvasNative lines as HTML.
 *
 * @function
 * @param {Array<Type>} nativeLines The CanvasNative lines
 * @return {string} The HTML text
 */
function format(nativeLines) {
  return renderer.render((0, _markdown2.default)(nativeLines));
}