import MarkdownIt   from 'markdown-it';
import MdFormatter  from './markdown';
import MdItCheckbox from 'markdown-it-checkbox';

/**
 * A module that exposes a single function for formatting an array of
 * CanvasNative line objects as HTML
 *
 * @module
 */
export default {
  format,
}

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
function format(nativeLines) {
  return renderer.render(MdFormatter.format(nativeLines));
}
