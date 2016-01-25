import Type    from './type';
import XRegExp from 'xregexp';

export default class Title extends Type {
  get isSummarized() {
    return false;
  }

  toMarkdown(_prev, next) {
    return `# ${this.content}${next ? '\n' : ''}`;
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp(`^# (?<content>.*)$`);
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'title';
  }

  /**
   * @static
   * @see Type.matchMarkdown
   */
  static matchMarkdown(markdown, context = {}) {
    if (context.index !== 0) {
      return null;
    }

    return super.matchMarkdown(...arguments);
  }
}
