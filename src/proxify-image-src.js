let proxyBase = 'https://images.ecency.com';

export const setProxyBase = (p) => {
  proxyBase = p;
};

export default (url, width = 0, height = 0) => {
  if (!url) {
    return '';
  }

  const prefix = `${proxyBase}/${width}x${height}/`;

  if (url.startsWith(proxyBase)) return url;

  return `${prefix}${url}`;
};
