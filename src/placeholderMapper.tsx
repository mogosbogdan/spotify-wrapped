export const mapPlaceholderValues = (text, replacementValues) => {
  return text.replace(
    /\$(\w+)\$/g,
    (match, phText) => replacementValues?.[phText] || match
  );
};
