import * as multihash from 'multihashes';
import * as querystring from 'querystring';

let proxyBase = 'https://images.ecency.com';

export const setProxyBase = (p) => {
  proxyBase = p;
};

export default (url, width = 0, height = 0) => {
  if (!url) {
    return '';
  }
  const legacyProxied = `${proxyBase}/0x0/`;
  // const legacyProxySized = `${proxyBase}/${width}x${height}/`;
  const proxied = `${proxyBase}/p/`;
  let phash = '';

  if (url.startsWith(legacyProxied)) url = url.replace(legacyProxied, '');
  // if (url.startsWith(legacyProxySized)) url = url.replace(legacyProxySized, '');
  if (url.startsWith(proxied)) [phash] = url.split('/p/')[1].split('?');

  const options = {
    format: 'match',
    mode: 'fit',
  };
  if (width > 0) { options.width = width; }
  if (height > 0) { options.height = height; }
  const qs = querystring.stringify(options);
  if (phash) {
    return `${proxyBase}/p/${phash}?${qs}`;
  }
  const b58url = multihash.toB58String(Buffer.from(url.toString()));
  return `${proxyBase}/p/${b58url}?${qs}`;
};
