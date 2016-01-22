import Type    from './type';
import XRegExp from 'xregexp';

/**
 * A line representing a paragraph in a document
 *
 * @class Paragraph
 * @extends Type
 */
export default class Paragraph extends Type {
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

  /**
   * @static
   * @see Type.typeKey
   */
  static get typeKey() {
    return 'p';
  }
}
