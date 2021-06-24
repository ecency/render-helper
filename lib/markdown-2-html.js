"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdown2Html = void 0;
var helper_1 = require("./helper");
var methods_1 = require("./methods");
var cache_1 = require("./cache");
function markdown2Html(obj, forApp, webp) {
    if (forApp === void 0) { forApp = true; }
    if (webp === void 0) { webp = false; }
    if (typeof obj === "string") {
        obj = methods_1.cleanReply(obj);
        var html = methods_1.markdownToHTML(obj, forApp, webp);
        return html;
    }
    var key = helper_1.makeEntryCacheKey(obj) + "-md" + (webp ? "-webp" : "");
    var item = cache_1.cacheGet(key);
    if (item) {
        return item;
    }
    obj.body = methods_1.cleanReply(obj.body);
    var res = methods_1.markdownToHTML(obj.body, forApp, webp);
    cache_1.cacheSet(key, res);
    return res;
}
exports.markdown2Html = markdown2Html;
//# sourceMappingURL=markdown-2-html.js.map