import {
  ToFixed,
  MoneyFormat, GetBasicUnit, GetFloatLen, ToBasicUnitMoney,
  StripScript, IsUrl, IsFunc, IsObj, IsEmail, IsPhoneNumber,
  HasValue, 
  GenerateNumberRange, WrapNumbPrefix,
  CallFunc, UUID, Random, InArr,
  UnitFormat, DateParseHook, 
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
});