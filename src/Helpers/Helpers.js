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
