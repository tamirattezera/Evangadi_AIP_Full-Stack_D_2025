function printCharacters(str) {
  for (const char of str) {
    console.log(char);
  }
}

function getMatchedWordCount(sentence, match) {
  let count = 0;

  for (const word of sentence) {
    if (word === match) {
      count++;
    }
  }

  return count;
}

console.log(
  getMatchedWordCount(
    ["I", "really", "really", "really", "like", "to", "code"],
    "really",
  ),
);

console.log(
  getMatchedWordCount(["Do", "not", "fear", "the", "dandy", "lion"], "dandy"),
);
