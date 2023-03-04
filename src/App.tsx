import { useEffect, useRef, useState } from "react";
import "./App.css";
import { convertToEnglish, koreanToEnglishMap } from "./assets/helper";
import { Inko } from "./assets/helper/test";
function App() {
  const [inputValue, setInputValue] = useState("");
  const handleCompositionStart = () => {
    setInputValue((prevValue) => {
      return prevValue.replace(/\u200B/g, "");
    });
  };

  const handleCompositionEnd = (e: any) => {
    const convertedText = Array.from(
      e.target.value,
      convertToEnglish(koreanToEnglishMap, e.shiftKey)
    ).join("");
    setInputValue(convertedText);
  };

  const handleInput = (e: any) => {
    const convertedText = Array.from(
      e.target.value,
      convertToEnglish(koreanToEnglishMap, e.shiftKey)
    ).join("");
    setInputValue(convertedText);
  };

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

  // function handleInput(
  //   inputEvent: React.ChangeEvent<HTMLInputElement>,
  //   callback: (value: string) => void
  // ) {
  //   const inputValue = inputEvent.target.value;
  //   const jamoArray = splitJamo(inputValue);
  //   const convertedText = jamoArray
  //     .map((jamo) =>
  //       convertToEnglish(koreanToEnglishMap, isShiftKeyPressed.current)(jamo)
  //     )
  //     .join("");
  //   callback(convertedText);
  // }

  function splitJamo(input: string) {
    const hangulPattern = /[\uAC00-\uD7AF]/;
    const splitPattern = /([\u1100-\u1112\u1161-\u1175\u11A8-\u11C2])/;

    const jamoArray = [];
    let currentSyllable = "";
    let lastCharWasHangul = false;

    for (let i = 0; i < input.length; i++) {
      const char = input.charAt(i);
      if (hangulPattern.test(char)) {
        if (lastCharWasHangul) {
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
    let tt = document.getElementById("display") as HTMLDivElement;
    tt.innerHTML = inko.ko2en(text);
  }
  useEffect(() => {
    const hiddenInput = document.getElementById("hidden-input");
    const display = document.getElementById("display");

    if (hiddenInput && display) {
      display.addEventListener("click", () => {
        hiddenInput.focus();
      });
    }
  }, []);
  return (
    <div className="input-container">
      {/* <input
        type="text"
        id="hidden-input"
        className="hidden-input"
        onKeyUp={(e: any) => koreanToEnglish(e.target.value)}
      />
      <div id="display" className="display" /> */}
      <input
        type="text"
        value={inputValue}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onInput={handleInput}
      />
      <div>{inputValue}</div>
    </div>
  );
}

export default App;
