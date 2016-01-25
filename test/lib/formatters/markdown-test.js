import format     from '../../../lib/formatters/markdown';
import parse      from '../../../lib/parsers/markdown';
import { expect } from 'chai';
import { trim   } from '../../test-helper';

describe('formatters/markdown', () => {
  it('formats native lines as Markdown', () => {
    const nativeLines = parse(trim(`\
       # Title
       Foo
       Bar
       \`\`\`ruby
       def foo
       end
       \`\`\`
       The End`));

    const markdown = format(nativeLines);

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
