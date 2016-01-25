import MarkdownIt   from 'markdown-it';
import MdItCheckbox from 'markdown-it-checkbox';
import mdFormat  from './markdown';

/**
 * A module that exposes a single function for formatting an array of
 * CanvasNative line objects as HTML
 *
 * @module
 */

const renderer = new MarkdownIt({
  linkify: true,
}).use(MdItCheckbox);

/**
 * Format an array of CanvasNative lines as HTML.
 *
 * @function
 * @param {Array<Type>} nativeLines The CanvasNative lines
 * @return {string} The HTML text
 */
export default function format(nativeLines) {
  return renderer.render(mdFormat(nativeLines));
}
