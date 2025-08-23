# Form Validation Practice

This project is a practice exercise for implementing client-side form validation using HTML5 validation APIs and JavaScript as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Features

- **Email Validation**: Uses HTML5 email input type with real-time validation
- **Country Selection**: Required dropdown for postal code validation context
- **Postal Code Validation**: Country-specific validation using regex patterns for:
  - USA (12345 or 12345-1234)
  - Canada (A1A 1A1 format)
  - UK (A1 1AA format)
- **Password Validation**: Enforces strong password requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (!@#$%^&*)
- **Confirm Password**: Ensures passwords match

## Technologies Used

- HTML5 (form validation attributes)
- CSS3 (flexbox layout, visual feedback)
- Vanilla JavaScript (validation logic, DOM manipulation)

## Note

This is **client-side validation only** for learning purposes. In a real application, always implement server-side validation for security.