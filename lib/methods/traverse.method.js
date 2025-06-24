"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverse = void 0;
var a_method_1 = require("./a.method");
var iframe_method_1 = require("./iframe.method");
var img_method_1 = require("./img.method");
var p_method_1 = require("./p.method");
var text_method_1 = require("./text.method");
function traverse(node, forApp, depth, webp, state) {
    if (depth === void 0) { depth = 0; }
    if (webp === void 0) { webp = false; }
    if (state === void 0) { state = { firstImageFound: false }; }
    if (!node || !node.childNodes) {
        return;
    }
    Array.from(Array(node.childNodes.length).keys())
        .map(function (i) { return node.childNodes[i]; })
        .forEach(function (child) {
        if (child.nodeName.toLowerCase() === 'a') {
            (0, a_method_1.a)(child, forApp, webp);
        }
        if (child.nodeName.toLowerCase() === 'iframe') {
            (0, iframe_method_1.iframe)(child);
        }
        if (child.nodeName === '#text') {
            (0, text_method_1.text)(child, forApp, webp);
        }
        if (child.nodeName.toLowerCase() === 'img') {
            (0, img_method_1.img)(child, webp, state);
        }
        if (child.nodeName.toLowerCase() === 'p') {
            (0, p_method_1.p)(child);
        }
        traverse(child, forApp, depth + 1, webp, state);
    });
}
exports.traverse = traverse;
//# sourceMappingURL=traverse.method.js.map