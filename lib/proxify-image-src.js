"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxifyImageSrc = exports.getLatestUrl = exports.extractPHash = exports.setProxyBase = void 0;
var multihashes_1 = __importDefault(require("multihashes"));
var querystring_1 = __importDefault(require("querystring"));
var proxyBase = 'https://images.ecency.com';
function setProxyBase(p) {
    proxyBase = p;
}
exports.setProxyBase = setProxyBase;
function extractPHash(url) {
    if (url.startsWith(proxyBase + "/p/")) {
        var hash = url.split('/p/')[1].split('?')[0];
        return hash.replace(/.webp/, '').replace(/.png/, '');
    }
    return null;
}
exports.extractPHash = extractPHash;
function getLatestUrl(str) {
    var last = __spreadArray([], str.replace(/https?:\/\//g, '\n$&').trim().split('\n')).reverse()[0];
    return last;
}
exports.getLatestUrl = getLatestUrl;
function proxifyImageSrc(url, width, height, format) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    if (format === void 0) { format = 'match'; }
    if (!url || typeof url !== 'string') {
        return '';
    }
    // skip images already proxified with images.hive.blog
    if (url.indexOf('https://images.hive.blog/') === 0 && url.indexOf('https://images.hive.blog/D') !== 0) {
        return url.replace('https://images.hive.blog', proxyBase);
    }
    if (url.indexOf('https://steemitimages.com/') === 0 && url.indexOf('https://steemitimages.com/D') !== 0) {
        return url.replace('https://steemitimages.com', proxyBase);
    }
    var realUrl = getLatestUrl(url);
    var pHash = extractPHash(realUrl);
    var options = {
        format: format,
        mode: 'fit',
    };
    if (width > 0) {
        options.width = width;
    }
    if (height > 0) {
        options.height = height;
    }
    var qs = querystring_1.default.stringify(options);
    if (pHash) {
        return proxyBase + "/p/" + pHash + (format === 'webp' ? '.webp' : '.png') + "?" + qs;
    }
    var b58url = multihashes_1.default.toB58String(Buffer.from(realUrl.toString()));
    return proxyBase + "/p/" + b58url + (format === 'webp' ? '.webp' : '.png') + "?" + qs;
}
exports.proxifyImageSrc = proxifyImageSrc;
//# sourceMappingURL=proxify-image-src.js.map