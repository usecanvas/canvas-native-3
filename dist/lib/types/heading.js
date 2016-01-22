'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _xregexp = require('xregexp');

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
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.type,
        content: this.content,
        meta: this.meta
      };
    }
  }, {
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

  return CodeLine;
}(_type2.default);

exports.default = CodeLine;