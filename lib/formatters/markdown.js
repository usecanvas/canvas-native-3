import Scanner from '../scanner';

/**
 * A module that exposes a single function for formatting an array of
 * CanvasNative line objects as Markdown
 *
 * @module
 */
export default {
  format,
}

/**
 * Format an array of CanvasNative lines as Markdown.
 *
 * @function
 * @param {Array<Type>} nativeLines The CanvasNative lines
 * @return {string} The Markdown text
 */
function format(nativeLines) {
  const result  = [];
  const scanner = new Scanner(nativeLines);

  for (const [prev, curr, next] of scanner) {
    result.push(curr.toMarkdown(prev, next));
  }

  return result.join('\n');
}
