const { default: convertDigitsToWords } = require('../tools/convert-digits-to-words');

test('Convert Number To Persian Words', () => {
  expect(convertDigitsToWords(1234)).toBe('یک هزار و دویست و سی و چهار');
  expect(convertDigitsToWords(9999999999999999999999999999999999)).toBe(undefined);
  expect(convertDigitsToWords(1)).toBe('یک');
  expect(convertDigitsToWords(12)).toBe('دوازده');
  expect(convertDigitsToWords(41)).toBe('چهل و یک');
  expect(convertDigitsToWords(9999)).toBe('نه هزار و نهصد و نود و نه');
  expect(convertDigitsToWords(9876)).toBe('نه هزار و هشتصد و هفتاد و شش');
  expect(convertDigitsToWords(1500000)).toBe('یک میلیون و پانصد هزار');
});

test('Convert Number To Persian Words With Persian Digits As Input', () => {
  expect(convertDigitsToWords('۱۲۳۴')).toBe('یک هزار و دویست و سی و چهار');
  expect(convertDigitsToWords('۱۲۰۰')).toBe('یک هزار و دویست');
});

test('Convert Number To Persian Words With Ordinal Enabled', () => {
  expect(convertDigitsToWords(1233, { ordinal: true })).toBe('یک هزار و دویست و سی و سوم');
  expect(convertDigitsToWords(1231, { ordinal: true })).toBe('یک هزار و دویست و سی و یکم');
  expect(convertDigitsToWords(5, { ordinal: true })).toBe('پنجم');
  expect(convertDigitsToWords('۸۹', { ordinal: true })).toBe('هشتاد و نهم');
  expect(convertDigitsToWords('41', { ordinal: true })).toBe('چهل و یکم');
  expect(convertDigitsToWords('1', { ordinal: true })).toBe('اول');
  expect(convertDigitsToWords('2', { ordinal: true })).toBe('دوم');
  expect(convertDigitsToWords('3', { ordinal: true })).toBe('سوم');
  expect(convertDigitsToWords(9999, { ordinal: true })).toBe('نه هزار و نهصد و نود و نهم');
  expect(convertDigitsToWords(9876, { ordinal: true })).toBe('نه هزار و هشتصد و هفتاد و ششم');
  expect(convertDigitsToWords(1500000, { ordinal: true })).toBe('یک میلیون و پانصد هزارم');
  expect(convertDigitsToWords(1000000, { ordinal: true })).toBe('یک میلیونم');
  expect(convertDigitsToWords(10, { ordinal: true })).toBe('دهم');
  expect(convertDigitsToWords(100, { ordinal: true })).toBe('یکصدم');
  expect(convertDigitsToWords(1000, { ordinal: true })).toBe('یک هزارم');
});

test('Throw Error In Case Of Invalid Input With throwErrorIfInvalid Enabled', () => {
  expect(() => {
    convertDigitsToWords('23essjasiiu', { throwErrorIfInvalid: true });
  }).toThrow();
  expect(() => {
    convertDigitsToWords(undefined, { throwErrorIfInvalid: true });
  }).toThrow();
});
