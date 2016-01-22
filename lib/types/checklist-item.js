import Type    from './type';
import XRegExp from 'xregexp';

/**
 * A line representing an item in a checklist
 *
 * @class ChecklistItem
 * @extends Type
 */
export default class ChecklistItem extends Type {
  toMarkdown(prev, next) {
    let md = `- [${this.meta.checked ? 'x' : ' '}] ${this.content}`;

    if (next && next.type !== this.type) {
      return `${md}\n`;
    }

    return md;
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp(`^ *[\\-\\+\\*] \\[(?<meta_check>[xX ])\\] (?<content>.*)`);
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'checklist-item';
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
      checked: !!match.meta_check.trim()
    };

    const nativeString = this.buildNative(match.content, meta);
    return this.matchNative(nativeString);
  }
}
