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
^⧙(?<type>[a-z\-]+)(?:\|(?<parameters>(?:[a-z\-]+:[^,]+,?)+))?⧘(?<content>.*)$
```

Or, more readably:

```
⧙${type}|${parameters}⧘${content}
```

In a line, the `type` seen above is a name consisting of lowercase letters
`a-z` and dashes. The `parameters` property is a comma-separated list of
key-value pairs of the format `key:value`. **Note:** This format will change
before this specification is complete.
