const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email + span.error");
const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postal-code + span.error");
const country = document.querySelector("#country");

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = ""; // Remove the message content
    emailError.className = "error valid"; // Removes the `invalid` class
  } else {
    // If there is still an error, show the correct error
    showEmailError();
  }
});

function showEmailError() {
  if (email.validity.valueMissing) {
    // If empty
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If it's not an email address,
    emailError.textContent = "Entered value needs to be an email address.";
  }
  // Add the `invalid` class
  emailError.className = "error invalid";
}

// function to show error messages
function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.className = "error invalid";
}

// function to show valid state
function showValid(errorElement) {
  errorElement.textContent = "";
  errorElement.className = "error valid";
}

// event listener for the submit event
// This is triggered when the user clicks the submit button
form.addEventListener("submit", (event) => {
  // if the email field is invalid
  if (!email.validity.valid) {
    // display an appropriate error message
    showEmailError();
    event.preventDefault(); // Prevent the form from submitting
  }
  if (!validatePostalCode()) {
    // if the postal code is invalid, prevent form submission
    event.preventDefault();
  }
});

// function to validate the postal code
// This function checks the postal code based on the selected country
// It uses regular expressions to validate the format of the postal code
function validatePostalCode() {
  const pattern = {
    usa: [
      /^[0-9]{5}(?:-[0-9]{4})?$/,
      "US postal codes must have exactly 5 digits: e.g. 12345 or 12345-1234",
    ],
    canada: [
      /^(?:[A-Z]\d[A-Z][ -]?\d[A-Z]\d)$/i,
      "Canadian postal codes must follow the pattern A1A 1A1: e.g. K1A 0B1 or K1A0B1",
    ],
    uk: [
      /^([A-Z]{1,2}\d{1,2}[A-Z]?)(\d[A-Z]{2})$/i,
      "UK postal codes must follow the pattern A1 1AA: e.g. W1A 1AA or M1 1AE",
    ],
  };

  const countryValue = document.querySelector("#country").value;
  const postalCodeValue = postalCode.value.trim();
  let postalCodeValidated;

  // if there's 
  if (countryValue && pattern[countryValue][0].test(postalCodeValue)) {
    console.log("Valid postal code and country selected");
    showValid(postalCodeError);
    postalCodeValidated = true;
  } else if (!countryValue && !postalCodeValue) {
    showError(
      postalCodeError,
      "Please select a country and enter a postal code."
    );
    postalCodeValidated = false;
  } else {
    showError(postalCodeError, pattern[countryValue][1]);
    postalCodeValidated = false;
  }
  return postalCodeValidated;
}

postalCode.addEventListener("input", validatePostalCode);
country.addEventListener("change", validatePostalCode);