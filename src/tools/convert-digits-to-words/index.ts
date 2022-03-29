import { convertDigitsToWords } from './convert-digits-to-words';

export interface ConvertDigitsToWordsOptions {
  ordinal?: boolean;
  throwErrorIfInvalid?: boolean;
}

export const convertDigitsToWordsDefaultOptions: ConvertDigitsToWordsOptions = {
  ordinal: false,
  throwErrorIfInvalid: false,
};

export const ones = ['یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
export const ordinalOnes = ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم', 'نهم'];
export const tens = ['بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
export const hundreds = ['یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
export const tensBelowTwenty = [
  'ده',
  'یازده',
  'دوازده',
  'سیزده',
  'چهارده',
  'پانزده',
  'شانزده',
  'هفده',
  'هیجده',
  'نوزده',
];

export default convertDigitsToWords;
