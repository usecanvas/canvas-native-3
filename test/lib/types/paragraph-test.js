import Paragraph  from '../../../lib/types/paragraph';
import { expect } from 'chai';

describe('Type: Paragraph', () => {
  [
    ['matchMarkdown', 'Foo'],
    ['matchNative', Paragraph.buildNative('Foo')],
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = Paragraph[matchType](matchSource);
      });

      it('has a source', () => {
        expect(line.source).to.eql(Paragraph.buildNative('Foo'));
      });

      it('has content', () => {
        expect(line.content).to.eql('Foo');
      });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = Paragraph.matchMarkdown('Foo');
      expect(line.toJSON()).to.eql({
        type: 'paragraph',
        content: 'Foo',
        meta: {},
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Paragraph.matchNative(Paragraph.buildNative('Foo'));
    });

    it('includes a new line with a following line', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('Foo\n');
    });

    it('does not append a new line at the end of the document', () => {
      expect(line.toMarkdown())
        .to.eql('Foo');
    });
  });
});
