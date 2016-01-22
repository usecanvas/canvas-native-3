import HorizontalRule from '../../../lib/types/horizontal-rule';
import { expect }     from 'chai';

describe('Type: HorizontalRule', () => {
  [
    ['matchMarkdown', '- - -'],
    ['matchNative', HorizontalRule.buildNative('')],
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = HorizontalRule[matchType](matchSource);
      });

      it('has a source', () => {
        expect(line.source).to.eql(HorizontalRule.buildNative());
      });

      it('has content', () => {
        expect(line.content).to.eql('');
      });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = HorizontalRule.matchNative(
        HorizontalRule.buildNative()
      );

      expect(line.toJSON()).to.eql({
        type: 'horizontal-rule',
        content: '',
        meta: {},
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = HorizontalRule
        .matchNative(HorizontalRule.buildNative());
    });

    it('appends a new line mid-document', () => {
      expect(line.toMarkdown(null, line))
        .to.eq('---\n');
    });

    it('does not append a new line at the end of a document', () => {
      expect(line.toMarkdown())
        .to.eq('---');
    });
  });
});
