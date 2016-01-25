import PARSE_ORDER from './parse-order';

/**
 * A module that exposes a single function for parsing CanvasNative text into
 * line objects
 *
 * @module Parsers.Native
 */
export default {
  parse,
}

/**
 * Parse a CanvasNative-formatted string and return an array of line objects.
 *
 * @function
 * @param {string} native The native text to parse
 * @return {Array<Type>} An array of CanvasNative line objects
 */
function parse(native) {
  const sourceLines = native.split('\n');
  const result      = [];

  for (const sourceLine of sourceLines) {
    let line;

    for (const klass of PARSE_ORDER) {
      if ((line = klass.matchNative(sourceLine))) {
        break;
      }
    }

    if (!line) {
      throw new Error(`No matching type for native source "${sourceLine}"`);
    }

    result.push(line);
  }

  return result;
}
