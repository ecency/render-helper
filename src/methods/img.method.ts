import { proxifyImageSrc } from "../proxify-image-src";

export function img(el: HTMLElement, webp: boolean): void {
  el.removeAttribute("width");
  el.removeAttribute("height");

  let src = el.getAttribute("src") || "";

  // ❌ Remove JS-based or empty srcs
  if (src.toLowerCase().startsWith("javascript") || !src.trim()) {
    el.remove();
    return;
  }

  // ⚠️ Skip or remove relative image links (likely filenames like photo.jpg)
  const isRelative = !/^https?:\/\//i.test(src) && !src.startsWith("/");
  if (isRelative) {
    console.warn("Skipped relative image:", src);
    el.remove();
    return;
  }

  el.setAttribute("itemprop", "image");

  const cls = el.getAttribute("class") || "";
  const shouldReplace = !cls.includes("no-replace");
  const hasAlreadyProxied = src.startsWith("https://images.ecency.com");

  if (shouldReplace && !hasAlreadyProxied) {
    const proxified = proxifyImageSrc(src, 0, 0, webp ? "webp" : "match");
    el.setAttribute("src", proxified);
  }
}
