import { youtubeEmbedSrc } from './helper'

describe('youtubeEmbedSrc', () => {
  it('1- should create proper youtube embed url', () => {
    const input = 'https://www.youtube.com/embed/SCgX4ixCRcQ?autoplay=1'

    expect(youtubeEmbedSrc(input)).toBe('https://www.youtube.com/embed/SCgX4ixCRcQ?autoplay=1&autohide=1&enablejsapi=0&rel=0&origin=https://ecency.com&start=0')
  })
})




