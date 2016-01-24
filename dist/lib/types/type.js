'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _xregexp = require('xregexp');

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
      return _2.default[this.type].groupType || 'canvas';
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
      return _2.default[this.type].typeKey;
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