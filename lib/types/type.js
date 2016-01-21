import XRegExp  from 'xregexp';
import { wrap } from '../brackets';

/**
 * A base type for all line types
 *
 * @example
 * new Type(XRegExp.exec('Foo', XRegExp('(?<source>)')));
 *
 * @class Type
 * @param {object} match The result of an XRegExp match
 * @param {string} match.source The original native source
 * @param {string} match.content The content of the line
 */
export default class Type {
  constructor(match) {
    this.match = match;
  }

  /**
   * @property {string} content The human-readable content of the line
   */
  get content() {
    return this.match.content;
  }

  /**
   * @property {string} groupType The type of group this line belongs to
   */
  get groupType() {
    return 'canvas';
  }

  /**
   * @property {boolean} isSummarized Whether this line is included in a Canvas
   *   document summary
   */
  get isSummarized() {
    return true;
  }

  /**
   * @property {string} source The original native source of this line
   */
  get source() {
    return this.match.source;
  }

  /**
   * @property {string} type The type name of this line
   * @see {@link Type.type}
   */
  get type() {
    return this.constructor.type;
  }

  /**
   * @method
   * @return {object} An object representing this line in a JSON-serializable
   *   form
   */
  toJSON() {
    throw new Error('Must implement `toJSON` for each type');
  }

  /**
   * @method
   * @return {string} The Markdown representation of this line
   */
  toMarkdown(_prev, _next) {
    throw new Error('Must implement `#toMarkdown` for each type');
  }

  /**
   * @static
   * @property {string} type The type name of this line class
   */
  static get type() {
    throw new Error('Must implement `type` for each type');
  }

  /**
   * @static
   * @property {XRegExp} markdownPattern An XRegExp object that matches the
   *   Markdown form of this line type
   */
  static get markdownPattern() {
    throw new Error('Must implement `markdownPattern` for each type');
  }

  /**
   * @static
   * @property {XRegExp} nativePattern An XRegExp object that matches the native
   *   form of this line type
   */
  static get nativePattern() {
    throw new Error('Must implement `nativePattern` for each type');
  }

  /**
   * @static
   * @method
   * @param {string} markdown The Markdown to possibly match this line against
   * @return {?object} An object representing the match information for this
   *   line
   */
  static matchMarkdown(markdown) {
    const match = XRegExp.exec(markdown, this.markdownPattern);

    if (!match) {
      return null;
    }

    const nativeString = wrap(this.type) + match.content;
    return this.matchNative(nativeString);
  }

  /**
   * @static
   * @method
   * @param {string} native The native string to possibly match this line
   *   against
   * @return {?object} An object representing the match information for this
   *   line
   */
  static matchNative(native) {
    const match = XRegExp.exec(native, this.nativePattern);
    return match ? new this(match) : null;
  }
}
