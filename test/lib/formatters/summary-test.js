import Formatter  from '../../../lib/formatters/summary';
import MdParser   from '../../../lib/parsers/markdown';
import { expect } from 'chai';
import { trim   } from '../../test-helper';

describe('formatters/summary', () => {
  it('Formats CanvasNative as a plaintext summary', () => {
    const native = MdParser.parse(trim(`\
      # Title
      Foo.  
      Bar...

      - Baz *qux* [asdf](http://www.example.com)
      Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz 
      Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz 
      Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz 
      - Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz 
      - Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz `));

    const summary = Formatter.format(native);

    expect(summary).to.eql('Foo. Bar... Baz qux asdf. Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz. Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz. Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz. Foobarbaz Foobarbaz Foobarbaz Foobarbaz.');
  });

  ['!', '?'].forEach(punct => {
    it(`does not add a period after existing "${punct}" punctuation`, () => {
      const native = MdParser.parse(`Foo${punct}\nBar`);
      expect(Formatter.format(native)).to.eq(`Foo${punct} Bar.`);
    });
  });
});
