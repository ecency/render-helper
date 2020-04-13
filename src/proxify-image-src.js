let proxyBase = 'https://avatars.esteem.app';

export const setProxyBase = (p) => {
  proxyBase = p;
};

export default (url, width = 0, height = 0) => {
  if (!url) {
    return '';
  }

  const prefix = `${proxyBase}/${width}x${height}/`;

  if (url.startsWith(prefix)) return url;

  return `${prefix}${url}`;
};
