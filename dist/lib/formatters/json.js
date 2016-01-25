'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;
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
function format(nativeLines) {
  var json = createCanvas(nativeLines);

  var nodeStack = [json];
  var currentNode = nodeStack[nodeStack.length - 1];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    lineLoop: for (var _iterator = nativeLines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;

      while (nodeStack.length >= 0) {
        if (nodeContainsLine(currentNode, line)) {
          appendLine(currentNode, line);
          continue lineLoop;
        }

        if (nodeContainsNestedLine(currentNode, line)) {
          var newNodes = appendGroupForLine(currentNode, line);
          nodeStack = nodeStack.concat(newNodes);
          currentNode = nodeStack[nodeStack.length - 1];
          appendLine(currentNode, line);
          continue lineLoop;
        }

        if (currentNode.type === 'canvas') {
          var newGroup = createGroupFromLine(line);
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
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return json;
}

function appendGroupForLine(node, line) {
  var nodeLevel = getNodeLevel(node);
  var lineLevel = line.meta.level;

  var currentNode = node;
  var nodeStack = [];

  var i = nodeLevel;
  while (i < lineLevel) {
    var group = createGroup(line.groupType);
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
  var json = createGroup('canvas');
  json.meta = { title: null };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = nativeLines[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var line = _step2.value;

      if (line.type === 'title') {
        json.meta.title = line.content;
        break;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return json;
}

function createGroup(type) {
  return {
    content: [],
    type: type
  };
}

function createGroupFromLine(line) {
  var group = createGroup(line.groupType);

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
  var sameType = node.type === line.groupType;

  if (line.isNesting) {
    return sameType && line.meta.level === getNodeLevel(node);
  }

  return sameType;
}

function nodeContainsNestedLine(node, line) {
  var nodeLevel = getNodeLevel(node);

  if (!line.isNesting) {
    return false;
  }

  if (node.type !== 'canvas' && node.type !== line.groupType) {
    return false;
  }

  return nodeLevel < line.meta.level;
}