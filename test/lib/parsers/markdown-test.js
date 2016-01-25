//import Paragraph         from '../../../lib/types/paragraph';
import Parser            from '../../../lib/parsers/markdown';
//import Title             from '../../../lib/types/title';
//import UnorderedListItem from '../../../lib/types/unordered-list-item';
//import { SEPARATOR }     from '../../../lib/constants.json';
import { expect    }     from 'chai';

describe('Parsers.Markdown', () => {
  it('parses markdown lines into an array of objects', () => {
    const source = [
      '# Title',
      'Foo',
      '- Bar',
      '- Baz',
      '- Qux',
    ].join('\n');

    const result = Parser.parse(source);

    expect(result.map(r => r.type)).to.eql([
      'title',
      'paragraph',
      'unordered-list-item',
      'unordered-list-item',
      'unordered-list-item',
    ]);
  });

  it('ignores every other newline, starting with the first', () => {
    const source = [
      '# Title', '',
      'Foo',     '', '',
      'Bar',     '', '', '',
      'Baz',     '', '', '', '', '',
      'Qux',
    ].join('\n');

    const result = Parser.parse(source);

    expect(result.map(r => r.content)).to.eql([
      'Title',
      'Foo', '',
      'Bar', '',
      'Baz', '', '',
      'Qux',
    ]);
  });

  it('parses code blocks while ignoring their fences', () => {
    const source = [
      '# Title',
      '```',
      'def foo', '', '',
      'end',
      '```',
      'End paragraph',
    ].join('\n');

    const result = Parser.parse(source);

    expect(result.map(r => r.type)).to.eql([
      'title',
      'code-line',
      'code-line',
      'code-line',
      'code-line',
      'paragraph',
    ]);
  });

  it('only parses titles on the first line', () => {
    const source = [
      '',
      '# Title',
    ].join('\n');

    const result = Parser.parse(source);

    expect(result.map(r => r.type)).to.eql([
      'heading',
    ]);
  });
});
