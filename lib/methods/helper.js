"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeEmbedSrc = void 0;
function youtubeEmbedSrc(s) {
    var u = new URL(s);
    return "" + u.origin + u.pathname + "?autoplay=1&autohide=1&enablejsapi=0&rel=0&origin=https://ecency.com&start=0";
}
exports.youtubeEmbedSrc = youtubeEmbedSrc;
//# sourceMappingURL=helper.js.map