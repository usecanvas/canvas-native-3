import UnorderedListItem from '../../../lib/types/unordered-list-item';
import Paragraph         from '../../../lib/types/paragraph';
import { expect }        from 'chai';

describe('Type: UnorderedListItem', () => {
  [
    ['matchMarkdown', '- Foo'],
    ['matchNative', UnorderedListItem.buildNative('Foo')],
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = UnorderedListItem[matchType](matchSource);
      });

      it('has a source', () => {
        expect(line.source).to.eql(UnorderedListItem.buildNative('Foo'));
      });

      it('has content', () => {
        expect(line.content).to.eql('Foo');
      });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = UnorderedListItem.matchMarkdown('- Foo');
      expect(line.toJSON()).to.eql({
        type: 'unordered-list-item',
        content: 'Foo',
        meta: {},
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = UnorderedListItem.matchNative(UnorderedListItem.buildNative('Foo'));
    });

    it('appends a new line at the end of a group', () => {
      expect(
        line.toMarkdown(null, Paragraph.matchMarkdown('Foo'))
      ).to.eq('- Foo\n');
    });

    it('does not append a newline mid-list', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('- Foo');
    });

    it('does not append a new line at the end of the document', () => {
      expect(line.toMarkdown())
        .to.eql('- Foo');
    });
  });
});
