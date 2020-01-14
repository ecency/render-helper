import LRU from 'lru-cache';
import he from 'he';
import Remarkable from 'remarkable';
import {makeEntryCacheKey} from './helper';

const cache = new LRU(60);

const md = new Remarkable({html: true, breaks: true, linkify: false});

const postBodySummary = (entryBody, length) => {
  if (!entryBody) {
    return '';
  }

  // Convert markdown to html
  let text = md.render(entryBody);

  text = text
    .replace(/(<([^>]+)>)/gi, '') // Remove html tags
    .replace(/\r?\n|\r/g, ' ') // Remove new lines
    .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // Remove urls
    .trim()
    .replace(/ +(?= )/g, ''); // Remove all multiple spaces

  if (length) {
    // Truncate
    text = text.substring(0, length);
  }

  text = he.decode(text); // decode html entities

  return text;
};

export default (obj, length) => {
  if (typeof obj === 'string') {
    return postBodySummary(obj, length);
  }

  const key = `${makeEntryCacheKey(obj)}-${length}`;

  const item = cache.get(key);
  if (item) {
    return item;
  }

  const res = postBodySummary(obj.body, length);
  cache.set(key, res);

  return res;
};
