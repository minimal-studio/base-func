import {
  RemoveArrayItem
} from '../ts/array';
import {
  CallFunc
} from '../ts/call';
import {
  DateFormat, ToUTC, TimeFormat, DateRange
} from '../ts/datetime-helper';
import DebounceClass from '../ts/debounce';
import {
  EventEmitter
} from '../ts/event-emitter';
import {
  StripScript, IsUrl, IsFunc, IsObj, IsEmail, IsPhoneNumber,
  HasValue, InArr,
} from '../ts/filter';
import {
  UUID, GenerteID, WrapNumbPrefix, GenerateNumberRange, Random
} from '../ts/generation';
import {
  GetBasicUnit, MoneyFormat, SetBasicUnit, ToBasicUnitMoney, UnitFormat
} from '../ts/money';
import numTransformToCN from '../ts/num-to-cn';
import {
  GetFloatLen, SetFloatLen, ToFixed, ToggleBasicFloatLen
} from '../ts/number';

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
    expect(MoneyFormat(-money * basicUnit, GetFloatLen(), basicUnit)).toMatch('-100,000.0000');
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
    expect(GenerteID(5).length).toBe(5);
  });
  test('GenerateNumberRange', () => {
    expect(GenerateNumberRange([0, 5])).toStrictEqual(['0', '1', '2', '3', '4', '5']);
  });
  test('UnitFormat', () => {
    expect(UnitFormat(1000, 'yuan')).toBe('1000');
    expect(UnitFormat(1000, 'jiao')).toBe('100');
    expect(UnitFormat(1000, 'fen')).toBe('10');
    expect(UnitFormat(1000, 'li')).toBe('1');
    expect(UnitFormat(1000, 'hao')).toBe('0.1');
  });
  test('InArr', () => {
    expect(InArr([0, 5], 0)).toBe(true);
    expect(InArr([0, 5], 6)).toBe(false);
  });
  test('Test deduplication', () => {
    expect([0, 0, 0, 0, 5].deduplication()).toStrictEqual(['0', '5']);
  });
  test('Random range tester', () => {
    expect(Random([0, 5])).toBeLessThanOrEqual(5);
    expect(Random([2, 5])).toBeGreaterThanOrEqual(2);
  });
  test('RemoveArrayItem', () => {
    expect(RemoveArrayItem([0, 5], 0)).toStrictEqual([5]);
  });
});

describe('Test Date helper', () => {
  test('DateFormat', () => {
    expect(DateFormat('2019/11/12')).toBe('2019-11-12');
  });
  test('DateFormat 2', () => {
    expect(DateFormat('2019-11-12', 'YYYY/MM/DD')).toBe('2019/11/12');
  });
  test('DateFormat 3', () => {
    expect(DateFormat('2019-11-12 12:11:21', 'YYYY/MM/DD hh:mm:ss')).toBe('2019/11/12 12:11:21');
  });
  test('Invalid DateFormat', () => {
    expect(DateFormat('2019-11-12 12:11:111', 'YYYY/MM/DD hh:mm:ss')).toBe('2019-11-12 12:11:111');
  });
  // test('ToUTC', () => {
  //   expect(ToUTC('2019-11-12 12:11:11')).toBe('2019-11-12T12:11:11+08:00');
  // });
  test('TimeFormat', () => {
    expect(TimeFormat(1111)).toStrictEqual({ hour: '00', min: '18', sec: '31' });
    expect(TimeFormat(1111, true)).toBe('0:18:31');
  });
  // test('DateRange', () => {
  //   expect(DateRange(0, 10)).toStrictEqual({ hour: '00', min: '18', sec: '31' });
  // });
});
