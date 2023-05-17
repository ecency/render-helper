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
            return (0, proxify_image_src_1.proxifyImageSrc)(meta.image[0], 0, 0, format);
        }
        return (0, proxify_image_src_1.proxifyImageSrc)(meta.image[0], width, height, format);
    }
    // try to find first image from post body
    var html = (0, markdown_2_html_1.markdown2Html)(entry);
    var doc = (0, helper_1.createDoc)(html);
    if (!doc) {
        return null;
    }
    var imgEls = doc.getElementsByTagName('img');
    if (imgEls.length >= 1) {
        var src = imgEls[0].getAttribute('src');
        if (isGifLink(src)) {
            return (0, proxify_image_src_1.proxifyImageSrc)(src, 0, 0, format);
        }
        return (0, proxify_image_src_1.proxifyImageSrc)(src, width, height, format);
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
    var key = "".concat((0, helper_1.makeEntryCacheKey)(obj), "-").concat(width, "x").concat(height, "-").concat(format);
    var item = (0, cache_1.cacheGet)(key);
    if (item) {
        return item;
    }
    var res = getImage(obj, width, height, format);
    (0, cache_1.cacheSet)(key, res);
    return res;
}
exports.catchPostImage = catchPostImage;
//# sourceMappingURL=catch-post-image.js.map