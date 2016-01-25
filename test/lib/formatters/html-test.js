import format     from '../../../lib/formatters/html';
import parse      from '../../../lib/parsers/markdown';
import { expect } from 'chai';
import { trim   } from '../../test-helper';

describe('formatters/html', () => {
  it('formats documents as HTML', () => {
    const nativeLines = parse(trim(`\
       # Title
       Foo
       Bar
       \`\`\`ruby
       def foo
       end
       \`\`\`
       The End`));

    const html = format(nativeLines);

    expect(html).to.eql(trim(`\
       <h1>Title</h1>
       <p>Foo</p>
       <p>Bar</p>
       <pre><code class="language-ruby">def foo
       end
       </code></pre>
       <p>The End</p>\n`));
  });
});
