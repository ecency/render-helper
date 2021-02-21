import xmldom from 'xmldom'

export function createDoc(html: string): Document | null {
  if (html.trim() === '') {
    return null
  }

  const parser = new xmldom.DOMParser({
    errorHandler: {warning: () => {}, error: () => {}}
  })

  const doc = parser.parseFromString(html, 'text/html')

  return doc
}

export function domSerializer(): xmldom.XMLSerializer {
  return new xmldom.XMLSerializer()
}

export function makeEntryCacheKey(entry: any): string {
  return `${entry.author}-${entry.permlink}-${entry.last_update}`;
}

