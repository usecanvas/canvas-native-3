import ListItem from './list-item';
import XRegExp  from '../../vendor/xregexp';

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
    return XRegExp(`^(?<meta_whitespace>\\ *)    # Leading whitespace
                    [\\-\\+\\*]\\                # Delimiter and a space
                    \\[(?<meta_check>[xX ])\\]\\ # Checkmark + space
                    (?<content>.*)               # Content`, 'x');
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
      checked: !!match.meta_check.trim(),
      level: this.readLevel(match.meta_whitespace),
    };

    const nativeString = this.buildNative(match.content, meta);
    return this.matchNative(nativeString);
  }
}
