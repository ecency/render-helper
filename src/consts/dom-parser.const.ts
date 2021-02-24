import xmldom from 'xmldom'
import { noop } from '../methods'

export const DOMParser = new xmldom.DOMParser({
  errorHandler: { warning: noop, error: noop }
})
