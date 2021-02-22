import { traverse } from './traverse.method'
import { sanitizeHtml } from './sanitize-html.method'
import { Remarkable } from 'remarkable'
import xmldom from 'xmldom'
import { noop } from './noop.method'

export function markdownToHTML(input: string, forApp: boolean, webp: boolean): string {
  const md = new Remarkable({ html: true, breaks: true, typographer: false, linkify: true })
  const DOMParser = new xmldom.DOMParser({
    errorHandler: { warning: noop, error: noop }
  })
  const XMLSerializer = new xmldom.XMLSerializer()

  if (!input) {
    return ''
  }

  let output

  try {
    output = md.render(input)
    const doc = DOMParser.parseFromString(`<body id="root">${output}</body>`, 'text/html')

    traverse(doc, forApp, 0, webp)

    output = XMLSerializer.serializeToString(doc)
  } catch (error) {
    output = ''
  }

  output = output.replace(/ xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g, '')
    .replace('<body id="root">', '')
    .replace('</body>', '')
    .trim()

  return sanitizeHtml(output)
}
