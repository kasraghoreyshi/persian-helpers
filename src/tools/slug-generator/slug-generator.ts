import { letters, LetterType, slugGeneratorDefaultOptions, SlugGeneratorOptions } from '.';
import { getDefaultOptions } from '../../getDefaultOptions';
import { SupportedLanguages } from '../../types';
import convertDigits from '../convert-digits';

export const generateSlug = (input: string, optionsParam?: SlugGeneratorOptions) => {
  const options = getDefaultOptions(optionsParam, slugGeneratorDefaultOptions);
  const to: SupportedLanguages = options?.to || 'en';
  let from: SupportedLanguages;
  switch (options?.to) {
    case 'fa':
      from = 'en';
      break;
    default:
    case 'en':
      from = 'fa';
      break;
  }
  // This variable converts an input like "Test ۱۲۳" to "Test 123"
  let convertedInput: string = convertDigits(input, {
    to: 'en',
  });
  // And if includeUpperCase is not set to true, we will convert it to
  // Lower case.
  if (options?.includeUpperCase !== true) convertedInput = convertedInput.toLowerCase();

  const inputSplit = convertedInput
    .split('')
    // This regex insures that the given input is alphanumeric
    // So that emojis, punctuations, etc are not included.
    .filter((letter: string) => letter.match(/[a-zA-Z0-9_\s]|[آ-ی]/g));
  inputSplit.forEach((letter: string, index: number) => {
    // This insures that if the letter is an empty space, it returns.
    if (!letter.length) return;
    // Letters is an array of objects containing each letter in
    // Persian/English alphabet.

    // So we will check the "from" language and find it's "to" equivalent
    const convertedLetter = letters.find((letterParam: LetterType) => letterParam[from] === letter);

    // If an equivalent is found, it will be replaced.
    // If not, the letter won't change.
    if (convertedLetter) inputSplit[index] = convertedLetter[to];
  });
  return (
    inputSplit
      .join('')
      // Trim is called to avoid extra separators at the end
      .trim()
      .replace(/\s/g, options?.separator || '-')
  );
};
