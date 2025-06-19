"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanReply = void 0;
function cleanReply(s) {
    return (s ? s.split('\n')
        .filter(function (item) { return item.toLowerCase().includes('posted using [partiko') === false; })
        .filter(function (item) { return item.toLowerCase().includes('posted using [dapplr') === false; })
        .filter(function (item) { return item.toLowerCase().includes('posted using [leofinance') === false; })
        .filter(function (item) { return item.toLowerCase().includes('posted via [neoxian') === false; })
        .filter(function (item) { return item.toLowerCase().includes('posted using [neoxian') === false; })
        .filter(function (item) { return item.toLowerCase().includes('posted with [stemgeeks') === false; })
        .filter(function (item) { return item.toLowerCase().includes('posted using [bilpcoin') === false; })
        .filter(function (item) { return item.toLowerCase().includes('posted using [inleo') === false; })
        .filter(function (item) { return item.toLowerCase().includes('posted using [sportstalksocial]') === false; })
        .filter(function (item) { return item.toLowerCase().includes('<center><sub>[posted using aeneas.blog') === false; })
        .filter(function (item) { return item.toLowerCase().includes('<center><sub>posted via [proofofbrain.io') === false; })
        .filter(function (item) { return item.toLowerCase().includes('<center>posted on [hypnochain') === false; })
        .filter(function (item) { return item.toLowerCase().includes('<center><sub>posted via [weedcash.network') === false; })
        .filter(function (item) { return item.toLowerCase().includes('<center>posted on [naturalmedicine.io') === false; })
        .filter(function (item) { return item.toLowerCase().includes('<center><sub>posted via [musicforlife.io') === false; })
        .filter(function (item) { return item.toLowerCase().includes('if the truvvl embed is unsupported by your current frontend, click this link to view this story') === false; })
        .filter(function (item) { return item.toLowerCase().includes('<center><em>posted from truvvl') === false; })
        .filter(function (item) { return item.toLowerCase().includes('view this post <a href="https://travelfeed.io/') === false; })
        .filter(function (item) { return item.toLowerCase().includes('read this post on travelfeed.io for the best experience') === false; })
        .filter(function (item) { return item.toLowerCase().includes('posted via <a href="https://www.dporn.co/"') === false; })
        .filter(function (item) { return item.toLowerCase().includes('▶️ [watch on 3speak](https://3speak') === false; })
        .filter(function (item) { return item.toLowerCase().includes('<sup><sub>posted via [inji.com]') === false; })
        .filter(function (item) { return item.toLowerCase().includes('view this post on [liketu]') === false; })
        .filter(function (item) { return item.toLowerCase().includes('[via Inbox]') === false; })
        .join('\n') : '')
        .replace('Posted via <a href="https://d.buzz" data-link="promote-link">D.Buzz</a>', '')
        .replace('<div class="pull-right"><a href="/@hive.engage">![](https://i.imgur.com/XsrNmcl.png)</a></div>', '')
        .replace('<div><a href="https://engage.hivechain.app">![](https://i.imgur.com/XsrNmcl.png)</a></div>', '')
        .replace("<div class=\"text-center\"><img src=\"https://cdn.steemitimages.com/DQmNp6YwAm2qwquALZw8PdcovDorwaBSFuxQ38TrYziGT6b/A-20.png\"><a href=\"https://bit.ly/actifit-app\"><img src=\"https://cdn.steemitimages.com/DQmQqfpSmcQtfrHAtzfBtVccXwUL9vKNgZJ2j93m8WNjizw/l5.png\"></a><a href=\"https://bit.ly/actifit-ios\"><img src=\"https://cdn.steemitimages.com/DQmbWy8KzKT1UvCvznUTaFPw6wBUcyLtBT5XL9wdbB7Hfmn/l6.png\"></a></div>", '');
}
exports.cleanReply = cleanReply;
//# sourceMappingURL=clean-reply.method.js.map