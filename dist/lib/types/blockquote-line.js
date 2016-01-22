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
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.type,
        content: this.content
      };
    }
  }, {
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

    /**
     * @static
     * @see Type.typeKey
     */

  }, {
    key: 'typeKey',
    get: function get() {
      return 'q';
    }
  }]);

  return BlockquoteLine;
}(_type2.default);

exports.default = BlockquoteLine;