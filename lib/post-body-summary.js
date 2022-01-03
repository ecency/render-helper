"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostBodySummary = void 0;
var he_1 = __importDefault(require("he"));
var helper_1 = require("./helper");
var cache_1 = require("./cache");
var methods_1 = require("./methods");
var Remarkable = require('remarkable').Remarkable;
var linkify = require('remarkable/linkify').linkify;
var joint = function (arr, limit) {
    if (limit === void 0) { limit = 200; }
    var result = '';
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            // join array with space separator
            if (result) {
                result += " ";
            }
            // break with length reaches limit
            if (result.length > limit) {
                break;
            }
            else {
                // make sure last join doesn't break the limit too much
                if ((result + arr[i]).length < limit + 10) {
                    result += arr[i];
                }
                else {
                    break;
                }
            }
        }
    }
    return result.trim();
};
function postBodySummary(entryBody, length, platform) {
    if (platform === void 0) { platform = 'web'; }
    if (!entryBody) {
        return '';
    }
    entryBody = methods_1.cleanReply(entryBody);
    var mdd = new Remarkable({
        html: true,
        breaks: true,
        typographer: false,
    }).use(linkify);
    mdd.core.ruler.enable([
        'abbr'
    ]);
    mdd.block.ruler.enable([
        'footnote',
        'deflist'
    ]);
    mdd.inline.ruler.enable([
        'footnote_inline',
        'ins',
        'mark',
        'sub',
        'sup'
    ]);
    //encrypt entities
    var entities = entryBody.match(/&(.*?);/g);
    var encEntities = [];
    if (entities && platform !== 'web') {
        entities.forEach(function (entity) {
            var CryptoJS = require("react-native-crypto-js");
            var encData = CryptoJS.AES.encrypt(entity, 'key').toString();
            var encyptedEntity = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encData));
            encEntities.push(encyptedEntity);
            entryBody = entryBody.replace(entity, encyptedEntity);
        });
    }
    // Convert markdown to html
    var text = '';
    try {
        text = mdd.render(entryBody);
    }
    catch (err) {
        console.log(err);
    }
    //decrypt and put back entiteis
    if (platform !== 'web') {
        encEntities.forEach(function (encEntity) {
            var CryptoJS = require("react-native-crypto-js");
            var decData = CryptoJS.enc.Base64.parse(encEntity).toString(CryptoJS.enc.Utf8);
            var entity = CryptoJS.AES.decrypt(decData, 'key').toString(CryptoJS.enc.Utf8);
            text = text.replace(encEntity, entity);
        });
    }
    text = text
        .replace(/(<([^>]+)>)/gi, '') // Remove html tags
        .replace(/\r?\n|\r/g, ' ') // Remove new lines
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // Remove urls
        .trim()
        .replace(/ +(?= )/g, ''); // Remove all multiple spaces
    if (length) {
        // Truncate
        text = joint(text.split(' '), length);
    }
    if (text) {
        text = he_1.default.decode(text); // decode html entities  
    }
    return text;
}
function getPostBodySummary(obj, length, platform) {
    if (typeof obj === 'string') {
        return postBodySummary(obj, length, platform);
    }
    var key = helper_1.makeEntryCacheKey(obj) + "-sum-" + length;
    var item = cache_1.cacheGet(key);
    if (item) {
        return item;
    }
    var res = postBodySummary(obj.body, length, platform);
    cache_1.cacheSet(key, res);
    return res;
}
exports.getPostBodySummary = getPostBodySummary;
//# sourceMappingURL=post-body-summary.js.map