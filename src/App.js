import React, { useState } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const newButtonColor = buttonColor === "red" ? "blue" : "red";
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="App">
      <button
        style={{ backgroundColor: disabled ? 'gray' : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {newButtonColor}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        onChange={(e) => setDisabled(e.target.checked)}
        defaultChecked={disabled}
      ></input>
      <label
        htmlFor="disable-button-checkbox"
        // onChange={() => setDisabled(true)}
      >
        Disable button
      </label>
    </div>
  );
}

export default App;
