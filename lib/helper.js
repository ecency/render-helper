"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractYtStartTime = exports.makeEntryCacheKey = exports.createDoc = void 0;
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
//# sourceMappingURL=helper.js.map