'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;

var _scanner = require('../scanner');

var _scanner2 = _interopRequireDefault(_scanner);

var _removeMarkdown = require('remove-markdown');

var _removeMarkdown2 = _interopRequireDefault(_removeMarkdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_LENGTH = 256;

/**
 * A module that exposes a single function for formatting an array of
 * CanvasNative line objects as a plaintext summary
 *
 * @module
 */
exports.default = {
  format: format
};

/**
 * Format an array of CanvasNative lines as a summary.
 *
 * @function
 * @param {Array<Type>} nativeLines The CanvasNative lines
 * @return {string} The summary
 */

function format(native) {
  var result = '';
  var scanner = new _scanner2.default(native);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = scanner[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var current = _step$value[1];

      if (result.length >= MAX_LENGTH) {
        break;
      }

      if (!current.isSummarized) {
        continue;
      }

      var nextContent = current.content.trim();

      if (!nextContent) {
        continue;
      }

      var next = (0, _removeMarkdown2.default)(nextContent);
      if (!/[.?!]$/.test(next)) {
        next = next + '. ';
      } else {
        next = next + ' ';
      }

      if (next.length + result.length > MAX_LENGTH) {
        var nextParts = next.split(/\W/);

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = nextParts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var part = _step2.value;

            if (part.length + result.length <= MAX_LENGTH) {
              result += part + ' ';
            } else {
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        result = result.trim() + '. ';

        break;
      } else {
        result += next;
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

  return result.trim();
}