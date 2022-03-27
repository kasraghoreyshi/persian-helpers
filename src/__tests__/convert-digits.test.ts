const { default: convertDigits } = require('../tools/convert-digits');

test('Convert Number To Persian String', () => {
  expect(convertDigits(123)).toBe('۱۲۳');
});

test('Convert Number To English String', () => {
  expect(convertDigits('۱۲۳ test ۴۵۶', { to: 'en' })).toBe('123 test 456');
});

test('Convert Number To Persian String separated With Commas', () => {
  expect(convertDigits(123456789, { separator: '٬' })).toBe('۱۲۳٬۴۵۶٬۷۸۹');
});

test('Convert Number To Persian String separated With Custom Separator', () => {
  expect(convertDigits(123456789, { separator: '-' })).toBe('۱۲۳-۴۵۶-۷۸۹');
});

test('Convert String With English Digits To Persian Digits String', () => {
  expect(convertDigits('foo 1234 bar 567baz89')).toBe('foo ۱۲۳۴ bar ۵۶۷baz۸۹');
});

test('Convert String With English Digits To Persian Digits String With Commas', () => {
  expect(
    convertDigits('foo 1234 bar 5637baz89333', {
      separator: '٬',
    }),
  ).toBe('foo ۱٬۲۳۴ bar ۵٬۶۳۷baz۸۹٬۳۳۳');
});

test('Convert Array With English Digits To Persian Digits Array', () => {
  expect(convertDigits([123, { test: '11۱' }, '4foo5bar6', [789]])).toStrictEqual([
    '۱۲۳',
    { test: '۱۱۱' },
    '۴foo۵bar۶',
    ['۷۸۹'],
  ]);
});
