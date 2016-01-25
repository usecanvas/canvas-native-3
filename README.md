# CanvasNative [![Circle CI](https://circleci.com/gh/usecanvas/canvas-native-3.svg?style=svg)](https://circleci.com/gh/usecanvas/canvas-native-3)

CanvasNative is a method of representing Canvas documents in a linear fashion
(e.g. not JSON) while including metadata about the document's contents.

This project comprises the specification and utilities for the CanvasNative
format.

## Development

A single command will build distribution code, and the README file:

```
npm run build
```

**Make sure and run this before each commit!**

While developing, it is useful to run `npm run watch`. This will run a
foreground process that monitors all build- and test-dependent files, and run
the build and test processes as needed.

To run the watch command, both `watchman` and `pywatchman` are required. On OS X
with Homebrew and Python already installed, the installation looks like this:

```sh
brew install watchman
sudo pip install pywatchman
```

Then, in a new terminal window, `npm run watch` should work.

## Documentation Note

CanvasNative uses an invisible character to separate parts of its lines. For
readability, the documentation replaces that character with `|`.

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

In a line, the `typeKey` seen above is a typically two-character identifier for
a specific line type. The `metadata` property is a JSON string containing
information about the line.

So, a line of Ruby code might look like this:

```
co|{"language":"ruby"}|class MyClass extends OtherClass
```
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
bq|{}|Foo bar
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
cl|{"level":1,"complete":"f"}|Foo bar
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
co|{"language":"ruby"}|Foo bar
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
hd|{"level":1}|Foo bar
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
hr|{}|Foo bar
```

---

### Image

An image represents a visual image embedded in a document.

#### Parameters

##### Optional

- `width` (number) - The width, in pixels, of the image
- `height` (number) - The height, in pixels, of the image
- `alt` (string) - The alt text to display on top of the image
- `title` (string) - The title of the image
- `uploadCacheID` (string) - A UUID identifying an image being uploaded

#### Example

##### Markdown

```
![Alt text](https://example.com/image.png "Title")
```

##### Native

```
im|{"width":800,"height":600,"alt":"foo","title":"foo","uploadCacheID":"foo"}|Foo bar
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
ld|{"name":"foo","url":"foo"}|Foo bar
```

---

### Ordered List Item

An ordered list item represents an item in a list whose order is important.

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
ol|{"level":1}|Foo bar
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
pg|{}|Foo bar
```

---

### Title

The title of a document, which comes from a level 1 header at the very beginning of parsed Markdown, if one is present.

#### Parameters

##### Required

- `version` (number) - The version of the CanvasNative format this document uses

#### Example

##### Native

```
ti|{"version":1}|Foo bar
```

---

### Unordered List Item

An unordered list item represents an item in an unordered list.

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
ul|{"level":1}|Foo bar
```

---

