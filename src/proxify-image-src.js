let proxyBase = 'https://images.ecency.com';

export const setProxyBase = (p) => {
  proxyBase = p;
};

export default (url, width = 0, height = 0, webp = false) => {
  if (!url) {
    return '';
  }

  if (webp) proxyBase = `${proxyBase}/webp`;

  const prefix = `${proxyBase}/${width}x${height}/`;
  const proxied = `${proxyBase}/0x0/`;

  if (url.startsWith(prefix)) return url;

  if (url.startsWith(proxied) || url.startsWith(proxyBase)) return url.replace(proxied, prefix);

  return `${prefix}${url}`;
};
