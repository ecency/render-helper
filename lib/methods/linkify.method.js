"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkify = void 0;
var consts_1 = require("../consts");
var proxify_image_src_1 = require("../proxify-image-src");
var helper_1 = require("../helper");
function linkify(content, forApp, webp) {
    // Tags
    content = content.replace(/(^|\s|>)(#[-a-z\d]+)/gi, function (tag) {
        if (/#[\d]+$/.test(tag))
            return tag; // do not allow only numbers (like #1)
        var preceding = /^\s|>/.test(tag) ? tag[0] : ''; // space or closing tag (>)
        tag = tag.replace('>', ''); // remove closing tag
        var tag2 = tag.trim().substring(1);
        var tagLower = tag2.toLowerCase();
        var attrs = forApp ? "data-tag=\"".concat(tagLower, "\"") : "href=\"/trending/".concat(tagLower, "\"");
        return "".concat(preceding, "<a class=\"markdown-tag-link\" ").concat(attrs, ">").concat(tag.trim(), "</a>");
    });
    // User mentions
    content = content.replace(/(^|[^a-zA-Z0-9_!#$%&*@＠/]|(^|[^a-zA-Z0-9_+~.-/]))[@＠]([a-z][-.a-z\d^/]+[a-z\d])/gi, function (match, preceeding1, preceeding2, user) {
        var userLower = user.toLowerCase();
        var preceedings = (preceeding1 || '') + (preceeding2 || '');
        if (userLower.indexOf('/') === -1) {
            var attrs = forApp ? "data-author=\"".concat(userLower, "\"") : "href=\"/@".concat(userLower, "\"");
            return "".concat(preceedings, "<a class=\"markdown-author-link\" ").concat(attrs, ">@").concat(user, "</a>");
        }
        else {
            return match;
        }
    });
    // internal links
    content = content.replace(/((^|\s)(\/|)@[\w.\d-]+)\/(\S+)/gi, function (match, u, p1, p2, p3) {
        var uu = u.trim().toLowerCase().replace('/@', '').replace('@', '');
        var permlink = p3;
        if (!(0, helper_1.isValidPermlink)(permlink))
            return match;
        if (consts_1.SECTION_LIST.some(function (v) { return p3.includes(v); })) {
            var attrs = forApp ? "https://ecency.com/@".concat(uu, "/").concat(permlink) : "href=\"/@".concat(uu, "/").concat(permlink, "\"");
            return " <a class=\"markdown-profile-link\" ".concat(attrs, ">@").concat(uu, "/").concat(permlink, "</a>");
        }
        else {
            var attrs = forApp ? "data-author=\"".concat(uu, "\" data-tag=\"post\" data-permlink=\"").concat(permlink, "\"") : "href=\"/post/@".concat(uu, "/").concat(permlink, "\"");
            return " <a class=\"markdown-post-link\" ".concat(attrs, ">@").concat(uu, "/").concat(permlink, "</a>");
        }
    });
    // Image links
    content = content.replace(consts_1.IMG_REGEX, function (imglink) {
        var attrs = forApp ? "data-href=\"".concat(imglink, "\" class=\"markdown-img-link\" src=\"").concat((0, proxify_image_src_1.proxifyImageSrc)(imglink, 0, 0, webp ? 'webp' : 'match'), "\"") : "class=\"markdown-img-link\" src=\"".concat((0, proxify_image_src_1.proxifyImageSrc)(imglink, 0, 0, webp ? 'webp' : 'match'), "\"");
        return "<img ".concat(attrs, "/>");
    });
    return content;
}
exports.linkify = linkify;
//# sourceMappingURL=linkify.method.js.map