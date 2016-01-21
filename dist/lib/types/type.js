'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xregexp = require('xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

var _brackets = require('../brackets');

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
      throw new Error('Must implement `toJSON` for each type');
    }

    /**
     * @method
     * @return {string} The Markdown representation of this line
     */

  }, {
    key: 'toMarkdown',
    value: function toMarkdown(_prev, _next) {
      throw new Error('Must implement `#toMarkdown` for each type');
    }

    /**
     * @static
     * @property {string} type The type name of this line class
     */

  }, {
    key: 'content',
    get: function get() {
      return this.match.content;
    }

    /**
     * @property {string} groupType The type of group this line belongs to
     */

  }, {
    key: 'groupType',
    get: function get() {
      return 'canvas';
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
     * @property {string} type The type name of this line
     * @see {@link Type.type}
     */

  }, {
    key: 'type',
    get: function get() {
      return this.constructor.type;
    }
  }], [{
    key: 'matchMarkdown',

    /**
     * @static
     * @method
     * @param {string} markdown The Markdown to possibly match this line against
     * @return {?object} An object representing the match information for this
     *   line
     */
    value: function matchMarkdown(markdown) {
      var match = _xregexp2.default.exec(markdown, this.markdownPattern);

      if (!match) {
        return null;
      }

      var nativeString = (0, _brackets.wrap)(this.type) + match.content;
      return this.matchNative(nativeString);
    }

    /**
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
    key: 'type',
    get: function get() {
      throw new Error('Must implement `type` for each type');
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
      throw new Error('Must implement `nativePattern` for each type');
    }
  }]);

  return Type;
}();

exports.default = Type;