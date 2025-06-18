import { proxifyImageSrc } from '../proxify-image-src'

export function img(el: HTMLElement, webp: boolean): void {
  el.removeAttribute('width')
  el.removeAttribute('height')

  const src = el.getAttribute('src') || ''

  // ❌ Remove JS-based srcs
  if (src.toLowerCase().startsWith('javascript')) {
    el.remove()
    return
  }

  // ⚠️ Skip or remove relative image links (likely filenames like photo.jpg)
  const isRelative = !/^https?:\/\//i.test(src) && !src.startsWith('/')

  if (isRelative) {
    console.warn("Skipped relative image:", src)
    el.remove()
    return
  }

  el.setAttribute('itemprop', 'image')

  const cls = el.getAttribute('class') || ''
  const shouldReplace = !cls.includes('no-replace')

  if (shouldReplace) {
    const proxified = proxifyImageSrc(src, 0, 0, webp ? 'webp' : 'match')
    el.setAttribute('src', proxified)
  }
}
