import { useRef, useState } from "react";
import "./App.css";
import { convertToEnglish, koreanToEnglishMap } from "./assets/helper";
import { Inko } from "./assets/helper/test";
function App() {
  const [email, setEmail] = useState("");
  const isShiftKeyPressed = useRef(false);
  const test = useRef("");
  const inputEl = useRef<HTMLTextAreaElement>(null);
  const inko = Inko();
  function handleChangeEmail(value: string): void {
    setEmail(value);
  }
  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
      isShiftKeyPressed.current = false;
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
      isShiftKeyPressed.current = true;
    }
  }
  function handleInput(
    inputEvent: React.ChangeEvent<HTMLInputElement>,
    callback: (value: string) => void
  ) {
    const inputValue = inputEvent.target.value;
    const jamoArray = splitJamo(inputValue);
    const convertedText = jamoArray
      .map((jamo) =>
        convertToEnglish(koreanToEnglishMap, isShiftKeyPressed.current)(jamo)
      )
      .join("");
    callback(convertedText);
  }

  function splitJamo(input: string) {
    const hangulPattern = /[\uAC00-\uD7AF]/;
    const splitPattern = /([\u1100-\u1112\u1161-\u1175\u11A8-\u11C2])/;
    const userAgent = navigator.userAgent;
    const isMobile = /Mobile/.test(userAgent) || /Android/.test(userAgent);

    const jamoArray = [];
    let currentSyllable = "";
    let lastCharWasHangul = false;

    for (let i = 0; i < input.length; i++) {
      const char = input.charAt(i);
      if (hangulPattern.test(char)) {
        if (isMobile && lastCharWasHangul && currentSyllable.length === 1) {
          // On mobile, treat combined characters as a single unit
          jamoArray.push(currentSyllable + char);
          currentSyllable = "";
        } else if (lastCharWasHangul) {
          jamoArray.push(...currentSyllable.split(""));
          currentSyllable = "";
        }
        currentSyllable += char;
        lastCharWasHangul = true;
      } else if (splitPattern.test(char)) {
        if (lastCharWasHangul) {
          jamoArray.push(...currentSyllable.split(""));
          currentSyllable = "";
        }
        jamoArray.push(char);
        lastCharWasHangul = false;
      } else {
        if (lastCharWasHangul) {
          jamoArray.push(...currentSyllable.split(""));
          currentSyllable = "";
        }
        jamoArray.push(char);
        lastCharWasHangul = false;
      }
    }

    if (lastCharWasHangul) {
      jamoArray.push(...currentSyllable.split(""));
    }

    return jamoArray;
  }
  function koreanToEnglish(text: string) {
    let tt = document.getElementById("output") as HTMLDivElement;
    tt.innerHTML = inko.ko2en(text);
    console.log(tt);
    console.log(inko.ko2en(text));
  }
  return (
    <div className="App">
      <textarea
        id="input"
        ref={inputEl}
        // onKeyDown={handleKeyDown}
        // onKeyUp={handleKeyUp}
        onKeyUp={(e: any) => koreanToEnglish(e.target.value)}
      />
      <div id="output"></div>
    </div>
  );
}

export default App;
