import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { convertToEnglish, koreanToEnglishMap } from "./assets/helper";

function App() {
  const [email, setEmail] = useState("");
  const isShiftKeyPressed = useRef(false);

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

  return (
    <div className="App">
      <input
        type="text"
        value={email}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onChange={(e) => handleInput(e, handleChangeEmail)}
      />
    </div>
  );
}

export default App;
