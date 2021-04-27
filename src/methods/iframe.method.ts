import { ARCH_REGEX, DAPPLR_REGEX, LBRY_REGEX } from '../consts'
import {youtubeEmbedSrc} from "./helper";

export function iframe(el: HTMLElement): void {
  const src = el.getAttribute('src')
  if (!src) {
    el.parentNode.removeChild(el)
    return
  }

  // Youtube
  if (src.match(/^(https?:)?\/\/www.youtube.com\/embed\/.*/i)) {
    // strip query string (yt: autoplay=1,controls=0,showinfo=0, etc)
    const s = src.replace(/\?.+$/, '')
    el.setAttribute('src', youtubeEmbedSrc(s))
    return
  }

  // Vimeo
  const m = src.match(/https:\/\/player\.vimeo\.com\/video\/([0-9]+)/)
  if (m && m.length === 2) {
    const s = `https://player.vimeo.com/video/${m[1]}`
    el.setAttribute('src', s)
    return
  }

  // Twitch
  if (src.match(/^(https?:)?\/\/player.twitch.tv\/.*/i)) {
    const parentDomain = window?.location?.hostname || 'ecency.com'
    const s = `${src}&parent=${parentDomain}&autoplay=false`
    el.setAttribute('src', s)
    return
  }

  // 3Speak
  if (src.match(/^(https?:)?\/\/3speak.online\/embed\?.*/i)) {
    const s = `${src}&autoplay=true`
    el.setAttribute('src', s)
    return
  }

  // Spotify
  if (src.match(/^https:\/\/open\.spotify\.com\/(embed|embed-podcast)\/(playlist|show|episode|track|album)\/(.*)/i)) {
    el.setAttribute('src', src)
    el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups')
    el.setAttribute('frameborder', '0')
    return
  }

  // Soundcloud
  if (src.match(/^https:\/\/w.soundcloud.com\/player\/.*/i)) {
    const match = src.match(/url=(.+?)&/)
    if (match && match.length === 2) {
      const s = `https://w.soundcloud.com/player/?url=${match[1]}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true`
      el.setAttribute('src', s)
      return
    }
  }

  // Dapplr
  if (src.match(DAPPLR_REGEX)) {
    el.setAttribute('src', src)
    el.setAttribute('sandbox', '')
    el.setAttribute('frameborder', '0')
    el.setAttribute('allowfullscreen', 'true')
    return
  }

  // LBRY.tv
  if (src.match(LBRY_REGEX)) {
    el.setAttribute('src', src)
    el.setAttribute('frameborder', '0')
    return
  }

  // archive.org
  if (src.match(ARCH_REGEX)) {
    el.setAttribute('src', src)
    return
  }

  const replaceNode = el.ownerDocument.createElement('div')
  replaceNode.setAttribute('class', 'unsupported-iframe')
  replaceNode.textContent = `(Unsupported ${src})`
  el.parentNode.insertBefore(replaceNode, el)
  el.parentNode.removeChild(el)
}
