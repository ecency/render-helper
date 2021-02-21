import LRU from 'lru-cache'

const cache = new LRU(60)

export function setCacheSize(size: number): void {
  cache.max = size
}

export function cacheGet<T extends unknown>(key: string): T {
  return cache.get(key) as T
}

export function cacheSet(key: string, value: unknown): void {
  cache.set(key, value)
}
