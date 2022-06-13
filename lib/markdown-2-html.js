"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdown2Html = void 0;
var helper_1 = require("./helper");
var methods_1 = require("./methods");
var cache_1 = require("./cache");
function markdown2Html(obj, forApp, webp) {
    if (forApp === void 0) { forApp = true; }
    if (webp === void 0) { webp = false; }
    if (typeof obj === 'string') {
        obj = (0, methods_1.cleanReply)(obj);
        return (0, methods_1.markdownToHTML)(obj, forApp, webp);
    }
    var key = "".concat((0, helper_1.makeEntryCacheKey)(obj), "-md").concat(webp ? '-webp' : '');
    var item = (0, cache_1.cacheGet)(key);
    if (item) {
        return item;
    }
    obj.body = (0, methods_1.cleanReply)(obj.body);
    var res = (0, methods_1.markdownToHTML)(obj.body, forApp, webp);
    (0, cache_1.cacheSet)(key, res);
    return res;
}
exports.markdown2Html = markdown2Html;
//# sourceMappingURL=markdown-2-html.js.map