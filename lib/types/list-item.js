import Type    from './type';
import XRegExp from 'xregexp';

export default class ListItem extends Type {
  get isNesting() {
    return true;
  }

  toMarkdown(prev, next, context = {}) {
    let whitespace = '';
    for (let i = 0; i < this.meta.level; i++) {
      whitespace += '  ';
    }

    const delimiter = this.buildMarkdownDelimiter(context);
    let markdown = `${whitespace}${delimiter} ${this.content}`;

    if (next && next.type !== this.type) {
      return `${markdown}\n`;
    }

    return markdown;
  }

  /**
   * Build the list item delimiter for a Markdown line of this type.
   *
   * @method
   * @param {object} context The context in which the Markdown conversion is
   *   taking place
   * @return {string} The delimiter for a Markdown line
   */
  buildMarkdownDelimiter() {
    throw new Error('Must implement `#buildMarkdownDelimiter` for list types');
  }

  /**
   * @static
   * @see Type.groupType
   */
  static get groupType() {
    return this.type.replace(/-item$/, '');
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
      level: this.readLevel(match.meta_whitespace)
    };

    const nativeString = this.buildNative(match.content, meta);
    return this.matchNative(nativeString);
  }

  /**
   * Read the nesting level of this line from leading whitespace
   *
   * @static
   * @private
   * @param {string} whitespace The whitespace to read the level from
   * @return {number}
   */
  static readLevel(whitespace) {
    return Math.ceil(whitespace.length / 2);
  }
}
