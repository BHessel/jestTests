import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App"

test("button has correct initial color", () => {
  render(<App />);
  //find an element qith a role of button and test of 'change to blue'
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  expect(colorButton.textContent).toBe("Change to red");
});

test("inital conditions", () => {
  render(<App />);
  //check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("testing functionality, checkbox disables on click, enables on 2nd", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", {name: "Change to blue"});

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("disabled btn has gray background, reverts to red", () => {
  render(<App/>)
  const checkbox = screen.getByRole("checkbox", {name: "Disable button"})
  const colorButton = screen.getByRole("button", {name: "Change to blue"})

  //on checkbox click, expect the button to change to bg color gray (disable)
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle("background-color: gray")

  //on checkbox click, re-enable the button, bg color goes red
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle("background-color: red")
})

test("clicked disabled btn has gray background, reverts to blue", () => {
  render(<App/>)
  const checkbox = screen.getByRole("checkbox", {name: "Disable button"})
  const colorButton = screen.getByRole("button", {name: "Change to blue"})

  //change btn to blue
  fireEvent.click(colorButton)

  //disable btn
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle("background-color: gray")

  //re-enable btn
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle("background-color: blue")
})

describe('spaces before camel-case cap letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red")
  })
  test("works for one inner cap letters", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue")

  })
  test("works for multiple innerCapLetters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red")
  })
})
