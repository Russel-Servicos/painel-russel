function convertUnicode(textInput: string) {
  let textOutput = textInput;
  for (let key in unicodeTable) {
    const regex = new RegExp(key, "g");
    textOutput = textOutput.replace(regex, unicodeTable[key]);
  }

  return textOutput;
}

interface UnicodeTableInterface {
  [key: string]: string;
}

const unicodeTable: UnicodeTableInterface = {
  u00c0: "À",
  u00c1: "Á",
  u00c2: "Â",
  u00c3: "Ã",
  u00c7: "Ç",
  u00c8: "È",
  u00c9: "É",
  u00ca: "Ê",
  u00cc: "Ì",
  u00cd: "Í",
  u00ce: "Î",
  u00d2: "Ò",
  u00d3: "Ó",
  u00d4: "Ô",
  u00d5: "Õ",
  u00d9: "Ù",
  u00da: "Ú",
  u00db: "Û",
  u00e0: "à",
  u00e1: "á",
  u00e2: "â",
  u00e3: "ã",
  u00e7: "ç",
  u00e8: "è",
  u00e9: "é",
  u00ea: "ê",
  u00ec: "ì",
  u00ed: "í",
  u00f2: "ò",
  u00f3: "ó",
  u00f4: "ô",
  u00f5: "õ",
  u00f9: "ù",
  u00fa: "ú",
};

export default convertUnicode;
