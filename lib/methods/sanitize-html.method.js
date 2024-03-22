"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeHtml = void 0;
var xss_1 = __importDefault(require("xss"));
var consts_1 = require("../consts");
function sanitizeHtml(html) {
    return xss_1.default(html, {
        whiteList: consts_1.ALLOWED_ATTRIBUTES,
        stripIgnoreTag: true,
        css: true,
        stripIgnoreTagBody: ['style'],
        onTagAttr: function (tag, name, value) {
            if (tag === 'span' && name === 'class' && value === 'wr') {
                return '';
            }
            if (tag === 'img' && name === 'src' && !/^https?:\/\//.test(value)) {
                return '';
            }
        }
    });
}
exports.sanitizeHtml = sanitizeHtml;
//# sourceMappingURL=sanitize-html.method.js.map