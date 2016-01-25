import Formatter  from '../../../lib/formatters/markdown';
import Parser     from '../../../lib/parsers/markdown';
import { expect } from 'chai';

import {
  stripLeadingWhitespace
} from '../../test-helper';

describe('Formatters.Markdown', () => {
  it('formats native lines as Markdown', () => {
    const nativeLines = Parser.parse(stripLeadingWhitespace(`\
       # Title
       Foo
       Bar
       \`\`\`ruby
       def foo
       end
       \`\`\`
       The End`));

    const markdown = Formatter.format(nativeLines);

    expect(markdown).to.eq(stripLeadingWhitespace(`\
      # Title

      Foo

      Bar

      \`\`\`ruby
      def foo
      end
      \`\`\`

      The End`));
  });
});
