export class Validator {
  validatePassword = (password) => {
    // Check for at least one character
    const hasCharacter = /[a-zA-Z]/.test(password);

    // Check for at least one number
    const hasNumber = /\d/.test(password);

    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    //check for min length is 8 character

    const hasLength = password.length-1 >=7 ? true:false;

    // Return true if all conditions are met
    return hasCharacter && hasNumber && hasSpecialChar&&hasLength;
  };
}
