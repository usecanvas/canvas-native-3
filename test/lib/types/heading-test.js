import Heading    from '../../../lib/types/heading';
import { expect } from 'chai';

describe('Type: Heading', () => {
  [
    ['matchMarkdown', '# Foo'],
    ['matchNative', Heading.buildNative('Foo', { level: 1 })],
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = Heading[matchType](matchSource);
      });

      it('has a source', () => {
        expect(line.source).to.eql(Heading.buildNative('Foo', { level: 1 }));
      });

      it('has content', () => {
        expect(line.content).to.eql('Foo');
      });

      it('has a level', () => {
        expect(line.meta).to.eql({
          level: 1
        });
      });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = Heading.matchNative(
        Heading.buildNative('Foo', { level: 2 })
      );

      expect(line.toJSON()).to.eql({
        type: 'heading',
        content: 'Foo',
        meta: { level: 2 },
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Heading
        .matchNative(Heading.buildNative('Foo', { level: 3 }));
    });

    it('appends a new line mid-document', () => {
      expect(line.toMarkdown(null, line))
        .to.eq('### Foo\n');
    });

    it('does not append a new line at the end of a document', () => {
      expect(line.toMarkdown())
        .to.eq('### Foo');
    });
  });
});
