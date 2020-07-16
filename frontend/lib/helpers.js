export const pluralize = (str, n) => {
  if (!n || n < 2) return str;
  return str + "s";
};
