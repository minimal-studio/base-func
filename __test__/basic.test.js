import {
  ToFixed,
  MoneyFormat, GetBasicUnit, GetFloatLen, ToBasicUnitMoney,
  StripScript, IsUrl, IsFunc, IsObj, IsEmail, IsPhoneNumber,
  HasValue, 
  GenerateNumberRange, WrapNumbPrefix,
  CallFunc, UUID, Random, InArr,
  UnitFormat, 
  RemoveArrayItem
} from '../src';

test('ToFixed 10.1111 to 10.11', () => {
  expect(ToFixed(10.1111, 2)).toBe(10.11);
});

describe('Test MoneyFormat', () => {
  const money = 100000;
  const basicUnit = GetBasicUnit();
  test('basicUnit: 10000', () => {
    expect(basicUnit).toBe(10000);
  });
  test('MoneyFormat: 100000, basicUnit 10000, floatLen 4 to 100,000.0000', () => {
    expect(MoneyFormat(money * basicUnit, GetFloatLen(), basicUnit)).toMatch('100,000.0000');
  });
  test('MoneyFormat: -100000, basicUnit 10000, floatLen 4 to -100,000.0000', () => {
    expect(MoneyFormat(- money * basicUnit, GetFloatLen(), basicUnit)).toMatch('-100,000.0000');
  });
  test('MoneyFormat: 100000 * 10000 with toFixed(2) to 100,000.00', () => {
    expect(MoneyFormat(money * basicUnit, 2)).toMatch('100,000.00');
  });
  test('ToBasicUnitMoney: 100000 to time basicUnit', () => {
    expect(ToBasicUnitMoney(money)).toBe(1000000000);
  });
});

describe('Test functional functions', () => {
  test('StripScript: Escape script tag', () => {
    expect(StripScript('/script><script>test</script')).toMatch('test');
  });
  test('IsUrl: match url', () => {
    expect(IsUrl('http://abc.com')).toBe(true);
  });
  test('HasValue', () => {
    expect(HasValue(0)).toBe(true);
  });
  test('IsFunc', () => {
    const fn = () => {};
    const fakeFn = '() => {}';
    expect(IsFunc(fn)).toBe(true);
    expect(IsFunc(fakeFn)).toBe(false);
  });
  test('IsObj', () => {
    const obj = {};
    const fakeObj = '() => {}';
    expect(IsObj(obj)).toBe(true);
    expect(IsObj(fakeObj)).toBe(false);
  });
  test('IsEmail', () => {
    const email = 'test@gmail.com';
    const fake = '123qwe';
    expect(IsEmail(email)).toBe(true);
    expect(IsEmail(fake)).toBe(false);
  });
  test('IsPhoneNumber', () => {
    const phone = '13344445555';
    const fake = '133131313';
    expect(IsPhoneNumber(phone)).toBe(true);
    expect(IsPhoneNumber(fake)).toBe(false);
  });
  test('WrapNumbPrefix', () => {
    expect(WrapNumbPrefix(2, true)).toMatch('02');
    expect(WrapNumbPrefix(10, true)).toBe('10');
  });
  test('UUID length', () => {
    expect(UUID(5).length).toBe(5);
  });
});
