function findHiddenWord(str) {
  let hiddenWord = "";

  for (const char of str) {
    if (char === char.toLowerCase()) {
      hiddenWord += char;
    }
  }

  return hiddenWord;
}

console.log(findHiddenWord("bEEFGuFBRrHgUHlNFYaYr"));
console.log(findHiddenWord("bEEFGuFBRrHgUHlNFYaYr"));
console.log(findHiddenWord("YFemHUFBbezFBYzFBYFBYLLeGBYEFGBMENTment"));
