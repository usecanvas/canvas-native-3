import XRegExp  from 'xregexp';
import { wrap } from '../brackets';

export default class Type {
  constructor(match) {
    this.match = match;
  }

  get content() {
    return this.match.content;
  }

  get groupType() {
    return 'canvas';
  }

  get isSummarized() {
    return true;
  }

  get source() {
    return this.match.source;
  }

  get type() {
    return this.constructor.type;
  }

  toJSON() {
    throw new Error('Must implement `toJSON` for each type');
  }

  toMarkdown(_prev, _next) {
    throw new Error('Must implement `#toMarkdown` for each type');
  }

  static get type() {
    throw new Error('Must implement `type` for each type');
  }

  static get markdownPattern() {
    throw new Error('Must implement `markdownPattern` for each type');
  }

  static get nativePattern() {
    throw new Error('Must implement `nativePattern` for each type');
  }

  static matchMarkdown(markdown) {
    const match = XRegExp.exec(markdown, this.markdownPattern);

    if (!match) {
      return null;
    }

    const nativeString = wrap(this.type) + match.content;
    return this.matchNative(nativeString);
  }

  static matchNative(native) {
    const match = XRegExp.exec(native, this.nativePattern);
    return match ? new this(match) : null;
  }
}
