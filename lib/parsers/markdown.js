import PARSE_ORDER from './parse-order';
import CodeLine    from '../types/code-line';

/**
 * A module that exposes a single function for parsing Markdown text into
 * line objects
 *
 * @module
 */

/**
 * Parse a Markdown string and return an array of line objects.
 *
 * @function
 * @param {string} markdown The Markdown text to parse
 * @return {Array<Type>} An array of CanvasNative line objects
 */
export default function parse(markdown) {
  const sourceLines = markdown.split('\n');
  const result      = [];

  let groupType     = null;
  let language      = null;
  let skipEmptyLine = true;
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

    let fenceMatch;
    if ((fenceMatch = CodeLine.matchFence(sourceLine))) {
      if (groupType === CodeLine.groupType) {
        groupType = null;
        language  = null;
      } else {
        groupType = CodeLine.groupType;
        language  = fenceMatch[1];
      }

      continue;
    }

    for (const klass of PARSE_ORDER) {
      if ((line = klass.matchMarkdown(sourceLine,
        { groupType, index, language }))) {
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
