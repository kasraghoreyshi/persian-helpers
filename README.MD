
  

# Persian Helpers

<p align="end">
  <img alt="Intended Runtime Environment: Node.js" src="https://persian-badge.vercel.app/api/badge/NodeJS-43853D?style=flat&logo=nodedotjs&logoColor=white">
  <img alt="Star" src="https://persian-badge.vercel.app/api/github/stars/kasraghoreyshi/persian-helpers">
 <img alt="persian-helpers NPM Version" src="https://persian-badge.vercel.app/api/npm/v/persian-helpers?style=flat&label=Persian Helpers&logo=npm&logoColor=white">
</p>
  

> Persian Helpers is a minimal NodeJS package with a set of helpers/tools specifically for the Persian/Farsi language.

  

>

  

> If you like the package and want to see more features being added in, giving it a star would help the project a lot. Thanks!

  

## Table of contents

  

- [Persian Helpers](#persian-helpers)

  - [Installation](#installation)

  - [Usage](#usage)

    - [Importing Persian Helpers](#importing-persian-helpers)
    
    - [Converting English digits to Persian or vice versa](#converting-english-digits-to-persian-or-vice-versa)

    - [Separating Persian or English digits in a string or number by commas or any separator](#separating-persian-or-english-digits-in-a-string-or-number-by-commas-or-any-separator)

    - [Generate Persian or English slugs based on a string](#generate-persian-or-english-slugs-based-on-a-string)
    - [Convert digits to words in Persian](#convert-digits-to-words-in-persian)

  - [Contribution](#contribution)

  - [License](#license)

  

## Installation

  

NPM:

  

`npm install persian-helpers --save`

  

Yarn:

  

`yarn add persian-helpers`

  

## Usage

  

### Importing Persian Helpers:

  

```javascript

import * as persianHelpers from "persian-helpers";

// Or alternatively

import { convertDigits } from "persian-helpers";

  

console.log(persianHelpers.convertDigits("1000"));

// Or

console.log(convertDigits("1000"));

```

  

### Converting English digits to Persian or vice versa

  

| Options | Description | Default value |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `to` _(optional)_ | Target language for converting the digits | `fa` |
| `separator` _(optional)_ | A property to use separators for digits. For example with separator being enabled, instead of `۱۰۰۰۰۰۰`, `۱,۰۰۰,۰۰۰` will be returned. | `undefined` |

  

Convert a number to Persian digits

  

```javascript

convertDigits(1000); // "۱۰۰۰"

```

  

Convert a number to English digits

  

```javascript

convertDigits("۱۲۳۴", { to: "en" }); // "1234"

```

  

Convert a number to Persian digits with digit separator

  

> Note: separator can be set to any string and {separator: true} is a shorthand for {separator: '٬'}. An example is shown below.

  

```javascript

convertDigits(1000, { separator: true }); // "۱٬۰۰۰"

convertDigits("مبلغ این محصول 950000 تومان می باشد.", { separator: true }); // "مبلغ این محصول ۹۵۰٬۰۰۰ تومان می باشد."

```

  

Convert a number to Persian digits with custom digit separator

  

```javascript

convertDigits(1000, { separator: '-' }); // "۱-۰۰۰"

```

  

**convertDigits also takes inputs other than number/string as shown below.**

  

Convert a nested array to Persian digits

  

```javascript

convertDigits([123, { test: '11۱' }, '4foo5bar6', [789]]); // [ '۱۲۳', { test: '۱۱۱' }, '۴foo۵bar۶', ['۷۸۹'], ]

```

  

### Separating Persian or English digits in a string or number by commas or any separator

  

| Options | Description | Default value |
| ------------------------ | ------------------------------------------ | ------------- |
| `separator` _(optional)_ | The string used for separating the digits. | `,` |

  

Separate digits by commas in a string with Persian numbers

  

```javascript

separateDigitsBySeparator('۱۰۰۰۰۰۰'); // "۱,۰۰۰,۰۰۰"

```

  

Separate digits by an unique separator in a string with Persian numbers

  

```javascript

separateDigitsBySeparator('۱۰۰۰۰۰۰', { separator: '-' }); // "۱-۰۰۰-۰۰۰"

```

  

Separate digits by commas in a string containing numbers and letters

  

```javascript

separateDigitsBySeparator('مبلغ این محصول ۱۰۰۰۰۰۰ تومان می باشد.'); // "مبلغ این محصول ۱,۰۰۰,۰۰۰ تومان می باشد."

```

  

> Note: separateDigitsBySeparator also works with English digits or a string mixed with English and Persian digits

  

### Generate Persian or English slugs based on a string

  

| Options | Description | Default value |
| ------------------------------- | ---------------------------------------- | ------------- |
| `includeUpperCase` _(optional)_ | Include upper case letters in the slug | `false` |
| `separator` _(optional)_ | The separator between spaces in the slug | `-` |
| `to` _(optional)_ | Target language for the slug | `en` |

  

Generate an English slug based on Persian string

  

```javascript

generateSlug('سلام دنیا 💕'); // "slam-dnya"

```

  

Generate a Persian slug based on Persian string

  

```javascript

generateSlug('سلام دنیا 💕'); // "سلام-دنیا"

```

  

Generate a Persian slug based on Persian string with an unique separator

  

```javascript

generateSlug('سلام دنیا 💕', { separator: ' ' }); // "slam dnya"

```

  

Generate an English slug an also include uppercases

  

```javascript

generateSlug('پکیج Persian Helper', { includeUpperCase: true }); // "pkyj-Persian-Helper"

```

  

### Convert digits to words in Persian

  

| Options | Description | Default value |
| ------------------------------- | ---------------------------------------- | ------------- |
| `ordinal` _(optional)_ | Convert digits to ordinal digits | `false` |
| `throwErrorIfInvalid` _(optional)_ | Throw error if digits cannot be converted | `false` |

  

Generate words from a number

  

```javascript

convertDigitsToWords(1234) // "یک هزار و دویست و سی و چهار"
convertDigitsToWords(1234.121) // "یک هزار و دویست و سی و چهار ممیز یکصد و بیست و یک هزارم"
convertDigitsToWords(99999) // "نود و نه هزار و نهصد و نود و نه"

```

  

Generate words from Persian Digits
  

```javascript

convertDigitsToWords('۹۹۹۹۹'); // "نود و نه هزار و نهصد و نود و نه"

```


Generate ordinal numbers from English/Persian digits

  

```javascript

convertDigitsToWords(4, { ordinal: true }); // "چهارم"
convertDigitsToWords(41, { ordinal: true }); // "چهل و یکم"
convertDigitsToWords("۱", { ordinal: true }); // "اول"

```

  

Generate words from input but throw error if the input is invalid

  

```javascript

convertDigitsToWords('۱', { ordinal: true, throwErrorIfInvalid: true }) // "اول"

convertDigitsToWords('۱d7s9dhsihd', { ordinal: true, throwErrorIfInvalid: true }) // Error: Cannot convert "۱d7s9dhsihd" to words.
```

  

## Find any bugs/issues? Have suggestions?

  

If you encountered any issues or bugs while using Persian Helpers, or you want to see a feature getting added, please make sure to open a new issue.

  

## Contribution

  

Contributions to Persian Helpers are greatly appreciated. To contribute:

  

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature/NewHelper`)

3. Commit your Changes (`git commit -m 'Add a NewHelper'`)

4. Push to the Branch (`git push origin feature/NewHelper`)

5. Open a Pull Request

  

## License

Persian Helpers is licensed under the MIT License. Visit [LICENSE.md](https://github.com/kasraghoreyshi/persian-helpers/blob/main/LICENSE) for more information.
