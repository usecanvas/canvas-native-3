# CanvasNative

CanvasNative is a method of representing Canvas documents in a linear fashion
(e.g. not JSON) while including metadata about the document's contents.

This project comprises the specification and utilities for the CanvasNative
format.

## Building

A single command will build distribution code, and the README file:

```
npm run build
```

**Make sure and run this before each commit!**

## Types

In a CanvasNative document, an individual line is one of several types.
Typically, a line has the following format:

```regex
^⧙(?<type>[a-z\-]+)(?:{{PARAMETERS_START}}(?<parameters>(?:[a-z\-]+:[^,]+,?)+))?⧘(?<content>.*)$
```

Or, more readably:

```
⧙${type}|${parameters}⧘${content}
```

In a line, the `type` seen above is a name consisting of lowercase letters
`a-z` and dashes. The `parameters` property is a
`,`-separated list of key-value pairs of the format
`key:value`. **Note:** This format will change before
this specification is complete.
### Checklist Item

A checklist item represents an item in a checklist. It can be nested, and may or may not be checked.

#### Parameters

##### Required

- `level` (number) - The level of nesting of this checklist item, from 1 to 6
- `complete` (boolean) - Whether this item is complete

#### Example

##### Markdown

```
- [ ] Buy eggs
```

##### Native

```
⧙checklist-item|level:1,complete:f⧘Foo bar
```

---

### Code Line

A code line represents a line of code, typically in a block of other lines of code.

#### Parameters

##### Optional

- `language` (string) - The language the code line is written in

#### Example

##### Markdown

```
helloWorld();
```

##### Native

```
⧙code-line|language:ruby⧘Foo bar
```

---

### Heading

A heading represents a line of heading text at a specific level, from one to six.

#### Parameters

##### Required

- `level` (number) - The level of heading this is, from 1 to 6

#### Example

##### Markdown

```
# Section Title
```

##### Native

```
⧙heading|level:1⧘Foo bar
```

---

### Horizontal Rule

A horizontal rule represents a visual horizontal separator in a document.

#### Parameters

This type has no parameters.

#### Example

##### Markdown

```
---
```

##### Native

```
⧙horizontal-rule⧘Foo bar
```

---

### Image

An image represents a visual image embedded in a document.

#### Parameters

##### Optional

- `width` (number) - The width, in pixels, of the image
- `height` (number) - The height, in pixels, of the image
- `alt-text` (string) - The alt text to display on top of the image
- `title` (string) - The title of the image

#### Example

##### Markdown

```
![Alt text](https://example.com/image.png "Title")
```

##### Native

```
⧙image|width:800,height:600,alt-text:foo,title:foo⧘Foo bar
```

---

### Link Definition

A line that defines a link referred to elsewhere in the document.

#### Parameters

This type has no parameters.

#### Example

##### Markdown

```
[Google]: https://www.google.com
```

##### Native

```
⧙link-definition⧘[Google]: https://www.google.com
```

---

### Numbered List Item

An numbered list item represents an item in a list whose order is important.

#### Parameters

##### Required

- `level` (number) - The level of nesting of this list item, from 1 to 6

#### Example

##### Markdown

```
1. Chapter One
```

##### Native

```
⧙numbered-list-item|level:1⧘Foo bar
```

---

### Paragraph

A plain paragraph of text.

#### Parameters

This type has no parameters.

#### Example

##### Markdown

```
This is a paragraph.
```

##### Native

```
⧙paragraph⧘Foo bar
```

---

### Title

The title of a document, which comes from a level 1 header at the very beginning of parsed Markdown, if one is present.

#### Parameters

This type has no parameters.

#### Example

##### Native

```
⧙title⧘Foo bar
```

---

### Bullet List Item

A bullet list item represents an item in a bullet list.

#### Parameters

##### Required

- `level` (number) - The level of nesting of this list item, from 1 to 6

#### Example

##### Markdown

```
- Foo
```

##### Native

```
⧙bullet-list-item|level:1⧘Foo bar
```

---

