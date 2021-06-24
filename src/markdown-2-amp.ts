import { makeEntryCacheKey } from "./helper";
import { cleanReply, markdownToHTML } from "./methods";
import { cacheGet, cacheSet } from "./cache";
import { Entry } from "./types";
import cheerio from "cheerio";

const AmpOptimizer = require("@ampproject/toolbox-optimizer");

function htmlToAMP(
  html: string,
  ampCallback: (amp: string, html: string) => void,
  onlyBody: boolean
): Promise<string> {
  const ampOptimizer = AmpOptimizer.create({
    markdown: true,
  });
  return new Promise((resolve) => {
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

      ampCallback && ampCallback(onlyBody ? $("body").html() : $.html(), html);
      resolve(onlyBody ? $("body").html() : $.html());
    });
  });
}

export function markdown2AMP(
  obj: Entry | string,
  forApp = true,
  webp = false,
  onlyBody = true
): Promise<string> {
  if (typeof obj === "string") {
    obj = cleanReply(obj);
    const html = markdownToHTML(obj as string, forApp, webp);
    return htmlToAMP(html, null, onlyBody);
  }

  const key = `${makeEntryCacheKey(obj)}-md${webp ? "-webp" : ""}`;

  const item = cacheGet<string>(key);
  if (item) {
    return Promise.resolve(item);
  }

  obj.body = cleanReply(obj.body);

  const res = markdownToHTML(obj.body, forApp, webp);
  const amp = htmlToAMP(res, null, onlyBody);
  cacheSet(key, res);

  return amp;
}
