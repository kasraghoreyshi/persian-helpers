import { SupportedLanguages } from '../../types';
import { generateSlug } from './slug-generator';

export type LetterType = { [key in SupportedLanguages]: string };

export interface SlugGeneratorOptions {
  separator?: string;
  includeUpperCase?: boolean;
  to?: SupportedLanguages;
}

export const slugGeneratorDefaultOptions: SlugGeneratorOptions = {
  includeUpperCase: false,
  separator: '-',
  to: 'en',
};

export const letters: LetterType[] = [
  { en: 'a', fa: 'ا' },
  { en: 'a', fa: 'آ' },
  { en: 'b', fa: 'ب' },
  { en: 'p', fa: 'پ' },
  { en: 't', fa: 'ت' },
  { en: 's', fa: 'ث' },
  { en: 'j', fa: 'ج' },
  { en: 'ch', fa: 'چ' },
  { en: 'h', fa: 'ح' },
  { en: 'kh', fa: 'خ' },
  { en: 'd', fa: 'د' },
  { en: 'z', fa: 'ذ' },
  { en: 'r', fa: 'ر' },
  { en: 'z', fa: 'ز' },
  { en: 'zh', fa: 'ژ' },
  { en: 's', fa: 'س' },
  { en: 'c', fa: 'س' },
  { en: 'sh', fa: 'ش' },
  { en: 's', fa: 'ص' },
  { en: 'z', fa: 'ض' },
  { en: 't', fa: 'ط' },
  { en: 'z', fa: 'ظ' },
  { en: 'a', fa: 'ع' },
  { en: 'gh', fa: 'غ' },
  { en: 'f', fa: 'ف' },
  { en: 'gh', fa: 'ق' },
  { en: 'k', fa: 'ک' },
  { en: 'g', fa: 'گ' },
  { en: 'l', fa: 'ل' },
  { en: 'm', fa: 'م' },
  { en: 'n', fa: 'ن' },
  { en: 'o', fa: 'و' },
  { en: 'h', fa: 'ه' },
  { en: 'y', fa: 'ی' },
  { en: 'i', fa: 'ی' },
  { en: 'e', fa: 'ی' },
];

export default generateSlug;
