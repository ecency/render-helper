"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdown2Html = void 0;
var helper_1 = require("./helper");
var methods_1 = require("./methods");
var cache_1 = require("./cache");
var cheerio_1 = __importDefault(require("cheerio"));
var AmpOptimizer = require("@ampproject/toolbox-optimizer");
function htmlToAMP(html, ampCallback, onlyBody) {
    var ampOptimizer = AmpOptimizer.create({
        markdown: true,
    });
    ampOptimizer.transformHtml(html, { canonical: "." }).then(function (res) {
        var $ = cheerio_1.default.load(res);
        $("iframe")
            .get()
            .forEach(function (x) {
            $(x).replaceWith($("<a/>").attr("href", $(x).attr("src")).text("Open in new window"));
        });
        $("img")
            .get()
            .forEach(function (x) {
            $(x).replaceWith($("<amp-img/>")
                .attr("src", $(x).attr("src") || ".")
                .attr("width", "100")
                .attr("height", "100")
                .attr("layout", "responsive")
                .attr("alt", "Replaced Image"));
        });
        ampCallback(onlyBody ? $("body").html() : $.html(), html);
    });
}
function markdown2Html(obj, forApp, webp, amp, onlyBody, ampCallback) {
    if (forApp === void 0) { forApp = true; }
    if (webp === void 0) { webp = false; }
    if (amp === void 0) { amp = false; }
    if (onlyBody === void 0) { onlyBody = true; }
    if (ampCallback === void 0) { ampCallback = null; }
    if (typeof obj === "string") {
        obj = methods_1.cleanReply(obj);
        var html = methods_1.markdownToHTML(obj, forApp, webp);
        if (amp && ampCallback) {
            htmlToAMP(html, ampCallback, onlyBody);
        }
        return html;
    }
    var key = helper_1.makeEntryCacheKey(obj) + "-md" + (webp ? "-webp" : "");
    var item = cache_1.cacheGet(key);
    if (item) {
        return item;
    }
    obj.body = methods_1.cleanReply(obj.body);
    var res = methods_1.markdownToHTML(obj.body, forApp, webp);
    if (amp && ampCallback) {
        htmlToAMP(res, ampCallback, onlyBody);
    }
    cache_1.cacheSet(key, res);
    return res;
}
exports.markdown2Html = markdown2Html;
//# sourceMappingURL=markdown-2-html.js.map