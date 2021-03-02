"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEntryCacheKey = exports.createDoc = void 0;
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
    return entry.author + "-" + entry.permlink + "-" + entry.last_update;
}
exports.makeEntryCacheKey = makeEntryCacheKey;
//# sourceMappingURL=helper.js.map