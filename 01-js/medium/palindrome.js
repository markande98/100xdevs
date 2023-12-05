/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let updatedStr = str.toLowerCase();
  let newStr = "";
  for (let i = 0; i < updatedStr.length; i++) {
    if (updatedStr[i] >= "a" && updatedStr[i] <= "z") newStr += updatedStr[i];
  }
  let n = newStr.length;
  let i = 0,
    j = n - 1;
  while (i <= j) {
    if (newStr[i] !== newStr[j]) return false;
    i++;
    j--;
  }
  return true;
}

module.exports = isPalindrome;
