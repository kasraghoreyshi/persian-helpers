export const getDefaultOptions = (givenOptions: any, defaultOptions: any) => {
  return { ...defaultOptions, ...givenOptions };
};
