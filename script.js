const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email + span.error");
const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postal-code + span.error");
const country = document.querySelector("#country");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

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
  // validate the password and confirm password fields
  if (!validatePassword()) {
    // if the password validation fails, prevent form submission
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

  // if there's a country selected and the postal code matches the pattern
  if (countryValue && pattern[countryValue][0].test(postalCodeValue)) {
    showValid(postalCodeError);
    postalCodeValidated = true;
  } else if (!countryValue && !postalCodeValue) {
    showError(
      postalCodeError,
      "Please select a country and enter a postal code."
    );
    postalCodeValidated = false;
  } else if (countryValue && pattern[countryValue]) {
    showError(postalCodeError, pattern[countryValue][1]);
    postalCodeValidated = false;
  } else {
    showError(postalCodeError, "Please enter a valid postal code.");
    postalCodeValidated = false;
  }
  return postalCodeValidated;
}

function validatePassword() {
  const passwordValue = document.querySelector("#password");
  const passwordError = document.querySelector("#password + span.error");
  const confirmPasswordValue = document.querySelector("#confirm-password");
  const confirmPasswordError = document.querySelector(
    "#confirm-password + span.error"
  );

  // checking the normal password field
  // if the password is empty
  if (passwordValue.validity.valueMissing) {
    showError(passwordError, "Password is required.");
    return;
  }
  // if the password is too short
  if (passwordValue.validity.tooShort) {
    showError(passwordError, "Password must be at least 8 characters long.");
    return;
  }
  // if password does not match the required pattern
  if (passwordValue.validity.patternMismatch) {
    showError(
      passwordError,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    );
    return;
  }

  // checking the confirm password field
  if (
    passwordValue.validity.valid &&
    confirmPasswordValue.validity.valueMissing
  ) {
    showValid(passwordError);
    showError(confirmPasswordError, "Please confirm your password.");
  }
  // if the passwords match
  else if (
    passwordValue.validity.valid &&
    confirmPasswordValue.validity.valid &&
    passwordValue.value === confirmPasswordValue.value
  ) {
    showValid(passwordError);
    showValid(confirmPasswordError);
    return true; // passwords match, return true
  } else {
    showError(passwordError, "Passwords do not match.");
    showError(confirmPasswordError, "Passwords do not match.");
    return false; // passwords do not match, return false
  }
}

postalCode.addEventListener("input", validatePostalCode);
country.addEventListener("change", validatePostalCode);

password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validatePassword);
