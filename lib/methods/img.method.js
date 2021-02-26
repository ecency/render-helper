"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.img = void 0;
var proxify_image_src_1 = require("../proxify-image-src");
function img(el, webp) {
    el.removeAttribute('width');
    el.removeAttribute('height');
    var src = el.getAttribute('src');
    if (src.startsWith('javascript')) {
        src = '';
    }
    el.setAttribute('itemprop', 'image');
    if (el.getAttribute('class').indexOf('no-replace') === -1) {
        el.setAttribute('src', proxify_image_src_1.proxifyImageSrc(src, 0, 0, webp ? 'webp' : 'match'));
    }
}
exports.img = img;
//# sourceMappingURL=img.method.js.map