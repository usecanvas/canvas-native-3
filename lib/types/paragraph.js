import Type     from './type';
import XRegExp  from 'xregexp';
import { wrap } from '../brackets';

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
   * @see Type.nativePattern
   */
  static get nativePattern() {
    return XRegExp(`^
      (?<source>
        (?<prefix>  ${wrap('paragraph')})
        (?<content> .*))`, 'x');
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'paragraph';
  }
}
