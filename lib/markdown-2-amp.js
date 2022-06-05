"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdown2AMP = exports.htmlToAMP = void 0;
var helper_1 = require("./helper");
var methods_1 = require("./methods");
var cache_1 = require("./cache");
var cheerio_1 = __importDefault(require("cheerio"));
var AmpOptimizer = require("@ampproject/toolbox-optimizer");
function htmlToAMP(html, onlyBody, saveImageClass) {
    if (saveImageClass === void 0) { saveImageClass = false; }
    return __awaiter(this, void 0, void 0, function () {
        var ampOptimizer, res, $;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ampOptimizer = AmpOptimizer.create({
                        markdown: true,
                    });
                    return [4 /*yield*/, ampOptimizer.transformHtml(html, { canonical: ".", markdown: true })];
                case 1:
                    res = _a.sent();
                    $ = cheerio_1.default.load(res);
                    $("iframe")
                        .get()
                        .forEach(function (x) {
                        $(x).replaceWith($("<a/>").attr("href", $(x).attr("src")).text("Open in new window"));
                    });
                    $("img")
                        .get()
                        .forEach(function (x) {
                        $(x).replaceWith($("<amp-img/>")
                            .attr("src", $(x).attr("src") || ".")
                            .attr("width", "100")
                            .attr("height", "100")
                            .attr("layout", "responsive")
                            .attr("alt", "Replaced Image")
                            .attr("class", saveImageClass ? $(x).attr("class") : ""));
                    });
                    return [2 /*return*/, onlyBody ? $("body").html() : $.html()];
            }
        });
    });
}
exports.htmlToAMP = htmlToAMP;
function markdown2AMP(obj, forApp, webp, onlyBody) {
    if (forApp === void 0) { forApp = false; }
    if (webp === void 0) { webp = false; }
    if (onlyBody === void 0) { onlyBody = true; }
    if (typeof obj === "string") {
        obj = (0, methods_1.cleanReply)(obj);
        var html = (0, methods_1.markdownToHTML)(obj, forApp, webp);
        return htmlToAMP(html, onlyBody);
    }
    var key = "".concat((0, helper_1.makeEntryCacheKey)(obj), "-amp").concat(webp ? "-webp" : "");
    var item = (0, cache_1.cacheGet)(key);
    if (item) {
        return Promise.resolve(item);
    }
    obj.body = (0, methods_1.cleanReply)(obj.body);
    var res = (0, methods_1.markdownToHTML)(obj.body, forApp, webp);
    var amp = htmlToAMP(res, onlyBody);
    (0, cache_1.cacheSet)(key, res);
    return amp;
}
exports.markdown2AMP = markdown2AMP;
//# sourceMappingURL=markdown-2-amp.js.map