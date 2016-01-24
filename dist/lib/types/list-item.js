'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

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
    value: function toMarkdown(prev, next, context) {
      var delimiter = this.buildMarkdownDelimiter(context);
      var markdown = delimiter + ' ' + this.content;

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

  }], [{
    key: 'groupType',
    get: function get() {
      return this.type.replace(/-item$/, '');
    }
  }]);

  return ListItem;
}(_type2.default);

exports.default = ListItem;