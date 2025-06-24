"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImageHTML = exports.img = void 0;
var proxify_image_src_1 = require("../proxify-image-src");
function img(el, webp, state) {
    var src = el.getAttribute("src") || "";
    // Normalize encoded characters
    var decodedSrc = decodeURIComponent(src.replace(/&#(\d+);/g, function (_, dec) { return String.fromCharCode(dec); })
        .replace(/&#x([0-9a-f]+);/gi, function (_, hex) { return String.fromCharCode(parseInt(hex, 16)); })).trim().toLowerCase();
    // ❌ Remove if javascript or empty/invalid
    var isInvalid = !src || decodedSrc.startsWith("javascript") || decodedSrc.startsWith("vbscript") || decodedSrc === "x";
    if (isInvalid) {
        src = "";
    }
    // ❌ Skip relative paths (e.g., `photo.jpg`, `./photo.png`, `assets/pic.jpeg`)
    var isRelative = !/^https?:\/\//i.test(src) && !src.startsWith("/");
    if (isRelative) {
        //console.warn("Skipped relative image:", src);
        src = "";
    }
    // Sanitize any dynamic or low-res src-like attributes
    ["onerror", "dynsrc", "lowsrc", "width", "height"].forEach(function (attr) { return el.removeAttribute(attr); });
    el.setAttribute("itemprop", "image");
    var isLCP = state && !state.firstImageFound;
    if (isLCP) {
        el.setAttribute("loading", "eager");
        el.setAttribute("fetchpriority", "high");
        state.firstImageFound = true;
    }
    else {
        el.setAttribute("loading", "lazy");
        el.setAttribute("decoding", "async");
    }
    el.setAttribute("style", "max-width: 100%; height: auto;");
    var cls = el.getAttribute("class") || "";
    var shouldReplace = !cls.includes("no-replace");
    var hasAlreadyProxied = src.startsWith("https://images.ecency.com");
    if (shouldReplace && !hasAlreadyProxied) {
        var proxified = (0, proxify_image_src_1.proxifyImageSrc)(src, 0, 0, webp ? "webp" : "match");
        el.setAttribute("src", proxified);
    }
}
exports.img = img;
function createImageHTML(src, isLCP, webp) {
    var loading = isLCP ? 'eager' : 'lazy';
    var fetch = isLCP ? 'fetchpriority="high"' : 'decoding="async"';
    var proxified = (0, proxify_image_src_1.proxifyImageSrc)(src, 0, 0, webp ? 'webp' : 'match');
    return "<img\n    class=\"markdown-img-link\"\n    src=\"".concat(proxified, "\"\n    loading=\"").concat(loading, "\"\n    ").concat(fetch, "\n    style=\"max-width: 100%; height: auto;\"\n    itemprop=\"image\"\n  />");
}
exports.createImageHTML = createImageHTML;
//# sourceMappingURL=img.method.js.map