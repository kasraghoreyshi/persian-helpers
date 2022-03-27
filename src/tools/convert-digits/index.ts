import { SupportedLanguages } from '../../types';
import { convertDigits } from './convert-digits';

export type ConvertDigitsInput = string | any | number;

export interface ConvertDigitsOptions {
  to?: SupportedLanguages;
  separator?: string | boolean;
}

export const convertDigitsDefaultOptions: ConvertDigitsOptions = {
  to: 'fa',
  separator: undefined,
};

export default convertDigits;
