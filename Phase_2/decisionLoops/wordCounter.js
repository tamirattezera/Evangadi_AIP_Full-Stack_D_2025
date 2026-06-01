/**
 * Prints each character of a given string.
 * Useful for understanding string iteration using for...of loops.
 */
function printCharacters(str) {
  for (const char of str) {
    console.log(char);
  }
}

// Test string character iteration
printCharacters("hello");

/**
 * Counts how many times a specific word appears in an array of words.
 * Demonstrates iteration, condition checking, and accumulator pattern.
 *
 * @param {string[]} sentence - Array of words to scan
 * @param {string} match - Word to count in the array
 * @returns {number} count of matching words
 */
function getMatchedWordCount(sentence, match) {
  let count = 0; // accumulator to store matches

  for (const word of sentence) {
    // Check if current word matches target word
    if (word === match) {
      count++; // increment counter when match is found
    }
  }

  return count; // final result after scanning all words
}

// Test case 1: repeated word counting
console.log(
  getMatchedWordCount(
    ["I", "really", "really", "really", "like", "to", "code"],
    "really",
  ),
);

// Test case 2: single match scenario
console.log(
  getMatchedWordCount(["Do", "not", "fear", "the", "dandy", "lion"], "dandy"),
);
