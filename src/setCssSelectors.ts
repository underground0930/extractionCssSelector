// 貼り付けるCSSのセレクターを指定

type Args = {
  classes: string[];
  insertString: string[];
};

const setCssSelectors = ({ classes, insertString }: Args): string => {
  let selectors = '';
  classes.forEach((text) => {
    selectors += `${text} {
${insertString
  .map((str, index) => {
    if (index === insertString.length - 1) {
      return str;
    }
    return str + '\n';
  })
  .join('')}
}`;
    selectors += '\n\n';
  });
  return selectors;
};

export default setCssSelectors;
