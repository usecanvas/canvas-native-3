import CONSTANTS from './constants.json';

export function wrap(text) {
  return CONSTANTS.PREFIX_OPEN + text + CONSTANTS.PREFIX_CLOSE;
}
