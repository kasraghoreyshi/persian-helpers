import { convertDigitsToWords } from './convert-digits-to-words';

export interface ConvertDigitsToWordsOptions {
  ordinal?: boolean;
  throwErrorIfInvalid?: boolean;
}

export const convertDigitsToWordsDefaultOptions: ConvertDigitsToWordsOptions = {
  ordinal: false,
  throwErrorIfInvalid: false,
};

export const ones = ['یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
  ordinalOnes = ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم', 'نهم'],
  tens = ['بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
  hundreds = ['یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
  tensBelowTwenty = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هیجده', 'نوزده'];

export default convertDigitsToWords;
