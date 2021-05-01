const setCssSelectors = (
  texts: string[],
  input: string | undefined
): string => {
  let selectors = "";

  texts.forEach((text) => {
    selectors += `
.${text}{
  ${input ? input : ""}
}
`;
  });
  return selectors;
};

export default setCssSelectors;
