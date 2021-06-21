import { makeEntryCacheKey } from "./helper";
import { cleanReply, markdownToHTML } from "./methods";
import { cacheGet, cacheSet } from "./cache";
import { Entry, AmpCallback } from "./types";
import cheerio from "cheerio";

const AmpOptimizer = require("@ampproject/toolbox-optimizer");

function htmlToAMP(
  html: string,
  ampCallback: (amp: string, html: string) => void,
  onlyBody: boolean
) {
  const ampOptimizer = AmpOptimizer.create({
    markdown: true,
  });
  ampOptimizer.transformHtml(html, { canonical: "." }).then((res: string) => {
    const $ = cheerio.load(res);
    $("iframe")
      .get()
      .forEach((x) => {
        $(x).replaceWith(
          $("<a/>").attr("href", $(x).attr("src")).text("Open in new window")
        );
      });

    $("img")
      .get()
      .forEach((x) => {
        $(x).replaceWith(
          $("<amp-img/>")
            .attr("src", $(x).attr("src") || ".")
            .attr("width", "100")
            .attr("height", "100")
            .attr("layout", "responsive")
            .attr("alt", "Replaced Image")
        );
      });
    ampCallback(onlyBody ? $("body").html() : $.html(), html);
  });
}

export function markdown2Html(
  obj: Entry | string,
  forApp = true,
  webp = false,
  amp = false,
  ampCallback: AmpCallback = null,
  onlyBody = false
): string {
  if (typeof obj === "string") {
    obj = cleanReply(obj);
    const html = markdownToHTML(obj as string, forApp, webp);
    if (amp && ampCallback) {
      htmlToAMP(html, ampCallback, onlyBody);
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
    htmlToAMP(res, ampCallback, onlyBody);
  }
  cacheSet(key, res);

  return res;
}
