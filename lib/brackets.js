const BRACKETS = ['⧙', '⧘'];

export default BRACKETS;

export function wrap(text) {
  return BRACKETS[0] + text + BRACKETS[1];
}
