import { a } from './a.method'
import { iframe } from './iframe.method'
import { img } from './img.method'
import { text } from './text.method'

export function traverse(node: Node, forApp: boolean, depth = 0, webp = false): void {
  if (!node || !node.childNodes) {
    return
  }

  Array.from(Array(node.childNodes.length).keys())
    .map(i => node.childNodes[i])
    .forEach(child => {
      try {
        //  For InforWars.  The embedding code is a div followed by a script
        // The code replaces it with a single HTTPS link and then sends it 
        // to a(). 
        let scriptNode;
        let scriptSrc : string | null;
        let dataVideoId : string | null;
        if (child.nodeName.toLowerCase() === 'div' && (scriptNode=child.nextSibling) 
          && scriptNode.nodeName.toLowerCase() === 'script'
          // simply fail this check if getAttribute is not available in this version of node
          // @ts-ignore
          && !!scriptNode['getAttribute']
          // @ts-ignore
          && (scriptSrc=scriptNode.getAttribute('src'))
          && scriptSrc === "https://infowarsmedia.com/js/player.js"
          // @ts-ignore
          && (dataVideoId=child.getAttribute('data-video-id'))) {
             const newURL = `https://freeworldnews.tv/watch?id=${dataVideoId}`
             const aNode = child.ownerDocument.createElement('aNode')
             aNode.textContent = newURL
             aNode.setAttribute('href', newURL)
             
             child.parentNode.insertBefore(aNode, child) 
             child.parentNode.removeChild(scriptNode)
             child.parentNode.removeChild(child)
             a(<HTMLElement>aNode, forApp, webp)
          }
      } catch (e) {
        console.log(e)
      }
      if (child.nodeName.toLowerCase() === 'a') {
        a(<HTMLElement>child, forApp, webp)
      }
      if (child.nodeName.toLowerCase() === 'iframe') {
        iframe(<HTMLElement>child)
      }
      if (child.nodeName === '#text') {
        text(<HTMLElement>child, forApp, webp)
      }
      if (child.nodeName.toLowerCase() === 'img') {
        img(<HTMLElement>child, webp)
      }
      traverse(child, forApp, depth + 1, webp)
    })
}
