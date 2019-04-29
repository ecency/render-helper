/* eslint-disable */

import {assert} from 'chai';

import proxifyImageSrc from '../src/proxify-image-src';

describe('Proxify image src', () => {

  it('(1) should proxify image src', () => {
    const input = 'https://i.imgur.com/muESb0B.png';
    const expected = 'https://steemitimages.com/0x0/https://i.imgur.com/muESb0B.png';

    assert(proxifyImageSrc(input) === expected);
  });

  it('(2) should not proxify if already proxified', () => {
    const input = 'https://steemitimages.com/0x0/https://steemitimages.com/DQmWK9ACVoywHPBJQdoTuJpoTSoaubBSKSAdZaJtw1cfLb9/adsactlywitness.gif';
    const expected = 'https://steemitimages.com/0x0/https://steemitimages.com/DQmWK9ACVoywHPBJQdoTuJpoTSoaubBSKSAdZaJtw1cfLb9/adsactlywitness.gif';

    assert(proxifyImageSrc(input) === expected);
  });
});
