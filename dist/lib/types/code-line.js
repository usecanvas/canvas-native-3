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