import seperateDigitsBySeparator from '../tools/digits-separator';

test('Seperate Digits By Comma In A String', () => {
  expect(seperateDigitsBySeparator('۱۰۰۰۰۰۰', { separator: ',' })).toBe('۱,۰۰۰,۰۰۰');
});

test('Seperate Digits By Comma In A String With Letters', () => {
  expect(
    seperateDigitsBySeparator('مبلغ این محصول ۱۰۰۰۰۰۰ تومان می باشد.', {
      separator: ',',
    }),
  ).toBe('مبلغ این محصول ۱,۰۰۰,۰۰۰ تومان می باشد.');
});
