"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUsername = exports.isValidPermlink = exports.sanitizePermlink = exports.extractYtStartTime = exports.makeEntryCacheKey = exports.createDoc = void 0;
var consts_1 = require("./consts");
function createDoc(html) {
    if (html.trim() === '') {
        return null;
    }
    var doc = consts_1.DOMParser.parseFromString(html, 'text/html');
    return doc;
}
exports.createDoc = createDoc;
function makeEntryCacheKey(entry) {
    return "".concat(entry.author, "-").concat(entry.permlink, "-").concat(entry.last_update, "-").concat(entry.updated);
}
exports.makeEntryCacheKey = makeEntryCacheKey;
function extractYtStartTime(url) {
    try {
        var urlObj = new URL(url);
        var params = new URLSearchParams(urlObj.search);
        if (params.has('t')) {
            return '' + parseInt(params.get('t')); //parsing is important as sometimes t is famated '123s';
        }
        else if (params.has('start')) {
            return params.get('start');
        }
    }
    catch (error) {
        return '';
    }
}
exports.extractYtStartTime = extractYtStartTime;
function sanitizePermlink(permlink) {
    if (!permlink || typeof permlink !== 'string') {
        return '';
    }
    var withoutQuery = permlink.split('?')[0];
    var cleaned = withoutQuery.split('#')[0];
    return cleaned;
}
exports.sanitizePermlink = sanitizePermlink;
function isValidPermlink(permlink) {
    var sanitized = sanitizePermlink(permlink);
    if (!sanitized) {
        return false;
    }
    // Should not contain image extensions, query params, or fragments
    var isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(sanitized);
    var isCleanFormat = /^[a-z0-9-]+$/.test(sanitized); // Hive standard
    return isCleanFormat && !isImage;
}
exports.isValidPermlink = isValidPermlink;
// Reference: https://en.wikipedia.org/wiki/Domain_Name_System#Domain_name_syntax
// Hive account names must follow similar rules to DNS (RFC 1035)
var LABEL_REGEX = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
function isValidUsername(username) {
    if (!username || typeof username !== 'string')
        return false;
    if (username.length > 16)
        return false;
    var labels = username.split('.');
    return labels.every(function (label) {
        return (label.length >= 3 &&
            label.length <= 16 &&
            /^[a-z]/.test(label) && // must start with a letter
            LABEL_REGEX.test(label) && // a-z0-9, hyphens, no start/end hyphen
            !label.includes('..') // double dots are impossible after split, but just in case
        );
    });
}
exports.isValidUsername = isValidUsername;
//# sourceMappingURL=helper.js.map