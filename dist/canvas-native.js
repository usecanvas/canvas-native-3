(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CanvasNative = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "SEPARATOR": "\u0002",
  "READABLE_SEPARATOR": "|"
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Types = exports.Scanner = exports.Parsers = exports.Constants = undefined;

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _parsers = require('./parsers');

var _parsers2 = _interopRequireDefault(_parsers);

var _scanner = require('./scanner');

var _scanner2 = _interopRequireDefault(_scanner);

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Constants = exports.Constants = _constants2.default;
var Parsers = exports.Parsers = _parsers2.default;
var Scanner = exports.Scanner = _scanner2.default;
var Types = exports.Types = _types2.default;

},{"./constants":1,"./parsers":3,"./scanner":7,"./types":14}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _markdown = require('./markdown');

var _markdown2 = _interopRequireDefault(_markdown);

var _native = require('./native');

var _native2 = _interopRequireDefault(_native);

var _parseOrder = require('./parse-order');

var _parseOrder2 = _interopRequireDefault(_parseOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Markdown: _markdown2.default,
  Native: _native2.default,
  ParseOrder: _parseOrder2.default
};

},{"./markdown":4,"./native":5,"./parse-order":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

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
    var line = void 0;

    // Ignore every odd empty line, except in code blocks
    if (!sourceLine && skipEmptyLine && groupType !== _codeLine2.default.groupType) {
      skipEmptyLine = false;
      continue;
    } else {
      skipEmptyLine = true;
    }

    var fenceMatch = void 0;
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

},{"../types/code-line":10,"./parse-order":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _parseOrder = require('./parse-order');

var _parseOrder2 = _interopRequireDefault(_parseOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A module that exposes a single function for parsing CanvasNative text into
 * line objects
 *
 * @module
 */

/**
 * Parse a CanvasNative-formatted string and return an array of line objects.
 *
 * @function
 * @param {string} native The native text to parse
 * @return {Array<Type>} An array of CanvasNative line objects
 */
function parse(native) {
  var sourceLines = native.split('\n');
  var result = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sourceLines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var sourceLine = _step.value;

      var line = void 0;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _parseOrder2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var klass = _step2.value;

          if (line = klass.matchNative(sourceLine)) {
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

      if (!line) {
        throw new Error('No matching type for native source "' + sourceLine + '"');
      }

      result.push(line);
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

  return result;
}

},{"./parse-order":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _blockquoteLine = require('../types/blockquote-line');

var _blockquoteLine2 = _interopRequireDefault(_blockquoteLine);

var _checklistItem = require('../types/checklist-item');

var _checklistItem2 = _interopRequireDefault(_checklistItem);

var _codeLine = require('../types/code-line');

var _codeLine2 = _interopRequireDefault(_codeLine);

var _heading = require('../types/heading');

var _heading2 = _interopRequireDefault(_heading);

var _horizontalRule = require('../types/horizontal-rule');

var _horizontalRule2 = _interopRequireDefault(_horizontalRule);

var _image = require('../types/image');

var _image2 = _interopRequireDefault(_image);

var _linkDefinition = require('../types/link-definition');

var _linkDefinition2 = _interopRequireDefault(_linkDefinition);

var _orderedListItem = require('../types/ordered-list-item');

var _orderedListItem2 = _interopRequireDefault(_orderedListItem);

var _paragraph = require('../types/paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _title = require('../types/title');

var _title2 = _interopRequireDefault(_title);

var _unorderedListItem = require('../types/unordered-list-item');

var _unorderedListItem2 = _interopRequireDefault(_unorderedListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_checklistItem2.default, _blockquoteLine2.default, _codeLine2.default, _title2.default, _heading2.default, _horizontalRule2.default, _image2.default, _linkDefinition2.default, _orderedListItem2.default, _unorderedListItem2.default, _paragraph2.default];

},{"../types/blockquote-line":8,"../types/checklist-item":9,"../types/code-line":10,"../types/heading":11,"../types/horizontal-rule":12,"../types/image":13,"../types/link-definition":15,"../types/ordered-list-item":18,"../types/paragraph":19,"../types/title":20,"../types/unordered-list-item":22}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A class that creates objects that iterate over lines in sets of three, while
 * advancing the index by only 1 on each iteration
 *
 * @class
 */

var Scanner = function () {
  function Scanner(lines) {
    _classCallCheck(this, Scanner);

    this.lines = lines;
  }

  _createClass(Scanner, [{
    key: Symbol.iterator,
    value: function value() {
      var idx = 0;
      var self = this;

      return {
        next: function next() {
          var current = self.lines[idx];

          if (!current) {
            return { done: true };
          }

          var prev = self.lines[idx - 1] || null;
          var next = self.lines[idx + 1] || null;

          idx += 1;

          return { value: [prev, current, next], done: false };
        }
      };
    }
  }]);

  return Scanner;
}();

exports.default = Scanner;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing a blockquote in a document
 *
 * @class BlockquoteLine
 * @extends Type
 */

var BlockquoteLine = function (_Type) {
  _inherits(BlockquoteLine, _Type);

  function BlockquoteLine() {
    _classCallCheck(this, BlockquoteLine);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BlockquoteLine).apply(this, arguments));
  }

  _createClass(BlockquoteLine, [{
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      var md = '> ' + this.content;

      if (next) {
        return md + '\n';
      }

      return md;
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }], [{
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^> (?<content>.*)');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'blockquote-line';
    }
  }]);

  return BlockquoteLine;
}(_type2.default);

exports.default = BlockquoteLine;

},{"../../vendor/xregexp":23,"./type":21}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing an item in a checklist
 *
 * @class ChecklistItem
 * @extends ListItem
 */

var ChecklistItem = function (_ListItem) {
  _inherits(ChecklistItem, _ListItem);

  function ChecklistItem() {
    _classCallCheck(this, ChecklistItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ChecklistItem).apply(this, arguments));
  }

  _createClass(ChecklistItem, [{
    key: 'buildMarkdownDelimiter',
    value: function buildMarkdownDelimiter() {
      return '- [' + (this.meta.checked ? 'x' : ' ') + ']';
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }], [{
    key: 'matchMarkdown',


    /**
     * @static
     * @method
     */
    value: function matchMarkdown(markdown) {
      var match = _xregexp2.default.exec(markdown, this.markdownPattern);

      if (!match) {
        return null;
      }

      var meta = {
        checked: !!match.meta_check.trim(),
        level: this.readLevel(match.meta_whitespace)
      };

      var nativeString = this.buildNative(match.content, meta);
      return this.matchNative(nativeString);
    }
  }, {
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^(?<meta_whitespace>\\ *)    # Leading whitespace\n                    [\\-\\+\\*]\\                # Delimiter and a space\n                    \\[(?<meta_check>[xX ])\\]\\ # Checkmark + space\n                    (?<content>.*)               # Content', 'x');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'checklist-item';
    }
  }]);

  return ChecklistItem;
}(_listItem2.default);

exports.default = ChecklistItem;

},{"../../vendor/xregexp":23,"./list-item":16}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing a line of code
 *
 * @class CodeLine
 * @extends Type
 */

var CodeLine = function (_Type) {
  _inherits(CodeLine, _Type);

  function CodeLine() {
    _classCallCheck(this, CodeLine);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CodeLine).apply(this, arguments));
  }

  _createClass(CodeLine, [{
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      var language = this.meta.language || '';

      if (!prev || prev.type !== this.type) {
        return '```' + language + '\n' + this.content;
      }

      if (!next) {
        return this.content + '\n```';
      }

      if (next && next.type !== this.type) {
        return this.content + '\n```\n';
      }

      return this.content;
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }], [{
    key: 'matchMarkdown',


    /**
     * @static
     * @see Type.matchmarkdown
     */
    value: function matchMarkdown(markdown) {
      var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (context.groupType !== this.groupType) {
        return null;
      }

      var line = _get(Object.getPrototypeOf(CodeLine), 'matchMarkdown', this).apply(this, arguments);

      if (context.language) {
        line.meta.language = context.language;
      }

      return line;
    }

    /**
     * Determine if the Markdown text is a code fence.
     *
     * @static
     * @method
     * @param {string} markdown The Markdown to test as a possible code fence
     * @return {boolean}
     */

  }, {
    key: 'matchFence',
    value: function matchFence(markdown) {
      return markdown.match(/^```([^`]*)/);
    }
  }, {
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^(?<content>.*)$');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'code-line';
    }
  }]);

  return CodeLine;
}(_type2.default);

exports.default = CodeLine;

},{"../../vendor/xregexp":23,"./type":21}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing a heading
 *
 * @class Heading
 * @extends Type
 */

var Heading = function (_Type) {
  _inherits(Heading, _Type);

  function Heading() {
    _classCallCheck(this, Heading);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Heading).apply(this, arguments));
  }

  _createClass(Heading, [{
    key: 'toMarkdown',
    value: function toMarkdown(_prev, next) {
      var hashes = '';

      for (var i = 0; i < this.meta.level; i++) {
        hashes += '#';
      }

      return hashes + ' ' + this.content + (next ? '\n' : '');
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }], [{
    key: 'matchMarkdown',


    /**
     * @static
     * @method
     */
    value: function matchMarkdown(markdown) {
      var match = _xregexp2.default.exec(markdown, this.markdownPattern);

      if (!match) {
        return null;
      }

      var meta = {
        level: match.meta_hashes.length
      };

      var nativeString = this.buildNative(match.content, meta);
      return this.matchNative(nativeString);
    }
  }, {
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^(?<meta_hashes>#{1,6}) (?<content>.*)$');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'heading';
    }
  }]);

  return Heading;
}(_type2.default);

exports.default = Heading;

},{"../../vendor/xregexp":23,"./type":21}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing a horizontal rule
 *
 * @class HorizontalRule
 * @extends Type
 */

var HorizontalRule = function (_Type) {
  _inherits(HorizontalRule, _Type);

  function HorizontalRule() {
    _classCallCheck(this, HorizontalRule);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HorizontalRule).apply(this, arguments));
  }

  _createClass(HorizontalRule, [{
    key: 'toMarkdown',
    value: function toMarkdown(_prev, next) {
      return '---' + (next ? '\n' : '');
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }], [{
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^(?:- ?){3,}(?<content>)$');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'horizontal-rule';
    }
  }]);

  return HorizontalRule;
}(_type2.default);

exports.default = HorizontalRule;

},{"../../vendor/xregexp":23,"./type":21}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing an image
 *
 * @class Image
 * @extends Type
 */

var Image = function (_Type) {
  _inherits(Image, _Type);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Image).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      var markdown = '![' + this.meta.alt + '](' + this.meta.url;

      if (this.meta.title) {
        markdown += ' "' + this.meta.title + '"';
      }

      markdown += ')';

      return markdown + (next ? '\n' : '');
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }, {
    key: 'isSummarized',
    get: function get() {
      return false;
    }
  }], [{
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^\n      (?:!\\[(?<meta_alt> .+?)?\\]\\()?\n      (?<meta_url> https?:\\/\\/.+\\/.+\\.(?:gif|jpg|jpeg|png)(?:\\?[^\\s)]+)?)\n      (?:\\s*"(?<meta_title> [^"]+)")?\n      \\)?', 'x');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'image';
    }
  }]);

  return Image;
}(_type2.default);

exports.default = Image;

},{"../../vendor/xregexp":23,"./type":21}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _blockquoteLine = require('./blockquote-line');

var _blockquoteLine2 = _interopRequireDefault(_blockquoteLine);

var _checklistItem = require('./checklist-item');

var _checklistItem2 = _interopRequireDefault(_checklistItem);

var _codeLine = require('./code-line');

var _codeLine2 = _interopRequireDefault(_codeLine);

var _heading = require('./heading');

var _heading2 = _interopRequireDefault(_heading);

var _horizontalRule = require('./horizontal-rule');

var _horizontalRule2 = _interopRequireDefault(_horizontalRule);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _linkDefinition = require('./link-definition');

var _linkDefinition2 = _interopRequireDefault(_linkDefinition);

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _orderedListItem = require('./ordered-list-item');

var _orderedListItem2 = _interopRequireDefault(_orderedListItem);

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _title = require('./title');

var _title2 = _interopRequireDefault(_title);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _unorderedListItem = require('./unordered-list-item');

var _unorderedListItem2 = _interopRequireDefault(_unorderedListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  BlockquoteLine: _blockquoteLine2.default,
  ChecklistItem: _checklistItem2.default,
  CodeLine: _codeLine2.default,
  Heading: _heading2.default,
  HorizontalRule: _horizontalRule2.default,
  Image: _image2.default,
  LinkDefinition: _linkDefinition2.default,
  ListItem: _listItem2.default,
  OrderedListItem: _orderedListItem2.default,
  Paragraph: _paragraph2.default,
  Title: _title2.default,
  Type: _type2.default,
  UnorderedListItem: _unorderedListItem2.default
};

},{"./blockquote-line":8,"./checklist-item":9,"./code-line":10,"./heading":11,"./horizontal-rule":12,"./image":13,"./link-definition":15,"./list-item":16,"./ordered-list-item":18,"./paragraph":19,"./title":20,"./type":21,"./unordered-list-item":22}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing a URL that will be referenced and linked elsewhere in the
 * document
 *
 * @class LinkDefinition
 * @extends Type
 */

var LinkDefinition = function (_Type) {
  _inherits(LinkDefinition, _Type);

  function LinkDefinition() {
    _classCallCheck(this, LinkDefinition);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LinkDefinition).apply(this, arguments));
  }

  _createClass(LinkDefinition, [{
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      var markdown = '[' + this.meta.id + ']: ' + this.meta.url;

      if (this.meta.title) {
        markdown += ' "' + this.meta.title + '"';
      }

      return markdown + (next ? '\n' : '');
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }, {
    key: 'isSummarized',
    get: function get() {
      return false;
    }
  }], [{
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^\n      \\[(?<meta_id>\\S+)\\]:\\s+\n      (?<meta_url>[\\S]+)\n      (?:\\s+"(?<meta_title>[^"]+)")?', 'x');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'link-definition';
    }
  }]);

  return LinkDefinition;
}(_type2.default);

exports.default = LinkDefinition;

},{"../../vendor/xregexp":23,"./type":21}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_Type) {
  _inherits(ListItem, _Type);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ListItem).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      var context = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var whitespace = '';
      for (var i = 0; i < this.meta.level; i++) {
        whitespace += '  ';
      }

      var delimiter = this.buildMarkdownDelimiter(context);
      var markdown = '' + whitespace + delimiter + ' ' + this.content;

      if (next && next.type !== this.type) {
        return markdown + '\n';
      }

      return markdown;
    }

    /**
     * Build the list item delimiter for a Markdown line of this type.
     *
     * @method
     * @param {object} context The context in which the Markdown conversion is
     *   taking place
     * @return {string} The delimiter for a Markdown line
     */

  }, {
    key: 'buildMarkdownDelimiter',
    value: function buildMarkdownDelimiter() {
      throw new Error('Must implement `#buildMarkdownDelimiter` for list types');
    }

    /**
     * @static
     * @see Type.groupType
     */

  }, {
    key: 'isNesting',
    get: function get() {
      return true;
    }
  }], [{
    key: 'matchMarkdown',


    /**
     * @static
     * @method
     */
    value: function matchMarkdown(markdown) {
      var match = _xregexp2.default.exec(markdown, this.markdownPattern);

      if (!match) {
        return null;
      }

      var meta = {
        level: this.readLevel(match.meta_whitespace)
      };

      var nativeString = this.buildNative(match.content, meta);
      return this.matchNative(nativeString);
    }

    /**
     * Read the nesting level of this line from leading whitespace
     *
     * @static
     * @private
     * @param {string} whitespace The whitespace to read the level from
     * @return {number}
     */

  }, {
    key: 'readLevel',
    value: function readLevel(whitespace) {
      return Math.ceil(whitespace.length / 2);
    }
  }, {
    key: 'groupType',
    get: function get() {
      return this.type.replace(/-item$/, '');
    }
  }]);

  return ListItem;
}(_type2.default);

exports.default = ListItem;

},{"../../vendor/xregexp":23,"./type":21}],17:[function(require,module,exports){
module.exports={
  "blockquote-line": {
    "title": "Blockquote Line",
    "description": "A line of a quote pulled from an outside source.\n",
    "typeKey": "bq",
    "examples": {
      "markdown": "> Hello, world!",
      "content": "Hello, world!"
    }
  },
  "checklist-item": {
    "title": "Checklist Item",
    "description": "A checklist item represents an item in a checklist. It can be nested, and may or may not be checked.\n",
    "typeKey": "cl",
    "parameters": {
      "required": [
        {
          "name": "level",
          "type": "number",
          "description": "The level of nesting of this checklist item, from 1 to 6"
        },
        {
          "name": "complete",
          "type": "boolean",
          "description": "Whether this item is complete"
        }
      ]
    },
    "examples": {
      "markdown": "- [ ] Buy eggs",
      "content": "Buy eggs"
    }
  },
  "code-line": {
    "title": "Code Line",
    "description": "A code line represents a line of code, typically in a block of other lines of code.\n",
    "groupType": "code",
    "typeKey": "co",
    "parameters": {
      "optional": [
        {
          "name": "language",
          "type": "string",
          "example": "ruby",
          "description": "The language the code line is written in"
        }
      ]
    },
    "examples": {
      "markdown": "``` ruby\nputs \"hi\"\n```",
      "content": "puts \"hi\""
    }
  },
  "heading": {
    "title": "Heading",
    "description": "A heading represents a line of heading text at a specific level, from one to six.\n",
    "typeKey": "hd",
    "parameters": {
      "required": [
        {
          "name": "level",
          "type": "number",
          "description": "The level of heading this is, from 1 to 6"
        }
      ]
    },
    "examples": {
      "markdown": "# Section Title",
      "content": "Section Title"
    }
  },
  "horizontal-rule": {
    "title": "Horizontal Rule",
    "description": "A horizontal rule represents a visual horizontal separator in a document.\n",
    "typeKey": "hr",
    "examples": {
      "markdown": "---",
      "content": ""
    }
  },
  "image": {
    "title": "Image",
    "description": "An image represents a visual image embedded in a document.\n",
    "typeKey": "im",
    "parameters": {
      "optional": [
        {
          "name": "url",
          "type": "string",
          "example": "https://example.com/image.png"
        },
        {
          "name": "width",
          "type": "number",
          "example": 800,
          "description": "The width, in pixels, of the image"
        },
        {
          "name": "height",
          "type": "number",
          "example": 600,
          "description": "The height, in pixels, of the image"
        },
        {
          "name": "alt",
          "type": "string",
          "description": "The alt text to display on top of the image"
        },
        {
          "name": "title",
          "type": "string",
          "description": "The title of the image"
        },
        {
          "name": "uploadCacheID",
          "type": "string",
          "description": "A UUID identifying an image being uploaded"
        }
      ]
    },
    "examples": {
      "markdown": "![Alt text](https://example.com/image.png \"Title\")",
      "content": ""
    }
  },
  "link-definition": {
    "title": "Link Definition",
    "description": "A line that defines a link referred to elsewhere in the document.\n",
    "typeKey": "ld",
    "parameters": {
      "required": [
        {
          "name": "name",
          "type": "string",
          "description": "The name of this link definition"
        },
        {
          "name": "url",
          "type": "string",
          "description": "The URL that this link points to"
        }
      ]
    },
    "examples": {
      "markdown": "[Google]: https://www.google.com",
      "content": ""
    }
  },
  "ordered-list-item": {
    "title": "Ordered List Item",
    "description": "An ordered list item represents an item in a list whose order is important.\n",
    "typeKey": "ol",
    "parameters": {
      "required": [
        {
          "name": "level",
          "type": "number",
          "description": "The level of nesting of this list item, from 1 to 6"
        }
      ]
    },
    "examples": {
      "markdown": "1. Chapter One",
      "content": "Chapter One"
    }
  },
  "paragraph": {
    "title": "Paragraph",
    "description": "A plain paragraph of text.\n",
    "typeKey": "pg",
    "examples": {
      "markdown": "This is a paragraph.",
      "content": "This is a paragraph."
    }
  },
  "title": {
    "title": "Title",
    "description": "The title of a document, which comes from a level 1 header at the very beginning of parsed Markdown, if one is present.\n",
    "typeKey": "ti",
    "parameters": {
      "required": [
        {
          "name": "version",
          "type": "number",
          "description": "The version of the CanvasNative format this document uses"
        }
      ]
    },
    "examples": {
      "markdown": "# Title",
      "content": "Title"
    }
  },
  "unordered-list-item": {
    "title": "Unordered List Item",
    "description": "An unordered list item represents an item in an unordered list.\n",
    "typeKey": "ul",
    "parameters": {
      "required": [
        {
          "name": "level",
          "type": "number",
          "description": "The level of nesting of this list item, from 1 to 6"
        }
      ]
    },
    "examples": {
      "markdown": "- Foo",
      "content": "Foo"
    }
  }
}

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing an item in an ordered list
 *
 * @class OrderedListItem
 * @extends ListItem
 */

var OrderedListItem = function (_ListItem) {
  _inherits(OrderedListItem, _ListItem);

  function OrderedListItem() {
    _classCallCheck(this, OrderedListItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OrderedListItem).apply(this, arguments));
  }

  _createClass(OrderedListItem, [{
    key: 'buildMarkdownDelimiter',
    value: function buildMarkdownDelimiter(_ref) {
      var groupIndex = _ref.groupIndex;

      return groupIndex + 1 + '.';
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }], [{
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^(?<meta_whitespace> *)\\d+\\. (?<content>.*)$');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'ordered-list-item';
    }
  }]);

  return OrderedListItem;
}(_listItem2.default);

exports.default = OrderedListItem;

},{"../../vendor/xregexp":23,"./list-item":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing a paragraph in a document
 *
 * @class Paragraph
 * @extends Type
 */

var Paragraph = function (_Type) {
  _inherits(Paragraph, _Type);

  function Paragraph() {
    _classCallCheck(this, Paragraph);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));
  }

  _createClass(Paragraph, [{
    key: 'toMarkdown',
    value: function toMarkdown(_prev, next) {
      return this.content + (next ? '\n' : '');
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }], [{
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^(?<content>.*)$');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'paragraph';
    }
  }]);

  return Paragraph;
}(_type2.default);

exports.default = Paragraph;

},{"../../vendor/xregexp":23,"./type":21}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_Type) {
  _inherits(Title, _Type);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
  }

  _createClass(Title, [{
    key: 'toMarkdown',
    value: function toMarkdown(_prev, next) {
      return '# ' + this.content + (next ? '\n' : '');
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }, {
    key: 'isSummarized',
    get: function get() {
      return false;
    }
  }], [{
    key: 'matchMarkdown',


    /**
     * @static
     * @see Type.matchMarkdown
     */
    value: function matchMarkdown(markdown) {
      var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (context.index !== 0) {
        return null;
      }

      return _get(Object.getPrototypeOf(Title), 'matchMarkdown', this).apply(this, arguments);
    }
  }, {
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^# (?<content>.*)$');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'title';
    }
  }]);

  return Title;
}(_type2.default);

exports.default = Title;

},{"../../vendor/xregexp":23,"./type":21}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _meta = require('./meta.json');

var _meta2 = _interopRequireDefault(_meta);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

var _constants = require('../constants.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A base type for all line types
 *
 * @example
 * new Type(XRegExp.exec('Foo', XRegExp('(?<source>)')));
 *
 * @class Type
 * @param {object} match The result of an XRegExp match
 * @param {string} match.source The original native source
 * @param {string} match.content The content of the line
 */

var Type = function () {
  function Type(match) {
    _classCallCheck(this, Type);

    this.meta = JSON.parse(match.meta);
    this.match = match;
  }

  /**
   * @property {string} content The human-readable content of the line
   */


  _createClass(Type, [{
    key: 'toJSON',


    /**
     * @method
     * @return {object} An object representing this line in a JSON-serializable
     *   form
     */
    value: function toJSON() {
      return {
        type: this.type,
        content: this.content,
        meta: this.meta
      };
    }

    /**
     * @method
     * @param {Type} prev The line before the line being converted to Markdown
     * @param {Type} next The line after the line being converted to Markdown
     * @param {object} [context={}] Contextual information for the Markdown
     *   conversion
     * @return {string} The Markdown representation of this line
     */

  }, {
    key: 'toMarkdown',
    value: function toMarkdown(_prev, _next, _context) {
      throw new Error('Must implement `#toMarkdown` for each type');
    }

    /**
     * @static
     * @property {string} groupType The type of group this line belongs to
     */

  }, {
    key: 'content',
    get: function get() {
      return this.match.content;
    }

    /**
     * @property {string} groupType The type of group this line belongs to
     * @see {@link Type.groupType}
     */

  }, {
    key: 'groupType',
    get: function get() {
      return this.constructor.groupType;
    }

    /**
     * @property {boolean} isNesting Whether this line is nestable in groups
     */

  }, {
    key: 'isNesting',
    get: function get() {
      return false;
    }

    /**
     * @property {boolean} isSummarized Whether this line is included in a Canvas
     *   document summary
     */

  }, {
    key: 'isSummarized',
    get: function get() {
      return true;
    }

    /**
     * @property {string} source The original native source of this line
     */

  }, {
    key: 'source',
    get: function get() {
      return this.match.source;
    }

    /**
     * @property {string} type A human-readable name for this type
     * @see {@link Type.type}
     */

  }, {
    key: 'type',
    get: function get() {
      return this.constructor.type;
    }

    /**
     * @property {string} typeKey A short, typically one-character key to denote
     *   this line type
     * @see {@link Type.typeKey}
     */

  }, {
    key: 'typeKey',
    get: function get() {
      return this.constructor.typeKey;
    }
  }], [{
    key: 'buildNative',


    /**
     * Build a Canvas Native string of this type from a given content string and
     * meta data object.
     *
     * @static
     * @method
     * @param {string} [content=''] The readable content for the native line
     * @param {object} [meta={}] The metadata for the native line
     */
    value: function buildNative() {
      var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var meta = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return [this.typeKey, JSON.stringify(meta), content].join(_constants.SEPARATOR);
    }

    /**
     * Match a Markdown string and return a line of this type if it matches.
     *
     * @static
     * @method
     * @param {string} markdown The Markdown to possibly match this line against
     * @param {?object} [context={}] A context object containing the surrounding
     *   context of this line
     * @return {?object} An object representing the match information for this
     *   line
     */

  }, {
    key: 'matchMarkdown',
    value: function matchMarkdown(markdown, _context) {
      var match = _xregexp2.default.exec(markdown, this.markdownPattern);

      if (!match) {
        return null;
      }

      var meta = {};
      for (var key in match) {
        if (!match.hasOwnProperty(key) || !/^meta_.+$/.test(key)) {
          continue;
        }

        meta[key.split('_')[1]] = match[key];
      }

      var nativeString = this.buildNative(match.content, meta);
      return this.matchNative(nativeString);
    }

    /**
     * Match a native string and return a line of this type if it matches.
     *
     * @static
     * @method
     * @param {string} native The native string to possibly match this line
     *   against
     * @return {?object} An object representing the match information for this
     *   line
     */

  }, {
    key: 'matchNative',
    value: function matchNative(native) {
      var match = _xregexp2.default.exec(native, this.nativePattern);
      return match ? new this(match) : null;
    }
  }, {
    key: 'groupType',
    get: function get() {
      return _meta2.default[this.type].groupType || 'canvas';
    }

    /**
     * @static
     * @property {string} type A human-readable name for this type
     */

  }, {
    key: 'type',
    get: function get() {
      throw new Error('Must implement `type` for each type');
    }

    /**
     * @static
     * @property {string} typeKey A short, typically one-character key to denote
     *   this line type
     */

  }, {
    key: 'typeKey',
    get: function get() {
      return _meta2.default[this.type].typeKey;
    }

    /**
     * @static
     * @property {XRegExp} markdownPattern An XRegExp object that matches the
     *   Markdown form of this line type
     */

  }, {
    key: 'markdownPattern',
    get: function get() {
      throw new Error('Must implement `markdownPattern` for each type');
    }

    /**
     * @static
     * @property {XRegExp} nativePattern An XRegExp object that matches the native
     *   form of this line type
     */

  }, {
    key: 'nativePattern',
    get: function get() {
      return (0, _xregexp2.default)('^\n      (?<source>\n        ' + this.typeKey + _constants.SEPARATOR + '\n        (?<meta> .*)' + _constants.SEPARATOR + '\n        (?<content> .*))$', 'x');
    }
  }]);

  return Type;
}();

exports.default = Type;

},{"../../vendor/xregexp":23,"../constants.json":1,"./meta.json":17}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _xregexp = require('../../vendor/xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A line representing an item in an unordered list
 *
 * @class UnorderedListItem
 * @extends ListItem
 */

var UnorderedListItem = function (_ListItem) {
  _inherits(UnorderedListItem, _ListItem);

  function UnorderedListItem() {
    _classCallCheck(this, UnorderedListItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnorderedListItem).apply(this, arguments));
  }

  _createClass(UnorderedListItem, [{
    key: 'buildMarkdownDelimiter',
    value: function buildMarkdownDelimiter() {
      return '-';
    }

    /**
     * @static
     * @see Type.markdownPattern
     */

  }], [{
    key: 'markdownPattern',
    get: function get() {
      return (0, _xregexp2.default)('^(?<meta_whitespace> *)[\\*\\-\\+] (?<content>.*)$');
    }

    /**
     * @static
     * @see Type.type
     */

  }, {
    key: 'type',
    get: function get() {
      return 'unordered-list-item';
    }
  }]);

  return UnorderedListItem;
}(_listItem2.default);

exports.default = UnorderedListItem;

},{"../../vendor/xregexp":23,"./list-item":16}],23:[function(require,module,exports){
/*!
 * XRegExp 3.1.1-dev
 * <xregexp.com>
 * Steven Levithan (c) 2007-2016 MIT License
 */

'use strict';

/**
 * XRegExp provides augmented, extensible regular expressions. You get additional regex syntax and
 * flags, beyond what browsers support natively. XRegExp is also a regex utility belt with tools to
 * make your client-side grepping simpler and more powerful, while freeing you from related
 * cross-browser inconsistencies.
 */

// ==--------------------------==
// Private stuff
// ==--------------------------==

// Property name used for extended regex instance data

var REGEX_DATA = 'xregexp';
// Optional features that can be installed and uninstalled
var features = {
    astral: false,
    natives: false
};
// Native methods to use and restore ('native' is an ES3 reserved keyword)
var nativ = {
    exec: RegExp.prototype.exec,
    test: RegExp.prototype.test,
    match: String.prototype.match,
    replace: String.prototype.replace,
    split: String.prototype.split
};
// Storage for fixed/extended native methods
var fixed = {};
// Storage for regexes cached by `XRegExp.cache`
var regexCache = {};
// Storage for pattern details cached by the `XRegExp` constructor
var patternCache = {};
// Storage for regex syntax tokens added internally or by `XRegExp.addToken`
var tokens = [];
// Token scopes
var defaultScope = 'default';
var classScope = 'class';
// Regexes that match native regex syntax, including octals
var nativeTokens = {
    // Any native multicharacter token in default scope, or any single character
    'default': /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?(?:[:=!]|<[=!])|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
    // Any native multicharacter token in character class scope, or any single character
    'class': /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
};
// Any backreference or dollar-prefixed character in replacement strings
var replacementToken = /\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g;
// Check for correct `exec` handling of nonparticipating capturing groups
var correctExecNpcg = nativ.exec.call(/()??/, '')[1] === undefined;
// Check for ES6 `flags` prop support
var hasFlagsProp = /x/.flags !== undefined;
// Shortcut to `Object.prototype.toString`
var toString = {}.toString;

function hasNativeFlag(flag) {
    // Can't check based on the presense of properties/getters since browsers might support such
    // properties even when they don't support the corresponding flag in regex construction (tested
    // in Chrome 48, where `'unicode' in /x/` is true but trying to construct a regex with flag `u`
    // throws an error)
    var isSupported = true;
    try {
        // Can't use regex literals for testing even in a `try` because regex literals with
        // unsupported flags cause a compilation error in IE
        new RegExp('', flag);
    } catch (exception) {
        isSupported = false;
    }
    return isSupported;
}
// Check for ES6 `u` flag support
var hasNativeU = hasNativeFlag('u');
// Check for ES6 `y` flag support
var hasNativeY = hasNativeFlag('y');
// Tracker for known flags, including addon flags
var registeredFlags = {
    g: true,
    i: true,
    m: true,
    u: hasNativeU,
    y: hasNativeY
};

/**
 * Attaches extended data and `XRegExp.prototype` properties to a regex object.
 *
 * @param {RegExp} regex Regex to augment.
 * @param {Array} captureNames Array with capture names, or `null`.
 * @param {String} xSource XRegExp pattern used to generate `regex`, or `null` if N/A.
 * @param {String} xFlags XRegExp flags used to generate `regex`, or `null` if N/A.
 * @param {Boolean} [isInternalOnly=false] Whether the regex will be used only for internal
 *   operations, and never exposed to users. For internal-only regexes, we can improve perf by
 *   skipping some operations like attaching `XRegExp.prototype` properties.
 * @returns {RegExp} Augmented regex.
 */
function augment(regex, captureNames, xSource, xFlags, isInternalOnly) {
    var p;

    regex[REGEX_DATA] = {
        captureNames: captureNames
    };

    if (isInternalOnly) {
        return regex;
    }

    // Can't auto-inherit these since the XRegExp constructor returns a nonprimitive value
    if (regex.__proto__) {
        regex.__proto__ = XRegExp.prototype;
    } else {
        for (p in XRegExp.prototype) {
            // An `XRegExp.prototype.hasOwnProperty(p)` check wouldn't be worth it here, since this
            // is performance sensitive, and enumerable `Object.prototype` or `RegExp.prototype`
            // extensions exist on `regex.prototype` anyway
            regex[p] = XRegExp.prototype[p];
        }
    }

    regex[REGEX_DATA].source = xSource;
    // Emulate the ES6 `flags` prop by ensuring flags are in alphabetical order
    regex[REGEX_DATA].flags = xFlags ? xFlags.split('').sort().join('') : xFlags;

    return regex;
}

/**
 * Removes any duplicate characters from the provided string.
 *
 * @param {String} str String to remove duplicate characters from.
 * @returns {String} String with any duplicate characters removed.
 */
function clipDuplicates(str) {
    return nativ.replace.call(str, /([\s\S])(?=[\s\S]*\1)/g, '');
}

/**
 * Copies a regex object while preserving extended data and augmenting with `XRegExp.prototype`
 * properties. The copy has a fresh `lastIndex` property (set to zero). Allows adding and removing
 * flags g and y while copying the regex.
 *
 * @param {RegExp} regex Regex to copy.
 * @param {Object} [options] Options object with optional properties:
 *   <li>`addG` {Boolean} Add flag g while copying the regex.
 *   <li>`addY` {Boolean} Add flag y while copying the regex.
 *   <li>`removeG` {Boolean} Remove flag g while copying the regex.
 *   <li>`removeY` {Boolean} Remove flag y while copying the regex.
 *   <li>`isInternalOnly` {Boolean} Whether the copied regex will be used only for internal
 *     operations, and never exposed to users. For internal-only regexes, we can improve perf by
 *     skipping some operations like attaching `XRegExp.prototype` properties.
 * @returns {RegExp} Copy of the provided regex, possibly with modified flags.
 */
function copyRegex(regex, options) {
    if (!XRegExp.isRegExp(regex)) {
        throw new TypeError('Type RegExp expected');
    }

    var xData = regex[REGEX_DATA] || {},
        flags = getNativeFlags(regex),
        flagsToAdd = '',
        flagsToRemove = '',
        xregexpSource = null,
        xregexpFlags = null;

    options = options || {};

    if (options.removeG) {
        flagsToRemove += 'g';
    }
    if (options.removeY) {
        flagsToRemove += 'y';
    }
    if (flagsToRemove) {
        flags = nativ.replace.call(flags, new RegExp('[' + flagsToRemove + ']+', 'g'), '');
    }

    if (options.addG) {
        flagsToAdd += 'g';
    }
    if (options.addY) {
        flagsToAdd += 'y';
    }
    if (flagsToAdd) {
        flags = clipDuplicates(flags + flagsToAdd);
    }

    if (!options.isInternalOnly) {
        if (xData.source !== undefined) {
            xregexpSource = xData.source;
        }
        // null or undefined; don't want to add to `flags` if the previous value was null, since
        // that indicates we're not tracking original precompilation flags
        if (xData.flags != null) {
            // Flags are only added for non-internal regexes by `XRegExp.globalize`. Flags are never
            // removed for non-internal regexes, so don't need to handle it
            xregexpFlags = flagsToAdd ? clipDuplicates(xData.flags + flagsToAdd) : xData.flags;
        }
    }

    // Augment with `XRegExp.prototype` properties, but use the native `RegExp` constructor to avoid
    // searching for special tokens. That would be wrong for regexes constructed by `RegExp`, and
    // unnecessary for regexes constructed by `XRegExp` because the regex has already undergone the
    // translation to native regex syntax
    regex = augment(new RegExp(regex.source, flags), hasNamedCapture(regex) ? xData.captureNames.slice(0) : null, xregexpSource, xregexpFlags, options.isInternalOnly);

    return regex;
}

/**
 * Converts hexadecimal to decimal.
 *
 * @param {String} hex
 * @returns {Number}
 */
function dec(hex) {
    return parseInt(hex, 16);
}

/**
 * Returns native `RegExp` flags used by a regex object.
 *
 * @param {RegExp} regex Regex to check.
 * @returns {String} Native flags in use.
 */
function getNativeFlags(regex) {
    return hasFlagsProp ? regex.flags :
    // Explicitly using `RegExp.prototype.toString` (rather than e.g. `String` or concatenation
    // with an empty string) allows this to continue working predictably when
    // `XRegExp.proptotype.toString` is overriden
    nativ.exec.call(/\/([a-z]*)$/i, RegExp.prototype.toString.call(regex))[1];
}

/**
 * Determines whether a regex has extended instance data used to track capture names.
 *
 * @param {RegExp} regex Regex to check.
 * @returns {Boolean} Whether the regex uses named capture.
 */
function hasNamedCapture(regex) {
    return !!(regex[REGEX_DATA] && regex[REGEX_DATA].captureNames);
}

/**
 * Converts decimal to hexadecimal.
 *
 * @param {Number|String} dec
 * @returns {String}
 */
function hex(dec) {
    return parseInt(dec, 10).toString(16);
}

/**
 * Returns the first index at which a given value can be found in an array.
 *
 * @param {Array} array Array to search.
 * @param {*} value Value to locate in the array.
 * @returns {Number} Zero-based index at which the item is found, or -1.
 */
function indexOf(array, value) {
    var len = array.length,
        i;

    for (i = 0; i < len; ++i) {
        if (array[i] === value) {
            return i;
        }
    }

    return -1;
}

/**
 * Determines whether a value is of the specified type, by resolving its internal [[Class]].
 *
 * @param {*} value Object to check.
 * @param {String} type Type to check for, in TitleCase.
 * @returns {Boolean} Whether the object matches the type.
 */
function isType(value, type) {
    return toString.call(value) === '[object ' + type + ']';
}

/**
 * Checks whether the next nonignorable token after the specified position is a quantifier.
 *
 * @param {String} pattern Pattern to search within.
 * @param {Number} pos Index in `pattern` to search at.
 * @param {String} flags Flags used by the pattern.
 * @returns {Boolean} Whether the next token is a quantifier.
 */
function isQuantifierNext(pattern, pos, flags) {
    return nativ.test.call(flags.indexOf('x') > -1 ?
    // Ignore any leading whitespace, line comments, and inline comments
    /^(?:\s|#[^#\n]*|\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/ :
    // Ignore any leading inline comments
    /^(?:\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/, pattern.slice(pos));
}

/**
 * Adds leading zeros if shorter than four characters. Used for fixed-length hexadecimal values.
 *
 * @param {String} str
 * @returns {String}
 */
function pad4(str) {
    while (str.length < 4) {
        str = '0' + str;
    }
    return str;
}

/**
 * Checks for flag-related errors, and strips/applies flags in a leading mode modifier. Offloads
 * the flag preparation logic from the `XRegExp` constructor.
 *
 * @param {String} pattern Regex pattern, possibly with a leading mode modifier.
 * @param {String} flags Any combination of flags.
 * @returns {Object} Object with properties `pattern` and `flags`.
 */
function prepareFlags(pattern, flags) {
    var i;

    // Recent browsers throw on duplicate flags, so copy this behavior for nonnative flags
    if (clipDuplicates(flags) !== flags) {
        throw new SyntaxError('Invalid duplicate regex flag ' + flags);
    }

    // Strip and apply a leading mode modifier with any combination of flags except g or y
    pattern = nativ.replace.call(pattern, /^\(\?([\w$]+)\)/, function ($0, $1) {
        if (nativ.test.call(/[gy]/, $1)) {
            throw new SyntaxError('Cannot use flag g or y in mode modifier ' + $0);
        }
        // Allow duplicate flags within the mode modifier
        flags = clipDuplicates(flags + $1);
        return '';
    });

    // Throw on unknown native or nonnative flags
    for (i = 0; i < flags.length; ++i) {
        if (!registeredFlags[flags.charAt(i)]) {
            throw new SyntaxError('Unknown regex flag ' + flags.charAt(i));
        }
    }

    return {
        pattern: pattern,
        flags: flags
    };
}

/**
 * Prepares an options object from the given value.
 *
 * @param {String|Object} value Value to convert to an options object.
 * @returns {Object} Options object.
 */
function prepareOptions(value) {
    var options = {};

    if (isType(value, 'String')) {
        XRegExp.forEach(value, /[^\s,]+/, function (match) {
            options[match] = true;
        });

        return options;
    }

    return value;
}

/**
 * Registers a flag so it doesn't throw an 'unknown flag' error.
 *
 * @param {String} flag Single-character flag to register.
 */
function registerFlag(flag) {
    if (!/^[\w$]$/.test(flag)) {
        throw new Error('Flag must be a single character A-Za-z0-9_$');
    }

    registeredFlags[flag] = true;
}

/**
 * Runs built-in and custom regex syntax tokens in reverse insertion order at the specified
 * position, until a match is found.
 *
 * @param {String} pattern Original pattern from which an XRegExp object is being built.
 * @param {String} flags Flags being used to construct the regex.
 * @param {Number} pos Position to search for tokens within `pattern`.
 * @param {Number} scope Regex scope to apply: 'default' or 'class'.
 * @param {Object} context Context object to use for token handler functions.
 * @returns {Object} Object with properties `matchLength`, `output`, and `reparse`; or `null`.
 */
function runTokens(pattern, flags, pos, scope, context) {
    var i = tokens.length,
        leadChar = pattern.charAt(pos),
        result = null,
        match,
        t;

    // Run in reverse insertion order
    while (i--) {
        t = tokens[i];
        if (t.leadChar && t.leadChar !== leadChar || t.scope !== scope && t.scope !== 'all' || t.flag && flags.indexOf(t.flag) === -1) {
            continue;
        }

        match = XRegExp.exec(pattern, t.regex, pos, 'sticky');
        if (match) {
            result = {
                matchLength: match[0].length,
                output: t.handler.call(context, match, scope, flags),
                reparse: t.reparse
            };
            // Finished with token tests
            break;
        }
    }

    return result;
}

/**
 * Enables or disables implicit astral mode opt-in. When enabled, flag A is automatically added to
 * all new regexes created by XRegExp. This causes an error to be thrown when creating regexes if
 * the Unicode Base addon is not available, since flag A is registered by that addon.
 *
 * @param {Boolean} on `true` to enable; `false` to disable.
 */
function setAstral(on) {
    features.astral = on;
}

/**
 * Enables or disables native method overrides.
 *
 * @param {Boolean} on `true` to enable; `false` to disable.
 */
function setNatives(on) {
    RegExp.prototype.exec = (on ? fixed : nativ).exec;
    RegExp.prototype.test = (on ? fixed : nativ).test;
    String.prototype.match = (on ? fixed : nativ).match;
    String.prototype.replace = (on ? fixed : nativ).replace;
    String.prototype.split = (on ? fixed : nativ).split;

    features.natives = on;
}

/**
 * Returns the object, or throws an error if it is `null` or `undefined`. This is used to follow
 * the ES5 abstract operation `ToObject`.
 *
 * @param {*} value Object to check and return.
 * @returns {*} The provided object.
 */
function toObject(value) {
    // null or undefined
    if (value == null) {
        throw new TypeError('Cannot convert null or undefined to object');
    }

    return value;
}

// ==--------------------------==
// Constructor
// ==--------------------------==

/**
 * Creates an extended regular expression object for matching text with a pattern. Differs from a
 * native regular expression in that additional syntax and flags are supported. The returned object
 * is in fact a native `RegExp` and works with all native methods.
 *
 * @class XRegExp
 * @constructor
 * @param {String|RegExp} pattern Regex pattern string, or an existing regex object to copy.
 * @param {String} [flags] Any combination of flags.
 *   Native flags:
 *     <li>`g` - global
 *     <li>`i` - ignore case
 *     <li>`m` - multiline anchors
 *     <li>`u` - unicode (ES6)
 *     <li>`y` - sticky (Firefox 3+, ES6)
 *   Additional XRegExp flags:
 *     <li>`n` - explicit capture
 *     <li>`s` - dot matches all (aka singleline)
 *     <li>`x` - free-spacing and line comments (aka extended)
 *     <li>`A` - astral (requires the Unicode Base addon)
 *   Flags cannot be provided when constructing one `RegExp` from another.
 * @returns {RegExp} Extended regular expression object.
 * @example
 *
 * // With named capture and flag x
 * XRegExp('(?<year>  [0-9]{4} ) -?  # year  \n\
 *          (?<month> [0-9]{2} ) -?  # month \n\
 *          (?<day>   [0-9]{2} )     # day   ', 'x');
 *
 * // Providing a regex object copies it. Native regexes are recompiled using native (not XRegExp)
 * // syntax. Copies maintain extended data, are augmented with `XRegExp.prototype` properties, and
 * // have fresh `lastIndex` properties (set to zero).
 * XRegExp(/regex/);
 */
function XRegExp(pattern, flags) {
    if (XRegExp.isRegExp(pattern)) {
        if (flags !== undefined) {
            throw new TypeError('Cannot supply flags when copying a RegExp');
        }
        return copyRegex(pattern);
    }

    // Copy the argument behavior of `RegExp`
    pattern = pattern === undefined ? '' : String(pattern);
    flags = flags === undefined ? '' : String(flags);

    if (XRegExp.isInstalled('astral') && flags.indexOf('A') === -1) {
        // This causes an error to be thrown if the Unicode Base addon is not available
        flags += 'A';
    }

    if (!patternCache[pattern]) {
        patternCache[pattern] = {};
    }

    if (!patternCache[pattern][flags]) {
        var context = {
            hasNamedCapture: false,
            captureNames: []
        };
        var scope = defaultScope;
        var output = '';
        var pos = 0;
        var result;

        // Check for flag-related errors, and strip/apply flags in a leading mode modifier
        var applied = prepareFlags(pattern, flags);
        var appliedPattern = applied.pattern;
        var appliedFlags = applied.flags;

        // Use XRegExp's tokens to translate the pattern to a native regex pattern.
        // `appliedPattern.length` may change on each iteration if tokens use `reparse`
        while (pos < appliedPattern.length) {
            do {
                // Check for custom tokens at the current position
                result = runTokens(appliedPattern, appliedFlags, pos, scope, context);
                // If the matched token used the `reparse` option, splice its output into the
                // pattern before running tokens again at the same position
                if (result && result.reparse) {
                    appliedPattern = appliedPattern.slice(0, pos) + result.output + appliedPattern.slice(pos + result.matchLength);
                }
            } while (result && result.reparse);

            if (result) {
                output += result.output;
                pos += result.matchLength || 1;
            } else {
                // Get the native token at the current position
                var token = XRegExp.exec(appliedPattern, nativeTokens[scope], pos, 'sticky')[0];
                output += token;
                pos += token.length;
                if (token === '[' && scope === defaultScope) {
                    scope = classScope;
                } else if (token === ']' && scope === classScope) {
                    scope = defaultScope;
                }
            }
        }

        patternCache[pattern][flags] = {
            // Use basic cleanup to collapse repeated empty groups like `(?:)(?:)` to `(?:)`. Empty
            // groups are sometimes inserted during regex transpilation in order to keep tokens
            // separated. However, more than one empty group in a row is never needed.
            pattern: nativ.replace.call(output, /(?:\(\?:\))+/g, '(?:)'),
            // Strip all but native flags
            flags: nativ.replace.call(appliedFlags, /[^gimuy]+/g, ''),
            // `context.captureNames` has an item for each capturing group, even if unnamed
            captures: context.hasNamedCapture ? context.captureNames : null
        };
    }

    var generated = patternCache[pattern][flags];
    return augment(new RegExp(generated.pattern, generated.flags), generated.captures, pattern, flags);
}

// Add `RegExp.prototype` to the prototype chain
XRegExp.prototype = new RegExp();

// ==--------------------------==
// Public properties
// ==--------------------------==

/**
 * The XRegExp version number as a string containing three dot-separated parts. For example,
 * '2.0.0-beta-3'.
 *
 * @static
 * @type String
 */
XRegExp.version = '3.1.1-dev';

// ==--------------------------==
// Public methods
// ==--------------------------==

// Intentionally undocumented; used in tests and addons
XRegExp._hasNativeFlag = hasNativeFlag;
XRegExp._dec = dec;
XRegExp._hex = hex;
XRegExp._pad4 = pad4;

/**
 * Extends XRegExp syntax and allows custom flags. This is used internally and can be used to
 * create XRegExp addons. If more than one token can match the same string, the last added wins.
 *
 * @param {RegExp} regex Regex object that matches the new token.
 * @param {Function} handler Function that returns a new pattern string (using native regex syntax)
 *   to replace the matched token within all future XRegExp regexes. Has access to persistent
 *   properties of the regex being built, through `this`. Invoked with three arguments:
 *   <li>The match array, with named backreference properties.
 *   <li>The regex scope where the match was found: 'default' or 'class'.
 *   <li>The flags used by the regex, including any flags in a leading mode modifier.
 *   The handler function becomes part of the XRegExp construction process, so be careful not to
 *   construct XRegExps within the function or you will trigger infinite recursion.
 * @param {Object} [options] Options object with optional properties:
 *   <li>`scope` {String} Scope where the token applies: 'default', 'class', or 'all'.
 *   <li>`flag` {String} Single-character flag that triggers the token. This also registers the
 *     flag, which prevents XRegExp from throwing an 'unknown flag' error when the flag is used.
 *   <li>`optionalFlags` {String} Any custom flags checked for within the token `handler` that are
 *     not required to trigger the token. This registers the flags, to prevent XRegExp from
 *     throwing an 'unknown flag' error when any of the flags are used.
 *   <li>`reparse` {Boolean} Whether the `handler` function's output should not be treated as
 *     final, and instead be reparseable by other tokens (including the current token). Allows
 *     token chaining or deferring.
 *   <li>`leadChar` {String} Single character that occurs at the beginning of any successful match
 *     of the token (not always applicable). This doesn't change the behavior of the token unless
 *     you provide an erroneous value. However, providing it can increase the token's performance
 *     since the token can be skipped at any positions where this character doesn't appear.
 * @example
 *
 * // Basic usage: Add \a for the ALERT control code
 * XRegExp.addToken(
 *   /\\a/,
 *   function() {return '\\x07';},
 *   {scope: 'all'}
 * );
 * XRegExp('\\a[\\a-\\n]+').test('\x07\n\x07'); // -> true
 *
 * // Add the U (ungreedy) flag from PCRE and RE2, which reverses greedy and lazy quantifiers.
 * // Since `scope` is not specified, it uses 'default' (i.e., transformations apply outside of
 * // character classes only)
 * XRegExp.addToken(
 *   /([?*+]|{\d+(?:,\d*)?})(\??)/,
 *   function(match) {return match[1] + (match[2] ? '' : '?');},
 *   {flag: 'U'}
 * );
 * XRegExp('a+', 'U').exec('aaa')[0]; // -> 'a'
 * XRegExp('a+?', 'U').exec('aaa')[0]; // -> 'aaa'
 */
XRegExp.addToken = function (regex, handler, options) {
    options = options || {};
    var optionalFlags = options.optionalFlags,
        i;

    if (options.flag) {
        registerFlag(options.flag);
    }

    if (optionalFlags) {
        optionalFlags = nativ.split.call(optionalFlags, '');
        for (i = 0; i < optionalFlags.length; ++i) {
            registerFlag(optionalFlags[i]);
        }
    }

    // Add to the private list of syntax tokens
    tokens.push({
        regex: copyRegex(regex, {
            addG: true,
            addY: hasNativeY,
            isInternalOnly: true
        }),
        handler: handler,
        scope: options.scope || defaultScope,
        flag: options.flag,
        reparse: options.reparse,
        leadChar: options.leadChar
    });

    // Reset the pattern cache used by the `XRegExp` constructor, since the same pattern and flags
    // might now produce different results
    XRegExp.cache.flush('patterns');
};

/**
 * Caches and returns the result of calling `XRegExp(pattern, flags)`. On any subsequent call with
 * the same pattern and flag combination, the cached copy of the regex is returned.
 *
 * @param {String} pattern Regex pattern string.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Cached XRegExp object.
 * @example
 *
 * while (match = XRegExp.cache('.', 'gs').exec(str)) {
 *   // The regex is compiled once only
 * }
 */
XRegExp.cache = function (pattern, flags) {
    if (!regexCache[pattern]) {
        regexCache[pattern] = {};
    }
    return regexCache[pattern][flags] || (regexCache[pattern][flags] = XRegExp(pattern, flags));
};

// Intentionally undocumented; used in tests
XRegExp.cache.flush = function (cacheName) {
    if (cacheName === 'patterns') {
        // Flush the pattern cache used by the `XRegExp` constructor
        patternCache = {};
    } else {
        // Flush the regex cache populated by `XRegExp.cache`
        regexCache = {};
    }
};

/**
 * Escapes any regular expression metacharacters, for use when matching literal strings. The result
 * can safely be used at any point within a regex that uses any flags.
 *
 * @param {String} str String to escape.
 * @returns {String} String with regex metacharacters escaped.
 * @example
 *
 * XRegExp.escape('Escaped? <.>');
 * // -> 'Escaped\?\ <\.>'
 */
XRegExp.escape = function (str) {
    return nativ.replace.call(toObject(str), /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

/**
 * Executes a regex search in a specified string. Returns a match array or `null`. If the provided
 * regex uses named capture, named backreference properties are included on the match array.
 * Optional `pos` and `sticky` arguments specify the search start position, and whether the match
 * must start at the specified position only. The `lastIndex` property of the provided regex is not
 * used, but is updated for compatibility. Also fixes browser bugs compared to the native
 * `RegExp.prototype.exec` and can be used reliably cross-browser.
 *
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Number} [pos=0] Zero-based index at which to start the search.
 * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
 *   only. The string `'sticky'` is accepted as an alternative to `true`.
 * @returns {Array} Match array with named backreference properties, or `null`.
 * @example
 *
 * // Basic use, with named backreference
 * var match = XRegExp.exec('U+2620', XRegExp('U\\+(?<hex>[0-9A-F]{4})'));
 * match.hex; // -> '2620'
 *
 * // With pos and sticky, in a loop
 * var pos = 2, result = [], match;
 * while (match = XRegExp.exec('<1><2><3><4>5<6>', /<(\d)>/, pos, 'sticky')) {
 *   result.push(match[1]);
 *   pos = match.index + match[0].length;
 * }
 * // result -> ['2', '3', '4']
 */
XRegExp.exec = function (str, regex, pos, sticky) {
    var cacheKey = 'g',
        addY = false,
        match,
        r2;

    addY = hasNativeY && !!(sticky || regex.sticky && sticky !== false);
    if (addY) {
        cacheKey += 'y';
    }

    regex[REGEX_DATA] = regex[REGEX_DATA] || {};

    // Shares cached copies with `XRegExp.match`/`replace`
    r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
        addG: true,
        addY: addY,
        removeY: sticky === false,
        isInternalOnly: true
    }));

    r2.lastIndex = pos = pos || 0;

    // Fixed `exec` required for `lastIndex` fix, named backreferences, etc.
    match = fixed.exec.call(r2, str);

    if (sticky && match && match.index !== pos) {
        match = null;
    }

    if (regex.global) {
        regex.lastIndex = match ? r2.lastIndex : 0;
    }

    return match;
};

/**
 * Executes a provided function once per regex match. Searches always start at the beginning of the
 * string and continue until the end, regardless of the state of the regex's `global` property and
 * initial `lastIndex`.
 *
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Function} callback Function to execute for each match. Invoked with four arguments:
 *   <li>The match array, with named backreference properties.
 *   <li>The zero-based match index.
 *   <li>The string being traversed.
 *   <li>The regex object being used to traverse the string.
 * @example
 *
 * // Extracts every other digit from a string
 * var evens = [];
 * XRegExp.forEach('1a2345', /\d/, function(match, i) {
 *   if (i % 2) evens.push(+match[0]);
 * });
 * // evens -> [2, 4]
 */
XRegExp.forEach = function (str, regex, callback) {
    var pos = 0,
        i = -1,
        match;

    while (match = XRegExp.exec(str, regex, pos)) {
        // Because `regex` is provided to `callback`, the function could use the deprecated/
        // nonstandard `RegExp.prototype.compile` to mutate the regex. However, since `XRegExp.exec`
        // doesn't use `lastIndex` to set the search position, this can't lead to an infinite loop,
        // at least. Actually, because of the way `XRegExp.exec` caches globalized versions of
        // regexes, mutating the regex will not have any effect on the iteration or matched strings,
        // which is a nice side effect that brings extra safety.
        callback(match, ++i, str, regex);

        pos = match.index + (match[0].length || 1);
    }
};

/**
 * Copies a regex object and adds flag `g`. The copy maintains extended data, is augmented with
 * `XRegExp.prototype` properties, and has a fresh `lastIndex` property (set to zero). Native
 * regexes are not recompiled using XRegExp syntax.
 *
 * @param {RegExp} regex Regex to globalize.
 * @returns {RegExp} Copy of the provided regex with flag `g` added.
 * @example
 *
 * var globalCopy = XRegExp.globalize(/regex/);
 * globalCopy.global; // -> true
 */
XRegExp.globalize = function (regex) {
    return copyRegex(regex, { addG: true });
};

/**
 * Installs optional features according to the specified options. Can be undone using
 * `XRegExp.uninstall`.
 *
 * @param {Object|String} options Options object or string.
 * @example
 *
 * // With an options object
 * XRegExp.install({
 *   // Enables support for astral code points in Unicode addons (implicitly sets flag A)
 *   astral: true,
 *
 *   // DEPRECATED: Overrides native regex methods with fixed/extended versions
 *   natives: true
 * });
 *
 * // With an options string
 * XRegExp.install('astral natives');
 */
XRegExp.install = function (options) {
    options = prepareOptions(options);

    if (!features.astral && options.astral) {
        setAstral(true);
    }

    if (!features.natives && options.natives) {
        setNatives(true);
    }
};

/**
 * Checks whether an individual optional feature is installed.
 *
 * @param {String} feature Name of the feature to check. One of:
 *   <li>`astral`
 *   <li>`natives`
 * @returns {Boolean} Whether the feature is installed.
 * @example
 *
 * XRegExp.isInstalled('astral');
 */
XRegExp.isInstalled = function (feature) {
    return !!features[feature];
};

/**
 * Returns `true` if an object is a regex; `false` if it isn't. This works correctly for regexes
 * created in another frame, when `instanceof` and `constructor` checks would fail.
 *
 * @param {*} value Object to check.
 * @returns {Boolean} Whether the object is a `RegExp` object.
 * @example
 *
 * XRegExp.isRegExp('string'); // -> false
 * XRegExp.isRegExp(/regex/i); // -> true
 * XRegExp.isRegExp(RegExp('^', 'm')); // -> true
 * XRegExp.isRegExp(XRegExp('(?s).')); // -> true
 */
XRegExp.isRegExp = function (value) {
    return toString.call(value) === '[object RegExp]';
    //return isType(value, 'RegExp');
};

/**
 * Returns the first matched string, or in global mode, an array containing all matched strings.
 * This is essentially a more convenient re-implementation of `String.prototype.match` that gives
 * the result types you actually want (string instead of `exec`-style array in match-first mode,
 * and an empty array instead of `null` when no matches are found in match-all mode). It also lets
 * you override flag g and ignore `lastIndex`, and fixes browser bugs.
 *
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {String} [scope='one'] Use 'one' to return the first match as a string. Use 'all' to
 *   return an array of all matched strings. If not explicitly specified and `regex` uses flag g,
 *   `scope` is 'all'.
 * @returns {String|Array} In match-first mode: First match as a string, or `null`. In match-all
 *   mode: Array of all matched strings, or an empty array.
 * @example
 *
 * // Match first
 * XRegExp.match('abc', /\w/); // -> 'a'
 * XRegExp.match('abc', /\w/g, 'one'); // -> 'a'
 * XRegExp.match('abc', /x/g, 'one'); // -> null
 *
 * // Match all
 * XRegExp.match('abc', /\w/g); // -> ['a', 'b', 'c']
 * XRegExp.match('abc', /\w/, 'all'); // -> ['a', 'b', 'c']
 * XRegExp.match('abc', /x/, 'all'); // -> []
 */
XRegExp.match = function (str, regex, scope) {
    var global = regex.global && scope !== 'one' || scope === 'all',
        cacheKey = (global ? 'g' : '') + (regex.sticky ? 'y' : '') || 'noGY',
        result,
        r2;

    regex[REGEX_DATA] = regex[REGEX_DATA] || {};

    // Shares cached copies with `XRegExp.exec`/`replace`
    r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
        addG: !!global,
        removeG: scope === 'one',
        isInternalOnly: true
    }));

    result = nativ.match.call(toObject(str), r2);

    if (regex.global) {
        regex.lastIndex = scope === 'one' && result ?
        // Can't use `r2.lastIndex` since `r2` is nonglobal in this case
        result.index + result[0].length : 0;
    }

    return global ? result || [] : result && result[0];
};

/**
 * Retrieves the matches from searching a string using a chain of regexes that successively search
 * within previous matches. The provided `chain` array can contain regexes and or objects with
 * `regex` and `backref` properties. When a backreference is specified, the named or numbered
 * backreference is passed forward to the next regex or returned.
 *
 * @param {String} str String to search.
 * @param {Array} chain Regexes that each search for matches within preceding results.
 * @returns {Array} Matches by the last regex in the chain, or an empty array.
 * @example
 *
 * // Basic usage; matches numbers within <b> tags
 * XRegExp.matchChain('1 <b>2</b> 3 <b>4 a 56</b>', [
 *   XRegExp('(?is)<b>.*?</b>'),
 *   /\d+/
 * ]);
 * // -> ['2', '4', '56']
 *
 * // Passing forward and returning specific backreferences
 * html = '<a href="http://xregexp.com/api/">XRegExp</a>\
 *         <a href="http://www.google.com/">Google</a>';
 * XRegExp.matchChain(html, [
 *   {regex: /<a href="([^"]+)">/i, backref: 1},
 *   {regex: XRegExp('(?i)^https?://(?<domain>[^/?#]+)'), backref: 'domain'}
 * ]);
 * // -> ['xregexp.com', 'www.google.com']
 */
XRegExp.matchChain = function (str, chain) {
    return function recurseChain(values, level) {
        var item = chain[level].regex ? chain[level] : { regex: chain[level] };
        var matches = [];

        function addMatch(match) {
            if (item.backref) {
                // Safari 4.0.5 (but not 5.0.5+) inappropriately uses sparse arrays to hold the
                // `undefined`s for backreferences to nonparticipating capturing groups. In such
                // cases, a `hasOwnProperty` or `in` check on its own would inappropriately throw
                // the exception, so also check if the backreference is a number that is within the
                // bounds of the array.
                if (!(match.hasOwnProperty(item.backref) || +item.backref < match.length)) {
                    throw new ReferenceError('Backreference to undefined group: ' + item.backref);
                }

                matches.push(match[item.backref] || '');
            } else {
                matches.push(match[0]);
            }
        }

        for (var i = 0; i < values.length; ++i) {
            XRegExp.forEach(values[i], item.regex, addMatch);
        }

        return level === chain.length - 1 || !matches.length ? matches : recurseChain(matches, level + 1);
    }([str], 0);
};

/**
 * Returns a new string with one or all matches of a pattern replaced. The pattern can be a string
 * or regex, and the replacement can be a string or a function to be called for each match. To
 * perform a global search and replace, use the optional `scope` argument or include flag g if using
 * a regex. Replacement strings can use `${n}` for named and numbered backreferences. Replacement
 * functions can use named backreferences via `arguments[0].name`. Also fixes browser bugs compared
 * to the native `String.prototype.replace` and can be used reliably cross-browser.
 *
 * @param {String} str String to search.
 * @param {RegExp|String} search Search pattern to be replaced.
 * @param {String|Function} replacement Replacement string or a function invoked to create it.
 *   Replacement strings can include special replacement syntax:
 *     <li>$$ - Inserts a literal $ character.
 *     <li>$&, $0 - Inserts the matched substring.
 *     <li>$` - Inserts the string that precedes the matched substring (left context).
 *     <li>$' - Inserts the string that follows the matched substring (right context).
 *     <li>$n, $nn - Where n/nn are digits referencing an existent capturing group, inserts
 *       backreference n/nn.
 *     <li>${n} - Where n is a name or any number of digits that reference an existent capturing
 *       group, inserts backreference n.
 *   Replacement functions are invoked with three or more arguments:
 *     <li>The matched substring (corresponds to $& above). Named backreferences are accessible as
 *       properties of this first argument.
 *     <li>0..n arguments, one for each backreference (corresponding to $1, $2, etc. above).
 *     <li>The zero-based index of the match within the total search string.
 *     <li>The total string being searched.
 * @param {String} [scope='one'] Use 'one' to replace the first match only, or 'all'. If not
 *   explicitly specified and using a regex with flag g, `scope` is 'all'.
 * @returns {String} New string with one or all matches replaced.
 * @example
 *
 * // Regex search, using named backreferences in replacement string
 * var name = XRegExp('(?<first>\\w+) (?<last>\\w+)');
 * XRegExp.replace('John Smith', name, '${last}, ${first}');
 * // -> 'Smith, John'
 *
 * // Regex search, using named backreferences in replacement function
 * XRegExp.replace('John Smith', name, function(match) {
 *   return match.last + ', ' + match.first;
 * });
 * // -> 'Smith, John'
 *
 * // String search, with replace-all
 * XRegExp.replace('RegExp builds RegExps', 'RegExp', 'XRegExp', 'all');
 * // -> 'XRegExp builds XRegExps'
 */
XRegExp.replace = function (str, search, replacement, scope) {
    var isRegex = XRegExp.isRegExp(search),
        global = search.global && scope !== 'one' || scope === 'all',
        cacheKey = (global ? 'g' : '') + (search.sticky ? 'y' : '') || 'noGY',
        s2 = search,
        result;

    if (isRegex) {
        search[REGEX_DATA] = search[REGEX_DATA] || {};

        // Shares cached copies with `XRegExp.exec`/`match`. Since a copy is used, `search`'s
        // `lastIndex` isn't updated *during* replacement iterations
        s2 = search[REGEX_DATA][cacheKey] || (search[REGEX_DATA][cacheKey] = copyRegex(search, {
            addG: !!global,
            removeG: scope === 'one',
            isInternalOnly: true
        }));
    } else if (global) {
        s2 = new RegExp(XRegExp.escape(String(search)), 'g');
    }

    // Fixed `replace` required for named backreferences, etc.
    result = fixed.replace.call(toObject(str), s2, replacement);

    if (isRegex && search.global) {
        // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
        search.lastIndex = 0;
    }

    return result;
};

/**
 * Performs batch processing of string replacements. Used like `XRegExp.replace`, but accepts an
 * array of replacement details. Later replacements operate on the output of earlier replacements.
 * Replacement details are accepted as an array with a regex or string to search for, the
 * replacement string or function, and an optional scope of 'one' or 'all'. Uses the XRegExp
 * replacement text syntax, which supports named backreference properties via `${name}`.
 *
 * @param {String} str String to search.
 * @param {Array} replacements Array of replacement detail arrays.
 * @returns {String} New string with all replacements.
 * @example
 *
 * str = XRegExp.replaceEach(str, [
 *   [XRegExp('(?<name>a)'), 'z${name}'],
 *   [/b/gi, 'y'],
 *   [/c/g, 'x', 'one'], // scope 'one' overrides /g
 *   [/d/, 'w', 'all'],  // scope 'all' overrides lack of /g
 *   ['e', 'v', 'all'],  // scope 'all' allows replace-all for strings
 *   [/f/g, function($0) {
 *     return $0.toUpperCase();
 *   }]
 * ]);
 */
XRegExp.replaceEach = function (str, replacements) {
    var i, r;

    for (i = 0; i < replacements.length; ++i) {
        r = replacements[i];
        str = XRegExp.replace(str, r[0], r[1], r[2]);
    }

    return str;
};

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 *
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * XRegExp.split('a b c', ' ');
 * // -> ['a', 'b', 'c']
 *
 * // With limit
 * XRegExp.split('a b c', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * XRegExp.split('..word1..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', '..']
 */
XRegExp.split = function (str, separator, limit) {
    return fixed.split.call(toObject(str), separator, limit);
};

/**
 * Executes a regex search in a specified string. Returns `true` or `false`. Optional `pos` and
 * `sticky` arguments specify the search start position, and whether the match must start at the
 * specified position only. The `lastIndex` property of the provided regex is not used, but is
 * updated for compatibility. Also fixes browser bugs compared to the native
 * `RegExp.prototype.test` and can be used reliably cross-browser.
 *
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Number} [pos=0] Zero-based index at which to start the search.
 * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
 *   only. The string `'sticky'` is accepted as an alternative to `true`.
 * @returns {Boolean} Whether the regex matched the provided value.
 * @example
 *
 * // Basic use
 * XRegExp.test('abc', /c/); // -> true
 *
 * // With pos and sticky
 * XRegExp.test('abc', /c/, 0, 'sticky'); // -> false
 * XRegExp.test('abc', /c/, 2, 'sticky'); // -> true
 */
XRegExp.test = function (str, regex, pos, sticky) {
    // Do this the easy way :-)
    return !!XRegExp.exec(str, regex, pos, sticky);
};

/**
 * Uninstalls optional features according to the specified options. All optional features start out
 * uninstalled, so this is used to undo the actions of `XRegExp.install`.
 *
 * @param {Object|String} options Options object or string.
 * @example
 *
 * // With an options object
 * XRegExp.uninstall({
 *   // Disables support for astral code points in Unicode addons
 *   astral: true,
 *
 *   // DEPRECATED: Restores native regex methods
 *   natives: true
 * });
 *
 * // With an options string
 * XRegExp.uninstall('astral natives');
 */
XRegExp.uninstall = function (options) {
    options = prepareOptions(options);

    if (features.astral && options.astral) {
        setAstral(false);
    }

    if (features.natives && options.natives) {
        setNatives(false);
    }
};

/**
 * Returns an XRegExp object that is the union of the given patterns. Patterns can be provided as
 * regex objects or strings. Metacharacters are escaped in patterns provided as strings.
 * Backreferences in provided regex objects are automatically renumbered to work correctly within
 * the larger combined pattern. Native flags used by provided regexes are ignored in favor of the
 * `flags` argument.
 *
 * @param {Array} patterns Regexes and strings to combine.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Union of the provided regexes and strings.
 * @example
 *
 * XRegExp.union(['a+b*c', /(dogs)\1/, /(cats)\1/], 'i');
 * // -> /a\+b\*c|(dogs)\1|(cats)\2/i
 */
XRegExp.union = function (patterns, flags) {
    var numCaptures = 0;
    var numPriorCaptures;
    var captureNames;

    function rewrite(match, paren, backref) {
        var name = captureNames[numCaptures - numPriorCaptures];

        // Capturing group
        if (paren) {
            ++numCaptures;
            // If the current capture has a name, preserve the name
            if (name) {
                return '(?<' + name + '>';
            }
            // Backreference
        } else if (backref) {
                // Rewrite the backreference
                return '\\' + (+backref + numPriorCaptures);
            }

        return match;
    }

    if (!(isType(patterns, 'Array') && patterns.length)) {
        throw new TypeError('Must provide a nonempty array of patterns to merge');
    }

    var parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g;
    var output = [];
    var pattern;
    for (var i = 0; i < patterns.length; ++i) {
        pattern = patterns[i];

        if (XRegExp.isRegExp(pattern)) {
            numPriorCaptures = numCaptures;
            captureNames = pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames || [];

            // Rewrite backreferences. Passing to XRegExp dies on octals and ensures patterns are
            // independently valid; helps keep this simple. Named captures are put back
            output.push(nativ.replace.call(XRegExp(pattern.source).source, parts, rewrite));
        } else {
            output.push(XRegExp.escape(pattern));
        }
    }

    return XRegExp(output.join('|'), flags);
};

// ==--------------------------==
// Fixed/extended native methods
// ==--------------------------==

/**
 * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
 * bugs in the native `RegExp.prototype.exec`. Calling `XRegExp.install('natives')` uses this to
 * override the native method. Use via `XRegExp.exec` without overriding natives.
 *
 * @param {String} str String to search.
 * @returns {Array} Match array with named backreference properties, or `null`.
 */
fixed.exec = function (str) {
    var origLastIndex = this.lastIndex,
        match = nativ.exec.apply(this, arguments),
        name,
        r2,
        i;

    if (match) {
        // Fix browsers whose `exec` methods don't return `undefined` for nonparticipating capturing
        // groups. This fixes IE 5.5-8, but not IE 9's quirks mode or emulation of older IEs. IE 9
        // in standards mode follows the spec.
        if (!correctExecNpcg && match.length > 1 && indexOf(match, '') > -1) {
            r2 = copyRegex(this, {
                removeG: true,
                isInternalOnly: true
            });
            // Using `str.slice(match.index)` rather than `match[0]` in case lookahead allowed
            // matching due to characters outside the match
            nativ.replace.call(String(str).slice(match.index), r2, function () {
                var len = arguments.length,
                    i;
                // Skip index 0 and the last 2
                for (i = 1; i < len - 2; ++i) {
                    if (arguments[i] === undefined) {
                        match[i] = undefined;
                    }
                }
            });
        }

        // Attach named capture properties
        if (this[REGEX_DATA] && this[REGEX_DATA].captureNames) {
            // Skip index 0
            for (i = 1; i < match.length; ++i) {
                name = this[REGEX_DATA].captureNames[i - 1];
                if (name) {
                    match[name] = match[i];
                }
            }
        }

        // Fix browsers that increment `lastIndex` after zero-length matches
        if (this.global && !match[0].length && this.lastIndex > match.index) {
            this.lastIndex = match.index;
        }
    }

    if (!this.global) {
        // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
        this.lastIndex = origLastIndex;
    }

    return match;
};

/**
 * Fixes browser bugs in the native `RegExp.prototype.test`. Calling `XRegExp.install('natives')`
 * uses this to override the native method.
 *
 * @param {String} str String to search.
 * @returns {Boolean} Whether the regex matched the provided value.
 */
fixed.test = function (str) {
    // Do this the easy way :-)
    return !!fixed.exec.call(this, str);
};

/**
 * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
 * bugs in the native `String.prototype.match`. Calling `XRegExp.install('natives')` uses this to
 * override the native method.
 *
 * @param {RegExp|*} regex Regex to search with. If not a regex object, it is passed to `RegExp`.
 * @returns {Array} If `regex` uses flag g, an array of match strings or `null`. Without flag g,
 *   the result of calling `regex.exec(this)`.
 */
fixed.match = function (regex) {
    var result;

    if (!XRegExp.isRegExp(regex)) {
        // Use the native `RegExp` rather than `XRegExp`
        regex = new RegExp(regex);
    } else if (regex.global) {
        result = nativ.match.apply(this, arguments);
        // Fixes IE bug
        regex.lastIndex = 0;

        return result;
    }

    return fixed.exec.call(regex, toObject(this));
};

/**
 * Adds support for `${n}` tokens for named and numbered backreferences in replacement text, and
 * provides named backreferences to replacement functions as `arguments[0].name`. Also fixes browser
 * bugs in replacement text syntax when performing a replacement using a nonregex search value, and
 * the value of a replacement regex's `lastIndex` property during replacement iterations and upon
 * completion. Calling `XRegExp.install('natives')` uses this to override the native method. Note
 * that this doesn't support SpiderMonkey's proprietary third (`flags`) argument. Use via
 * `XRegExp.replace` without overriding natives.
 *
 * @param {RegExp|String} search Search pattern to be replaced.
 * @param {String|Function} replacement Replacement string or a function invoked to create it.
 * @returns {String} New string with one or all matches replaced.
 */
fixed.replace = function (search, replacement) {
    var isRegex = XRegExp.isRegExp(search),
        origLastIndex,
        captureNames,
        result;

    if (isRegex) {
        if (search[REGEX_DATA]) {
            captureNames = search[REGEX_DATA].captureNames;
        }
        // Only needed if `search` is nonglobal
        origLastIndex = search.lastIndex;
    } else {
        search += ''; // Type-convert
    }

    // Don't use `typeof`; some older browsers return 'function' for regex objects
    if (isType(replacement, 'Function')) {
        // Stringifying `this` fixes a bug in IE < 9 where the last argument in replacement
        // functions isn't type-converted to a string
        result = nativ.replace.call(String(this), search, function () {
            var args = arguments,
                i;
            if (captureNames) {
                // Change the `arguments[0]` string primitive to a `String` object that can store
                // properties. This really does need to use `String` as a constructor
                args[0] = new String(args[0]);
                // Store named backreferences on the first argument
                for (i = 0; i < captureNames.length; ++i) {
                    if (captureNames[i]) {
                        args[0][captureNames[i]] = args[i + 1];
                    }
                }
            }
            // Update `lastIndex` before calling `replacement`. Fixes IE, Chrome, Firefox, Safari
            // bug (last tested IE 9, Chrome 17, Firefox 11, Safari 5.1)
            if (isRegex && search.global) {
                search.lastIndex = args[args.length - 2] + args[0].length;
            }
            // ES6 specs the context for replacement functions as `undefined`
            return replacement.apply(undefined, args);
        });
    } else {
        // Ensure that the last value of `args` will be a string when given nonstring `this`,
        // while still throwing on null or undefined context
        result = nativ.replace.call(this == null ? this : String(this), search, function () {
            // Keep this function's `arguments` available through closure
            var args = arguments;
            return nativ.replace.call(String(replacement), replacementToken, function ($0, $1, $2) {
                var n;
                // Named or numbered backreference with curly braces
                if ($1) {
                    // XRegExp behavior for `${n}`:
                    // 1. Backreference to numbered capture, if `n` is an integer. Use `0` for the
                    //    entire match. Any number of leading zeros may be used.
                    // 2. Backreference to named capture `n`, if it exists and is not an integer
                    //    overridden by numbered capture. In practice, this does not overlap with
                    //    numbered capture since XRegExp does not allow named capture to use a bare
                    //    integer as the name.
                    // 3. If the name or number does not refer to an existing capturing group, it's
                    //    an error.
                    n = +$1; // Type-convert; drop leading zeros
                    if (n <= args.length - 3) {
                        return args[n] || '';
                    }
                    // Groups with the same name is an error, else would need `lastIndexOf`
                    n = captureNames ? indexOf(captureNames, $1) : -1;
                    if (n < 0) {
                        throw new SyntaxError('Backreference to undefined group ' + $0);
                    }
                    return args[n + 1] || '';
                }
                // Else, special variable or numbered backreference without curly braces
                if ($2 === '$') {
                    // $$
                    return '$';
                }
                if ($2 === '&' || +$2 === 0) {
                    // $&, $0 (not followed by 1-9), $00
                    return args[0];
                }
                if ($2 === '`') {
                    // $` (left context)
                    return args[args.length - 1].slice(0, args[args.length - 2]);
                }
                if ($2 === "'") {
                    // $' (right context)
                    return args[args.length - 1].slice(args[args.length - 2] + args[0].length);
                }
                // Else, numbered backreference without curly braces
                $2 = +$2; // Type-convert; drop leading zero
                // XRegExp behavior for `$n` and `$nn`:
                // - Backrefs end after 1 or 2 digits. Use `${..}` for more digits.
                // - `$1` is an error if no capturing groups.
                // - `$10` is an error if less than 10 capturing groups. Use `${1}0` instead.
                // - `$01` is `$1` if at least one capturing group, else it's an error.
                // - `$0` (not followed by 1-9) and `$00` are the entire match.
                // Native behavior, for comparison:
                // - Backrefs end after 1 or 2 digits. Cannot reference capturing group 100+.
                // - `$1` is a literal `$1` if no capturing groups.
                // - `$10` is `$1` followed by a literal `0` if less than 10 capturing groups.
                // - `$01` is `$1` if at least one capturing group, else it's a literal `$01`.
                // - `$0` is a literal `$0`.
                if (!isNaN($2)) {
                    if ($2 > args.length - 3) {
                        throw new SyntaxError('Backreference to undefined group ' + $0);
                    }
                    return args[$2] || '';
                }
                // `$` followed by an unsupported char is an error, unlike native JS
                throw new SyntaxError('Invalid token ' + $0);
            });
        });
    }

    if (isRegex) {
        if (search.global) {
            // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
            search.lastIndex = 0;
        } else {
            // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
            search.lastIndex = origLastIndex;
        }
    }

    return result;
};

/**
 * Fixes browser bugs in the native `String.prototype.split`. Calling `XRegExp.install('natives')`
 * uses this to override the native method. Use via `XRegExp.split` without overriding natives.
 *
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 */
fixed.split = function (separator, limit) {
    if (!XRegExp.isRegExp(separator)) {
        // Browsers handle nonregex split correctly, so use the faster native method
        return nativ.split.apply(this, arguments);
    }

    var str = String(this),
        output = [],
        origLastIndex = separator.lastIndex,
        lastLastIndex = 0,
        lastLength;

    // Values for `limit`, per the spec:
    // If undefined: pow(2,32) - 1
    // If 0, Infinity, or NaN: 0
    // If positive number: limit = floor(limit); if (limit >= pow(2,32)) limit -= pow(2,32);
    // If negative number: pow(2,32) - floor(abs(limit))
    // If other: Type-convert, then use the above rules
    // This line fails in very strange ways for some values of `limit` in Opera 10.5-10.63, unless
    // Opera Dragonfly is open (go figure). It works in at least Opera 9.5-10.1 and 11+
    limit = (limit === undefined ? -1 : limit) >>> 0;

    XRegExp.forEach(str, separator, function (match) {
        // This condition is not the same as `if (match[0].length)`
        if (match.index + match[0].length > lastLastIndex) {
            output.push(str.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < str.length) {
                Array.prototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = match.index + lastLength;
        }
    });

    if (lastLastIndex === str.length) {
        if (!nativ.test.call(separator, '') || lastLength) {
            output.push('');
        }
    } else {
        output.push(str.slice(lastLastIndex));
    }

    separator.lastIndex = origLastIndex;
    return output.length > limit ? output.slice(0, limit) : output;
};

// ==--------------------------==
// Built-in syntax/flag tokens
// ==--------------------------==

/*
 * Letter escapes that natively match literal characters: `\a`, `\A`, etc. These should be
 * SyntaxErrors but are allowed in web reality. XRegExp makes them errors for cross-browser
 * consistency and to reserve their syntax, but lets them be superseded by addons.
 */
XRegExp.addToken(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/, function (match, scope) {
    // \B is allowed in default scope only
    if (match[1] === 'B' && scope === defaultScope) {
        return match[0];
    }
    throw new SyntaxError('Invalid escape ' + match[0]);
}, {
    scope: 'all',
    leadChar: '\\'
});

/*
 * Unicode code point escape with curly braces: `\u{N..}`. `N..` is any one or more digit
 * hexadecimal number from 0-10FFFF, and can include leading zeros. Requires the native ES6 `u` flag
 * to support code points greater than U+FFFF. Avoids converting code points above U+FFFF to
 * surrogate pairs (which could be done without flag `u`), since that could lead to broken behavior
 * if you follow a `\u{N..}` token that references a code point above U+FFFF with a quantifier, or
 * if you use the same in a character class.
 */
XRegExp.addToken(/\\u{([\dA-Fa-f]+)}/, function (match, scope, flags) {
    var code = dec(match[1]);
    if (code > 0x10FFFF) {
        throw new SyntaxError('Invalid Unicode code point ' + match[0]);
    }
    if (code <= 0xFFFF) {
        // Converting to \uNNNN avoids needing to escape the literal character and keep it
        // separate from preceding tokens
        return '\\u' + pad4(hex(code));
    }
    // If `code` is between 0xFFFF and 0x10FFFF, require and defer to native handling
    if (hasNativeU && flags.indexOf('u') > -1) {
        return match[0];
    }
    throw new SyntaxError('Cannot use Unicode code point above \\u{FFFF} without flag u');
}, {
    scope: 'all',
    leadChar: '\\'
});

/*
 * Empty character class: `[]` or `[^]`. This fixes a critical cross-browser syntax inconsistency.
 * Unless this is standardized (per the ES spec), regex syntax can't be accurately parsed because
 * character class endings can't be determined.
 */
XRegExp.addToken(/\[(\^?)]/, function (match) {
    // For cross-browser compatibility with ES3, convert [] to \b\B and [^] to [\s\S].
    // (?!) should work like \b\B, but is unreliable in some versions of Firefox
    return match[1] ? '[\\s\\S]' : '\\b\\B';
}, { leadChar: '[' });

/*
 * Comment pattern: `(?# )`. Inline comments are an alternative to the line comments allowed in
 * free-spacing mode (flag x).
 */
XRegExp.addToken(/\(\?#[^)]*\)/, function (match, scope, flags) {
    // Keep tokens separated unless the following token is a quantifier. This avoids e.g.
    // inadvertedly changing `\1(?#)1` to `\11`.
    return isQuantifierNext(match.input, match.index + match[0].length, flags) ? '' : '(?:)';
}, { leadChar: '(' });

/*
 * Whitespace and line comments, in free-spacing mode (aka extended mode, flag x) only.
 */
XRegExp.addToken(/\s+|#[^\n]*\n?/, function (match, scope, flags) {
    // Keep tokens separated unless the following token is a quantifier. This avoids e.g.
    // inadvertedly changing `\1 1` to `\11`.
    return isQuantifierNext(match.input, match.index + match[0].length, flags) ? '' : '(?:)';
}, { flag: 'x' });

/*
 * Dot, in dotall mode (aka singleline mode, flag s) only.
 */
XRegExp.addToken(/\./, function () {
    return '[\\s\\S]';
}, {
    flag: 's',
    leadChar: '.'
});

/*
 * Named backreference: `\k<name>`. Backreference names can use the characters A-Z, a-z, 0-9, _,
 * and $ only. Also allows numbered backreferences as `\k<n>`.
 */
XRegExp.addToken(/\\k<([\w$]+)>/, function (match) {
    // Groups with the same name is an error, else would need `lastIndexOf`
    var index = isNaN(match[1]) ? indexOf(this.captureNames, match[1]) + 1 : +match[1],
        endIndex = match.index + match[0].length;
    if (!index || index > this.captureNames.length) {
        throw new SyntaxError('Backreference to undefined group ' + match[0]);
    }
    // Keep backreferences separate from subsequent literal numbers. This avoids e.g.
    // inadvertedly changing `(?<n>)\k<n>1` to `()\11`.
    return '\\' + index + (endIndex === match.input.length || isNaN(match.input.charAt(endIndex)) ? '' : '(?:)');
}, { leadChar: '\\' });

/*
 * Numbered backreference or octal, plus any following digits: `\0`, `\11`, etc. Octals except `\0`
 * not followed by 0-9 and backreferences to unopened capture groups throw an error. Other matches
 * are returned unaltered. IE < 9 doesn't support backreferences above `\99` in regex syntax.
 */
XRegExp.addToken(/\\(\d+)/, function (match, scope) {
    if (!(scope === defaultScope && /^[1-9]/.test(match[1]) && +match[1] <= this.captureNames.length) && match[1] !== '0') {
        throw new SyntaxError('Cannot use octal escape or backreference to undefined group ' + match[0]);
    }
    return match[0];
}, {
    scope: 'all',
    leadChar: '\\'
});

/*
 * Named capturing group; match the opening delimiter only: `(?<name>`. Capture names can use the
 * characters A-Z, a-z, 0-9, _, and $ only. Names can't be integers. Supports Python-style
 * `(?P<name>` as an alternate syntax to avoid issues in some older versions of Opera which natively
 * supported the Python-style syntax. Otherwise, XRegExp might treat numbered backreferences to
 * Python-style named capture as octals.
 */
XRegExp.addToken(/\(\?P?<([\w$]+)>/, function (match) {
    // Disallow bare integers as names because named backreferences are added to match arrays
    // and therefore numeric properties may lead to incorrect lookups
    if (!isNaN(match[1])) {
        throw new SyntaxError('Cannot use integer as capture name ' + match[0]);
    }
    if (match[1] === 'length' || match[1] === '__proto__') {
        throw new SyntaxError('Cannot use reserved word as capture name ' + match[0]);
    }
    if (indexOf(this.captureNames, match[1]) > -1) {
        throw new SyntaxError('Cannot use same name for multiple groups ' + match[0]);
    }
    this.captureNames.push(match[1]);
    this.hasNamedCapture = true;
    return '(';
}, { leadChar: '(' });

/*
 * Capturing group; match the opening parenthesis only. Required for support of named capturing
 * groups. Also adds explicit capture mode (flag n).
 */
XRegExp.addToken(/\((?!\?)/, function (match, scope, flags) {
    if (flags.indexOf('n') > -1) {
        return '(?:';
    }
    this.captureNames.push(null);
    return '(';
}, {
    optionalFlags: 'n',
    leadChar: '('
});

// ==--------------------------==
// Expose XRegExp
// ==--------------------------==

module.exports = XRegExp;

},{}]},{},[2])(2)
});