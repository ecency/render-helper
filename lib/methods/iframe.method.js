"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iframe = void 0;
var consts_1 = require("../consts");
function iframe(el) {
    var src = el.getAttribute('src');
    if (!src) {
        el.parentNode.removeChild(el);
        return;
    }
    // Youtube
    if (src.match(consts_1.YOUTUBE_EMBED_REGEX)) {
        // strip query string (yt: autoplay=1,controls=0,showinfo=0, etc)
        var s = src.replace(/\?.+$/, '');
        el.setAttribute('src', s);
        return;
    }
    if (src.match(consts_1.BITCHUTE_REGEX)) {
        return;
    }
    // Vimeo
    var m = src.match(consts_1.VIMEO_EMBED_REGEX);
    if (m && m.length === 2) {
        var s = "https://player.vimeo.com/video/" + m[1];
        el.setAttribute('src', s);
        return;
    }
    // Twitch
    if (src.match(consts_1.TWITCH_EMBED_REGEX)) {
        var parentDomain = 'ecency.com';
        var s = src + "&parent=" + parentDomain + "&autoplay=false";
        el.setAttribute('src', s);
        return;
    }
    // 3Speak
    if (src.match(consts_1.SPEAK_EMBED_REGEX)) {
        var s = src + "&autoplay=true";
        el.setAttribute('src', s);
        return;
    }
    // Spotify
    if (src.match(consts_1.SPOTIFY_EMBED_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
        el.setAttribute('frameborder', '0');
        return;
    }
    // Soundcloud
    if (src.match(consts_1.SOUNDCLOUD_EMBED_REGEX)) {
        var match = src.match(/url=(.+?)&/);
        if (match && match.length === 2) {
            var s = "https://w.soundcloud.com/player/?url=" + match[1] + "&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true";
            el.setAttribute('src', s);
            return;
        }
    }
    // Dtube
    if (src.match(consts_1.D_TUBE_EMBED_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        el.setAttribute('frameborder', '0');
        el.setAttribute('allowfullscreen', 'true');
        return;
    }
    // VIMM
    if (src.match(consts_1.VIMM_EMBED_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
        el.setAttribute('frameborder', '0');
        el.setAttribute('allowfullscreen', 'true');
        return;
    }
    // Dapplr
    if (src.match(consts_1.DAPPLR_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        el.setAttribute('frameborder', '0');
        el.setAttribute('allowfullscreen', 'true');
        return;
    }
    // Truvvl
    if (src.match(consts_1.TRUVVL_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
        el.setAttribute('frameborder', '0');
        el.setAttribute('class', 'portrait-embed');
        el.setAttribute('allowfullscreen', 'true');
        return;
    }
    // LBRY.tv
    if (src.match(consts_1.LBRY_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('frameborder', '0');
        return;
    }
    // ODYSEE
    if (src.match(consts_1.ODYSEE_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('frameborder', '0');
        return;
    }
    // archive.org
    if (src.match(consts_1.ARCH_REGEX)) {
        el.setAttribute('src', src);
        return;
    }
    // Rumble
    if (src.match(consts_1.RUMBLE_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('frameborder', '0');
        return;
    }
    // Brigtheon
    if (src.match(consts_1.BRIGHTEON_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('frameborder', '0');
        return;
    }
    // Brandnew Tube
    if (src.match(consts_1.BRAND_NEW_TUBE_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('frameborder', '0');
        return;
    }
    var replaceNode = el.ownerDocument.createElement('div');
    replaceNode.setAttribute('class', 'unsupported-iframe');
    replaceNode.textContent = "(Unsupported " + src + ")";
    el.parentNode.insertBefore(replaceNode, el);
    el.parentNode.removeChild(el);
}
exports.iframe = iframe;
//# sourceMappingURL=iframe.method.js.map