"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMParser = void 0;
var xmldom_1 = __importDefault(require("xmldom"));
var noop_method_1 = require("../methods/noop.method");
exports.DOMParser = new xmldom_1.default.DOMParser({
    errorHandler: { warning: noop_method_1.noop, error: noop_method_1.noop }
});
//# sourceMappingURL=dom-parser.const.js.map