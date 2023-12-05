/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let n = str1.length;
  let m = str2.length;

  if (n !== m) return false;

  let sorted_1_str = str1.toLowerCase().split("").sort().join("");
  let sorted_2_str = str2.toLowerCase().split("").sort().join("");

  // console.log(sorted_1_str, sorted_2_str);

  if (sorted_1_str !== sorted_2_str) return false;
  return true;
}

// isAnagram("abcd", "dacb");

module.exports = isAnagram;
