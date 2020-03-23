/* eslint-disable */

import {expect} from 'chai';

import proxifyImageSrc, {setProxyBase} from '../src/proxify-image-src';

describe('Proxify image src', () => {

  it('1- should proxify image src', () => {
    const input = 'https://i.imgur.com/muESb0B.png';
    const expected = 'https://images.hive.blog/0x0/https://i.imgur.com/muESb0B.png';

    expect(proxifyImageSrc(input)).to.deep.equal(expected);
  });

  it('2- should not proxify if already proxified', () => {
    const input = 'https://images.hive.blog/0x0/https://images.hive.blog/DQmWK9ACVoywHPBJQdoTuJpoTSoaubBSKSAdZaJtw1cfLb9/adsactlywitness.gif';
    const expected = 'https://images.hive.blog/0x0/https://images.hive.blog/DQmWK9ACVoywHPBJQdoTuJpoTSoaubBSKSAdZaJtw1cfLb9/adsactlywitness.gif';

    expect(proxifyImageSrc(input)).to.deep.equal(expected);
  });

  it('3- set proxy base', () => {
    setProxyBase('https://img.esteem.app');

    const input = 'https://i.imgur.com/muESb0B.png';
    const expected = 'https://img.esteem.app/0x0/https://i.imgur.com/muESb0B.png';

    expect(proxifyImageSrc(input)).to.deep.equal(expected);
  });
});
