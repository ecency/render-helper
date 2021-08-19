import { traverse } from './traverse.method'
import { sanitizeHtml } from './sanitize-html.method'
import { DOMParser } from '../consts'
import xmldom from 'xmldom'

const lolight = require('lolight')
const Remarkable = require('remarkable')

export function markdownToHTML(input: string, forApp: boolean, webp: boolean): string {
  const md = new Remarkable({
    html: true,
    breaks: true,
    typographer: false,
    linkify: true,
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
