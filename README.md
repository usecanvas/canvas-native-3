# CanvasNative

CanvasNative is a method of representing Canvas documents in a linear fashion
(e.g. not JSON) while including metadata about the document's contents.

This project comprises the specification and utilities for the CanvasNative
format.

## Documentation Note

CanvasNative uses an invisible character to separate parts of its lines. For
readability, the documentation replaces that character with `|`.

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
^(?<typeKey>[a-z])\|(?<metadata>{.*?})\|(?<content>.*)$
```

Or, more readably:

```
${typeKey}|${metadata}|${content}
```

In a line, the `typeKey` seen above is a typically single-character identifier
for a specific line type. The `metadata` property is a JSON string containing
information about the line.
### Blockquote Line

A line of a quote pulled from an outside source.

#### Parameters

This type has no parameters.

#### Example

##### Markdown

```
> Hello, world!
```

##### Native

```
q|{}|Foo bar
```

---

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
c|{"level":1,"complete":"f"}|Foo bar
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
o|{"language":"ruby"}|Foo bar
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
h|{"level":1}|Foo bar
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
r|{}|Foo bar
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
i|{"width":800,"height":600,"alt-text":"foo","title":"foo"}|Foo bar
```

---

### Link Definition

A line that defines a link referred to elsewhere in the document.

#### Parameters

##### Required

- `name` (string) - The name of this link definition
- `url` (string) - The URL that this link points to

#### Example

##### Markdown

```
[Google]: https://www.google.com
```

##### Native

```
d|{"name":"foo","url":"foo"}|Foo bar
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
n|{"level":1}|Foo bar
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
p|{}|Foo bar
```

---

### Title

The title of a document, which comes from a level 1 header at the very beginning of parsed Markdown, if one is present.

#### Parameters

This type has no parameters.

#### Example

##### Native

```
t|{}|Foo bar
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
b|{"level":1}|Foo bar
```

---

