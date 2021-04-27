export function youtubeEmbedSrc(s: string): string {
  const u = new URL(s);
  return `${u.origin}${u.pathname}?autoplay=1&autohide=1&enablejsapi=0&rel=0&origin=https://ecency.com&start=0`;
}
