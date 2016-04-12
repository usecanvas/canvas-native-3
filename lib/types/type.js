import Types         from './meta.json';
import XRegExp       from '../../vendor/xregexp';
import { SEPARATOR } from '../constants.json';

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
    this.meta  = JSON.parse(match.meta);
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
   * @see {@link Type.groupType}
   */
  get groupType() {
    return this.constructor.groupType;
  }

  /**
   * @property {boolean} isNesting Whether this line is nestable in groups
   */
  get isNesting() {
    return false;
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
   * @property {string} type A human-readable name for this type
   * @see {@link Type.type}
   */
  get type() {
    return this.constructor.type;
  }

  /**
   * @property {string} typeKey A short, typically one-character key to denote
   *   this line type
   * @see {@link Type.typeKey}
   */
  get typeKey() {
    return this.constructor.typeKey;
  }

  /**
   * @method
   * @return {object} An object representing this line in a JSON-serializable
   *   form
   */
  toJSON() {
    return {
      type: this.type,
      content: this.content,
      meta: this.meta
    };
  }

  /**
   * @method
   * @param {Type} prev The line before the line being converted to Markdown
   * @param {Type} next The line after the line being converted to Markdown
   * @param {object} [context={}] Contextual information for the Markdown
   *   conversion
   * @return {string} The Markdown representation of this line
   */
  toMarkdown(_prev, _next, _context) {
    throw new Error('Must implement `#toMarkdown` for each type');
  }

  /**
   * @static
   * @property {string} groupType The type of group this line belongs to
   */
  static get groupType() {
    return Types[this.type].groupType || 'canvas';
  }

  /**
   * @static
   * @property {string} type A human-readable name for this type
   */
  static get type() {
    throw new Error('Must implement `type` for each type');
  }

  /**
   * @static
   * @property {string} typeKey A short, typically one-character key to denote
   *   this line type
   */
  static get typeKey() {
    return Types[this.type].typeKey;
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
    return XRegExp(`^
      (?<source>
        ${this.typeKey}${SEPARATOR}
        (?<meta> .*)${SEPARATOR}
        (?<content> .*))$`, 'x');
  }

  /**
   * Build a Canvas Native string of this type from a given content string and
   * meta data object.
   *
   * @static
   * @method
   * @param {string} [content=''] The readable content for the native line
   * @param {object} [meta={}] The metadata for the native line
   */
  static buildNative(content = '', meta = {}) {
    return [
      this.typeKey,
      JSON.stringify(meta),
      content,
    ].join(SEPARATOR);
  }

  /**
   * Match a Markdown string and return a line of this type if it matches.
   *
   * @static
   * @method
   * @param {string} markdown The Markdown to possibly match this line against
   * @param {?object} [context={}] A context object containing the surrounding
   *   context of this line
   * @return {?object} An object representing the match information for this
   *   line
   */
  static matchMarkdown(markdown, _context) {
    const match = XRegExp.exec(markdown, this.markdownPattern);

    if (!match) {
      return null;
    }

    const meta = {};
    for (const key in match) {
      if (!match.hasOwnProperty(key) || !/^meta_.+$/.test(key)) {
        continue;
      }

      meta[key.split('_')[1]] = match[key];
    }

    const nativeString = this.buildNative(match.content, meta);
    return this.matchNative(nativeString);
  }

  /**
   * Match a native string and return a line of this type if it matches.
   *
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
