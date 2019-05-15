import he from 'he';
import Remarkable from 'remarkable';
import {makeEntryCacheKey} from './helper';

const cache = {};

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

export const _postBodySummary = (entry, length) => postBodySummary(entry.body, length);

export default (entry, length) => {
  const key = `${makeEntryCacheKey(entry)}-${length}`;

  if (cache[key] !== undefined) {
    return cache[key];
  }

  const res = postBodySummary(entry.body, length);
  cache[key] = res;

  return res;
};
