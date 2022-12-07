export const checkIsFunction = (value: any): boolean => {
  return typeof value === 'function';
};

export const getTimer = (num: number): string => {
  return  new Date(num).toLocaleTimeString();
};
