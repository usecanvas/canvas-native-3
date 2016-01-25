import format     from '../../../lib/formatters/summary';
import parse      from '../../../lib/parsers/markdown';
import { expect } from 'chai';
import { trim   } from '../../test-helper';

describe('formatters/summary', () => {
  it('Formats CanvasNative as a plaintext summary', () => {
    const native = parse(trim(`\
      # Title
      Foo.
      Bar...

      - Baz *qux* [asdf](http://www.example.com)
      Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz
      Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz
      Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz
      - Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz
      - Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz `));

    const summary = format(native);

    expect(summary).to.eql('Foo. Bar... Baz qux asdf. Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz. Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz. Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz. Foobarbaz Foobarbaz Foobarbaz Foobarbaz.');
  });

  ['!', '?'].forEach(punct => {
    it(`does not add a period after existing "${punct}" punctuation`, () => {
      const native = parse(`Foo${punct}\nBar`);
      expect(format(native)).to.eq(`Foo${punct} Bar.`);
    });
  });
});
