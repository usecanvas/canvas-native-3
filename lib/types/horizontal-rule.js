import Type    from './type';
import XRegExp from 'xregexp';

/**
 * A line representing a horizontal rule
 *
 * @class HorizontalRule
 * @extends Type
 */
export default class HorizontalRule extends Type {
  toMarkdown(_prev, next) {
    return `---${next ? '\n' : ''}`;
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp('^(?:- ?){3,}(?<content>)$');
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'horizontal-rule';
  }
}
