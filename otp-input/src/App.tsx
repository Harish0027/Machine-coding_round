import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  let totalDigit = 5;
  const [inputList, setInputList] = useState<string[]>(
    new Array(totalDigit).fill("")
  );

  const inputRef = useRef<(HTMLInputElement | null)[]>(
    new Array(totalDigit).fill(null)
  );

  const handleInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!inputList[index]) {
        // If current box is already empty, go to previous
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let value = e.target.value;
    value = value.slice(-1);

    setInputList((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });

    if (value && index < inputList.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  return (
    <>
      <div>
        {inputList.map((_, index) => {
          return (
            <input
              ref={(el) => {
                inputRef.current[index] = el;
              }}
              className="box"
              type="text"
              value={inputList[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleInput(e, index)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
