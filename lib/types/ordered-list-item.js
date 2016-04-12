import ListItem from './list-item';
import XRegExp  from '../../vendor/xregexp';

/**
 * A line representing an item in an ordered list
 *
 * @class OrderedListItem
 * @extends ListItem
 */
export default class OrderedListItem extends ListItem {
  buildMarkdownDelimiter({ groupIndex }) {
    return `${groupIndex + 1}.`;
  }

  /**
   * @static
   * @see Type.markdownPattern
   */
  static get markdownPattern() {
    return XRegExp('^(?<meta_whitespace> *)\\d+\\. (?<content>.*)$');
  }

  /**
   * @static
   * @see Type.type
   */
  static get type() {
    return 'ordered-list-item';
  }
}
