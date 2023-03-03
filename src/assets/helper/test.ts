// constants
var 영어 = "rRseEfaqQtTdwWczxvgASDFGZXCVkoiOjpuPhynbmlYUIHJKLBNM"; // 33 + 19개
var 한글 =
  "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅁㄴㅇㄹㅎㅋㅌㅊㅍㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣㅛㅕㅑㅗㅓㅏㅣㅠㅜㅡ"; // 33 + 19개
var 초성 = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"; // 19개
var 중성 = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"; // 21개
var 종성 = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ"; // 27개
var 첫모음 = 28;
var 가 = 44032;
var 힣 = 55203;
var ㄱ = 12593;
var ㅣ = 12643;

var connectableConsonant = {
  ㄱㅅ: "ㄳ",
  ㄴㅈ: "ㄵ",
  ㄴㅎ: "ㄶ",
  ㄹㄱ: "ㄺ",
  ㄹㅁ: "ㄻ",
  ㄹㅂ: "ㄼ",
  ㄹㅅ: "ㄽ",
  ㄹㅌ: "ㄾ",
  ㄹㅍ: "ㄿ",
  ㄹㅎ: "ㅀ",
  ㅂㅅ: "ㅄ",
};

var connectableVowel = {
  ㅗㅏ: "ㅘ",
  ㅗㅐ: "ㅙ",
  ㅗㅣ: "ㅚ",
  ㅜㅓ: "ㅝ",
  ㅜㅔ: "ㅞ",
  ㅜㅣ: "ㅟ",
  ㅡㅣ: "ㅢ",
};

// constructor
export function Inko(this: any, _option?: {}) {
  function ko2en(input: string | any[] | undefined) {
    var result = "";
    if (input === "" || input === undefined) return result;
    var _분리 = [-1, -1, -1, -1, -1];

    for (var i = 0; i < input.length; i++) {
      var _한글 = input[i];
      var _코드 = _한글.charCodeAt();
      // 가 ~ 힣 사이에 있는 한글이라면
      if ((_코드 >= 가 && _코드 <= 힣) || (_코드 >= ㄱ && _코드 <= ㅣ)) {
        _분리 = 한글분리(_한글);
      }

      // 한글이 아니라면
      else {
        result += _한글;
        // 분리 배열 초기화
        _분리 = [-1, -1, -1, -1, -1];
      }

      for (var j = 0; j < _분리.length; j++) {
        if (_분리[j] !== -1) result += 영어[_분리[j]];
      }
    }

    return result;
  }
  function 한글분리(_한글: any) {
    var 코드 = _한글.charCodeAt();
    if (코드 >= 가 && 코드 <= 힣) {
      var 초 = Math.floor((코드 - 가) / 588);
      var 중 = Math.floor((코드 - 가 - 초 * 588) / 28);
      var 종 = 코드 - 가 - 초 * 588 - 중 * 28 - 1;
      var 중1 = 중,
        중2 = -1,
        종1 = 종,
        종2 = -1;

      if (중 == 중성.indexOf("ㅘ"))
        (중1 = 한글.indexOf("ㅗ")), (중2 = 한글.indexOf("ㅏ"));
      else if (중 == 중성.indexOf("ㅙ"))
        (중1 = 한글.indexOf("ㅗ")), (중2 = 한글.indexOf("ㅐ"));
      else if (중 == 중성.indexOf("ㅚ"))
        (중1 = 한글.indexOf("ㅗ")), (중2 = 한글.indexOf("ㅣ"));
      else if (중 == 중성.indexOf("ㅝ"))
        (중1 = 한글.indexOf("ㅜ")), (중2 = 한글.indexOf("ㅓ"));
      else if (중 == 중성.indexOf("ㅞ"))
        (중1 = 한글.indexOf("ㅜ")), (중2 = 한글.indexOf("ㅔ"));
      else if (중 == 중성.indexOf("ㅟ"))
        (중1 = 한글.indexOf("ㅜ")), (중2 = 한글.indexOf("ㅣ"));
      else if (중 == 중성.indexOf("ㅢ"))
        (중1 = 한글.indexOf("ㅡ")), (중2 = 한글.indexOf("ㅣ"));

      if (종 == 종성.indexOf("ㄳ"))
        (종1 = 한글.indexOf("ㄱ")), (종2 = 한글.indexOf("ㅅ"));
      else if (종 == 종성.indexOf("ㄵ"))
        (종1 = 한글.indexOf("ㄴ")), (종2 = 한글.indexOf("ㅈ"));
      else if (종 == 종성.indexOf("ㄶ"))
        (종1 = 한글.indexOf("ㄴ")), (종2 = 한글.indexOf("ㅎ"));
      else if (종 == 종성.indexOf("ㄺ"))
        (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㄱ"));
      else if (종 == 종성.indexOf("ㄻ"))
        (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅁ"));
      else if (종 == 종성.indexOf("ㄼ"))
        (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅂ"));
      else if (종 == 종성.indexOf("ㄽ"))
        (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅅ"));
      else if (종 == 종성.indexOf("ㄾ"))
        (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅌ"));
      else if (종 == 종성.indexOf("ㄿ"))
        (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅍ"));
      else if (종 == 종성.indexOf("ㅀ"))
        (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅎ"));
      else if (종 == 종성.indexOf("ㅄ"))
        (종1 = 한글.indexOf("ㅂ")), (종2 = 한글.indexOf("ㅅ"));

      // 복모음이 아니라면
      if (중2 === -1) 중1 = 한글.indexOf(중성[중]);

      // 복자음이 아니라면
      if (종2 === -1) 종1 = 한글.indexOf(종성[종]);

      return [초, 중1, 중2, 종1, 종2];
    } else if (코드 >= ㄱ && 코드 <= ㅣ) {
      if (초성.indexOf(_한글) > -1) {
        var 초 = 한글.indexOf(_한글);
        return [초, -1, -1, -1, -1];
      } else if (중성.indexOf(_한글) > -1) {
        var 중 = 중성.indexOf(_한글);
        var 중1 = 중,
          중2 = -1;
        if (중 == 중성.indexOf("ㅘ"))
          (중1 = 한글.indexOf("ㅗ")), (중2 = 한글.indexOf("ㅏ"));
        else if (중 == 중성.indexOf("ㅙ"))
          (중1 = 한글.indexOf("ㅗ")), (중2 = 한글.indexOf("ㅐ"));
        else if (중 == 중성.indexOf("ㅚ"))
          (중1 = 한글.indexOf("ㅗ")), (중2 = 한글.indexOf("ㅣ"));
        else if (중 == 중성.indexOf("ㅝ"))
          (중1 = 한글.indexOf("ㅜ")), (중2 = 한글.indexOf("ㅓ"));
        else if (중 == 중성.indexOf("ㅞ"))
          (중1 = 한글.indexOf("ㅜ")), (중2 = 한글.indexOf("ㅔ"));
        else if (중 == 중성.indexOf("ㅟ"))
          (중1 = 한글.indexOf("ㅜ")), (중2 = 한글.indexOf("ㅣ"));
        else if (중 == 중성.indexOf("ㅢ"))
          (중1 = 한글.indexOf("ㅡ")), (중2 = 한글.indexOf("ㅣ"));

        // 복모음이 아니라면
        if (중2 === -1) 중1 = 한글.indexOf(중성[중]);

        return [-1, 중1, 중2, -1, -1];
      } else if (종성.indexOf(_한글) > -1) {
        var 종 = 종성.indexOf(_한글);
        var 종1 = 종,
          종2 = -1;
        if (종 == 종성.indexOf("ㄳ"))
          (종1 = 한글.indexOf("ㄱ")), (종2 = 한글.indexOf("ㅅ"));
        else if (종 == 종성.indexOf("ㄵ"))
          (종1 = 한글.indexOf("ㄴ")), (종2 = 한글.indexOf("ㅈ"));
        else if (종 == 종성.indexOf("ㄶ"))
          (종1 = 한글.indexOf("ㄴ")), (종2 = 한글.indexOf("ㅎ"));
        else if (종 == 종성.indexOf("ㄺ"))
          (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㄱ"));
        else if (종 == 종성.indexOf("ㄻ"))
          (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅁ"));
        else if (종 == 종성.indexOf("ㄼ"))
          (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅂ"));
        else if (종 == 종성.indexOf("ㄽ"))
          (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅅ"));
        else if (종 == 종성.indexOf("ㄾ"))
          (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅌ"));
        else if (종 == 종성.indexOf("ㄿ"))
          (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅍ"));
        else if (종 == 종성.indexOf("ㅀ"))
          (종1 = 한글.indexOf("ㄹ")), (종2 = 한글.indexOf("ㅎ"));
        else if (종 == 종성.indexOf("ㅄ"))
          (종1 = 한글.indexOf("ㅂ")), (종2 = 한글.indexOf("ㅅ"));
        return [종1, 종2, -1, -1, -1];
      }
    }
    return [-1, -1, -1, -1, -1];
  }
  return { ko2en };
}

Inko.prototype.VERSION = "1.1.1";

// 초성, 중성, 종성의 charCode를 받아서 합친 한글의 charCode를 반환함
Inko.prototype.한글생성 = function (초: number, 중: number, 종: number) {
  return String.fromCharCode(44032 + 초 * 588 + 중 * 28 + 종 + 1);
};

// 한글 입력값으로 받아서 초성, 중성, 종성 분리해줌
