// Count the number of vowels in a sentence.

function getVowelCount(sentence) {
  const vowels = "aeiou";
  let count = 0;

  for (const char of sentence.toLowerCase()) {
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
}

// Count the number of consonants in a sentence.
function getConsonantCount(sentence) {
  const vowels = "aeiou";
  let count = 0;

  for (const char of sentence.toLowerCase()) {
    const isLetter = char >= "a" && char <= "z";

    if (isLetter && !vowels.includes(char)) {
      count++;
    }
  }

  return count;
}

/**
 * Count punctuation characters.
 * A punctuation character is any character
 * that is not a letter, number, or space.
 */
function getPunctuationCount(sentence) {
  let count = 0;

  for (const char of sentence) {
    const isLetter =
      (char >= "A" && char <= "Z") || (char >= "a" && char <= "z");

    const isNumber = char >= "0" && char <= "9";

    if (!isLetter && !isNumber && char !== " ") {
      count++;
    }
  }

  return count;
}

// Count words in a sentence.

function getWordCount(sentence) {
  const trimmedSentence = sentence.trim();

  if (trimmedSentence === "") {
    return 0;
  }

  return trimmedSentence.split(/\s+/).length;
}

const vowelCount = getVowelCount("Apples are tasty fruits");
console.log(`Vowel Count: ${vowelCount}`);

const consonantCount = getConsonantCount("Coding is fun");
console.log(`Consonant Count: ${consonantCount}`);

const punctuationCount = getPunctuationCount("WHAT?!?!?!?!?89");
console.log(`Punctuation Count: ${punctuationCount}`);

const wordCount = getWordCount("I love freeCodeCamp");
console.log(`Word Count: ${wordCount}`);
