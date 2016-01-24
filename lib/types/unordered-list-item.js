import ListItem from './list-item';
import XRegExp  from 'xregexp';

/**
 * A line representing an item in an unordered list
 *
 * @class UnorderedListItem
 * @extends ListItem
 */
export default class UnorderedListItem extends ListItem {
  buildMarkdownDelimiter() {
    return '-';
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp('^(?<meta_whitespace> *)[\\*\\-\\+] (?<content>.*)$');
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'unordered-list-item';
  }
}
