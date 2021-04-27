"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iframe = void 0;
var consts_1 = require("../consts");
var helper_1 = require("./helper");
function iframe(el) {
    var _a;
    var src = el.getAttribute('src');
    if (!src) {
        el.parentNode.removeChild(el);
        return;
    }
    // Youtube
    if (src.match(/^(https?:)?\/\/www.youtube.com\/embed\/.*/i)) {
        // strip query string (yt: autoplay=1,controls=0,showinfo=0, etc)
        var s = src.replace(/\?.+$/, '');
        el.setAttribute('src', helper_1.youtubeEmbedSrc(s));
        return;
    }
    // Vimeo
    var m = src.match(/https:\/\/player\.vimeo\.com\/video\/([0-9]+)/);
    if (m && m.length === 2) {
        var s = "https://player.vimeo.com/video/" + m[1];
        el.setAttribute('src', s);
        return;
    }
    // Twitch
    if (src.match(/^(https?:)?\/\/player.twitch.tv\/.*/i)) {
        var parentDomain = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.hostname) || 'ecency.com';
        var s = src + "&parent=" + parentDomain + "&autoplay=false";
        el.setAttribute('src', s);
        return;
    }
    // 3Speak
    if (src.match(/^(https?:)?\/\/3speak.online\/embed\?.*/i)) {
        var s = src + "&autoplay=true";
        el.setAttribute('src', s);
        return;
    }
    // Spotify
    if (src.match(/^https:\/\/open\.spotify\.com\/(embed|embed-podcast)\/(playlist|show|episode|track|album)\/(.*)/i)) {
        el.setAttribute('src', src);
        el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
        el.setAttribute('frameborder', '0');
        return;
    }
    // Soundcloud
    if (src.match(/^https:\/\/w.soundcloud.com\/player\/.*/i)) {
        var match = src.match(/url=(.+?)&/);
        if (match && match.length === 2) {
            var s = "https://w.soundcloud.com/player/?url=" + match[1] + "&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true";
            el.setAttribute('src', s);
            return;
        }
    }
    // Dapplr
    if (src.match(consts_1.DAPPLR_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('sandbox', '');
        el.setAttribute('frameborder', '0');
        el.setAttribute('allowfullscreen', 'true');
        return;
    }
    // LBRY.tv
    if (src.match(consts_1.LBRY_REGEX)) {
        el.setAttribute('src', src);
        el.setAttribute('frameborder', '0');
        return;
    }
    // archive.org
    if (src.match(consts_1.ARCH_REGEX)) {
        el.setAttribute('src', src);
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