const { default: convertDigits } = require('../tools/convert-digits');

test('Convert Number To Persian String', () => {
  expect(convertDigits(123)).toBe('۱۲۳');
  expect(convertDigits(1234567890)).toBe('۱۲۳۴۵۶۷۸۹۰');
  expect(convertDigits(0)).toBe('۰');
});

test('Convert Number To English String', () => {
  expect(convertDigits('۱۲۳۰ test ۴۵۶', { to: 'en' })).toBe('1230 test 456');
  expect(convertDigits('−۱۰', { to: 'en' })).toBe('−10');
});

test('Convert Number To Persian String separated With Commas', () => {
  expect(convertDigits(123456789, { separator: '٬' })).toBe('۱۲۳٬۴۵۶٬۷۸۹');
  expect(convertDigits(1023456789, { separator: '٬' })).toBe('۱٬۰۲۳٬۴۵۶٬۷۸۹');
  expect(convertDigits(99999999999999999999999999999999999999999, { separator: '٬' })).toBe(
    '۱۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰٬۰۰۰',
  );
  expect(convertDigits('99999999999999999999999999999999999999999', { separator: '٬' })).toBe(
    '۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹',
  );
});

test('Convert Number To Persian String separated With Custom Separator', () => {
  expect(convertDigits(123456789, { separator: '-' })).toBe('۱۲۳-۴۵۶-۷۸۹');
});

test('Convert String With English Digits To Persian Digits String', () => {
  expect(convertDigits('foo 1234 bar 567baz89')).toBe('foo ۱۲۳۴ bar ۵۶۷baz۸۹');
  expect(
    convertDigits(
      'در 1 روز بارانی 20 کتاب خریدم و تصمیم گرفتم به 10 شهر سفر کنم. بین 6_10 شهر را تا به حال دیدم و فعلا 1.5 میلیون تومان خرج شده.',
    ),
  ).toBe(
    'در ۱ روز بارانی ۲۰ کتاب خریدم و تصمیم گرفتم به ۱۰ شهر سفر کنم. بین ۶_۱۰ شهر را تا به حال دیدم و فعلا ۱.۵ میلیون تومان خرج شده.',
  );
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
