import xss from 'xss'
import { ALLOWED_ATTRIBUTES } from '../consts'

const decodeEntities = (input: string): string =>
  input
    .replace(/&#(\d+);?/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

export function sanitizeHtml(html: string): string {
  return xss(html, {
    whiteList: ALLOWED_ATTRIBUTES,
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['style'],
    css: false, // block style attrs entirely for safety
    onTagAttr: (tag, name, value) => {
      const decoded = decodeEntities(value.trim().toLowerCase());

      if (name.startsWith('on')) return ''; // 🛡 event handlers
      if (tag === 'img' && name === 'src' && (!/^https?:\/\//.test(decoded) || decoded.startsWith('javascript:'))) return '';
      if (tag === 'img' && ['dynsrc', 'lowsrc'].includes(name)) return '';
      if (tag === 'span' && name === 'class' && value === 'wr') return '';

      return undefined;
    }
  });
}
