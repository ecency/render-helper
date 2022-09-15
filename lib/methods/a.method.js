"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var consts_1 = require("../consts");
var get_inner_html_method_1 = require("./get-inner-html.method");
var proxify_image_src_1 = require("../proxify-image-src");
var remove_child_nodes_method_1 = require("./remove-child-nodes.method");
var helper_1 = require("../helper");
function a(el, forApp, webp) {
    var href = el.getAttribute('href');
    // Continue if href has no value
    if (!href) {
        return;
    }
    var className = el.getAttribute('class');
    // Don't touch user and hashtag links
    if (['markdown-author-link', 'markdown-tag-link'].indexOf(className) !== -1) {
        return;
    }
    // Do not allow js hrefs
    if (href.startsWith('javascript')) {
        el.removeAttribute('href');
        return;
    }
    // if href is an image url and innerHTML same with href then mark it as image
    // & => &amp; can break equality
    if (href.match(consts_1.IMG_REGEX) &&
        href.trim().replace(/&amp;/g, '&') ===
            get_inner_html_method_1.getSerializedInnerHTML(el).trim().replace(/&amp;/g, '&')) {
        var attrs = forApp ? "data-href=\"" + href + "\" class=\"markdown-img-link\" src=\"" + proxify_image_src_1.proxifyImageSrc(href, 0, 0, webp ? 'webp' : 'match') + "\"" : "class=\"markdown-img-link\" src=\"" + proxify_image_src_1.proxifyImageSrc(href, 0, 0, webp ? 'webp' : 'match') + "\"";
        var replaceNode = consts_1.DOMParser.parseFromString("<img " + attrs + "/>");
        el.parentNode.replaceChild(replaceNode, el);
        return;
    }
    if (href.match(consts_1.IPFS_REGEX) &&
        href.trim().replace(/&amp;/g, '&') ===
            get_inner_html_method_1.getSerializedInnerHTML(el).trim().replace(/&amp;/g, '&') &&
        href.indexOf('#') === -1) {
        if (forApp) {
            el.setAttribute('data-href', href);
            el.removeAttribute('href');
        }
        el.setAttribute('class', 'markdown-img-link');
        remove_child_nodes_method_1.removeChildNodes(el);
        var img = el.ownerDocument.createElement('img');
        img.setAttribute('src', href);
        el.appendChild(img);
        return;
    }
    // If a hive post
    var postMatch = href.match(consts_1.POST_REGEX);
    if (postMatch && consts_1.WHITE_LIST.includes(postMatch[1].replace(/www./, ''))) {
        el.setAttribute('class', 'markdown-post-link');
        var tag = postMatch[2];
        var author = postMatch[3].replace('@', '');
        var permlink = postMatch[4];
        if (el.textContent === href) {
            el.textContent = "@" + author + "/" + permlink;
        }
        if (forApp) {
            el.removeAttribute('href');
            el.setAttribute('data-tag', tag);
            el.setAttribute('data-author', author);
            el.setAttribute('data-permlink', permlink);
        }
        else {
            var h = "/" + tag + "/@" + author + "/" + permlink;
            el.setAttribute('href', h);
        }
        return;
    }
    // If a hive user with url
    var mentionMatch = href.match(consts_1.MENTION_REGEX);
    if (mentionMatch && consts_1.WHITE_LIST.includes(mentionMatch[1].replace(/www./, '')) && mentionMatch.length === 3) {
        el.setAttribute('class', 'markdown-author-link');
        var author = mentionMatch[2].replace('@', '').toLowerCase();
        if (author.indexOf('/') === -1) {
            if (el.textContent === href) {
                el.textContent = "@" + author;
            }
            if (forApp) {
                el.removeAttribute('href');
                el.setAttribute('data-author', author);
            }
            else {
                var h = "/@" + author;
                el.setAttribute('href', h);
            }
        }
        return;
    }
    // If a tagged post and profile section links
    var tpostMatch = href.match(consts_1.INTERNAL_POST_TAG_REGEX);
    if ((tpostMatch && tpostMatch.length === 4 && consts_1.WHITE_LIST.some(function (v) { return tpostMatch[1].includes(v); })) || (tpostMatch && tpostMatch.length === 4 && tpostMatch[1].indexOf('/') == 0)) {
        // check if permlink is section or section with params ?q=xyz
        if (consts_1.SECTION_LIST.some(function (v) { return tpostMatch[3].includes(v); })) {
            el.setAttribute('class', 'markdown-profile-link');
            var author = tpostMatch[2].replace('@', '').toLowerCase();
            var section = tpostMatch[3];
            if (el.textContent === href) {
                el.textContent = "@" + author + "/" + section;
            }
            if (forApp) {
                var ha = "https://ecency.com/@" + author + "/" + section;
                el.setAttribute('href', ha);
            }
            else {
                var h = "/@" + author + "/" + section;
                el.setAttribute('href', h);
            }
            return;
        }
        else {
            // check if domain is not whitelist and does contain dot (not tag e.g. `/ecency`)
            if (tpostMatch[1] && tpostMatch[1].includes('.') && !consts_1.WHITE_LIST.some(function (v) { return tpostMatch[1].includes(v); })) {
                return;
            }
            var tag = 'post';
            // check if tag does exist and doesn't include dot likely word/tag
            if (tpostMatch[1] && !tpostMatch[1].includes('.')) {
                tag = tpostMatch[1];
                tag = tag.replace('/', '');
            }
            el.setAttribute('class', 'markdown-post-link');
            var author = tpostMatch[2].replace('@', '');
            var permlink = tpostMatch[3];
            if (el.textContent === href) {
                el.textContent = "@" + author + "/" + permlink;
            }
            if (forApp) {
                el.removeAttribute('href');
                el.setAttribute('data-tag', tag);
                el.setAttribute('data-author', author);
                el.setAttribute('data-permlink', permlink);
            }
            else {
                var h = "/" + tag + "/@" + author + "/" + permlink;
                el.setAttribute('href', h);
            }
            return;
        }
    }
    // If a hive user with internal url
    var imentionMatch = href.match(consts_1.INTERNAL_MENTION_REGEX);
    if (imentionMatch) {
        el.setAttribute('class', 'markdown-author-link');
        var author = imentionMatch[0].replace('/@', '').toLowerCase();
        if (author.indexOf('/') === -1) {
            if (el.textContent === href) {
                el.textContent = "@" + author;
            }
            if (forApp) {
                el.removeAttribute('href');
                el.setAttribute('data-author', author);
            }
            else {
                var h = "/@" + author;
                el.setAttribute('href', h);
            }
        }
        return;
    }
    // If a copied post and profile section links
    var cpostMatch = href.match(consts_1.INTERNAL_POST_REGEX);
    if ((cpostMatch && cpostMatch.length === 3 && cpostMatch[1].indexOf('@') === 0)) {
        if (consts_1.SECTION_LIST.some(function (v) { return cpostMatch[2].includes(v); })) {
            el.setAttribute('class', 'markdown-profile-link');
            var author = cpostMatch[1].replace('@', '').toLowerCase();
            var section = cpostMatch[2];
            if (el.textContent === href) {
                el.textContent = "@" + author + "/" + section;
            }
            if (forApp) {
                var ha = "https://ecency.com/@" + author + "/" + section;
                el.setAttribute('href', ha);
            }
            else {
                var h = "/@" + author + "/" + section;
                el.setAttribute('href', h);
            }
            return;
        }
        else {
            el.setAttribute('class', 'markdown-post-link');
            var tag = 'post';
            var author = cpostMatch[1].replace('@', '');
            var permlink = cpostMatch[2];
            if (el.textContent === href) {
                el.textContent = "@" + author + "/" + permlink;
            }
            if (forApp) {
                el.removeAttribute('href');
                el.setAttribute('data-tag', tag);
                el.setAttribute('data-author', author);
                el.setAttribute('data-permlink', permlink);
            }
            else {
                var h = "/" + tag + "/@" + author + "/" + permlink;
                el.setAttribute('href', h);
            }
            return;
        }
    }
    // If topic with filters url
    var topicMatch = href.match(consts_1.TOPIC_REGEX);
    if (topicMatch && consts_1.WHITE_LIST.includes(topicMatch[1].replace(/www./, '')) && topicMatch.length === 4) {
        el.setAttribute('class', 'markdown-tag-link');
        var filter = topicMatch[2];
        var tag = topicMatch[3];
        if (el.textContent === href) {
            el.textContent = "/" + filter + "/" + tag;
        }
        if (forApp) {
            el.removeAttribute('href');
            el.setAttribute('data-filter', filter);
            el.setAttribute('data-tag', tag);
        }
        else {
            var h = "/" + filter + "/" + tag;
            el.setAttribute('href', h);
        }
        return;
    }
    // If topic with filters internal url
    var itopicMatch = href.match(consts_1.INTERNAL_TOPIC_REGEX);
    if (itopicMatch && itopicMatch.length === 3) {
        el.setAttribute('class', 'markdown-tag-link');
        var filter = itopicMatch[1];
        var tag = itopicMatch[2];
        if (el.textContent === href) {
            el.textContent = "/" + filter + "/" + tag;
        }
        if (forApp) {
            el.removeAttribute('href');
            el.setAttribute('data-filter', filter);
            el.setAttribute('data-tag', tag);
        }
        else {
            var h = "/" + filter + "/" + tag;
            el.setAttribute('href', h);
        }
        return;
    }
    // If a custom hive community link
    var comMatch = href.match(consts_1.CUSTOM_COMMUNITY_REGEX);
    if (comMatch && consts_1.WHITE_LIST.includes(comMatch[1])) {
        el.setAttribute('class', 'markdown-community-link');
        var community = comMatch[2];
        var filter = comMatch[3].substring(1);
        if (!filter)
            filter = 'created';
        if (filter === 'about' || filter === 'discord') {
            filter = 'created';
        }
        if (el.textContent === href) {
            el.textContent = filter + "/" + community;
        }
        if (forApp) {
            el.removeAttribute('href');
            el.setAttribute('data-community', community);
            el.setAttribute('data-filter', filter);
        }
        else {
            var h = "/" + filter + "/" + community;
            el.setAttribute('href', h);
        }
        return;
    }
    // If a collections post
    var cccMatch = href.match(consts_1.CCC_REGEX);
    if (cccMatch && consts_1.WHITE_LIST.includes(cccMatch[1])) {
        el.setAttribute('class', 'markdown-post-link');
        var tag = 'ccc';
        var author = cccMatch[2].replace('@', '');
        var permlink = cccMatch[3];
        if (el.textContent === href) {
            el.textContent = "@" + author + "/" + permlink;
        }
        if (forApp) {
            el.removeAttribute('href');
            el.setAttribute('data-tag', tag);
            el.setAttribute('data-author', author);
            el.setAttribute('data-permlink', permlink);
        }
        else {
            var h = "/" + tag + "/@" + author + "/" + permlink;
            el.setAttribute('href', h);
        }
        return;
    }
    var BCmatch = href.match(consts_1.BITCHUTE_REGEX);
    if (BCmatch && el.textContent.trim() === href) {
        var e = consts_1.BITCHUTE_REGEX.exec(href);
        var vid = e[1];
        el.setAttribute('class', 'markdown-video-link');
        el.removeAttribute('href');
        var embedSrc = "https://www.bitchute.com/embed/" + vid + "/";
        el.textContent = '';
        el.setAttribute('data-embed-src', embedSrc);
        var play = el.ownerDocument.createElement('span');
        play.setAttribute('class', 'markdown-video-play');
        el.appendChild(play);
        return;
    }
    var RBmatch = href.match(consts_1.RUMBLE_REGEX);
    if (RBmatch && el.textContent.trim() === href) {
        var e = consts_1.RUMBLE_REGEX.exec(href);
        if (e[1]) {
            var vid = e[1];
            var embedSrc = "https://www.rumble.com/embed/" + vid + "/?pub=4";
            el.setAttribute('class', 'markdown-video-link');
            el.removeAttribute('href');
            el.textContent = '';
            el.setAttribute('data-embed-src', embedSrc);
            var play = el.ownerDocument.createElement('span');
            play.setAttribute('class', 'markdown-video-play');
            el.appendChild(play);
            return;
        }
    }
    var BNmatch = href.match(consts_1.BRIGHTEON_REGEX);
    if (BNmatch && el.textContent.trim() === href) {
        var e = consts_1.BRIGHTEON_REGEX.exec(href);
        if (e[2]) {
            var vid = e[2];
            var embedSrc = "https://www.brighteon.com/embed/" + vid;
            el.setAttribute('class', 'markdown-video-link');
            el.removeAttribute('href');
            el.textContent = '';
            el.setAttribute('data-embed-src', embedSrc);
            var play = el.ownerDocument.createElement('span');
            play.setAttribute('class', 'markdown-video-play');
            el.appendChild(play);
            return;
        }
    }
    // If a youtube video
    var match = href.match(consts_1.YOUTUBE_REGEX);
    if (match && el.textContent.trim() === href) {
        var e = consts_1.YOUTUBE_REGEX.exec(href);
        if (e[1]) {
            el.setAttribute('class', 'markdown-video-link markdown-video-link-youtube');
            el.removeAttribute('href');
            var vid = e[1];
            var thumbnail = proxify_image_src_1.proxifyImageSrc("https://img.youtube.com/vi/" + vid.split('?')[0] + "/hqdefault.jpg", 0, 0, webp ? 'webp' : 'match');
            var embedSrc = "https://www.youtube.com/embed/" + vid + "?autoplay=1";
            el.textContent = '';
            el.setAttribute('data-embed-src', embedSrc);
            el.setAttribute('data-youtube', vid);
            //extract start time if available
            var startTime = helper_1.extractYtStartTime(href);
            if (startTime) {
                el.setAttribute('data-start-time', startTime);
            }
            var thumbImg = el.ownerDocument.createElement('img');
            thumbImg.setAttribute('class', 'no-replace video-thumbnail');
            thumbImg.setAttribute('itemprop', 'thumbnailUrl');
            thumbImg.setAttribute('src', thumbnail);
            var play = el.ownerDocument.createElement('span');
            play.setAttribute('class', 'markdown-video-play');
            el.appendChild(thumbImg);
            el.appendChild(play);
            return;
        }
    }
    // If vimeo video
    match = href.match(consts_1.VIMEO_REGEX);
    if (match && href === el.textContent) {
        var e = consts_1.VIMEO_REGEX.exec(href);
        if (e[3]) {
            el.setAttribute('class', 'markdown-video-link markdown-video-link-vimeo');
            el.removeAttribute('href');
            var embedSrc = "https://player.vimeo.com/video/" + e[3];
            el.textContent = '';
            var ifr = el.ownerDocument.createElement('iframe');
            ifr.setAttribute('frameborder', '0');
            ifr.setAttribute('allowfullscreen', 'true');
            ifr.setAttribute('src', embedSrc);
            el.appendChild(ifr);
            return;
        }
    }
    // If twitch video
    match = href.match(consts_1.TWITCH_REGEX);
    if (match && href === el.textContent) {
        var e = consts_1.TWITCH_REGEX.exec(href);
        if (e[2]) {
            el.setAttribute('class', 'markdown-video-link markdown-video-link-twitch');
            el.removeAttribute('href');
            var embedSrc = '';
            if (e[1] === undefined) {
                embedSrc = "https://player.twitch.tv/?channel=" + e[2];
            }
            else {
                embedSrc = "https://player.twitch.tv/?video=" + e[1];
            }
            el.textContent = '';
            var ifr = el.ownerDocument.createElement('iframe');
            ifr.setAttribute('frameborder', '0');
            ifr.setAttribute('allowfullscreen', 'true');
            ifr.setAttribute('src', embedSrc);
            el.appendChild(ifr);
            return;
        }
    }
    // If a spotify audio
    match = href.match(consts_1.SPOTIFY_REGEX);
    if (match && el.textContent.trim() === href) {
        var e = consts_1.SPOTIFY_REGEX.exec(href);
        if (e[1]) {
            el.setAttribute('class', 'markdown-audio-link markdown-audio-link-spotify');
            el.removeAttribute('href');
            var embedSrc = "https://open.spotify.com/embed/playlist/" + e[1];
            el.textContent = '';
            var ifr = el.ownerDocument.createElement('iframe');
            ifr.setAttribute('frameborder', '0');
            ifr.setAttribute('allowfullscreen', 'true');
            ifr.setAttribute('src', embedSrc);
            ifr.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
            el.appendChild(ifr);
            return;
        }
    }
    // If a spotify audio
    match = href.match(consts_1.LOOM_REGEX);
    if (match && el.textContent.trim() === href) {
        var e = consts_1.LOOM_REGEX.exec(href);
        if (e[2]) {
            el.setAttribute('class', 'markdown-video-link markdown-video-link-loom');
            el.removeAttribute('href');
            var embedSrc = "https://www.loom.com/embed/" + e[2];
            el.textContent = '';
            var ifr = el.ownerDocument.createElement('iframe');
            ifr.setAttribute('frameborder', '0');
            ifr.setAttribute('allowfullscreen', 'true');
            ifr.setAttribute('src', embedSrc);
            ifr.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
            el.appendChild(ifr);
            return;
        }
    }
    // If a d.tube video
    match = href.match(consts_1.D_TUBE_REGEX);
    if (match) {
        // Only d.tube links contains an image
        var imgEls = el.getElementsByTagName('img');
        if (imgEls.length === 1 || el.textContent.trim() === href) {
            var e = consts_1.D_TUBE_REGEX.exec(href);
            // e[2] = username, e[3] object id
            if (e[2] && e[3]) {
                el.setAttribute('class', 'markdown-video-link markdown-video-link-dtube');
                el.removeAttribute('href');
                var videoHref = "https://emb.d.tube/#!/" + e[2] + "/" + e[3];
                // el.setAttribute('data-video-href', videoHref)
                el.setAttribute('data-embed-src', videoHref);
                //process thumb img element 
                if (imgEls.length === 1) {
                    var thumbnail = proxify_image_src_1.proxifyImageSrc(imgEls[0].getAttribute('src').replace(/\s+/g, ''), 0, 0, webp ? 'webp' : 'match');
                    var thumbImg = el.ownerDocument.createElement('img');
                    thumbImg.setAttribute('class', 'no-replace video-thumbnail');
                    thumbImg.setAttribute('itemprop', 'thumbnailUrl');
                    thumbImg.setAttribute('src', thumbnail);
                    el.appendChild(thumbImg);
                    // Remove image.
                    el.removeChild(imgEls[0]);
                }
                else {
                    el.textContent = '';
                }
                var play = el.ownerDocument.createElement('span');
                play.setAttribute('class', 'markdown-video-play');
                el.appendChild(play);
                return;
            }
        }
    }
    match = href.match(consts_1.D_TUBE_REGEX2);
    if (match) {
        var e = consts_1.D_TUBE_REGEX2.exec(href);
        // e[2] = username, e[3] object id
        if (e[2] && e[3]) {
            el.setAttribute('class', 'markdown-video-link markdown-video-link-dtube');
            el.removeAttribute('href');
            el.textContent = '';
            var videoHref = "https://emb.d.tube/#!/" + e[2] + "/" + e[3];
            // el.setAttribute('data-video-href', videoHref);
            el.setAttribute('data-embed-src', videoHref);
            var play = el.ownerDocument.createElement('span');
            play.setAttribute('class', 'markdown-video-play');
            el.appendChild(play);
            return;
        }
    }
    // Detect 3Speak
    match = href.match(consts_1.SPEAK_REGEX);
    if (match) {
        var imgEls = el.getElementsByTagName('img');
        if (imgEls.length === 1 || el.textContent.trim() === href) {
            var e = consts_1.SPEAK_REGEX.exec(href);
            // e[1] = tld , e[3] = embed address
            if (e[1] && e[3]) {
                var videoHref = "https://3speak." + e[1] + "/embed?v=" + e[3];
                el.setAttribute('class', 'markdown-video-link markdown-video-link-speak');
                el.removeAttribute('href');
                el.setAttribute('data-embed-src', videoHref);
                if (el.textContent.trim() === href) {
                    el.textContent = '';
                }
                if (imgEls.length === 1) {
                    var thumbnail = proxify_image_src_1.proxifyImageSrc(imgEls[0].getAttribute('src').replace(/\s+/g, ''), 0, 0, webp ? 'webp' : 'match');
                    var thumbImg = el.ownerDocument.createElement('img');
                    thumbImg.setAttribute('class', 'no-replace video-thumbnail');
                    thumbImg.setAttribute('itemprop', 'thumbnailUrl');
                    thumbImg.setAttribute('src', thumbnail);
                    el.appendChild(thumbImg);
                    // Remove image.
                    el.removeChild(imgEls[0]);
                }
                var play = el.ownerDocument.createElement('span');
                play.setAttribute('class', 'markdown-video-play');
                el.appendChild(play);
                return;
            }
        }
    }
    // If tweets
    var matchT = href.match(consts_1.TWITTER_REGEX);
    if (matchT && el.textContent.trim() === href) {
        var e = consts_1.TWITTER_REGEX.exec(href);
        if (e) {
            var url = e[0].replace(/(<([^>]+)>)/gi, '');
            var author = e[1].replace(/(<([^>]+)>)/gi, '');
            var twitterCode = "<blockquote class=\"twitter-tweet\"><p>" + url + "</p>- <a href=\"" + url + "\">" + author + "</a></blockquote>";
            var replaceNode = consts_1.DOMParser.parseFromString(twitterCode);
            el.parentNode.replaceChild(replaceNode, el);
            return;
        }
    }
    if (href.indexOf('https://hivesigner.com/sign/account-witness-vote?witness=') === 0 && forApp) {
        el.setAttribute('class', 'markdown-witnesses-link');
        el.setAttribute('data-href', href);
        el.removeAttribute('href');
        return;
    }
    if (href.indexOf('hivesigner.com/sign/update-proposal-votes?proposal_ids') > 0 && forApp) {
        var m = decodeURI(href).match(/proposal_ids=\[(\d+)]/);
        if (m) {
            el.setAttribute('class', 'markdown-proposal-link');
            el.setAttribute('data-href', href);
            el.setAttribute('data-proposal', m[1]);
            el.removeAttribute('href');
            return;
        }
    }
    // If nothing matched element as external link so it will be opened in external window
    el.setAttribute('class', 'markdown-external-link');
    // Prepend https if no scheme provided
    if (!(/^((#)|(mailto:)|(\/(?!\/))|(((steem|hive|esteem|ecency|https?):)?\/\/))/.test(href))) {
        href = "https://" + href;
    }
    if (forApp) {
        el.setAttribute('data-href', href);
        var match_1 = href.match(consts_1.YOUTUBE_REGEX);
        if (match_1) {
            var e = consts_1.YOUTUBE_REGEX.exec(href);
            if (e[1]) {
                var vid = e[1];
                el.setAttribute('data-youtube', vid);
                //extract start time if available
                var startTime = helper_1.extractYtStartTime(href);
                if (startTime) {
                    el.setAttribute('data-start-time', startTime);
                }
            }
        }
        el.removeAttribute('href');
    }
    else {
        var matchS = href.match(consts_1.SECTION_REGEX);
        if (matchS) {
            el.setAttribute('class', 'markdown-internal-link');
        }
        else {
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener');
        }
    }
}
exports.a = a;
//# sourceMappingURL=a.method.js.map