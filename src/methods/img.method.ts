import { proxifyImageSrc } from "../proxify-image-src";

export function img(el: HTMLElement, webp: boolean): void {
  el.removeAttribute("width");
  el.removeAttribute("height");

  let src = el.getAttribute("src");
  if (src.startsWith("javascript")) {
    src = "";
  }
  el.setAttribute("itemprop", "image");

  const hasAlreadyProxied =
    el.getAttribute("src")?.startsWith("https://images.ecency.com") === true;

  if (
    el.getAttribute("class").indexOf("no-replace") === -1 &&
    !hasAlreadyProxied
  ) {
    el.setAttribute("src", proxifyImageSrc(src, 0, 0, webp ? "webp" : "match"));
  }
}
