import Type     from './type';
import XRegExp  from 'xregexp';
import { wrap } from '../brackets';

export default class Paragraph extends Type {
  static get markdownPattern() {
    return XRegExp('^(?<content>.*)$');
  }

  static get nativePattern() {
    return XRegExp(`^
      (?<source>
        (?<prefix>  ${wrap('paragraph')})
        (?<content> .*))`, 'x');
  }

  static get type() {
    return 'paragraph';
  }
}
