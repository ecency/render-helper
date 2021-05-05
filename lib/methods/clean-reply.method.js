"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanReply = void 0;
function cleanReply(s) {
    return (s ? s.split('\n')
        .filter(function (item) { return item.includes('Posted using [Partiko') === false; })
        .filter(function (item) { return item.includes('Posted using [Dapplr') === false; })
        .filter(function (item) { return item.includes('Posted Using [LeoFinance') === false; })
        .filter(function (item) { return item.includes('Posted via [neoxian') === false; })
        .filter(function (item) { return item.includes('Posted with [STEMGeeks') === false; })
        .filter(function (item) { return item.includes('Posted using [Bilpcoin') === false; })
        .filter(function (item) { return item.includes('<center><sub>[Posted Using Aeneas.Blog') === false; })
        .filter(function (item) { return item.includes('<center><sub>Posted via [proofofbrain.io') === false; })
        .filter(function (item) { return item.includes('<center>Posted on [HypnoChain') === false; })
        .filter(function (item) { return item.includes('<center><sub>Posted via [weedcash.network') === false; })
        .filter(function (item) { return item.includes('<center>Posted on [NaturalMedicine.io') === false; })
        .filter(function (item) { return item.includes('<center><sub>Posted via [MusicForLife.io') === false; })
        .filter(function (item) { return item.includes('If the truvvl embed is unsupported by your current frontend, click this link to view this story') === false; })
        .filter(function (item) { return item.includes('<center><em>Posted from Truvvl') === false; })
        .join('\n') : '')
        .replace('Posted via <a href="https://d.buzz" data-link="promote-link">D.Buzz</a>', '')
        .replace('<div class="pull-right"><a href="/@hive.engage">![](https://i.imgur.com/XsrNmcl.png)</a></div>', '');
}
exports.cleanReply = cleanReply;
//# sourceMappingURL=clean-reply.method.js.map