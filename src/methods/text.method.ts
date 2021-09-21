import { IMG_REGEX, YOUTUBE_REGEX, WHITE_LIST, DOMParser, POST_REGEX,  } from '../consts'
import { proxifyImageSrc } from '../proxify-image-src'
import { linkify } from './linkify.method'

export function text(node: HTMLElement, forApp: boolean, webp: boolean): void {
  if (['a', 'code'].includes(node.parentNode.nodeName)) {
    return
  }

  const linkified = linkify(node.nodeValue, forApp, webp)
  if (linkified !== node.nodeValue) {
    const replaceNode = DOMParser.parseFromString(
      `<span class="wr">${linkified}</span>`
    )

    node.parentNode.insertBefore(replaceNode, node)
    node.parentNode.removeChild(node)
    return
  }

  if (node.nodeValue.match(IMG_REGEX)) {
    const attrs = forApp ? `data-href="${node.nodeValue}" class="markdown-img-link" src="${proxifyImageSrc(node.nodeValue, 0, 0, webp ? 'webp' : 'match')}"` : `class="markdown-img-link" src="${proxifyImageSrc(node.nodeValue, 0, 0, webp ? 'webp' : 'match')}"`
    const replaceNode = DOMParser.parseFromString(
      `<img ${attrs}/>`
    )

    node.parentNode.replaceChild(replaceNode, node)
  }
  // If a youtube video
  if (node.nodeValue.match(YOUTUBE_REGEX)) {
    const e = YOUTUBE_REGEX.exec(node.nodeValue)
    if (e[1]) {
      const vid = e[1]
      const thumbnail = proxifyImageSrc(`https://img.youtube.com/vi/${vid.split('?')[0]}/hqdefault.jpg`, 0, 0, webp ? 'webp' : 'match')
      const embedSrc = `https://www.youtube.com/embed/${vid}?autoplay=1`

      const attrs = `class="markdown-video-link markdown-video-link-youtube" data-embed-src="${embedSrc}"`

      const thumbImg = node.ownerDocument.createElement('img')
      thumbImg.setAttribute('class', 'no-replace video-thumbnail')
      thumbImg.setAttribute('src', thumbnail)

      const play = node.ownerDocument.createElement('span')
      play.setAttribute('class', 'markdown-video-play')

      const replaceNode = DOMParser.parseFromString(`<p><a ${attrs}>${thumbImg}${play}</a></p>`)
      node.parentNode.replaceChild(replaceNode, node)
    }
  }
  if (node.nodeValue && typeof node.nodeValue === 'string') {
    const postMatch = node.nodeValue.trim().match(POST_REGEX)
    if (postMatch && WHITE_LIST.includes(postMatch[1].replace(/www./,''))) {
      const tag = postMatch[2]
      const author = postMatch[3].replace('@', '')
      const permlink = postMatch[4]

      const attrs = forApp ? `data-tag="${tag}" data-author="${author}" data-permlink="${permlink}" class="markdown-post-link"` : `class="markdown-post-link" href="/${tag}/@${author}/${permlink}"`
      const replaceNode = DOMParser.parseFromString(
        `<a ${attrs}>/@${author}/${permlink}</a>`
      )
      node.parentNode.replaceChild(replaceNode, node)
    }
  }
}
