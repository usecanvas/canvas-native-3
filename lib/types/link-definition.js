import Type    from './type';
import XRegExp from '../../vendor/xregexp';

/**
 * A line representing a URL that will be referenced and linked elsewhere in the
 * document
 *
 * @class LinkDefinition
 * @extends Type
 */
export default class LinkDefinition extends Type {
  get isSummarized() {
    return false;
  }

  toMarkdown(prev, next) {
    let markdown = `[${this.meta.id}]: ${this.meta.url}`;

    if (this.meta.title) {
      markdown += ` "${this.meta.title}"`;
    }

    return markdown + (next ? '\n' : '');
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp(`^
      \\[(?<meta_id>\\S+)\\]:\\s+
      (?<meta_url>[\\S]+)
      (?:\\s+"(?<meta_title>[^"]+)")?`, 'x');
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'link-definition';
  }
}
