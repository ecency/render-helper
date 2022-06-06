import { makeEntryCacheKey } from "./helper";
import { cleanReply, markdownToHTML } from "./methods";
import { cacheGet, cacheSet } from "./cache";
import { Entry } from "./types";
import cheerio from "cheerio";

const AmpOptimizer = require("@ampproject/toolbox-optimizer");

export async function htmlToAMP(
  html: string,
  onlyBody: boolean,
  saveImageClass = false,
  processImage = true
): Promise<string> {
  const ampOptimizer = AmpOptimizer.create({
    markdown: true,
  });
  const res = await ampOptimizer.transformHtml(html, { canonical: ".", markdown: true })
  const $ = cheerio.load(res);
  $("iframe")
    .get()
    .forEach((x) => {
      $(x).replaceWith(
        $("<a/>").attr("href", $(x).attr("src")).text("Open in new window")
      );
    });

  if (processImage) {
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
            .attr("class", saveImageClass ? $(x).attr("class") : "")
        );
      });
  }

  return onlyBody ? $("body").html() : $.html();
}

export function markdown2AMP(
  obj: Entry | string,
  forApp = false,
  webp = false,
  onlyBody = true
): Promise<string> {
  if (typeof obj === "string") {
    obj = cleanReply(obj);
    const html = markdownToHTML(obj as string, forApp, webp);
    return htmlToAMP(html, onlyBody);
  }

  const key = `${makeEntryCacheKey(obj)}-amp${webp ? "-webp" : ""}`;

  const item = cacheGet<string>(key);
  if (item) {
    return Promise.resolve(item);
  }

  obj.body = cleanReply(obj.body);

  const res = markdownToHTML(obj.body, forApp, webp);
  const amp = htmlToAMP(res, onlyBody);
  cacheSet(key, res);

  return amp;
}
