'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseOrder = require('./parse-order');

var _parseOrder2 = _interopRequireDefault(_parseOrder);

var _codeLine = require('../types/code-line');

var _codeLine2 = _interopRequireDefault(_codeLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A module that exposes a single function for parsing Markdown text into
 * line objects
 *
 * @module
 */
exports.default = {
  parse: parse
};

/**
 * Parse a Markdown string and return an array of line objects.
 *
 * @function
 * @param {string} markdown The Markdown text to parse
 * @return {Array<Type>} An array of CanvasNative line objects
 */

function parse(markdown) {
  var sourceLines = markdown.split('\n');
  var result = [];

  var groupType = null;
  var language = null;
  var skipEmptyLine = true;
  for (var index = 0, len = sourceLines.length; index < len; index++) {
    var sourceLine = sourceLines[index];
    var line = undefined;

    // Ignore every odd empty line, except in code blocks
    if (!sourceLine && skipEmptyLine && groupType !== _codeLine2.default.groupType) {
      skipEmptyLine = false;
      continue;
    } else {
      skipEmptyLine = true;
    }

    var fenceMatch = undefined;
    if (fenceMatch = _codeLine2.default.matchFence(sourceLine)) {
      if (groupType === _codeLine2.default.groupType) {
        groupType = null;
        language = null;
      } else {
        groupType = _codeLine2.default.groupType;
        language = fenceMatch[1];
      }

      continue;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _parseOrder2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var klass = _step.value;

        if (line = klass.matchMarkdown(sourceLine, { groupType: groupType, index: index, language: language })) {
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!line) {
      throw new Error('No matching type for Markdown source "' + sourceLine + '"');
    }

    result.push(line);
  }

  return result;
}