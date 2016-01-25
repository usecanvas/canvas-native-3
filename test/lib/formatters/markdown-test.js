import Formatter  from '../../../lib/formatters/markdown';
import Parser     from '../../../lib/parsers/markdown';
import { expect } from 'chai';
import { trim   } from '../../test-helper';

describe('Formatters.Markdown', () => {
  it('formats native lines as Markdown', () => {
    const nativeLines = Parser.parse(trim(`\
       # Title
       Foo
       Bar
       \`\`\`ruby
       def foo
       end
       \`\`\`
       The End`));

    const markdown = Formatter.format(nativeLines);

    expect(markdown).to.eq(trim(`\
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
