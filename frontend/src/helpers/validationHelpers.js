export const isCodeValid = (value) => {
  return /^\d$/.test(value); // regex to check if the input is a digit between 0-9
};
