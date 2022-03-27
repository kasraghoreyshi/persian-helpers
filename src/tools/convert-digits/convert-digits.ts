import { convertDigitsDefaultOptions, ConvertDigitsInput, ConvertDigitsOptions } from '.';
import { getDefaultOptions } from '../../getDefaultOptions';
import seperateDigitsBySeparator from '../digits-separator';

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

const stringHandler = (input: any, to: ConvertDigitsOptions['to']) => {
  let regex: RegExp;
  switch (to) {
    default:
    case 'fa':
      regex = /\d/g;
      break;
    case 'en':
      regex = /[\u06F0-\u06F90-9]/g;
      break;
  }

  return input.replace(regex, (index: number) => {
    return to === 'fa'
      ? persianDigits[index]
      : persianDigits.indexOf(index.toString()) > 0
      ? persianDigits.indexOf(index.toString())
      : index;
  });
};

const numberHandler = (input: number, options: ConvertDigitsOptions) => {
  const result = input.toLocaleString(options.to);
  const separator = (options.separator as string) || '';
  return result.replace(/٬|,/g, separator);
};

const objectHandler = (input: any, options: ConvertDigitsOptions) => {
  // Remember that null is also an object in JS
  if (input === null) return input;
  const output = input;
  // Since arrays are also considered objects, we will check in here
  // And handle each one slightly differently.
  if (Array.isArray(input)) {
    input.forEach((value, index) => {
      // This calls the main function so that even if the input is a nested array,
      // It would convert every single child.
      output[index] = convertDigits(value, options);
    });
  } else {
    Object.keys(input).forEach((key) => {
      const value = input[key];
      output[key] = convertDigits(value, options);
    });
  }
  return output;
};

/**
 * Convert digits in a string | number | array | object to persian | english
 */
export const convertDigits = (input: ConvertDigitsInput, optionsParam?: ConvertDigitsOptions) => {
  const options: ConvertDigitsOptions = getDefaultOptions(optionsParam, convertDigitsDefaultOptions);
  // separator = true is just a shorthand for "٬"
  // So therefore, we need to set it here.
  if (optionsParam?.separator === true) options.separator = '٬';
  switch (typeof input) {
    case 'string':
      const stringResult = stringHandler(input, options.to);
      if (options.separator)
        return seperateDigitsBySeparator(stringResult, {
          separator: options.separator as string,
        });
      return stringResult;
    case 'number':
      return numberHandler(input, options);
    case 'object':
      return objectHandler(input, options);
    case 'undefined':
    default:
      return input;
  }
};
