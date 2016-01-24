import Title      from '../../../lib/types/title';
import { expect } from 'chai';

describe('Type: Title', () => {
  describe('.matchNative', () => {
    let line;
    beforeEach(() => {
      line = Title.matchNative(Title.buildNative('Title'));
    });

    it('matches with a source', () => {
      expect(line.source).to.eq(Title.buildNative('Title'));
    });

    it('matches with content', () => {
      expect(line.content).to.eq('Title');
    });
  });

  describe('.matchMarkdown', () => {
    const source = '# Title';

    it('matches when line index is 0', () => {
      expect(Title.matchMarkdown(source, { index: 0 }))
        .to.be.an.instanceof(Title);
    });

    it('does not match when line index is greater than 0', () => {
      expect(Title.matchMarkdown(source)).to.be.null;
    });
  });

  describe('#toJSON', () => {
    it('returns its block type and content', () => {
      const line = Title.matchMarkdown('# Foo', { index: 0 });
      expect(line.toJSON()).to.eql({
        type: 'title',
        content: 'Foo',
        meta: {},
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;
    beforeEach(() => {
      line = Title.matchMarkdown('# Foo', { index: 0 });
    });

    it('appends a new line with a following line', () => {
      expect(line.toMarkdown(null, line)).to.eq('# Foo\n');
    });

    it('does not append a new line at the end of a document', () => {
      expect(line.toMarkdown()).to.eq('# Foo');
    });
  });
});
