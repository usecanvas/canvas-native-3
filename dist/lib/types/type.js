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

var Type = function () {
  function Type(match) {
    _classCallCheck(this, Type);

    this.match = match;
  }

  _createClass(Type, [{
    key: 'toJSON',
    value: function toJSON() {
      throw new Error('Must implement `toJSON` for each type');
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown(_prev, _next) {
      throw new Error('Must implement `#toMarkdown` for each type');
    }
  }, {
    key: 'content',
    get: function get() {
      return this.match.content;
    }
  }, {
    key: 'groupType',
    get: function get() {
      return 'canvas';
    }
  }, {
    key: 'isSummarized',
    get: function get() {
      return true;
    }
  }, {
    key: 'source',
    get: function get() {
      return this.match.source;
    }
  }, {
    key: 'type',
    get: function get() {
      return this.constructor.type;
    }
  }], [{
    key: 'matchMarkdown',
    value: function matchMarkdown(markdown) {
      var match = _xregexp2.default.exec(markdown, this.markdownPattern);

      if (!match) {
        return null;
      }

      var nativeString = (0, _brackets.wrap)(this.type) + match.content;
      return this.matchNative(nativeString);
    }
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
  }, {
    key: 'markdownPattern',
    get: function get() {
      throw new Error('Must implement `markdownPattern` for each type');
    }
  }, {
    key: 'nativePattern',
    get: function get() {
      throw new Error('Must implement `nativePattern` for each type');
    }
  }]);

  return Type;
}();

exports.default = Type;