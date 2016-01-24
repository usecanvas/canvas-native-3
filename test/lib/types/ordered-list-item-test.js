import OrderedListItem from '../../../lib/types/ordered-list-item';
import Paragraph       from '../../../lib/types/paragraph';
import { expect }      from 'chai';

describe('Type: OrderedListItem', () => {
  [
    ['matchMarkdown', '12. Foo'],
    ['matchNative', OrderedListItem.buildNative('Foo')],
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = OrderedListItem[matchType](matchSource);
      });

      it('has a source', () => {
        expect(line.source).to.eql(OrderedListItem.buildNative('Foo'));
      });

      it('has content', () => {
        expect(line.content).to.eql('Foo');
      });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = OrderedListItem.matchMarkdown('1. Foo');
      expect(line.toJSON()).to.eql({
        type: 'ordered-list-item',
        content: 'Foo',
        meta: {},
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = OrderedListItem.matchNative(OrderedListItem.buildNative('Foo'));
    });

    it('uses the index for the item number', () => {
      expect(line.toMarkdown(null, null, { index: 16 }))
        .to.eq('17. Foo');
    });

    it('appends a new line at the end of a group', () => {
      expect(
        line.toMarkdown(null, Paragraph.matchMarkdown('Foo'), { index: 1 })
      ).to.eq('2. Foo\n');
    });

    it('does not append a newline mid-list', () => {
      expect(line.toMarkdown(null, line, { index: 12 }))
        .to.eql('13. Foo');
    });

    it('does not append a new line at the end of the document', () => {
      expect(line.toMarkdown(null, null, { index: 0 }))
        .to.eql('1. Foo');
    });
  });
});
