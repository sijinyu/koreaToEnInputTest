import { useEffect, useRef, useState } from "react";
import "./App.css";
import { convertToEnglish, koreanToEnglishMap } from "./assets/helper";
import { Inko } from "./assets/helper/test";
function App() {
  const [composing, setComposing] = useState(false);
  const [email, setEmail] = useState("");
  const isShiftKeyPressed = useRef(false);
  const test = useRef("");

  const inputEl = useRef<HTMLInputElement>(null);
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

  // function splitJamo(input: string) {
  //   const hangulPattern = /[\uAC00-\uD7AF]/;
  //   const splitPattern = /([\u1100-\u1112\u1161-\u1175\u11A8-\u11C2])/;

  //   const jamoArray = [];
  //   let currentSyllable = "";
  //   let lastCharWasHangul = false;

  //   for (let i = 0; i < input.length; i++) {
  //     const char = input.charAt(i);
  //     if (hangulPattern.test(char)) {
  //       if (lastCharWasHangul) {
  //         jamoArray.push(...currentSyllable.split(""));
  //         currentSyllable = "";
  //       }
  //       currentSyllable += char;
  //       lastCharWasHangul = true;
  //     } else if (splitPattern.test(char)) {
  //       if (lastCharWasHangul) {
  //         jamoArray.push(...currentSyllable.split(""));
  //         currentSyllable = "";
  //       }
  //       jamoArray.push(char);
  //       lastCharWasHangul = false;
  //     } else {
  //       if (lastCharWasHangul) {
  //         jamoArray.push(...currentSyllable.split(""));
  //         currentSyllable = "";
  //       }
  //       jamoArray.push(char);
  //       lastCharWasHangul = false;
  //     }
  //   }

  //   if (lastCharWasHangul) {
  //     jamoArray.push(...currentSyllable.split(""));
  //   }

  //   return jamoArray;
  // }

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
      {/* <input
        type="text"
        value={inputValue}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onInput={handleInput}
      />
      <div>{inputValue}</div> */}
      <input
        id="inputEl"
        type="text"
        ref={inputEl}
        // onCompositionStart={() => setComposing(true)}
        // onCompositionUpdate={(e) => (test.current = inko.ko2en(e.data))}
        onChange={(e) => {
          const currentValue = e.target.value;
          // Convert the Korean characters to English using inko
          const convertedValue = inko.ko2en(currentValue);
          e.target.value = convertedValue;
        }}
        // onInput={(e) => {
        //   inputEl.current!.value = inko.ko2en(inputEl.current!.value);
        // }}
        // onKeyDown={handleKeyDown}
        // onKeyUp={handleKeyUp}
      />
      <div>{email}</div>
    </div>
  );
}

export default App;
