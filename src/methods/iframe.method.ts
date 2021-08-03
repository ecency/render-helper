import { ARCH_REGEX, DAPPLR_REGEX, INFOWARS_REGEX, INFOWARS_EMBED_REGEX, LBRY_REGEX, TRUVVL_REGEX, 
ODYSEE_REGEX, BITCHUTE_REGEX, RUMBLE_REGEX, BRIGHTEON_REGEX } from '../consts'

export function iframe(el: HTMLElement): void {
  const src = el.getAttribute('src')
  if (!src) {
    el.parentNode.removeChild(el)
    return
  }

  try {

  const IWmatch = src.match(INFOWARS_EMBED_REGEX)
  if (IWmatch) {
    //el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups')
    el.setAttribute('allowfullscreen', 'true')
    el.setAttribute('frameborder', '0')
    return
  }

    
  if (src.match(BITCHUTE_REGEX)) {
    return
  }

  // Youtube
  if (src.match(/^(https?:)?\/\/www.youtube.com\/embed\/.*/i)) {
    // strip query string (yt: autoplay=1,controls=0,showinfo=0, etc)
    const s = src.replace(/\?.+$/, '')
    el.setAttribute('src', s)
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
    const parentDomain = 'ecency.com'
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

  // Dtube
  if (src.match(/^https:\/\/emb.d.tube\/.*/i)) {
    el.setAttribute('src', src)
    el.setAttribute('sandbox', 'allow-scripts allow-same-origin')
    el.setAttribute('frameborder', '0')
    el.setAttribute('allowfullscreen', 'true')
    return
  }

  // VIMM
  if (src.match(/^https:\/\/www.vimm.tv\/.*/i)) {
    el.setAttribute('src', src)
    el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups')
    el.setAttribute('frameborder', '0')
    el.setAttribute('allowfullscreen', 'true')
    return
  }

  // Dapplr
  if (src.match(DAPPLR_REGEX)) {
    el.setAttribute('src', src)
    el.setAttribute('sandbox', 'allow-scripts allow-same-origin')
    el.setAttribute('frameborder', '0')
    el.setAttribute('allowfullscreen', 'true')
    return
  }

  // Truvvl
  if (src.match(TRUVVL_REGEX)) {
    el.setAttribute('src', src)
    el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups')
    el.setAttribute('frameborder', '0')
    el.setAttribute('class', 'portrait-embed')
    el.setAttribute('allowfullscreen', 'true')
    return
  }

  // LBRY.tv
  if (src.match(LBRY_REGEX)) {
    el.setAttribute('src', src)
    el.setAttribute('frameborder', '0')
    return
  }

  if (src.match(RUMBLE_REGEX)) {
    el.setAttribute('frameborder', '0')
    return
  }
  
  if (src.match(BRIGHTEON_REGEX)) {
    el.setAttribute('frameborder', '0')
    return
  }

  // ODYSEE
  if (src.match(ODYSEE_REGEX)) {
    el.setAttribute('src', src)
    el.setAttribute('frameborder', '0')
    return
  }

  // archive.org
  if (src.match(ARCH_REGEX)) {
    el.setAttribute('src', src)
    return
  }
  } catch (e) {
    console.log(e)
  }

  const replaceNode = el.ownerDocument.createElement('div')
  replaceNode.setAttribute('class', 'unsupported-iframe')
  replaceNode.textContent = `(Unsupported ${src})`
  el.parentNode.insertBefore(replaceNode, el)
  el.parentNode.removeChild(el)
}
