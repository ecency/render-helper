"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdown2AMP = void 0;
var helper_1 = require("./helper");
var methods_1 = require("./methods");
var cache_1 = require("./cache");
var cheerio_1 = __importDefault(require("cheerio"));
var AmpOptimizer = require("@ampproject/toolbox-optimizer");
function htmlToAMP(html, ampCallback, onlyBody) {
    var ampOptimizer = AmpOptimizer.create({
        markdown: true,
    });
    return new Promise(function (resolve) {
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
            ampCallback && ampCallback(onlyBody ? $("body").html() : $.html(), html);
            resolve(onlyBody ? $("body").html() : $.html());
        });
    });
}
function markdown2AMP(obj, forApp, webp, onlyBody) {
    if (forApp === void 0) { forApp = false; }
    if (webp === void 0) { webp = false; }
    if (onlyBody === void 0) { onlyBody = true; }
    if (typeof obj === "string") {
        obj = methods_1.cleanReply(obj);
        var html = methods_1.markdownToHTML(obj, forApp, webp);
        return htmlToAMP(html, null, onlyBody);
    }
    var key = helper_1.makeEntryCacheKey(obj) + "-md" + (webp ? "-webp" : "");
    var item = cache_1.cacheGet(key);
    if (item) {
        return Promise.resolve(item);
    }
    obj.body = methods_1.cleanReply(obj.body);
    var res = methods_1.markdownToHTML(obj.body, forApp, webp);
    var amp = htmlToAMP(res, null, onlyBody);
    cache_1.cacheSet(key, res);
    return amp;
}
exports.markdown2AMP = markdown2AMP;
//# sourceMappingURL=markdown-2-amp.js.map