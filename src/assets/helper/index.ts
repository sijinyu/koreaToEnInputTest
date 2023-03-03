export {};
interface CharMap {
  [key: string]: { lower: string; upper: string };
}

export const koreanToEnglishMap: CharMap = {
  ㄱ: { lower: "r", upper: "R" },
  ㄲ: { lower: "R", upper: "R" },
  ㄴ: { lower: "s", upper: "S" },
  ㄷ: { lower: "e", upper: "E" },
  ㄸ: { lower: "E", upper: "E" },
  ㄹ: { lower: "f", upper: "F" },
  ㅁ: { lower: "a", upper: "A" },
  ㅂ: { lower: "q", upper: "Q" },
  ㅃ: { lower: "Q", upper: "Q" },
  ㅅ: { lower: "t", upper: "T" },
  ㅆ: { lower: "T", upper: "T" },
  ㅇ: { lower: "d", upper: "D" },
  ㅈ: { lower: "w", upper: "W" },
  ㅉ: { lower: "W", upper: "W" },
  ㅊ: { lower: "c", upper: "C" },
  ㅋ: { lower: "z", upper: "Z" },
  ㅌ: { lower: "x", upper: "X" },
  ㅍ: { lower: "v", upper: "V" },
  ㅎ: { lower: "g", upper: "G" },
  ㅏ: { lower: "k", upper: "K" },
  ㅐ: { lower: "o", upper: "O" },
  ㅑ: { lower: "i", upper: "I" },
  ㅒ: { lower: "O", upper: "O" },
  ㅓ: { lower: "j", upper: "J" },
  ㅔ: { lower: "p", upper: "P" },
  ㅕ: { lower: "u", upper: "U" },
  ㅖ: { lower: "P", upper: "P" },
  ㅗ: { lower: "h", upper: "H" },
  ㅘ: { lower: "K", upper: "K" },
  ㅙ: { lower: "O", upper: "O" },
  ㅚ: { lower: "l", upper: "L" },
  ㅛ: { lower: "y", upper: "Y" },
  ㅜ: { lower: "n", upper: "N" },
  ㅝ: { lower: "J", upper: "J" },
  ㅞ: { lower: "U", upper: "U" },
  ㅟ: { lower: "N", upper: "N" },
  ㅠ: { lower: "b", upper: "B" },
  ㅡ: { lower: "m", upper: "M" },
  ㅢ: { lower: "M", upper: "M" },
  ㅣ: { lower: "l", upper: "L" },
};

// export function convertToEnglish(charMap: CharMap, isShiftKeyPressed: boolean) {
//   let shouldCapitalize = false;

//   return function (char: string) {
//     if (charMap[char]) {
//       const englishChar = charMap[char];
//       if (isShiftKeyPressed && !shouldCapitalize) {
//         shouldCapitalize = true;
//         return englishChar.upper;
//       } else {
//         shouldCapitalize = false;
//         return englishChar.lower;
//       }
//     }
//     return char;
//   };
// }

export function convertToEnglish(charMap: CharMap, isShiftKeyPressed: boolean) {
  let prevChar = "";
  return function (char: string) {
    if (charMap[char]) {
      const englishChar = charMap[char];
      let result = "";
      if (isShiftKeyPressed) {
        result = englishChar.upper;
      } else {
        result = englishChar.lower;
      }
      if (
        prevChar &&
        (prevChar === "ㄱ" ||
          prevChar === "ㄲ" ||
          prevChar === "ㄷ" ||
          prevChar === "ㄸ" ||
          prevChar === "ㅂ" ||
          prevChar === "ㅃ" ||
          prevChar === "ㅅ" ||
          prevChar === "ㅆ" ||
          prevChar === "ㅈ" ||
          prevChar === "ㅉ" ||
          prevChar === "ㅊ" ||
          prevChar === "ㅋ" ||
          prevChar === "ㅌ" ||
          prevChar === "ㅍ" ||
          prevChar === "ㅎ") &&
        (char === "ㅏ" ||
          char === "ㅐ" ||
          char === "ㅑ" ||
          char === "ㅒ" ||
          char === "ㅓ" ||
          char === "ㅔ" ||
          char === "ㅕ" ||
          char === "ㅖ" ||
          char === "ㅗ" ||
          char === "ㅘ" ||
          char === "ㅙ" ||
          char === "ㅚ" ||
          char === "ㅛ" ||
          char === "ㅜ" ||
          char === "ㅝ" ||
          char === "ㅞ" ||
          char === "ㅟ" ||
          char === "ㅠ" ||
          char === "ㅡ" ||
          char === "ㅢ" ||
          char === "ㅣ")
      ) {
        result = result.substring(1);
      }
      prevChar = char;
      return result;
    }
    prevChar = "";
    return char;
  };
}
