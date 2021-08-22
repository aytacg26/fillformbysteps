export const textValidation = (text, minTextLength = 1) => {
  return text.trim().length > minTextLength;
};

export const emailValidation = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return regex.test(email);
};

export const birthdateValidation = (date, limitAge = 0) => {
  //Not an exact age validation, it just checks number of years
  const today = new Date();
  const enteredDate = new Date(date);
  const age = Math.floor((today - enteredDate) / (1000 * 60 * 60 * 24) / 365);

  if (limitAge) {
    return age > limitAge && age <= 125;
  }

  return age > 4 && age <= 125;
};

export const mobileValidation = (mobile) => {
  const isValidText = textValidation(mobile);

  if (isValidText) {
    const numArr = mobile.split('');

    numArr.forEach((num) => {
      if (isNaN(num)) {
        return false;
      }
    });

    return true;
  }

  return false;
};

/**
 *   {
    minLength,
    maxLength,
    numOfLowerCase,
    numOfUpperCase,
    numOfNumbers,
    numOfSpecialChars,
  }
 */

//Simple but not efficient and can create preformace issues
export const passwordValidation = (
  password,
  minLength,
  maxLength,
  minNumOfLowerCase = 0,
  minNumOfUpperCase = 0,
  minNumOfSpecialChars = 0
) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇÖİŞÜĞ';
  const validSpecialChars = '-*/?&@£$=!+:;,(){}[]%<>';
  const passwordArr = password.split('');
  let lowercaseCount = 0;
  let uppercaseCount = 0;
  let specialCharCount = 0;
  let hasValidLowerCase = minNumOfLowerCase ? false : true;
  let hasValidUpperCase = minNumOfUpperCase ? false : true;
  let hasValidSpecial = minNumOfSpecialChars ? false : true;

  /*
    1- Min length of the password
    2- number of lowercase chars
    3- number of uppercase chars
    4- number of numbers
    5- number of special characters
  */
  const maxTestLength = maxLength ? maxLength : 30;

  //Has valid length
  const hasValidLength =
    password.length >= minLength && password.length <= maxTestLength;

  //Has valid lowercase characters
  if (minNumOfLowerCase) {
    passwordArr.forEach((char) => {
      if (letters.toLocaleLowerCase().includes(char)) {
        lowercaseCount++;
      }
    });

    hasValidLowerCase = lowercaseCount >= minNumOfLowerCase;
  }

  //Has valid uppercase characters
  if (minNumOfUpperCase) {
    passwordArr.forEach((char) => {
      if (letters.includes(char)) {
        uppercaseCount++;
      }
    });

    hasValidUpperCase = uppercaseCount >= minNumOfUpperCase;
  }

  //Has valid special characters
  if (minNumOfSpecialChars) {
    passwordArr.forEach((char) => {
      if (validSpecialChars.includes(char)) {
        specialCharCount++;
      }
    });

    hasValidSpecial = specialCharCount >= minNumOfSpecialChars;
  }

  return (
    hasValidLength && hasValidLowerCase && hasValidUpperCase && hasValidSpecial
  );
};

export const comparePasswords = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return false;
  }

  return true;
};
