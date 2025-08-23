const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email + span.error");
const country = document.querySelector("#country");
const countryError = document.querySelector("#country + span.error");
const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postal-code + span.error");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#password + span.error");
const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector(
  "#confirm-password + span.error"
);

function validateEmail() {
  if (email.validity.valid) {
    showValid(emailError);
    return true;
  } else {
    if (email.validity.valueMissing) {
      showError(emailError, "You need to enter an email address.");
    } else if (email.validity.typeMismatch) {
      showError(emailError, "Entered value needs to be an email address.");
    }
    return false;
  }
}

email.addEventListener("input", validateEmail);

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

// function to validate the postal code
// This function checks the postal code based on the selected country
// It uses regular expressions to validate the format of the postal code
function validatePostalCode() {
  const pattern = {
    usa: [
      /^[0-9]{5}(?:-[0-9]{4})?$/,
      "US postal codes must be 5 or 9 digits: e.g. 12345 or 12345-1234",
    ],
    canada: [
      /^(?:[A-Z]\d[A-Z][ -]?\d[A-Z]\d)$/i,
      "Canadian postal codes must follow the pattern A1A 1A1 format",
    ],
    uk: [
      /^([A-Z]{1,2}\d{1,2}[A-Z]?)(\d[A-Z]{2})$/i,
      "UK postal codes must follow the pattern A1 1AA: e.g. W1A 1AA or M1 1AE",
    ],
  };

  const countryValue = country.value;
  const postalCodeValue = postalCode.value.trim();
  let postalCodeValidated;

  // if there's no country selected and the postal code matches the pattern
  if (countryValue === "" && postalCodeValue !== "") {
    showError(
      postalCodeError,
      "Please select a country to validate the postal code."
    );
    return false;
  } else if (countryValue === "" && postalCodeValue === "") {
    showError(postalCodeError, "Please enter a postal code.");
    return false;
  } else if (countryValue !== "" && postalCodeValue === "") {
    showError(postalCodeError, "Please enter a postal code.");
    return false;
  } else {
    postalCodeValidated = pattern[countryValue][0].test(postalCodeValue);
  }

  if (postalCodeValidated) {
    showValid(postalCodeError);
    return true;
  } else {
    showError(postalCodeError, pattern[countryValue][1]);
    return false;
  }
}

function validatePassword() {
  // First validate the password field
  if (!password.validity.valid) {
    if (password.validity.valueMissing) {
      showError(passwordError, "Please enter a password.");
    } else if (password.validity.tooShort) {
      showError(
        passwordError,
        `Password must be at least ${password.minLength} characters. You are currently using ${password.value.length} characters.`
      );
    } else if (password.validity.patternMismatch) {
      showError(
        passwordError,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
    return false;
  }

  // Password is valid, now check confirm password
  showValid(passwordError);

  if (password.validity.valid && confirmPassword.validity.valid) {
    if (password.value !== confirmPassword.value) {
      showError(confirmPasswordError, "Passwords do not match.");
      return false; // passwords do not match, return false
    }
    showValid(confirmPasswordError);
    return true; // passwords match, return true
  }
}

postalCode.addEventListener("input", validatePostalCode);
country.addEventListener("change", validatePostalCode);

password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validatePassword);

// event listener for the submit event
form.addEventListener("submit", (event) => {
  // The `validate...` functions show the UI errors.
  // We just need to check their return values to see if the form is valid.
  const isEmailValid = validateEmail();
  const isPostalCodeValid = validatePostalCode();
  const isPasswordValid = validatePassword();

  // The `validatePassword` function doesn't check for an empty confirm password field
  // if the user hasn't typed in it. We need to enforce that on submit.
  let isConfirmPasswordRequiredAndMissing = false;
  if (
    password.validity.valid &&
    (confirmPassword.validity.valueMissing ||
      confirmPassword.validity.tooShort ||
      confirmPassword.validity.patternMismatch)
  ) {
    showError(confirmPasswordError, "Please confirm your password.");
    isConfirmPasswordRequiredAndMissing = true;
  }

  if (
    !isEmailValid ||
    !isPostalCodeValid ||
    !isPasswordValid ||
    isConfirmPasswordRequiredAndMissing
  ) {
    event.preventDefault(); // Prevent the form from submitting
  }
});
