import { separatorHandlerDefaultOptions, SeparatorHandlerOptions } from '.';
import { getDefaultOptions } from '../../getDefaultOptions';

/**
 * separate digits in a persian | english string | number
 * @example
 * // returns "۱,۰۰۰,۰۰۰"
 * separateDigitsBySeparator("۱۰۰۰۰۰۰");
 */
export const separateDigitsBySeparator = (input: string | number, optionsParam?: SeparatorHandlerOptions) => {
  const options: SeparatorHandlerOptions = getDefaultOptions(optionsParam, separatorHandlerDefaultOptions);

  if (typeof input === 'number') {
    const numberOutput = input.toLocaleString();
    const separator = (options.separator as string) || '';
    return numberOutput.replace(/٬|,/g, separator);
  }

  // This regex matches any english numbers using \d and also matches
  // Any Persian number using \u06F0-\u06F90-9
  // So 2312۳۲۳8 is a valid number too.
  const numberRegex = /[\d|\u06F0-\u06F90-9]+/g;
  let output = input;
  if (!input.match(numberRegex)) return input;
  output = output.replace(numberRegex, (match) => {
    // This regex is a modification for https://stackoverflow.com/a/25377176
    // It separates everything 3 digit/letter by digit/letter.
    return match.replace(/(.)(?=(.{3})+(?!.))/g, `$1${options.separator}`);
  });
  return output;
};
