import { XSSWhiteList } from '../types'

export const ALLOWED_ATTRIBUTES: XSSWhiteList = {
  'a': [
    'href',
    'target',
    'rel',
    'data-permlink',
    'data-tag',
    'data-author',
    'data-href',
    'data-community',
    'data-filter',
    'data-embed-src',
    'data-video-href',
    'data-proposal',
    'class',
    'title'
  ],
  'img': ['src', 'alt', 'class'],
  'span': ['class'],
  'iframe': ['src', 'frameborder', 'allowfullscreen', 'webkitallowfullscreen', 'mozallowfullscreen', 'sandbox'],
  'div': ['class'],
  'strong': [],
  'b': [],
  'i': [],
  'strike': [],
  'em': [],
  'code': [],
  'pre': [],
  'blockquote': ['class'],
  'sup': [],
  'sub': [],
  'h1': [],
  'h2': [],
  'h3': [],
  'h4': [],
  'h5': [],
  'h6': [],
  'p': [],
  'center': [],
  'ul': [],
  'ol': [],
  'li': [],
  'table': [],
  'thead': [],
  'tbody': [],
  'tr': [],
  'td': [],
  'th': [],
  'hr': [],
  'br': [],
  'del': [],
  'ins': []
}
