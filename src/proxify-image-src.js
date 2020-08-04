import multihash from 'multihashes';
import querystring from 'querystring';

let proxyBase = 'https://images.ecency.com';

export const setProxyBase = (p) => {
  proxyBase = p;
};


export const extractPHash = (url) => {
  if (url.startsWith(`${proxyBase}/p/`)) {
    const [hash] = url.split('/p/')[1].split('?');
    return hash;
  }
  return null;
};


export const getLatestUrl = (str) => {
  const [last] = [...str.replace(/https?:\/\//g, '\n$&').trim().split('\n')].reverse();
  return last;
};

export default (url, width = 0, height = 0) => {
  if (!url) {
    return '';
  }

  const realUrl = getLatestUrl(url);
  const pHash = extractPHash(realUrl);

  const options = {
    format: 'match',
    mode: 'fit',
  };

  if (width > 0) {
    options.width = width;
  }

  if (height > 0) {
    options.height = height;
  }

  const qs = querystring.stringify(options);

  if (pHash) {
    return `${proxyBase}/p/${pHash}?${qs}`;
  }

  const b58url = multihash.toB58String(Buffer.from(realUrl.toString()));

  return `${proxyBase}/p/${b58url}?${qs}`;
};
