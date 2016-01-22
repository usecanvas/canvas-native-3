import Type    from './type';
import XRegExp from 'xregexp';

/**
 * A line representing a heading
 *
 * @class Heading
 * @extends Type
 */
export default class Heading extends Type {
  toMarkdown(_prev, next) {
    let hashes = '';

    for (let i = 0; i < this.meta.level; i++) {
      hashes += '#';
    }

    return `${hashes} ${this.content}${next ? '\n' : ''}`;
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp(`^(?<meta_hashes>#{1,6}) (?<content>.*)$`);
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'heading';
  }

  /**
   * @static
   * @method
   */
  static matchMarkdown(markdown) {
    const match = XRegExp.exec(markdown, this.markdownPattern);

    if (!match) {
      return null;
    }

    const meta = {
      level: match.meta_hashes.length,
    };

    const nativeString = this.buildNative(match.content, meta);
    return this.matchNative(nativeString);
  }
}
