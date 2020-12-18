import {
  generateDateToText,
  checkIsKeywordIn,
  convertUnitToNumber,
  checkIsBigger,
  unitizedValue,
} from '../utils/index';

describe('generateDateToText', function () {
  it('should return text of data format when given a date object', () => {
    const mockedDateOne = new Date(2017, 11, 10, 16);
    const mockedDateTwo = new Date(2018, 5, 2, 10);
    const mockedDateThree = new Date(2020, 8, 30, 2);
    const mockedDateFour = new Date(2002, 1, 12, 5);

    expect(generateDateToText(mockedDateOne)).toBe('2017년 12월 10일 16시');
    expect(generateDateToText(mockedDateTwo)).toBe('2018년 06월 02일 10시');
    expect(generateDateToText(mockedDateThree)).toBe('2020년 09월 30일 02시');
    expect(generateDateToText(mockedDateFour)).toBe('2002년 02월 12일 05시');
  });
});

describe('checkIsKeywordIn', function () {
  const mockedDataOne = {
    title: '네셔널지오그래픽 숏패딩 M팝니다',
    itemName: '네셔널지오그래픽 숏패딩 M',
    description: '작년에 매장에서 30주고 구매했음',
  };
  const mockedDataTwo = {
    title: '나이키 더블스우시 후드티 M 팝니다.',
    itemName: '나이키 더블스우시 후드티 M',
    description: '상태 좋아요 경매해봅시다.',
  };
  const mockedDataThree = {
    title: '여자 구두팝니다.',
    itemName: '여자 구두',
    description: '이구두를 4만원 초반대에 구입했어용',
  };

  it('should return true when keyword is found in target', () => {
    expect(checkIsKeywordIn('네셔널지오', mockedDataOne)).toBe(true);
    expect(checkIsKeywordIn('나이키', mockedDataTwo)).toBe(true);
    expect(checkIsKeywordIn('구두', mockedDataThree)).toBe(true);
  });

  it('should return false when keyword is not found in target', () => {
    expect(checkIsKeywordIn('자연파괴', mockedDataOne)).toBe(false);
    expect(checkIsKeywordIn('아디다스', mockedDataTwo)).toBe(false);
    expect(checkIsKeywordIn('운동화', mockedDataThree)).toBe(false);
  });

  describe('convertUnitToNumber', function () {
    it('should return Number when given a unit', () => {
      const mockedDataOne = '2,455,666';
      const mockedDataTwo = '2,000,000';
      const mockedDataThree = '1,234,567';
      const mockedDataFour = '123,456,789';

      expect(convertUnitToNumber(mockedDataOne)).toBe(2455666);
      expect(convertUnitToNumber(mockedDataTwo)).toBe(2000000);
      expect(convertUnitToNumber(mockedDataThree)).toBe(1234567);
      expect(convertUnitToNumber(mockedDataFour)).toBe(123456789);
    });
  });

  describe('checkIsBigger', function () {
    it('should return Boolen whether first parameter is bigger than second parameter', () => {
      const source = '2,455,666';
      const target = '2,000,000';
      const sourceTwo = '1,234,567';
      const targetTwo = '123,456,789';

      expect(checkIsBigger(source, target)).toBe(true);
      expect(checkIsBigger(sourceTwo, targetTwo)).toBe(false);
    });
  });

  describe('unitizedValue', function () {
    it('should return unit String when given a number of string', () => {
      const mockedDataOne = '2455666';
      const mockedDataTwo = '2000000';
      const mockedDataThree = '1234567';
      const mockedDataFour = '123456789';

      expect(unitizedValue(mockedDataOne)).toBe('2,455,666');
      expect(unitizedValue(mockedDataTwo)).toBe('2,000,000');
      expect(unitizedValue(mockedDataThree)).toBe('1,234,567');
      expect(unitizedValue(mockedDataFour)).toBe('123,456,789');
    });
  });
});
