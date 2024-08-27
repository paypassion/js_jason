const regForm = document.getElementById("regForm");
const userName = document.getElementById("userName");
const email = document.getElementById("Email");
const password = document.getElementById("Password");
const errorMessages = document.getElementById("errorMessages");

let flag = true;

function getErrorMessages(sign) {
  let message = "<p>";
  switch (sign) {
    case 1:
      message += "Username is not allowed Empty";
      break;
    case 2:
      message += "Username is allowed between 8 and 16 characters";
      break;
    case 3:
      message += "Username cannot have spaces in between";
      break;
    case 4:
      message +=
        "Username must include letters from a-z (A-Z) and numbers from 0-9";
      break;
    case 5:
      message += "Input correct email";
      break;
    case 6:
      message += "Email cannot include @hanmail.net or @naver.com";
      break;
    case 7:
      message += "Password cannot include spaces in between";
      break;
    case 8:
      message +=
        "Password must include lower-case, upper-case, special characters, and numbers from 0-9";
      break;
    default:
      break;
  }
  message += "<p>";
  return message;
}

function getUserNameValidation(userNameTrim) {
  const userNamePattern = /^[a-zA-Z0-9]$/;
  let sign = 0;
  if (userNameTrim == "") {
    flag = false;
    // errorMessages.innerHTML = "<p>Username is empty</p>" is substituted by the sign;
    sign = 1;
  } else if (userNameTrim.length < 8 || userNameTrim.length > 16) {
    flag = false;
    sign = 2;
  } else if (userNameTrim.includes(" ")) {
    flag = false;
    sign = 3;
  } else if (!userNamePattern.test(userNameTrim)) {
    flag = false;
    sign = 4;
  }
  return getErrorMessages(sign);
}
function getEmailValidation(emailTrim) {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let sign = 0;
  if (!emailPattern.test(emailTrim)) {
    flag = false;
    sign = 5;
  } else if (
    emailTrim.includes("@hanmail.net") ||
    emailTrim.includes("@naver.com")
  ) {
    flag = false;
    sign = 6;
  }
  return getErrorMessages(sign);
}

function getPasswordValidation(passwordTrim) {
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  let sign = 0;
  if (passwordTrim.includes(" ")) {
    flag = false;
    sign = 7;
  } else if (!passwordPattern.test(passwordTrim)) {
    flag = false;
    sign = 8;
  }
  return getErrorMessages(sign);
}

document.getElementById("submitBtn").addEventListener("click", (e) => {
  errorMessages.innerHTML = "";
  let errMsg = "";

  let userNameTrim = userName.value.trim();
  errMsg += getUserNameValidation(userNameTrim);

  let emailTrim = email.value.trim();
  errMsg += getEmailValidation(emailTrim);

  let passwordTrim = password.value.trim();
  errMsg += getPasswordValidation(passwordTrim);

  if (!flag) {
    e.preventDefault();
    errorMessages.innerHTML = errMsg;
  }
});
