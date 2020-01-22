/*import { updateExpression } from "@babel/types";*/

feather.replace(); // initialize feather icons

// Toggle Password Show and Hide Function
const revealButton = document.querySelector(".reveal-password");
const passwordField = document.getElementById("password");

const togglePassword = () => {
  const eyeClose = document.querySelector(".eye-close");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeClose.classList.add("visibilty-hidden");
  } else {
    passwordField.type = "password";
    eyeClose.classList.remove("visibilty-hidden");
  }
};

revealButton.addEventListener("click", togglePassword);

// Copy Password Function
const copyButton = document.querySelector(".copy-password");

const copyPassword = () => {
  passwordField.select();
  document.execCommand("copy");
};

copyButton.addEventListener("click", copyPassword);

// Range Slider Function
const slider = document.getElementById("password-length");
const output = document.getElementById("password-count");
output.innerHTML = slider.value; // Display the default slider value

// Password generate function
const addUppercaseElement = document.getElementById("uppercase");
const addLowercaseElement = document.getElementById("lowercase");
const addDigitsElement = document.getElementById("digits");
const addSymbolsElement = document.getElementById("symbols");
let charRange = output.textContent;
const generateButton = document.querySelector("button.generate-password");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  const rangeValue = this.value;
  output.innerHTML = rangeValue;
  charRange = rangeValue;
};

const BLANK_CHAR_CODES = arrayFromLowToHigh(32, 32);
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

// Generate Button Function
generateButton.addEventListener("click", e => {
  e.preventDefault();
  const charAmount = charRange;
  const addUppercase = addUppercaseElement.checked;
  const addLowercase = addLowercaseElement.checked;
  const addNumbers = addDigitsElement.checked;
  const addSymbols = addSymbolsElement.checked;
  const password = generatePassword(
    charAmount,
    addUppercase,
    addLowercase,
    addNumbers,
    addSymbols
  );
  //passwordField.value = password;
  passwordField.value = password.split(" ").join("");
  console.log(passwordField.value.length);
});

function generatePassword(
  charAmount,
  addUppercase,
  addLowercase,
  addNumbers,
  addSymbols
) {
  let charCodes = BLANK_CHAR_CODES;

  if (addUppercase)
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES).filter(e => e !== 32);
  if (addLowercase)
    charCodes = charCodes.concat(LOWERCASE_CHAR_CODES).filter(e => e !== 32);
  if (addSymbols)
    charCodes = charCodes.concat(SYMBOL_CHAR_CODES).filter(e => e !== 32);
  if (addNumbers)
    charCodes = charCodes.concat(NUMBER_CHAR_CODES).filter(e => e !== 32);

  console.log(charCodes);
  const passwordCharacters = [];

  for (let i = 0; i < charAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
