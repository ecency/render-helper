import proxifyImageSrc from './proxify-image-src';
import markdown2html from './markdown-2-html';
import {createDoc, makeEntryCacheKey} from './helper';

const cache = {};

const image = (entry, width = 0, height = 0) => {
  // return from json metadata if exists
  let meta;

  try {
    meta = JSON.parse(entry.json_metadata);
  } catch (e) {
    meta = null;
  }

  if (meta && meta.image && meta.image.length > 0) {
    if (meta.image[0]) {
      return proxifyImageSrc(meta.image[0], width, height);
    }
  }

  // try to find first image from post body
  const html = markdown2html(entry);
  const doc = createDoc(html);
  if (!doc) {
    return null;
  }

  const imgEls = doc.getElementsByTagName('img');
  if (imgEls.length >= 1) {
    const src = imgEls[0].getAttribute('src');
    return proxifyImageSrc(src, width, height);
  }

  return null;
};

export default (obj, width = 0, height = 0) => {
  if (typeof obj === 'string') {
    return image(obj, width, height);
  }
  const key = makeEntryCacheKey(obj);

  if (cache[key] !== undefined) {
    return cache[key];
  }

  const res = image(obj, width, height);

  cache[key] = res;

  return res;
};
