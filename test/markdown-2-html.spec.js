/* eslint-disable */

import {expect} from 'chai';
import setup from './setup';
import {getTestData} from './data';
import markdown2Html from '../src/markdown-2-html';

const fs = require('fs');
const path = require('path');

setup();

describe('Markdown2Html', () => {

  describe('Traversing', () => {

    it('1- Should convert image links to img tag', () => {
      const input = "https://img.esteem.ws/bbq3ob1idy.png";
      const expected = '<p><a data-href="https://img.esteem.ws/bbq3ob1idy.png" class="markdown-img-link"><img src="https://steemitimages.com/0x0/https://img.esteem.ws/bbq3ob1idy.png" /></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('2- Should handle steemit links', () => {
      const input = "<a href='https://steemit.com/esteem/@esteemapp/esteem-monthly-guest-curation-program-4'>click here</a>";
      const expected = '<p><a class="markdown-post-link" data-tag="esteem" data-author="esteemapp" data-permlink="esteem-monthly-guest-curation-program-4">click here</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('3- Should handle copied links', () => {
      const input = "<a href='/esteem/@esteemapp/esteem-monthly-guest-curation-program-4'>click here</a>";
      const expected = '<p><a class="markdown-post-link" data-tag="esteem" data-author="esteemapp" data-permlink="esteem-monthly-guest-curation-program-4">click here</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('4- Should handle copied links', () => {
      const input = "<a href='/esteem/@esteemapp/esteem-monthly-guest-curation-program-4'>click here</a>";
      const expected = '<p><a class="markdown-post-link" data-tag="esteem" data-author="esteemapp" data-permlink="esteem-monthly-guest-curation-program-4">click here</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('5- Should handle youtube videos', () => {
      const input = "https://www.youtube.com/watch?v=qK3d1eoH-Qs";
      const expected = '<p><a class="markdown-video-link markdown-video-link-youtube" data-embed-src="https://www.youtube.com/embed/qK3d1eoH-Qs?autoplay=1"><img class="no-replace video-thumbnail" src="https://img.youtube.com/vi/qK3d1eoH-Qs/hqdefault.jpg" /><span class="markdown-video-play"></span></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('6- Should handle vimeo videos', () => {
      const input = "https://vimeo.com/311983548";
      const expected = '<p><a class="markdown-video-link markdown-video-link-vimeo"><iframe frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/311983548"></iframe></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('7- Should handle d.tube videos', () => {
      const input = '<a href="https://d.tube/#!/v/scottcbusiness/g04n2bbp" title="This link will take you away from steemit.com"><img src="https://steemitimages.com/640x0/https://ipfs.io/ipfs/QmPhb9HA1gASFiNAUPFqMdSidTAj17L5SSoV3zbXUx8M7t"></a>';
      const expected = '<p><a title="This link will take you away from steemit.com" class="markdown-video-link markdown-video-link-dtube" data-video-href="https://d.tube/#!/v/scottcbusiness/g04n2bbp"><img src="https://steemitimages.com/0x0/https://steemitimages.com/640x0/https://ipfs.io/ipfs/QmPhb9HA1gASFiNAUPFqMdSidTAj17L5SSoV3zbXUx8M7t" /><img class="no-replace video-thumbnail" src="https://steemitimages.com/0x0/https://steemitimages.com/640x0/https://ipfs.io/ipfs/QmPhb9HA1gASFiNAUPFqMdSidTAj17L5SSoV3zbXUx8M7t" /><span class="markdown-video-play"></span></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('8- Should handle witnesses links', () => {
      const input = "<a href='https://steemit.com/~witnesses'>vote me</a>";
      const expected = '<p><a class="markdown-witnesses-link" data-href="https://steemit.com/~witnesses">vote me</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('9- Should handle witnesses links', () => {
      const input = "<a href='https://steemconnect.com/sign/account-witness-vote?witness=talhasch'>vote @talhasch</a>";
      const expected = '<p><a class="markdown-witnesses-link" data-href="https://steemconnect.com/sign/account-witness-vote?witness=talhasch">vote @talhasch</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('10- External link', () => {
      const input = "click <a href='https://loremipsum.com/foo/bar.html'>here</a> to visit";
      const expected = '<p>click <a class="markdown-external-link" data-href="https://loremipsum.com/foo/bar.html">here</a> to visit</p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('11- Should remove empty iframes', () => {
      const input = "<iframe></iframe> <code>some content</code>";
      const expected = '<code>some content</code>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('12- Should handle youtube iframe embeds', () => {
      const input = '<iframe width="560" height="315" src="https://www.youtube.com/embed/I3f9ixg59no?foo=bar&baz=000" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      const expected = '<iframe src="https://www.youtube.com/embed/I3f9ixg59no" frameborder="0" allowfullscreen="allowfullscreen"></iframe>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('13- Should handle vimeo iframe embeds', () => {
      const input = '<iframe src="https://player.vimeo.com/video/311983548" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
      const expected = '<iframe src="https://player.vimeo.com/video/311983548" frameborder="0" allowfullscreen="allowfullscreen"></iframe>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('14- Should handle twitch iframe embeds', () => {
      const input = '<iframe src="https://player.twitch.tv/?channel=esl_csgo" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>';
      const expected = '<iframe src="https://player.twitch.tv/?channel=esl_csgo&amp;autoplay=false" frameborder="0" allowfullscreen="true"></iframe>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('15- Should handle soundcloud iframe embeds', () => {
      const input = '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/558749283&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>';
      const expected = '<iframe frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/558749283&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('16- Should replace placeholder for unsopported iframe sources', () => {
      const input = '<iframe src="https://foobarbaz.com/132431212" ></iframe>';
      const expected = '<div class="unsupported-iframe">(Unsupported https://foobarbaz.com/132431212)</div>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('17- Should replace author names with link for given string', () => {
      let input = 'lorem ipsum @dolor sit amet';
      let expected =
        '<p>lorem ipsum <a class="markdown-author-link" data-author="dolor">@dolor</a> sit amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = '@lorem ipsum @dolor sit amet';
      expected =
        '<p><a class="markdown-author-link" data-author="lorem">@lorem</a> ipsum <a class="markdown-author-link" data-author="dolor">@dolor</a> sit amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);


      input = '@lorem @ipsum @dolor sit amet';
      expected =
        '<p><a class="markdown-author-link" data-author="lorem">@lorem</a> <a class="markdown-author-link" data-author="ipsum">@ipsum</a> <a class="markdown-author-link" data-author="dolor">@dolor</a> sit amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);


      input = '@lorem @ipsum @dolor \n @sit amet';
      expected =
        '<p><a class="markdown-author-link" data-author="lorem">@lorem</a> <a class="markdown-author-link" data-author="ipsum">@ipsum</a> <a class="markdown-author-link" data-author="dolor">@dolor</a><br />\n<a class="markdown-author-link" data-author="sit">@sit</a> amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);


      input = '@lorem @ipsum @dolor \n @Sit amet';
      expected =
        '<p><a class="markdown-author-link" data-author="lorem">@lorem</a> <a class="markdown-author-link" data-author="ipsum">@ipsum</a> <a class="markdown-author-link" data-author="dolor">@dolor</a><br />\n<a class="markdown-author-link" data-author="sit">@Sit</a> amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('18- Should replace tags with link for given string', () => {
      let input = 'lorem ipsum #dolor sit amet';
      let expected =
        '<p>lorem ipsum <a class="markdown-tag-link" data-tag="dolor">#dolor</a> sit amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = '#lorem ipsum #dolor sit amet';
      expected =
        '<p><a class="markdown-tag-link" data-tag="lorem">#lorem</a> ipsum <a class="markdown-tag-link" data-tag="dolor">#dolor</a> sit amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = '#lorem #ipsum #dolor sit amet';
      expected =
        '<p><a class="markdown-tag-link" data-tag="lorem">#lorem</a> <a class="markdown-tag-link" data-tag="ipsum">#ipsum</a> <a class="markdown-tag-link" data-tag="dolor">#dolor</a> sit amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = '#lorem #ipsum #dolor \n #sit amet';
      expected =
        '<p><a class="markdown-tag-link" data-tag="lorem">#lorem</a> <a class="markdown-tag-link" data-tag="ipsum">#ipsum</a> <a class="markdown-tag-link" data-tag="dolor">#dolor</a><br />\n<a class="markdown-tag-link" data-tag="sit">#sit</a> amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = '#lorem #ipsum #dolor \n #Sit amet';
      expected =
        '<p><a class="markdown-tag-link" data-tag="lorem">#lorem</a> <a class="markdown-tag-link" data-tag="ipsum">#ipsum</a> <a class="markdown-tag-link" data-tag="dolor">#dolor</a><br />\n<a class="markdown-tag-link" data-tag="sit">#Sit</a> amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = 'you are #1';
      expected = '<p>you are #1</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = 'you are #1 #steemit-promo';
      expected =
        '<p>you are #1 <a class="markdown-tag-link" data-tag="steemit-promo">#steemit-promo</a></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('19- Should replace both mentions and tags', () => {
      let input = 'lorem ipsum #dolor sit @amet';
      let expected =
        '<p>lorem ipsum <a class="markdown-tag-link" data-tag="dolor">#dolor</a> sit <a class="markdown-author-link" data-author="amet">@amet</a></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = 'lorem ipsum @#dolor sit amet';
      expected = '<p>lorem ipsum @#dolor sit amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('20- Should not convert markdown links', () => {
      const input =
        'lorem [this error](https://steemitimages.com/0x0/https://d1vof77qrk4l5q.cloudfront.net/img/5752638e6965247789bc20cef34727263aaa41e1.png) ipsum';
      expect(markdown2Html(input)).to.matchSnapshotJSON();
    });


    it('21- Should add https prefix', () => {
      expect(markdown2Html('<a href="foo">foo</a>').trim()).to.deep.equal(
        '<p><a class="markdown-external-link" data-href="https://foo">foo</a></p>'
      );
    });


    it('22- Should replace busy links properly', () => {
      const data = getTestData(
        'muratkbesiroglu',
        'sci-fi-novel-underground-city-part-13'
      );
      expect(markdown2Html(data.body)).to.matchSnapshotJSON();
    });

  });

  describe('Sanitization', () => {

    it('1- Should remove javascript links', () => {
      const input = "<a href='javascript:void(0)'>click here</a>";
      const expected = "<p><a>click here</a></p>";

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('2- Should convert script tag to span', () => {
      const input = `<script>document.getElementById('body').remove();</script>`;
      const expected = "<span>document.getElementById('body').remove();</span>";

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('3- Should remove not allowed attributes', () => {
      const input = `<a title="Foo" onclick="document.bar()">Click</a>`;
      const expected = '<p><a title="Foo">Click</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('4- Should remove javascript links', () => {
      const input = `<a title="Foo" href="javascript:void(0)">Click</a>`;
      const expected = '<p><a title="Foo">Click</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
  });

  describe('Test files', () => {
    it('1- Should catch images in table', () => {
      const data = getTestData(
        'steemitboard',
        'steemitboard-notify-dunsky-20181210t153450000z'
      );

      expect(markdown2Html(data.body)).to.matchSnapshotJSON();
    });
  });

  describe('Test legacy files', () => {
    const dataDir = `${__dirname}/data/legacy`;
    console.log(dataDir);


    let files = fs.readdirSync(dataDir);

    for (let file of files) {
      if (file === '.DS_Store') {
        continue;
      }
      const fileContents = fs.readFileSync(path.join(dataDir, file), 'utf8');
      let data = JSON.parse(fileContents);

      const id = data['id'];
      const input = data['input'];
      const expected = data['result'];

      it('ID: ' + id, function () {
        expect(markdown2Html(input)).to.deep.equal(expected);
      });
    }


  });
});
