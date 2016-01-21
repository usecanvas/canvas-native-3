import Type     from './type';
import XRegExp  from 'xregexp';
import { wrap } from '../brackets';

/**
 * A line representing a blockquote in a document
 *
 * @class BlockquoteLine
 * @extends Type
 */
export default class BlockquoteLine extends Type {
  toJSON() {
    return {
      type: this.type,
      content: this.content
    };
  }

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
   * @see Type.nativePattern
   */
  static get nativePattern() {
    return XRegExp(`^
      (?<source>
        (?<prefix>  ${wrap('blockquote-line')})
        (?<content> .*))`, 'x');
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'blockquote-line';
  }
}
