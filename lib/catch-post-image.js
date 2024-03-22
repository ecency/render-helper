"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchPostImage = void 0;
var proxify_image_src_1 = require("./proxify-image-src");
var markdown_2_html_1 = require("./markdown-2-html");
var helper_1 = require("./helper");
var cache_1 = require("./cache");
var gifLinkRegex = /\.(gif)$/i;
function isGifLink(link) {
    return gifLinkRegex.test(link);
}
function getImage(entry, width, height, format) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    if (format === void 0) { format = 'match'; }
    /*
    * Return from json metadata if exists
    * */
    var meta;
    if (typeof entry.json_metadata === 'object') {
        meta = entry.json_metadata;
    }
    else {
        try {
            meta = JSON.parse(entry.json_metadata);
        }
        catch (e) {
            meta = null;
        }
    }
    if (meta && meta.image && !!meta.image.length && meta.image[0]) {
        if (isGifLink(meta.image[0])) {
            return proxify_image_src_1.proxifyImageSrc(meta.image[0], 0, 0, format);
        }
        return proxify_image_src_1.proxifyImageSrc(meta.image[0], width, height, format);
    }
    // try to find first image from post body
    var html = markdown_2_html_1.markdown2Html(entry);
    var doc = helper_1.createDoc(html);
    if (!doc) {
        return null;
    }
    var imgEls = doc.getElementsByTagName('img');
    if (imgEls.length >= 1) {
        var src = imgEls[0].getAttribute('src');
        if (isGifLink(src)) {
            return proxify_image_src_1.proxifyImageSrc(src, 0, 0, format);
        }
        return proxify_image_src_1.proxifyImageSrc(src, width, height, format);
    }
    return null;
}
function catchPostImage(obj, width, height, format) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    if (format === void 0) { format = 'match'; }
    if (typeof obj === 'string') {
        return getImage(obj, width, height, format);
    }
    var key = helper_1.makeEntryCacheKey(obj) + "-" + width + "x" + height + "-" + format;
    var item = cache_1.cacheGet(key);
    if (item) {
        return item;
    }
    var res = getImage(obj, width, height, format);
    cache_1.cacheSet(key, res);
    return res;
}
exports.catchPostImage = catchPostImage;
//# sourceMappingURL=catch-post-image.js.map