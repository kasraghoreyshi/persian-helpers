import { separatorHandlerDefaultOptions, SeparatorHandlerOptions } from '.';
import { getDefaultOptions } from '../../getDefaultOptions';

/**
 * Seperate digits in a persian | english string | number
 * @example
 * // returns "۱,۰۰۰,۰۰۰"
 * seperateDigitsBySeparator("۱۰۰۰۰۰۰");
 */
export const seperateDigitsBySeparator = (input: string | number, optionsParam?: SeparatorHandlerOptions) => {
  const options = getDefaultOptions(optionsParam, separatorHandlerDefaultOptions);
  if (typeof input === 'number') return input.toLocaleString();

  // This regex matches any english numbers using \d and also matches
  // Any Persian number using \u06F0-\u06F90-9
  // So 2312۳۲۳8 is a valid number too.
  const numberRegex = /[\d|\u06F0-\u06F90-9]+/g;
  let output = input;
  if (!input.match(numberRegex)) return input;
  output = output.replace(numberRegex, (match) => {
    // This regex is a modification for https://stackoverflow.com/a/25377176
    // It seperates everything 3 digit/letter by digit/letter.
    return match.replace(/(.)(?=(.{3})+(?!.))/g, `$1${options.separator}`);
  });
  return output;
};
