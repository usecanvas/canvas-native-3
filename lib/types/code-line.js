import Type    from './type';
import XRegExp from 'xregexp';

/**
 * A line representing a line of code
 *
 * @class CodeLine
 * @extends Type
 */
export default class CodeLine extends Type {
  toMarkdown(prev, next) {
    const language = this.meta.language || '';

    if (!prev || prev.type !== this.type) {
      return `\`\`\`${language}\n${this.content}`;
    }

    if (!next) {
      return `${this.content}\n\`\`\``;
    }

    if (next && next.type !== this.type) {
      return `${this.content}\n\`\`\`\n`;
    }

    return this.content;
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp(`^(?<content>.*)$`);
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'code-line';
  }

  /**
   * @static
   * @see Type.matchmarkdown
   */
  static matchMarkdown(markdown, context = {}) {
    if (context.groupType !== this.groupType) {
      return null;
    }

    return super.matchMarkdown(...arguments);
  }
}
