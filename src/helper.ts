import xmldom from 'xmldom'
import { DOMParser } from './consts'

export function createDoc(html: string): Document | null {
  if (html.trim() === '') {
    return null
  }

  const doc = DOMParser.parseFromString(html, 'text/html')

  return doc
}

export function domSerializer(): xmldom.XMLSerializer {
  return new xmldom.XMLSerializer()
}

export function makeEntryCacheKey(entry: any): string {
  return `${entry.author}-${entry.permlink}-${entry.last_update}`
}

