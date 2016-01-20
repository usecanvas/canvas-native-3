const CONSTANTS = require('./constants.json');

export function wrap(text) {
  return CONSTANTS.PREFIX_OPEN + text + CONSTANTS.PREFIX_CLOSE;
}
