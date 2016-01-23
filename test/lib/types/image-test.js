import Image      from '../../../lib/types/image';
import { expect } from 'chai';

describe('Type: Image', () => {
  const markdown = '![Alt](https://example.com/image.png "Title")';

  describe('.matchNative', () => {
    const native = Image.buildNative('', {
      alt: 'Alt',
      url: 'https://example.com/image.png',
      title: 'Title'
    });

    let line;

    beforeEach(() => {
      line = Image.matchNative(native);
    });

    it('has a source', () => {
      expect(line.source).to.eql(Image.buildNative('', {
        alt: 'Alt',
        url: 'https://example.com/image.png',
        title: 'Title'
      }));
    });

    it('has content', () => {
      expect(line.content).to.eql('');
    });

    it('has meta', () => {
      expect(line.meta).to.eql({
        alt: 'Alt',
        url: 'https://example.com/image.png',
        title: 'Title'
      });
    });
  });

  describe('.matchMarkdown', () => {
    it('matches with all properties', () => {
      expect(Image.matchMarkdown(
        '![Alt](https://example.com/foo/bar.png?width=100 "Title")').meta)
        .to.eql({
          alt: 'Alt',
          url: 'https://example.com/foo/bar.png?width=100',
          title: 'Title',
        });
    });

    it('matches with no alt or title', () => {
      expect(Image.matchMarkdown(
        '![](https://example.com/foo/bar.png)').meta)
        .to.eql({
          alt: '',
          url: 'https://example.com/foo/bar.png',
        });
    });

    it('matches with just a URL', () => {
      expect(Image.matchMarkdown(
        'https://example.com/foo/bar.png').meta)
        .to.eql({
          url: 'https://example.com/foo/bar.png',
        });
    });
  });

  describe('#toJSON', () => {
    it('returns its type and content', () => {
      const line = Image.matchMarkdown(markdown);
      expect(line.toJSON()).to.eql({
        type: 'image',
        content: '',
        meta: {
          alt: 'Alt',
          url: 'https://example.com/image.png',
          title: 'Title',
        },
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Image.matchMarkdown(markdown);
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
