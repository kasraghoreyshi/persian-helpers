import separateDigitsBySeparator from '../tools/digits-separator';

test('separate Digits By Comma In A String', () => {
  expect(separateDigitsBySeparator('۱۰۰۰۰۰۰', { separator: ',' })).toBe('۱,۰۰۰,۰۰۰');
});

test('separate Digits By Comma In A String With Letters', () => {
  expect(
    separateDigitsBySeparator('مبلغ این محصول ۱۰۰۰۰۰۰ تومان می باشد.', {
      separator: ',',
    }),
  ).toBe('مبلغ این محصول ۱,۰۰۰,۰۰۰ تومان می باشد.');
});
