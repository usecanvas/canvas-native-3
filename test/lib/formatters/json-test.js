import Formatter  from '../../../lib/formatters/json';
import MdParser   from '../../../lib/parsers/markdown';
import { expect } from 'chai';
import { trim   } from '../../test-helper';

describe('formatters/json', () => {
  it('includes a title', () => {
    const native = MdParser.parse(`# Foo`);

    expect(Formatter.format(native).meta).to.eql({
      title: 'Foo'
    });
  });

  it('formats simple paragraphs as JSON', () => {
    const native = MdParser.parse(trim(`\
      Foo
      Bar
      Baz`));

    expect(Formatter.format(native).content).to.eql([
      {
        type   : 'paragraph',
        meta   : {},
        content: 'Foo',
      },
      {
        type   : 'paragraph',
        meta   : {},
        content: 'Bar',
      },
      {
        type   : 'paragraph',
        meta   : {},
        content: 'Baz',
      },
    ]);
  });

  it('groups lists', () => {
    const native = MdParser.parse(trim(`\
      - Foo
      - Bar
      - Baz
      Paragraph`));

    expect(Formatter.format(native).content).to.eql([
      {
        type   : 'unordered-list',
        meta   : { level: 0 },
        content: [
          {
            type   : 'unordered-list-item',
            content: 'Foo',
            meta   : { level: 0 },
          },
          {
            type   : 'unordered-list-item',
            content: 'Bar',
            meta   : { level: 0 },
          },
          {
            type   : 'unordered-list-item',
            content: 'Baz',
            meta   : { level: 0 },
          },
        ]
      },
      {
        type   : 'paragraph',
        meta   : {},
        content: 'Paragraph',
      },
    ]);
  });

  it('does not nest under headers', () => {
    const native = MdParser.parse(trim(`\
      # Title
        - UL-1-0`));

    expect(Formatter.format(native).content).to.eql([
      {
        type   : 'title',
        meta   : {},
        content: 'Title',
      },
      {
        type   : 'unordered-list',
        meta   : { level: 0 },
        content: [
          {
            type: 'unordered-list',
            meta: { level: 1 },
            content: [
              {
                type   : 'unordered-list-item',
                meta   : { level: 1 },
                content: 'UL-1-0'
              }
            ]
          }
        ]
      }
    ]);
  });

  it('does not create consecutive equally-nested lists', () => {
    const native = MdParser.parse(trim(`\
      # Title

      - UL-0-0
        - UL-1-0
      - UL-0-1
        - UL-1-0
      - UL-0-2`));

    expect(Formatter.format(native).content).to.eql([
      {
        type: 'title',
        meta: {},
        content: 'Title',
      },
      {
        type   : 'unordered-list',
        meta   : { level: 0 },
        content: [
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: 'UL-0-0',
          },
          {
            type   : 'unordered-list',
            meta   : { level: 1 },
            content: [
              {
                  type   : 'unordered-list-item',
                  meta   : { level: 1 },
                  content: 'UL-1-0'
              }
            ]
          },
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: 'UL-0-1',
          },
          {
            type   : 'unordered-list',
            meta   : { level: 1 },
            content: [
              {
                  type   : 'unordered-list-item',
                  meta   : { level: 1 },
                  content: 'UL-1-0'
              }
            ]
          },
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: 'UL-0-2',
          },
        ]
      }
    ]);
  });

  it('handles nested lists', () => {
    const native = MdParser.parse(trim(`\
    # Title
      - UL-1-0
        - UL-2-0
        - UL-2-1
          - UL-3-0
        - UL-2-2
    - UL-0-0
        1. OL-2-0
      1. OL-1-0
    - UL-0-0
    Paragraph`));

    expect(Formatter.format(native).content).to.eql([
      {
        type: 'title',
        meta: {},
        content: 'Title',
      },
      {
        type   : 'unordered-list',
        meta   : { level: 0 },
        content: [
          {
            type   : 'unordered-list',
            meta   : { level: 1 },
            content: [
              {
                type   : 'unordered-list-item',
                meta   : { level: 1 },
                content: 'UL-1-0'
              },
              {
                type   : 'unordered-list',
                meta   : { level: 2 },
                content: [
                  {
                    type   : 'unordered-list-item',
                    meta   : { level: 2 },
                    content: 'UL-2-0'
                  },
                  {
                    type   : 'unordered-list-item',
                    meta   : { level: 2 },
                    content: 'UL-2-1'
                  },
                  {
                    type   : 'unordered-list',
                    meta   : { level: 3 },
                    content: [
                      {
                        type   : 'unordered-list-item',
                        meta   : { level: 3 },
                        content: 'UL-3-0'
                      },
                    ]
                  },
                  {
                    type   : 'unordered-list-item',
                    meta   : { level: 2 },
                    content: 'UL-2-2'
                  },
                ]
              }
            ]
          },
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: 'UL-0-0'
          }
        ]
      },
      {
        type   : 'ordered-list',
        meta   : { level: 0 },
        content: [
          {
            type   : 'ordered-list',
            meta   : { level: 1 },
            content: [
              {
                type   : 'ordered-list',
                meta   : { level: 2 },
                content: [
                  {
                    type   : 'ordered-list-item',
                    meta   : { level: 2 },
                    content: 'OL-2-0',
                  },
                ]
              },
              {
                type   : 'ordered-list-item',
                meta   : { level: 1 },
                content: 'OL-1-0',
              },
            ]
          }
        ]
      },
      {
        type: 'unordered-list',
        meta: { level: 0 },
        content: [
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: 'UL-0-0',
          }
        ]
      },
      {
        type   : 'paragraph',
        meta   : {},
        content: 'Paragraph',
      },
    ]);
  });

  it('wraps code blocks', () => {
    const native = MdParser.parse(trim(`\
      \`\`\`
      defmodule Foo
      end
      \`\`\`
      Paragraph`));

    expect(Formatter.format(native).content).to.eql([
      {
        type   : 'code',
        content: [
          {
            type   : 'code-line',
            meta   : {},
            content: 'defmodule Foo',
          },
          {
            type   : 'code-line',
            meta   : {},
            content: 'end',
          },
        ]
      },
      {
        type   : 'paragraph',
        meta   : {},
        content: 'Paragraph',
      },
    ]);
  });
});
