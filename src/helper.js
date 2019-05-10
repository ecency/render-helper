import xmldom from 'xmldom';

export const createDoc = (html) => {
  if (html.trim() === '') {
    return null;
  }

  const noop = () => {
  };

  const parser = new xmldom.DOMParser({
    errorHandler: {warning: noop, error: noop}
  });

  const doc = parser.parseFromString(html, 'text/html');

  return doc;
};


export const domSerializer = () => new xmldom.XMLSerializer();


export const makeEntryCacheKey = entry => `${entry.author}-${entry.permlink}-${entry.last_update}`;
