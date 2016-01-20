import Type     from './type';
import XRegExp  from 'xregexp';
import { wrap } from '../brackets';

export default class BlockquoteLine extends Type {
  toJSON() {
    return {
      type: this.type,
      content: this.content
    };
  }

  toMarkdown(prev, next) {
    let md = `> ${this.content}`;

    if (next) {
      return `${md}\n`;
    }

    return md;
  }

  static get markdownPattern() {
    return XRegExp(`^> (?<content>.*)`);
  }

  static get nativePattern() {
    return XRegExp(`^
      (?<source>
        (?<prefix>  ${wrap('blockquote-line')})
        (?<content> .*))`, 'x');
  }

  static get type() {
    return 'blockquote-line';
  }
}
