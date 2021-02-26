"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMParser = void 0;
var xmldom_1 = __importDefault(require("xmldom"));
var methods_1 = require("../methods");
exports.DOMParser = new xmldom_1.default.DOMParser({
    errorHandler: { warning: methods_1.noop, error: methods_1.noop }
});
//# sourceMappingURL=dom-parser.const.js.map