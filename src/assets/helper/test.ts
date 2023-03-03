// constants
let 영어 = "rRseEfaqQtTdwWczxvgASDFGZXCVkoiOjpuPhynbmlYUIHJKLBNM"; // 33 + 19개
let 한글 =
  "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅁㄴㅇㄹㅎㅋㅌㅊㅍㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣㅛㅕㅑㅗㅓㅏㅣㅠㅜㅡ"; // 33 + 19개
let 초성 = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"; // 19개
let 중성 = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"; // 21개
let 종성 = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ"; // 27개
let 가 = 44032;
let 힣 = 55203;
let ㄱ = 12593;
let ㅣ = 12643;

// constructor
export function Inko(this: any, _option?: {}) {
  function ko2en(input: string | any[] | undefined) {
    let result = "";
    if (input === "" || input === undefined) return result;
    let _분리 = [-1, -1, -1, -1, -1];

    for (let i = 0; i < input.length; i++) {
      let _한글 = input[i];
      let _코드 = _한글.charCodeAt(0) || _한글.charCodeAt(1);
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

      for (let j = 0; j < _분리.length; j++) {
        if (_분리[j] !== -1) result += 영어[_분리[j]];
      }
    }

    return result;
  }
  function 한글분리(_한글: any) {
    let 코드 = _한글.charCodeAt(0) || _한글.charCodeAt(1);
    if (코드 >= 가 && 코드 <= 힣) {
      let 초 = Math.floor((코드 - 가) / 588);
      let 중 = Math.floor((코드 - 가 - 초 * 588) / 28);
      let 종 = 코드 - 가 - 초 * 588 - 중 * 28 - 1;
      let 중1 = 중,
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
        let 초 = 한글.indexOf(_한글);
        return [초, -1, -1, -1, -1];
      } else if (중성.indexOf(_한글) > -1) {
        let 중 = 중성.indexOf(_한글);
        let 중1 = 중,
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
        let 종 = 종성.indexOf(_한글);
        let 종1 = 종,
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
