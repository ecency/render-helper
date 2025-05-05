"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.img = void 0;
var proxify_image_src_1 = require("../proxify-image-src");
function img(el, webp) {
    var _a;
    el.removeAttribute("width");
    el.removeAttribute("height");
    var src = el.getAttribute("src");
    if (src.startsWith("javascript")) {
        src = "";
    }
    el.setAttribute("itemprop", "image");
    var hasAlreadyProxied = ((_a = el.getAttribute("src")) === null || _a === void 0 ? void 0 : _a.startsWith("https://images.ecency.com")) === true;
    if (el.getAttribute("class").indexOf("no-replace") === -1 &&
        !hasAlreadyProxied) {
        el.setAttribute("src", (0, proxify_image_src_1.proxifyImageSrc)(src, 0, 0, webp ? "webp" : "match"));
    }
}
exports.img = img;
//# sourceMappingURL=img.method.js.map