"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeChildNodes = void 0;
function removeChildNodes(node) {
    Array.from(Array(node.childNodes.length).keys()).forEach(function (x) {
        node.removeChild(node.childNodes[x]);
    });
}
exports.removeChildNodes = removeChildNodes;
//# sourceMappingURL=remove-child-nodes.method.js.map