// Extract class and id attributes from the string and make them into an array

type Args = {
  text: string;
  isIncludeId: boolean;
  excludeRegex: string;
};

const searchSelector = ({ text, isIncludeId, excludeRegex }: Args): string[] => {
  //  const regex = /(class|className)=(["'])(.+?)\2/g;
  const regexId = isIncludeId ? '|id' : '';
  const selectorRegex = new RegExp(`(class|className${regexId})=(["'])(.+?)\\2`, 'g');
  const spaceRegex = /\s{2,}/;
  const excludeRegexVal = new RegExp(excludeRegex);
  let matches;
  const twoDimensionalClassArray: string[][] = [];
  while ((matches = selectorRegex.exec(text)) !== null) {
    const selector = matches[1];
    const trimString = matches[3].trim().replace(/　/g, ' ').replace(spaceRegex, ' ');
    const selectorsArray = trimString
      .split(' ')
      .map((str) => (selector === 'id' ? `#` : '.') + str);

    const filteredSelecorsArray = excludeRegex
      ? selectorsArray.filter((selector) => !excludeRegexVal.test(selector))
      : selectorsArray;
    twoDimensionalClassArray.push(filteredSelecorsArray);
  }
  const classArray = twoDimensionalClassArray.flat();
  const uniqueClassArray = Array.from(new Set(classArray));
  return uniqueClassArray;
};

export default searchSelector;
