export const capitalize = (word: string | undefined): string => {
  if (!word) return '';
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
};
