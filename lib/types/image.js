import Type    from './type';
import XRegExp from 'xregexp';

/**
 * A line representing an image
 *
 * @class Image
 * @extends Type
 */
export default class Image extends Type {
  get isSummarized() {
    return false;
  }

  toMarkdown(prev, next) {
    let markdown = `![${this.meta.alt}](${this.meta.url}`;

    if (this.meta.title) {
      markdown += ` "${this.meta.title}"`;
    }

    markdown += ')';

    return markdown + (next ? '\n' : '');
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp(`^
      (?:!\\[(?<meta_alt> .+?)?\\]\\()?
      (?<meta_url> https?:\\/\\/.+\\/.+\\.(?:gif|jpg|jpeg|png)(?:\\?[^\\s)]+)?)
      (?:\\s*"(?<meta_title> [^"]+)")?
      \\)?`, 'x');
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'image';
  }
}
