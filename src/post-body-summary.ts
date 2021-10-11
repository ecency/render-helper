import he from 'he'
import { makeEntryCacheKey } from './helper'
import { cacheGet, cacheSet } from './cache'
import { Entry } from './types'
import { cleanReply } from './methods'

const { Remarkable } = require('remarkable')
const { linkify } = require('remarkable/linkify')

const joint = (arr: string[], limit = 200) => {
  let result = '';
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      // join array with space separator
      if (result) {
        result += " ";
      }
      // break with length reaches limit
      if (result.length > limit) {
        break;
      } else {
        // make sure last join doesn't break the limit too much
        if ((result + arr[i]).length < limit + 10) {
          result += arr[i];
        } else {
          break;
        }
      }
    }
  }
  return result.trim();
};

function postBodySummary(entryBody: string, length?: number): string {
  if (!entryBody) {
    return ''
  }
  entryBody = cleanReply(entryBody)

  const mdd = new Remarkable({
    html: true,
    breaks: true,
    typographer: false,
  }).use(linkify)
  mdd.core.ruler.enable([
    'abbr'
  ]);
  mdd.block.ruler.enable([
    'footnote',
    'deflist'
  ]);
  mdd.inline.ruler.enable([
    'footnote_inline',
    'ins',
    'mark',
    'sub',
    'sup'
  ]);

  // Convert markdown to html
  let text = '';
  try {
    text = mdd.render(entryBody)
  } catch (err) {
    console.log(err)
  }

  text = text
    .replace(/(<([^>]+)>)/gi, '') // Remove html tags
    .replace(/\r?\n|\r/g, ' ') // Remove new lines
    .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // Remove urls
    .trim()
    .replace(/ +(?= )/g, '') // Remove all multiple spaces

  if (length) {
    // Truncate
    text = joint(text.split(' '), length)
  }

  if (text) {
    text = he.decode(text) // decode html entities  
  }

  return text
}

export function getPostBodySummary(obj: Entry | string, length?: number): any {
  if (typeof obj === 'string') {
    return postBodySummary(obj as string, length)
  }

  const key = `${makeEntryCacheKey(obj)}-sum-${length}`

  const item = cacheGet(key)
  if (item) {
    return item
  }

  const res = postBodySummary(obj.body, length)
  cacheSet(key, res)

  return res
}
