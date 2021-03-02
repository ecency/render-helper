"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheSet = exports.cacheGet = exports.setCacheSize = void 0;
var lru_cache_1 = __importDefault(require("lru-cache"));
var cache = new lru_cache_1.default(60);
function setCacheSize(size) {
    cache.max = size;
}
exports.setCacheSize = setCacheSize;
function cacheGet(key) {
    return cache.get(key);
}
exports.cacheGet = cacheGet;
function cacheSet(key, value) {
    cache.set(key, value);
}
exports.cacheSet = cacheSet;
//# sourceMappingURL=cache.js.map