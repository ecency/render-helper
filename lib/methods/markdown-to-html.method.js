"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownToHTML = void 0;
var traverse_method_1 = require("./traverse.method");
var sanitize_html_method_1 = require("./sanitize-html.method");
var consts_1 = require("../consts");
var xmldom_1 = __importDefault(require("xmldom"));
var lolight = require('lolight');
var Remarkable = require('remarkable').Remarkable;
var linkify = require('remarkable/linkify').linkify;
function markdownToHTML(input, forApp, webp) {
    var md = new Remarkable({
        html: true,
        breaks: true,
        typographer: false,
        highlight: function (str) {
            try {
                var tokens = lolight.tok(str);
                return tokens.map(function (token) { return "<span class=\"ll-" + token[0] + "\">" + token[1] + "</span>"; }).join('');
            }
            catch (err) {
                console.error(err);
            }
            return str;
        }
    }).use(linkify);
    md.core.ruler.enable([
        'abbr'
    ]);
    md.block.ruler.enable([
        'footnote',
        'deflist'
    ]);
    md.inline.ruler.enable([
        'footnote_inline',
        'ins',
        'mark',
        'sub',
        'sup'
    ]);
    var XMLSerializer = new xmldom_1.default.XMLSerializer();
    if (!input) {
        return '';
    }
    var output = '';

      //encrypt entities
    const entities = input.match(/&(.*?);/g);
    const encEntities = [];
    if(entities && forApp){
        entities.forEach((entity)=>{
        var CryptoJS = require("react-native-crypto-js");
        const encData = CryptoJS.AES.encrypt(entity, 'key').toString();
        let encyptedEntity = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encData));
        encEntities.push(encyptedEntity);
        input = input.replace(entity, encyptedEntity);
        })
    }

    try {
        output = md.render(input);
        var doc = consts_1.DOMParser.parseFromString("<body id=\"root\">" + output + "</body>", 'text/html');
        traverse_method_1.traverse(doc, forApp, 0, webp);
        output = XMLSerializer.serializeToString(doc);
    }
    catch (error) {
        output = '';
    }

      //decrypt and put back entiteis
    if(forApp && output){
        encEntities.forEach((encEntity)=>{
        var CryptoJS = require("react-native-crypto-js");
        let decData = CryptoJS.enc.Base64.parse(encEntity).toString(CryptoJS.enc.Utf8);
        let entity = CryptoJS.AES.decrypt(decData, 'key').toString(CryptoJS.enc.Utf8);
        output = output.replace(encEntity, entity);
        })
    }

    output = output.replace(/ xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g, '')
        .replace('<body id="root">', '')
        .replace('</body>', '')
        .trim();
    return sanitize_html_method_1.sanitizeHtml(output);
}
exports.markdownToHTML = markdownToHTML;
//# sourceMappingURL=markdown-to-html.method.js.map