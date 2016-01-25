export function trim(string) {
  const length = string.match(/^( *)/)[1].length;
  return string.replace(new RegExp(`^ {${length}}`, 'mg'), '');
}
