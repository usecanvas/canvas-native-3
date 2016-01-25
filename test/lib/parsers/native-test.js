import Paragraph         from '../../../lib/types/paragraph';
import Parser            from '../../../lib/parsers/native';
import Title             from '../../../lib/types/title';
import UnorderedListItem from '../../../lib/types/unordered-list-item';
import { SEPARATOR }     from '../../../lib/constants.json';
import { expect    }     from 'chai';

describe('Parsers.Native', () => {
  it('parses native lines into an array of objects', () => {
    const source = [
      Title.buildNative('This is the title'),
      Paragraph.buildNative('Content'),
      UnorderedListItem.buildNative('Foo', { level: 0 }),
      UnorderedListItem.buildNative('Bar', { level: 0 }),
      UnorderedListItem.buildNative('Baz', { level: 0 }),
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

  it('throws with an unrecognized type', () => {
    const source = [
      '__unknown__',
      '{}',
      'Foo'
    ].join(SEPARATOR);

    expect(_ => Parser.parse(source)).to.throw(
      `No matching type for native source "${source}"`
    );
  });
});
