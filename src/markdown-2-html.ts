import { makeEntryCacheKey } from './helper'
import { cleanReply, markdownToHTML } from './methods'
import { cacheGet, cacheSet } from './cache'

function markdown2Html(obj: any, forApp = true, webp = false): string {
  if (typeof obj === 'string') {
    obj = cleanReply(obj)
    return markdownToHTML(obj, forApp, webp)
  }

  const key = `${makeEntryCacheKey(obj)}-md${webp ? '-webp' : ''}`

  const item = cacheGet<string>(key)
  if (item) {
    return item
  }

  obj.body = cleanReply(obj.body)

  const res = markdownToHTML(obj.body, forApp, webp)
  cacheSet(key, res)

  return res
}

export default markdown2Html
