const setCssSelectors = (
  texts: string[],
  input: string | undefined
): string => {
  let selectors = "";

  texts.forEach((text) => {
    selectors += `
.${text}{
  ${input ? input.replace(/\s*\\n\s*/g, (match) => "\n  ") : ""}
}
`;
  });
  return selectors;
};

export default setCssSelectors;
