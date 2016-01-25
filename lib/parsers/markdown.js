import PARSE_ORDER from './parse-order';
import CodeLine    from '../types/code-line';

/**
 * A module that exposes a single function for parsing Markdown text into
 * line objects
 *
 * @module Parsers.Markdown
 */
export default {
  parse,
}

/**
 * Parse a Markdown string and return an array of line objects.
 *
 * @function
 * @param {string} markdown The Markdown text to parse
 * @return {Array<Type>} An array of CanvasNative line objects
 */
function parse(markdown) {
  const sourceLines = markdown.split('\n');
  const result      = [];

  let skipEmptyLine = true;
  let groupType     = null;
  for (let index = 0, len = sourceLines.length; index < len; index++) {
    const sourceLine = sourceLines[index];
    let line;

    // Ignore every odd empty line, except in code blocks
    if (!sourceLine && skipEmptyLine && groupType !== CodeLine.groupType) {
      skipEmptyLine = false;
      continue;
    } else {
      skipEmptyLine = true;
    }

    if (/^```/.test(sourceLine)) {
      if (groupType === CodeLine.groupType) {
        groupType = null;
      } else {
        groupType = CodeLine.groupType;
      }

      continue;
    }

    for (const klass of PARSE_ORDER) {
      if ((line = klass.matchMarkdown(sourceLine, { groupType, index }))) {
        break;
      }
    }

    if (!line) {
      throw new Error(`No matching type for Markdown source "${sourceLine}"`);
    }

    result.push(line);
  }

  return result;
}
