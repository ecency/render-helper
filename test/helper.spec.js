/* eslint-disable */

import {expect} from 'chai';

import setup from './setup';

setup();

import {makeEntryCacheKey} from '../src/helper';

describe('Helper', () => {
  it('1- makeEntryCacheKey', () => {
    const input = {
      author: 'foo1',
      permlink: 'bar1',
      last_update: '2019-05-10T09:15:21'
    };

    const expected = 'foo1-bar1-2019-05-10T09:15:21';

    expect(makeEntryCacheKey(input)).to.deep.equal(expected);
  });
});
