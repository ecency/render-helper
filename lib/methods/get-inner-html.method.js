"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSerializedInnerHTML = void 0;
var xmldom_1 = __importDefault(require("xmldom"));
function getSerializedInnerHTML(node) {
    var XMLSerializer = new xmldom_1.default.XMLSerializer();
    if (node.childNodes[0]) {
        return XMLSerializer.serializeToString(node.childNodes[0]);
    }
    return '';
}
exports.getSerializedInnerHTML = getSerializedInnerHTML;
//# sourceMappingURL=get-inner-html.method.js.map