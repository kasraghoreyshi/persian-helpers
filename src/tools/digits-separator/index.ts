import { seperateDigitsBySeparator } from './digits-separator';

export interface SeparatorHandlerOptions {
  separator?: string;
}

export const separatorHandlerDefaultOptions: SeparatorHandlerOptions = {
  separator: ',',
};

export default seperateDigitsBySeparator;
