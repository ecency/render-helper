import { makeEntryCacheKey } from "./helper";
import { cleanReply, markdownToHTML } from "./methods";
import { cacheGet, cacheSet } from "./cache";
import { Entry, AmpCallback } from "./types";

const AmpOptimizer = require("@ampproject/toolbox-optimizer");

export function markdown2Html(
  obj: Entry | string,
  forApp = true,
  webp = false,
  amp = false,
  ampCallback: AmpCallback = null
): string {
  if (typeof obj === "string") {
    obj = cleanReply(obj);
    const html = markdownToHTML(obj as string, forApp, webp);
    if (amp && ampCallback) {
      const ampOptimizer = AmpOptimizer.create({
        markdown: true,
      });
      ampOptimizer.transformHtml(html).then(ampCallback);
    }
    return html;
  }

  const key = `${makeEntryCacheKey(obj)}-md${webp ? "-webp" : ""}`;

  const item = cacheGet<string>(key);
  if (item) {
    return item;
  }

  obj.body = cleanReply(obj.body);

  const res = markdownToHTML(obj.body, forApp, webp);
  if (amp && ampCallback) {
    const ampOptimizer = AmpOptimizer.create({
      markdown: true,
    });
    ampOptimizer.transformHtml(res).then(ampCallback);
  }
  cacheSet(key, res);

  return res;
}
