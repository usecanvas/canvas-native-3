import Type    from './type';
import XRegExp from 'xregexp';

/**
 * A line representing a blockquote in a document
 *
 * @class BlockquoteLine
 * @extends Type
 */
export default class BlockquoteLine extends Type {
  toMarkdown(prev, next) {
    let md = `> ${this.content}`;

    if (next) {
      return `${md}\n`;
    }

    return md;
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp(`^> (?<content>.*)`);
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'blockquote-line';
  }
}
