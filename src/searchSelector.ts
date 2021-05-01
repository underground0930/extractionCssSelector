const searchSelector = (text: string): string[] => {
  const regex = /(class|className)=(["'])(.+?)\2/g;
  let matches;
  let classes = [];
  while ((matches = regex.exec(text)) !== null) {
    classes.push(matches[3].split(" "));
  }
  classes = classes.flat();
  classes = Array.from(new Set(classes));
  return classes;
};

export default searchSelector;
