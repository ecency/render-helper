"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownToHTML = void 0;
var traverse_method_1 = require("./traverse.method");
var sanitize_html_method_1 = require("./sanitize-html.method");
var consts_1 = require("../consts");
var xmldom_1 = __importDefault(require("xmldom"));
var Remarkable = require('remarkable');
function markdownToHTML(input, forApp, webp) {
    var md = new Remarkable({ html: true, breaks: true, typographer: false, linkify: true });
    var XMLSerializer = new xmldom_1.default.XMLSerializer();
    if (!input) {
        return '';
    }
    var output;
    try {
        output = md.render(input);
        var doc = consts_1.DOMParser.parseFromString("<body id=\"root\">" + output + "</body>", 'text/html');
        traverse_method_1.traverse(doc, forApp, 0, webp);
        output = XMLSerializer.serializeToString(doc);
    }
    catch (error) {
        output = '';
    }
    output = output.replace(/ xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g, '')
        .replace('<body id="root">', '')
        .replace('</body>', '')
        .trim();
    return sanitize_html_method_1.sanitizeHtml(output);
}
exports.markdownToHTML = markdownToHTML;
//# sourceMappingURL=markdown-to-html.method.js.map