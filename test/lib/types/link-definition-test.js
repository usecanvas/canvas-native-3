import LinkDefinition from '../../../lib/types/link-definition';
import { expect }     from 'chai';

describe('Type: LinkDefinition', () => {
  describe('.matchNative', () => {
    const native = LinkDefinition.buildNative('', {
      id: 'google',
      url: 'http://www.google.com',
      title: 'Google'
    });

    let line;

    beforeEach(() => {
      line = LinkDefinition.matchNative(native);
    });

    it('has a source', () => {
      expect(line.source).to.eql(LinkDefinition.buildNative('', {
        id: 'google',
        url: 'http://www.google.com',
        title: 'Google'
      }));
    });

    it('has content', () => {
      expect(line.content).to.eql('');
    });

    it('has meta', () => {
      expect(line.meta).to.eql({
        id: 'google',
        url: 'http://www.google.com',
        title: 'Google'
      });
    });
  });

  describe('.matchMarkdown', () => {
    it('matches with all properties', () => {
      expect(LinkDefinition.matchMarkdown(
        '[google]: http://www.google.com "Google"').meta)
        .to.eql({
          id: 'google',
          url: 'http://www.google.com',
          title: 'Google'
        });
    });

    it('matches with no title', () => {
      expect(LinkDefinition.matchMarkdown(
        '[google]: http://www.google.com').meta)
        .to.eql({
          id: 'google',
          url: 'http://www.google.com'
        });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = LinkDefinition
        .matchMarkdown('[google]: google.com "Google"');

      expect(line.toJSON()).to.eql({
        type: 'link-definition',
        content: '',
        meta: {
          id: 'google',
          url: 'google.com',
          title: 'Google'
        },
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    const markdown = '[google]: google.com "Google"';

    beforeEach(() => {
      line = LinkDefinition.matchMarkdown(markdown);
    });

    it('appends a new line mid-document', () => {
      expect(line.toMarkdown(null, line))
        .to.eq(`${markdown}\n`);
    });

    it('does not append a new line at the end of a document', () => {
      expect(line.toMarkdown())
        .to.eq(markdown);
    });
  });
});
