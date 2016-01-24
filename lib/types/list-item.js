import Type from './type';

export default class ListItem extends Type {
  toMarkdown(prev, next, context) {
    const delimiter = this.buildMarkdownDelimiter(context);
    let markdown = `${delimiter} ${this.content}`;

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
}
