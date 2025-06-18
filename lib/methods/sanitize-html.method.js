"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeHtml = void 0;
var xss_1 = __importDefault(require("xss"));
var consts_1 = require("../consts");
var decodeEntities = function (input) {
    return input
        .replace(/&#(\d+);?/g, function (_, dec) { return String.fromCharCode(dec); })
        .replace(/&#x([0-9a-f]+);?/gi, function (_, hex) { return String.fromCharCode(parseInt(hex, 16)); });
};
function sanitizeHtml(html) {
    return (0, xss_1.default)(html, {
        whiteList: consts_1.ALLOWED_ATTRIBUTES,
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['style'],
        css: false,
        onTagAttr: function (tag, name, value) {
            var decoded = decodeEntities(value.trim().toLowerCase());
            if (name.startsWith('on'))
                return ''; // 🛡 event handlers
            if (tag === 'img' && name === 'src' && (!/^https?:\/\//.test(decoded) || decoded.startsWith('javascript:')))
                return '';
            if (tag === 'img' && ['dynsrc', 'lowsrc'].includes(name))
                return '';
            if (tag === 'span' && name === 'class' && value === 'wr')
                return '';
            return undefined;
        }
    });
}
exports.sanitizeHtml = sanitizeHtml;
//# sourceMappingURL=sanitize-html.method.js.map