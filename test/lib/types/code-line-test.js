import CodeLine   from '../../../lib/types/code-line';
import Paragraph  from '../../../lib/types/paragraph';
import { expect } from 'chai';

describe('Type: CodeLine', () => {
  describe('.matchMarkdown', () => {
    it('matches code in a code group', () => {
      expect(CodeLine.matchMarkdown('Code', { groupType: 'code' }))
        .to.be.an.instanceof(CodeLine);
    });

    it('does not match code not in a code group', () => {
      expect(CodeLine.matchMarkdown('Code')).to.be.null;
    });

    it('includes the language if provided', () => {
      expect(CodeLine.matchMarkdown('Code', {
        groupType: 'code',
        language: 'ruby'
      }).meta).to.eql({
        language: 'ruby'
      });
    });
  });

  describe('.matchNative', () => {
    const matchSource = CodeLine.buildNative('Foo', { language: 'ruby' });

    let line;
    beforeEach(() => {
      line = CodeLine.matchNative(matchSource);
    });

    it('has a source', () => {
      expect(line.source).to
        .eq(CodeLine.buildNative('Foo', { language: 'ruby' }));
    });

    it('has content', () => {
      expect(line.content).to.eql('Foo');
    });

    it('has metadata', () => {
      expect(line.meta).to.eql({
        language: 'ruby',
      });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = CodeLine.matchNative(
        CodeLine.buildNative('Foo', { language: 'ruby' })
      );

      expect(line.toJSON()).to.eql({
        type: 'code-line',
        content: 'Foo',
        meta: { language: 'ruby' },
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = CodeLine
        .matchNative(CodeLine.buildNative('Foo', { language: 'ruby' }));
    });

    it('prepends a fence at the beginning of a code block', () => {
      expect(line.toMarkdown(Paragraph.matchMarkdown('Foo'), line))
        .to.eql('```ruby\nFoo');
    });

    it('prepends a fence at the beginning of a document', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('```ruby\nFoo');
    });

    it('appends a fence and new line at the end of a code block', () => {
      expect(line.toMarkdown(line, Paragraph.matchMarkdown('Foo')))
        .to.eql('Foo\n```\n');
    });

    it('appends a fence at the end of a document', () => {
      expect(line.toMarkdown(line, null))
        .to.eql('Foo\n```');
    });

    it('does not append a fence mid-block', () => {
      expect(line.toMarkdown(line, line))
        .to.eql('Foo');
    });
  });
});
