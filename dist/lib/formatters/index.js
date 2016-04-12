'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _html = require('./html');

var _html2 = _interopRequireDefault(_html);

var _json = require('./json');

var _json2 = _interopRequireDefault(_json);

var _markdown = require('./markdown');

var _markdown2 = _interopRequireDefault(_markdown);

var _summary = require('./summary');

var _summary2 = _interopRequireDefault(_summary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  HTML: _html2.default,
  JSON: _json2.default,
  Markdown: _markdown2.default,
  Summary: _summary2.default
};