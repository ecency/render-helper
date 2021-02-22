import { IMG_REGEX, YOUTUBE_REGEX } from '../consts'
import proxifyImageSrc from '../proxify-image-src'
import { linkify } from './linkify.method'
import xmldom from 'xmldom'
import { noop } from './noop.method'

export function text(el: HTMLElement, forApp: string, webp: boolean): void {
  if (['a', 'code'].includes(el.parentNode.nodeName)) {
    return
  }

  const DOMParser = new xmldom.DOMParser({
    errorHandler: { warning: noop, error: noop }
  })
  const linkified = linkify(el.nodeValue, forApp, webp)
  if (linkified !== el.nodeValue) {
    const replaceNode = DOMParser.parseFromString(
      `<span class="wr">${linkified}</span>`
    )

    el.parentNode.insertBefore(replaceNode, el)
    el.parentNode.removeChild(el)
    return
  }

  if (el.nodeValue.match(IMG_REGEX)) {
    const attrs = forApp ?
      `data-href="${el.nodeValue}"
        class="markdown-img-link"
        src="${proxifyImageSrc(el.nodeValue, 0, 0, webp ? 'webp' : 'match')}"
      ` :
      `class="markdown-img-link"
        src="${proxifyImageSrc(el.nodeValue, 0, 0, webp ? 'webp' : 'match')}"
      `
    const replaceNode = DOMParser.parseFromString(
      `<img ${attrs}/>`
    )

    el.parentNode.replaceChild(replaceNode, el)
  }
  // If a youtube video
  if (el.nodeValue.match(YOUTUBE_REGEX)) {
    const e = YOUTUBE_REGEX.exec(el.nodeValue)
    if (e[1]) {
      const vid = e[1]
      const thumbnail = proxifyImageSrc(
        `https://img.youtube.com/vi/${vid.split('?')[0]}/hqdefault.jpg`,
        0,
        0,
        webp ? 'webp' : 'match'
      )
      const embedSrc = `https://www.youtube.com/embed/${vid}?autoplay=1`

      const attrs = `class="markdown-video-link markdown-video-link-youtube" data-embed-src="${embedSrc}"`

      const thumbImg = el.ownerDocument.createElement('img')
      thumbImg.setAttribute('class', 'no-replace video-thumbnail')
      thumbImg.setAttribute('src', thumbnail)

      const play = el.ownerDocument.createElement('span')
      play.setAttribute('class', 'markdown-video-play')

      const replaceNode = DOMParser.parseFromString(`<p><a ${attrs}>${thumbImg}${play}</a></p>`)
      el.parentNode.replaceChild(replaceNode, el)
    }
  }
}
