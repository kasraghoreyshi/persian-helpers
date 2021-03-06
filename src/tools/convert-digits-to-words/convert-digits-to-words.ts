// This implementation is inspired by the Java implementation which can be found here: https://github.com/razavioo/PersianNumberToWord
// Credit for the idea goes to razavioo

import {
  convertDigitsToWordsDefaultOptions,
  ConvertDigitsToWordsOptions,
  decimals,
  hundreds,
  ones,
  ordinalOnes,
  tens,
  tensBelowTwenty,
} from '.';
import { getDefaultOptions } from '../../getDefaultOptions';
import convertDigits from '../convert-digits';

const handleInvalidInput = (
  input: number | string,
  throwErrorIfInvalid: ConvertDigitsToWordsOptions['throwErrorIfInvalid'],
) => {
  // If it is specified to throw error at invalid inputs, we will throw an error.
  if (throwErrorIfInvalid) throw new Error(`Cannot convert "${input}" to words.`);
  // Otherwise we return undefined early to avoid the ordinal checks to happen below
  // Since they will be unnecessary.
  return undefined;
};

const handleNumbersSmallerThanOneThousand = (input: number, level: number) => {
  switch (true) {
    case input < 10:
      return ones[input - 1];
    case input < 20:
      return tensBelowTwenty[input - 10];
    case input < 100:
      return tens[Math.floor(input / 10) - 2] + convertDigitsToWordsHandler(input % 10, level + 1);
    case input < 1000:
      return hundreds[Math.floor(input / 100) - 1] + convertDigitsToWordsHandler(input % 100, level + 1);
    default:
      return handleNumbersLargerThanOneThousand(input, level);
  }
};

const handleNumbersLargerThanOneThousand = (input: number, level: number) => {
  const digits: any = { 1000000: 'هزار', 1000000000: 'میلیون', 1000000000000: 'میلیارد', 1000000000000000: 'تریلیارد' };
  // Above we have an object containing the names of each x length
  const inputDigitName: any = Object.keys(digits).find((digitsLength) => input < Number(digitsLength));
  if (!inputDigitName) return '';
  // We need to divide the number by 1000 to get the previous digit
  // So that the function could go backwards until it reaches smaller than one thousand
  const inputDigitDevided = inputDigitName / 1000;
  return (
    convertDigitsToWordsHandler(Math.floor(input / inputDigitDevided), level) +
    ` ${digits[inputDigitName]}` +
    convertDigitsToWordsHandler(input % inputDigitDevided, level + 1)
  );
};

const convertDigitsToWordsHandler = (input: string | number, level: number = 0): string => {
  // We use - 0 instead of parseInt because parseInt on an input like "38rijfdifhiodfh" will return 38
  // While in this case, we won't count that as a valid input. So - 0 still converts an input like "38"
  // To number, but returns NaN in the case of some input like "38rijfdifhiodfh".
  const inputNumber: number = convertDigits(input, { to: 'en' }) - 0;

  // We should check if the input is valid and the easiest
  // And fastest way to do that is through isNaN. If the given input got converted from
  // Persian digits to english and it still fails isNaN, then going through the
  // Whole function is pointless. So we return early
  if (isNaN(inputNumber)) return '';

  let digitsBeforeDecimal: number | null = null;
  // The result for the decimal digits if the number is a float
  let decimalResult;
  // The suffix for the decimal which can be: دهم صدم هزارم etc
  let decimalSuffix;

  const inputString = inputNumber.toString();
  // If the number contains dot, it means that it's a decimal.
  if (inputString.includes('.')) {
    const indexOfDecimal = inputString.indexOf('.');
    // indexOfDecimal plus one must be used because we want the digits after the dot
    const digitsAfterDecimal = inputString.substring(indexOfDecimal + 1, indexOfDecimal + decimals.length + 1);
    digitsBeforeDecimal = Number(inputString.substring(0, indexOfDecimal));

    // This checks if the digitsAfterDecimal is not 0 by converting it to a number.
    // For example, if given "1.0000", it will still be counted as a single 0.
    if (Number(digitsAfterDecimal) !== 0) {
      decimalResult = convertDigitsToWordsHandler(digitsAfterDecimal);
      decimalSuffix = decimals[digitsAfterDecimal.length - 1];
    }
  }

  const result = [];

  // If the input is 0 and the level is also 0, we return صفر
  // Otherwise we return empty string
  // Because if the level is more than 0 but the input is zero, for the number "100"
  // یکصدصفر will be returned. While یکصد is the desired output
  if (inputNumber === 0) return level === 0 ? 'صفر' : '';

  // And if the number is negative, only prefixing منفی will be enough.
  // So therefore a recrusion must happend but not with the negative number but the positive number
  if (inputNumber < 0) return 'منفی ' + convertDigitsToWordsHandler(Math.abs(inputNumber), level);

  if (level > 0) {
    // Push an empty element first so that when joined, it becomes x و y
    // And not xو y
    result.push('');
    result.push('و');
    level -= 1;
  }

  let inputResult: string;

  // If the number includes a decimal, we want to convert the digits before the decimal to persian.
  // Because the digits after the decimal are already handled
  if (inputNumber < 1000) inputResult = handleNumbersSmallerThanOneThousand(digitsBeforeDecimal || inputNumber, level);
  else inputResult = handleNumbersLargerThanOneThousand(digitsBeforeDecimal || inputNumber, level);

  if (inputResult?.length) result.push(inputResult);

  if (decimalResult) {
    if (digitsBeforeDecimal === 0) result.push('صفر');
    result.push('ممیز');
    result.push(decimalResult);
    result.push(decimalSuffix);
  }

  return result.join(' ');
};

// Poetic function name
const getOrdinalFromCardinal = (cardinalNumber: string, numberLength: number) => {
  // To avoid the any type, we could have checked if the cardinalNumber is valid or not
  // But to save time and improve performance a little bit, we don't do that since this
  // Function is not exported and is always used by this same file and the input is
  // Always expected to be valid.
  // But if in feature this function gets exported, change this to an if statement.

  const indexInOnes = ones.indexOf(cardinalNumber as any);

  // If the ordinal alternative is 1 (which is at index 0)
  // And the length of the number is more than 1 digit, then
  // We want to return یکم and not اول
  if (indexInOnes === 0 && numberLength > 1) return 'یکم';

  const ordinalResult = ordinalOnes[indexInOnes];

  if (ordinalResult) return ordinalResult;

  // If there is no result (for example, the input is بیست), we add an م to the end as that
  // Will work for numbers that are not ones.
  // دهم، بیستم، ...
  // But since سی is an exception (سی is the only digit ending in ی), there is a special case for it.
  if (cardinalNumber === 'سی') return 'سی ام';
  return cardinalNumber + 'م';
};

export const convertDigitsToWords = (
  input: number | string,
  optionsParam?: ConvertDigitsToWordsOptions,
): string | undefined => {
  const options: ConvertDigitsToWordsOptions = getDefaultOptions(optionsParam, convertDigitsToWordsDefaultOptions);

  // Any type other than number and string is invalid and cannot be converted to words.
  if (typeof input !== 'number' && typeof input !== 'string')
    return handleInvalidInput(input, options.throwErrorIfInvalid);

  // The handler is a separate function because the level argument in the handler is something internal that
  // The user should not access/modify.
  const result = convertDigitsToWordsHandler(input);

  // If the result is less than 1 character, it means that there was no result.
  if (result.length < 1) return handleInvalidInput(input, options.throwErrorIfInvalid);

  // For zero and negative numbers, ordinal is meaningless. (For example منفی دوم is meaningless)
  // For decimal numbers, ordinal is also meaningless.
  // So we just return the cardinal number if that is the case.
  if (options.ordinal !== true || input <= 0 || input.toString().includes('.')) return result;

  const resultSplit = result.split(' ');

  const lastDigit = resultSplit.length - 1;

  resultSplit[lastDigit] = getOrdinalFromCardinal(resultSplit[lastDigit], resultSplit.length);

  return resultSplit.join(' ');
};

// TODO: refactor this tool
