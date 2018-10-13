import 'should';
// @todo importing from build has some awful impact on coverage. Check it out!
// import bibleClient from '../build/lib';
import BibleClient from 'lib';

describe('Bible Client: Search method', () => {
  const bibleClient = BibleClient.create();
  const errorMsg = (msg) => `"${msg}" reference param provided must be a valid string`;

  it('should fail if word param is not an string: null', () =>
    bibleClient.search(null).should.be.rejectedWith(Error, {
      message: errorMsg('null'),
    }));

  it('should fail if word param is not an string: undefined', () =>
    bibleClient.search(undefined).should.be.rejectedWith(Error, {
      message: errorMsg('undefined'),
    }));

  it('should fail if word param is not an string: NaN', () =>
    bibleClient.search(NaN).should.be.rejectedWith(Error, {
      message: errorMsg('NaN'),
    }));

  it('should fail if word param is not an string: Number', () =>
    bibleClient.search(123123).should.be.rejectedWith(Error, {
      message: errorMsg('123123'),
    }));

  it('should fail if word param is not an string: boolean', () =>
    bibleClient.search(true).should.be.rejectedWith(Error, {
      message: errorMsg('true'),
    }));

  it('should fail if word param is not an string: object', () =>
    bibleClient.search({}).should.be.rejectedWith(Error, {
      message: errorMsg('[object Object]'),
    }));

  it('should fail if word param is not an string: function', () =>
    bibleClient.search(() => { }).should.be.rejectedWith(Error, {
      message: errorMsg('function () {}'),
    }));

  it('should fail if word param is an empty string', () =>
    bibleClient.search('').should.be.rejectedWith(Error, {
      message: errorMsg(''),
    }));

  it('should success if word param is a single existing real lema', () =>
    bibleClient.search('gen1:1').should.be.fulfilled());
});
