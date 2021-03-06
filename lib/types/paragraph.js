import Type    from './type';
import XRegExp from '../../vendor/xregexp';

/**
 * A line representing a paragraph in a document
 *
 * @class Paragraph
 * @extends Type
 */
export default class Paragraph extends Type {
  toMarkdown(_prev, next) {
    return this.content + (next ? '\n' : '');
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp('^(?<content>.*)$');
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'paragraph';
  }
}
