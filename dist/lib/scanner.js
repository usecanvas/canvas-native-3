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