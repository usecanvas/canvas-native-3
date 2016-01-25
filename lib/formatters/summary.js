import Scanner from '../scanner';
import stripMd from 'remove-markdown';

const MAX_LENGTH = 256;

/**
 * A module that exposes a single function for formatting an array of
 * CanvasNative line objects as a plaintext summary
 *
 * @module
 */

/**
 * Format an array of CanvasNative lines as a summary.
 *
 * @function
 * @param {Array<Type>} nativeLines The CanvasNative lines
 * @return {string} The summary
 */
export default function format(native) {
  let result    = '';
  const scanner = new Scanner(native);

  for (const [, current] of scanner) {
    if (result.length >= MAX_LENGTH) {
      break;
    }

    if (!current.isSummarized) {
      continue;
    }

    const nextContent = current.content.trim();

    if (!nextContent) {
      continue;
    }

    let next = stripMd(nextContent);
    if (!/[.?!]$/.test(next)) {
      next = `${next}. `;
    } else {
      next = `${next} `;
    }

    if (next.length + result.length > MAX_LENGTH) {
      const nextParts = next.split(/\W/);

      for (const part of nextParts) {
        if (part.length + result.length <= MAX_LENGTH) {
          result += part + ' ';
        } else {
          break;
        }
      }

      result = result.trim() + '. ';

      break;
    } else {
      result += next;
    }
  }

  return result.trim();
}
