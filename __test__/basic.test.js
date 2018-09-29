import { ToFixed } from '../src';

test('ToFixed 10.1111 to 10.11', () => {
  expect(ToFixed(10.1111, 2)).toBe(10.11);
});