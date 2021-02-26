"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkify = void 0;
var consts_1 = require("../consts");
var proxify_image_src_1 = require("../proxify-image-src");
function linkify(content, forApp, webp) {
    // Tags
    content = content.replace(/(^|\s|>)(#[-a-z\d]+)/gi, function (tag) {
        if (/#[\d]+$/.test(tag))
            return tag; // do not allow only numbers (like #1)
        var preceding = /^\s|>/.test(tag) ? tag[0] : ''; // space or closing tag (>)
        tag = tag.replace('>', ''); // remove closing tag
        var tag2 = tag.trim().substring(1);
        var tagLower = tag2.toLowerCase();
        var attrs = forApp ? "data-tag=\"" + tagLower + "\"" : "href=\"/trending/" + tagLower + "\"";
        return preceding + "<a class=\"markdown-tag-link\" " + attrs + ">" + tag.trim() + "</a>";
    });
    // User mentions
    content = content.replace(/(^|[^a-zA-Z0-9_!#$%&*@＠/]|(^|[^a-zA-Z0-9_+~.-/]))[@＠]([a-z][-.a-z\d]+[a-z\d])/gi, function (match, preceeding1, preceeding2, user) {
        var userLower = user.toLowerCase();
        var preceedings = (preceeding1 || '') + (preceeding2 || '');
        var attrs = forApp ? "data-author=\"" + userLower + "\"" : "href=\"/@" + userLower + "\"";
        return preceedings + "<a class=\"markdown-author-link\" " + attrs + ">@" + user + "</a>";
    });
    // Image links
    content = content.replace(consts_1.IMG_REGEX, function (imglink) {
        var attrs = forApp ? "data-href=\"" + imglink + "\" class=\"markdown-img-link\" src=\"" + proxify_image_src_1.proxifyImageSrc(imglink, 0, 0, webp ? 'webp' : 'match') + "\"" : "class=\"markdown-img-link\" src=\"" + proxify_image_src_1.proxifyImageSrc(imglink, 0, 0, webp ? 'webp' : 'match') + "\"";
        return "<img " + attrs + "/>";
    });
    return content;
}
exports.linkify = linkify;
//# sourceMappingURL=linkify.method.js.map