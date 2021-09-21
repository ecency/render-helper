import he from 'he'
import { makeEntryCacheKey } from './helper'
import { cacheGet, cacheSet } from './cache'
import { Entry } from './types'

const lolight = require('lolight')
const { Remarkable } = require('remarkable')

const joint = (arr: string[], limit = 200) => {
  let result = '';
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
  return result.trim();
};

function postBodySummary(entryBody: string, length?: number): string {
  if (!entryBody) {
    return ''
  }

  const md = new Remarkable({
    html: true,
    breaks: true,
    highlight: function (str: string) {
      try {
        const tokens = lolight.tok(str);
        return tokens.map(
          (token: string[]) => `<span class="ll-${token[0]}">${token[1]}</span>`
        ).join('')
      } catch (err) { console.error(err) }

      return str
    }
  })
  // Convert markdown to html
  let text = md.render(entryBody)

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

  text = he.decode(text) // decode html entities

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
