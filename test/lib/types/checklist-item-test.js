import ChecklistItem from '../../../lib/types/checklist-item';
import Paragraph     from '../../../lib/types/paragraph';
import { expect }    from 'chai';

describe('Type: ChecklistItem', () => {
  [
    ['matchMarkdown', '  - [x] Foo'],
    ['matchNative', ChecklistItem.buildNative('Foo',
      { checked: true, level: 1 })],
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = ChecklistItem[matchType](matchSource);
      });

      it('has a source', () => {
        expect(line.source).to
          .eq(ChecklistItem.buildNative('Foo', { checked: true, level: 1 }));
      });

      it('has content', () => {
        expect(line.content).to.eql('Foo');
      });

      it('has metadata', () => {
        expect(line.meta).to.eql({
          checked: true,
          level: 1,
        });
      });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = ChecklistItem.matchMarkdown('   - [X] Foo');
      expect(line.toJSON()).to.eql({
        type: 'checklist-item',
        content: 'Foo',
        meta: { checked: true, level: 2 },
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = ChecklistItem
      .matchNative(ChecklistItem.buildNative('Foo', {
        checked: false,
        level: 2,
      }));
    });

    it('appends a new line at the end of a group', () => {
      expect(line.toMarkdown(null, Paragraph.matchMarkdown('Foo')))
        .to.eq('    - [ ] Foo\n');
    });

    it('does not append a newline mid-list', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('    - [ ] Foo');
    });

    it('does not append a new line at the end of the document', () => {
      expect(line.toMarkdown(null, null))
        .to.eql('    - [ ] Foo');
    });
  });
});
