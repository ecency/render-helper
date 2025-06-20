import { proxifyImageSrc } from "../proxify-image-src";

export function img(el: HTMLElement, webp: boolean): void {
  el.removeAttribute("width");
  el.removeAttribute("height");

  let src = el.getAttribute("src") || "";

  // Normalize encoded characters
  const decodedSrc = decodeURIComponent(
    src.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  ).trim().toLowerCase();

  // ❌ Remove if javascript or empty/invalid
  const isInvalid = !src || decodedSrc.startsWith("javascript") || decodedSrc.startsWith("vbscript") || decodedSrc === "x";
  if (isInvalid) {
    src = ""
  }

  // ❌ Skip relative paths (e.g., `photo.jpg`, `./photo.png`, `assets/pic.jpeg`)
  const isRelative = !/^https?:\/\//i.test(src) && !src.startsWith("/");
  if (isRelative) {
    //console.warn("Skipped relative image:", src);
    src = ""
  }

  // Sanitize any dynamic or low-res src-like attributes
  ["onerror", "dynsrc", "lowsrc"].forEach(attr => el.removeAttribute(attr));

  el.setAttribute("itemprop", "image");

  const cls = el.getAttribute("class") || "";
  const shouldReplace = !cls.includes("no-replace");
  const hasAlreadyProxied = src.startsWith("https://images.ecency.com");

  if (shouldReplace && !hasAlreadyProxied) {
    const proxified = proxifyImageSrc(src, 0, 0, webp ? "webp" : "match");
    el.setAttribute("src", proxified);
  }
}
