import { body, validationResult } from "express-validator";

const usernameValidation = () =>
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required");

const passwordValidation = () =>
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters");

export const registerValidator = [
  usernameValidation(),
  passwordValidation(),
];

export const loginValidator = [
  usernameValidation(),
  passwordValidation(),
];

export function validateRequest(request, response, next) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  return next();
}
