type Args = {
  text: string;
  includeId: boolean;
};

const searchSelector = ({ text, includeId }: Args): string[] => {
  //  const regex = /(class|className)=(["'])(.+?)\2/g;
  const id = includeId ? '|id' : '';
  const regex = new RegExp(`(class|className${id})=(["\'])(.+?)\\2`, 'g');
  let matches;
  let classes = [];
  const spaceRegex = /\s{2,}/;
  while ((matches = regex.exec(text)) !== null) {
    const selector = matches[1];
    let result = matches[3].trim(); // class部分の文字列を抽出 & 端のスペースを除去
    result = result.replace(/　/g, ' '); // 全角スペースを半角スペースにする
    result = result.replace(spaceRegex, ' '); // 連続するスペースを１つに変換
    classes.push(
      result.split(' ').map((str) => {
        return (selector === 'id' ? `#` : '.') + str;
      })
    );
  }
  classes = classes.flat();
  classes = Array.from(new Set(classes));
  return classes;
};

export default searchSelector;
