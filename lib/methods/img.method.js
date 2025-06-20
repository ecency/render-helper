"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.img = void 0;
var proxify_image_src_1 = require("../proxify-image-src");
function img(el, webp) {
    el.removeAttribute("width");
    el.removeAttribute("height");
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
    ["onerror", "dynsrc", "lowsrc"].forEach(function (attr) { return el.removeAttribute(attr); });
    el.setAttribute("itemprop", "image");
    var cls = el.getAttribute("class") || "";
    var shouldReplace = !cls.includes("no-replace");
    var hasAlreadyProxied = src.startsWith("https://images.ecency.com");
    if (shouldReplace && !hasAlreadyProxied) {
        var proxified = (0, proxify_image_src_1.proxifyImageSrc)(src, 0, 0, webp ? "webp" : "match");
        el.setAttribute("src", proxified);
    }
}
exports.img = img;
//# sourceMappingURL=img.method.js.map