import BlockquoteLine from '../../../lib/types/blockquote-line';
import Paragraph      from '../../../lib/types/paragraph';
import { expect }     from 'chai';
import { wrap   }     from '../../../lib/brackets';

const NAME = BlockquoteLine.type;

describe('Type: BlockquoteLine', () => {
  [
    ['matchMarkdown', '> Foo'],
    ['matchNative', `${wrap(NAME)}Foo`]
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = BlockquoteLine[matchType](matchSource);
      });

      it('has a source', () => {
        expect(line.source).to.eql(`${wrap(NAME)}Foo`);
      });

      it('has content', () => {
        expect(line.content).to.eql('Foo');
      });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = BlockquoteLine.matchMarkdown('> Foo');
      expect(line.toJSON()).to.eql({
        type: 'blockquote-line',
        content: 'Foo'
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = BlockquoteLine.matchNative(wrap(NAME) + 'Foo');
    });

    it('appends a new line at the end of a group', () => {
      expect(line.toMarkdown(null, Paragraph.matchMarkdown('Foo')))
        .to.eq('> Foo\n');
    });

    it('appends a newline mid-list', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('> Foo\n');
    });

    it('does not append a new line at the end of the document', () => {
      expect(line.toMarkdown(null, null))
        .to.eql('> Foo');
    });
  });
});
