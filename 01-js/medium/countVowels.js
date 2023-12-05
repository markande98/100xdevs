/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function isVowel(x) {
  if (x === "a" || x === "e" || x === "i" || x === "o" || x === "u")
    return true;
  return false;
}

function countVowels(str) {
  // Your code here
  let updatedStr = str.toLowerCase();
  let ans = 0;

  for (let i = 0; i < updatedStr.length; i++) {
    if (isVowel(updatedStr[i])) ans++;
  }

  return ans;
}

module.exports = countVowels;
