import ListItem from './list-item';
import XRegExp  from 'xregexp';

/**
 * A line representing an item in a checklist
 *
 * @class ChecklistItem
 * @extends ListItem
 */
export default class ChecklistItem extends ListItem {
  buildMarkdownDelimiter() {
    return `- [${this.meta.checked ? 'x' : ' '}]`;
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
