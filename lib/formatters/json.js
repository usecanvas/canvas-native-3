/**
 * A module that exposes a single function for formatting an array of
 * CanvasNative line objects as JSON
 *
 * @module
 */

/**
 * Format an array of CanvasNative lines as a JSON-serializable object.
 *
 * @function
 * @param {Array<Type>} nativeLines The CanvasNative lines
 * @return {string} The JSON object representing the document
 */
export default function format(nativeLines) {
  const json = createCanvas(nativeLines);

  let nodeStack   = [json];
  let currentNode = nodeStack[nodeStack.length - 1];

  lineLoop: for (const line of nativeLines) {
    while (nodeStack.length >= 0) {
      if (nodeContainsLine(currentNode, line)) {
        appendLine(currentNode, line);
        continue lineLoop;
      }

      if (nodeContainsNestedLine(currentNode, line)) {
        const newNodes = appendGroupForLine(currentNode, line);
        nodeStack = nodeStack.concat(newNodes);
        currentNode = nodeStack[nodeStack.length - 1];
        appendLine(currentNode, line);
        continue lineLoop;
      }

      if (currentNode.type === 'canvas') {
        const newGroup = createGroupFromLine(line);
        json.content.push(newGroup);
        currentNode = newGroup;
        nodeStack.push(newGroup);
        appendLine(currentNode, line);
        continue lineLoop;
      }

      nodeStack.pop();
      currentNode = nodeStack[nodeStack.length - 1] || json;
    }

    if (!nodeStack.length) {
      nodeStack = [json];
    }
  }

  return json;
}

function appendGroupForLine(node, line) {
  const nodeLevel = getNodeLevel(node);
  const lineLevel = line.meta.level;

  let currentNode = node;
  const nodeStack = [];

  let i = nodeLevel;
  while (i < lineLevel) {
    const group = createGroup(line.groupType);
    group.meta = { level: i + 1 };
    nodeStack.push(group);
    currentNode.content.push(group);
    currentNode = group;
    i++;
  }

  return nodeStack;
}

function appendLine(node, line) {
  node.content.push(line.toJSON());
}

function createCanvas(nativeLines) {
  const json = createGroup('canvas');
  json.meta  = { title: null };

  for (const line of nativeLines) {
    if (line.type === 'title') {
      json.meta.title = line.content;
      break;
    }
  }

  return json;
}

function createGroup(type) {
  return {
    content: [],
    type   : type,
  };
}

function createGroupFromLine(line) {
  const group = createGroup(line.groupType);

  if (line.isNesting) {
    group.meta = { level: line.meta.level };
  }

  return group;
}

function getNodeLevel(node) {
  if (node.type === 'canvas') {
    return -1;
  }

  if (!node.meta || typeof node.meta.level !== 'number') {
    return Infinity;
  }

  return node.meta.level;
}

function nodeContainsLine(node, line) {
  const sameType = node.type === line.groupType;

  if (line.isNesting) {
    return sameType && line.meta.level === getNodeLevel(node);
  }

  return sameType;
}

function nodeContainsNestedLine(node, line) {
  const nodeLevel = getNodeLevel(node);

  if (!line.isNesting) {
    return false;
  }

  if (node.type !== 'canvas' && node.type !== line.groupType) {
    return false;
  }

  return nodeLevel < line.meta.level;
}
